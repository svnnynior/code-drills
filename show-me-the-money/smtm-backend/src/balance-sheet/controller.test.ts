import { BALANCE_SHEET_UPSTREAM_ERROR } from "./errors";
import { get } from "./controller";
import { createRequest, createResponse } from "node-mocks-http";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import { XERO_API_BASE_URL } from "../shared/config";
import { XeroBalanceSheetReport } from "../shared/xeroApi.types";

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

const server = setupServer(
  http.get(`${XERO_API_BASE_URL}/api.xro/2.0/Reports/BalanceSheet`, () => {
    return HttpResponse.json(
      {
        Status: "OK",
        Reports: [mockXeroReport],
      },
      { status: 200 }
    );
  })
);

describe("BalanceSheet Controller", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  describe("GET /api/balance-sheet", () => {
    beforeEach(() => {
      jest.spyOn(console, "error").mockImplementation(jest.fn());
    });

    describe("errors handling", () => {
      it("returns a 500 status code when the balance sheet fetch fails", async () => {
        server.use(
          http.get(
            `${XERO_API_BASE_URL}/api.xro/2.0/Reports/BalanceSheet`,
            () => {
              return HttpResponse.json({}, { status: 500 });
            }
          )
        );
        const mockExpressRequest = createRequest({
          method: "GET",
          url: "/api/balance-sheet",
          params: {},
        });
        const mockExpressResponse = createResponse();

        await get(mockExpressRequest, mockExpressResponse, jest.fn());

        expect(mockExpressResponse.statusCode).toBe(500);
        expect(mockExpressResponse._getJSONData().error).toEqual(
          "Error when fetching balance sheet"
        );
      });

      it("logs error when the balance sheet fetch fails", async () => {
        server.use(
          http.get(
            `${XERO_API_BASE_URL}/api.xro/2.0/Reports/BalanceSheet`,
            () => {
              return HttpResponse.json({}, { status: 500 });
            }
          )
        );
        const mockExpressRequest = createRequest({
          method: "GET",
          url: "/api/balance-sheet",
          params: {},
        });
        const mockExpressResponse = createResponse();

        await get(mockExpressRequest, mockExpressResponse, jest.fn());

        expect(console.error).toHaveBeenCalledWith(
          "GET /api/balance-sheet error: ",
          BALANCE_SHEET_UPSTREAM_ERROR
        );
      });
    });

    describe("success", () => {
      it("returns the formatted balance sheet data", async () => {
        const mockExpressRequest = createRequest({
          method: "GET",
          url: "/api/balance-sheet",
          params: {},
        });
        const mockExpressResponse = createResponse();

        await get(mockExpressRequest, mockExpressResponse, jest.fn());

        expect(mockExpressResponse.statusCode).toBe(200);
        expect(mockExpressResponse._getJSONData()).toEqual({
          report: mockXeroReport,
        });
      });

      it("correctly pass the query string", async () => {
        let capturedQueryParams: any;
        server.use(
          http.get(
            `${XERO_API_BASE_URL}/api.xro/2.0/Reports/BalanceSheet`,
            ({ request }) => {
              const url = new URL(request.url);
              capturedQueryParams = {
                date: url.searchParams.get("date"),
                periods: url.searchParams.get("periods"),
                timeframe: url.searchParams.get("timeframe"),
              };
              return HttpResponse.json({
                Status: "OK",
                Reports: [mockXeroReport],
              });
            }
          )
        );

        const mockDate = "2024-01-01";
        const mockPeriods = "11";
        const mockTimeframe = "MONTH";
        const mockExpressRequest = createRequest({
          method: "GET",
          url: "/api/balance-sheet",
          query: {
            date: mockDate,
            periods: mockPeriods,
            timeframe: mockTimeframe,
          },
        });
        const mockExpressResponse = createResponse();

        await get(mockExpressRequest, mockExpressResponse, jest.fn());
        expect(capturedQueryParams).toEqual({
          date: mockDate,
          periods: mockPeriods,
          timeframe: mockTimeframe,
        });
      });
    });
  });
});
