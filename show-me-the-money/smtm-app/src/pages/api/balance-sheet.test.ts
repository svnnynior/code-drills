import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import balanceSheetHandler from "./balance-sheet";
import { XERO_API_BASE_URL } from "./config";

const mockHandler = http.get(
  `${XERO_API_BASE_URL}/api.xro/2.0/Reports/BalanceSheet`,
  () => {
    return HttpResponse.json(
      {
        reports: [],
      },
      { status: 200 }
    );
  }
);

const server = setupServer(mockHandler);

describe.skip("/api/balance-sheet", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("returns status 500 if upstream request fails", async () => {
    const jsonSpy = jest.fn();
    const responseSpy = {
      status: jest.fn().mockReturnValue({ json: jsonSpy }),
    };
    await balanceSheetHandler(jest.fn() as any, responseSpy as any);
    expect(responseSpy.status).toHaveBeenCalledWith(500);
  });
});
