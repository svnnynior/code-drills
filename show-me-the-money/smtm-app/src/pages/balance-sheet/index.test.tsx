import { render, screen } from "@testing-library/react";
import BalanceSheetPage from ".";
import { BalanceSheetTableData } from "./server";
import { useSearchParams } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const MOCK_DATA: BalanceSheetTableData = {
  ReportID: "BalanceSheet",
  ReportName: "Balance Sheet",
  ReportType: "BalanceSheet",
  ReportTitles: ["Test Title", "Test Organization", "10 November 2024"],
  ReportDate: "10 November 2024",
  UpdatedDateUTC: "/Date(1731226303278)/",
  Rows: [],
};

jest.mock("next/navigation");

const mockedUseSearchParams = useSearchParams as jest.Mock;

const queryClient = new QueryClient();
const testWrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("BalanceSheet Page", () => {
  beforeEach(() => {
    mockedUseSearchParams.mockReturnValue({
      get: jest.fn().mockReturnValue(null),
    });
  });

  it("shows the title, org name, and as of date", () => {
    render(<BalanceSheetPage reportData={{ report: MOCK_DATA }} />, {
      wrapper: testWrapper,
    });
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      MOCK_DATA.ReportTitles[0]
    );

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      MOCK_DATA.ReportTitles[1]
    );

    expect(
      screen.getByText(`Data last updated on ${MOCK_DATA.ReportDate}`)
    ).toBeInTheDocument();
  });

  it("uses correct default query parameters if nothing is provided in the url", () => {
    mockedUseSearchParams.mockReturnValue({
      get: jest.fn().mockReturnValue(null),
    });
    render(<BalanceSheetPage reportData={{ report: MOCK_DATA }} />, {
      wrapper: testWrapper,
    });

    expect(screen.queryByDisplayValue("MONTH")).toBeInTheDocument();
    expect(screen.queryByDisplayValue("1")).toBeInTheDocument();
  });

  it("uses query parameters as default values if provided", () => {
    mockedUseSearchParams.mockReturnValue({
      get: jest.fn().mockImplementation((key) => {
        if (key === "timeframe") {
          return "YEAR";
        }
        if (key === "periods") {
          return "11";
        }
        if (key === "date") {
          return "2024-01-01";
        }
      }),
    });
    render(<BalanceSheetPage reportData={{ report: MOCK_DATA }} />, {
      wrapper: testWrapper,
    });

    expect(screen.queryByDisplayValue("YEAR")).toBeInTheDocument();
    expect(screen.queryByDisplayValue("11")).toBeInTheDocument();
    expect(screen.queryByDisplayValue("2024-01-01")).toBeInTheDocument();
  });
});
