import { XERO_API_BASE_URL } from "../shared/config";
import { expressResponseBuilder } from "../shared/test.utils";
import { XeroBalanceSheetReport } from "../shared/xeroApi.types";
import { BALANCE_SHEET_UPSTREAM_ERROR } from "./errors";
import { getBalanceSheet } from "./service";

describe("BalanceSheet Service", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("getBalanceSheet()", () => {
    describe("errors handling", () => {
      it("throws error if upstream Xero API returns status code other than 200", () => {
        jest
          .spyOn(global, "fetch")
          .mockResolvedValueOnce(expressResponseBuilder(500));

        expect(getBalanceSheet()).rejects.toThrow(BALANCE_SHEET_UPSTREAM_ERROR);
      });

      it("throws error if upstream Xero API returns status other than OK", () => {
        jest
          .spyOn(global, "fetch")
          .mockResolvedValueOnce(
            expressResponseBuilder(200, { Status: "Error" })
          );

        expect(getBalanceSheet()).rejects.toThrow(BALANCE_SHEET_UPSTREAM_ERROR);
      });

      it("throws error when fetch fails", () => {
        const mockFetchError = new Error("Error fetching");
        jest.spyOn(global, "fetch").mockRejectedValueOnce(mockFetchError);

        expect(getBalanceSheet()).rejects.toThrow(mockFetchError);
      });
    });

    describe("success", () => {
      it("returns only the first report in exactly the same format as the upstream", async () => {
        const mockXeroReport: XeroBalanceSheetReport = {
          ReportID: "mock-report-id",
          ReportName: "mock-report-name",
          ReportType: "mock-report-type",
          ReportTitles: [
            "mock-report-title-1",
            "mock-report-title-2",
            "mock-report-title-3",
          ],
          ReportDate: "mock-report-date",
          UpdatedDateUTC: "mock-updated-date-utc",
          Rows: [],
        };
        jest.spyOn(global, "fetch").mockResolvedValueOnce(
          expressResponseBuilder(200, {
            Status: "OK",
            Reports: [mockXeroReport, { ReportID: "unused-report" }],
          })
        );

        const result = await getBalanceSheet();
        expect(result.report).toEqual(mockXeroReport);
      });

      it("returns null if no reports are returned", async () => {
        jest
          .spyOn(global, "fetch")
          .mockResolvedValueOnce(
            expressResponseBuilder(200, { Status: "OK", Reports: [] })
          );

        const result = await getBalanceSheet();
        expect(result.report).toBeNull();
      });

      describe("with query string", () => {
        it.each([
          ["no-query", undefined, undefined, undefined, ""],
          ["only-date", "2024-01-01", undefined, undefined, "?date=2024-01-01"],
          ["only-periods", undefined, "11", undefined, "?periods=11"],
          ["only-timeframe", undefined, undefined, "MONTH", "?timeframe=MONTH"],
          [
            "all-query-params",
            "2024-01-01",
            "11",
            "MONTH",
            "?date=2024-01-01&periods=11&timeframe=MONTH",
          ],
        ])(
          "correctly passes the query string to the upstream API - %s",
          async (
            _,
            mockDate,
            mockPeriods,
            mockTimeframe,
            expectedQueryString
          ) => {
            const fetchSpy = jest.spyOn(global, "fetch");

            await getBalanceSheet({
              date: mockDate,
              periods: mockPeriods,
              timeframe: mockTimeframe,
            });

            expect(fetchSpy).toHaveBeenCalledWith(
              `${XERO_API_BASE_URL}/api.xro/2.0/Reports/BalanceSheet${expectedQueryString}`
            );
          }
        );
      });
    });
  });
});
