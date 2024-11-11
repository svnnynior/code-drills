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
    });
  });
});
