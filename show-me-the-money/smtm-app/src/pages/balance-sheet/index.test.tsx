import { render, screen } from "@testing-library/react";
import BalanceSheetPage, { BalanceSheetTableData } from ".";

const MOCK_DATA: BalanceSheetTableData = {
  Reports: [
    {
      ReportID: "BalanceSheet",
      ReportName: "Balance Sheet",
      ReportType: "BalanceSheet",
      ReportTitles: ["Test Title", "Test Organization", "10 November 2024"],
      ReportDate: "10 November 2024",
      UpdatedDateUTC: "/Date(1731226303278)/",
      Rows: [],
    },
  ],
};

describe("BalanceSheet Page", () => {
  it("shows the title, org name, and as of date", () => {
    render(<BalanceSheetPage data={MOCK_DATA} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      MOCK_DATA.Reports[0].ReportTitles[0]
    );

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      MOCK_DATA.Reports[0].ReportTitles[1]
    );

    expect(
      screen.getByText(
        `Data last updated on ${MOCK_DATA.Reports[0].ReportDate}`
      )
    ).toBeInTheDocument();
  });
});
