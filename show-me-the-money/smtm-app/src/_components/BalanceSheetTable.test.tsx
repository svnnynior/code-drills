import { render, screen } from "@testing-library/react";
import BalanceSheetTable from "./BalanceSheetTable";

describe("BalanceSheetTable", () => {
  describe("headings", () => {
    it("renders title, orgName, and asOfDateString at the very top", () => {
      render(
        <BalanceSheetTable
          title="testTitle"
          orgName="Test Organization"
          asOfDateString="test-as-of-date"
          rows={[]}
        />
      );

      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        "testTitle"
      );

      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
        "Test Organization"
      );

      expect(screen.getByText("test-as-of-date")).toBeInTheDocument();
    });
  });
});
