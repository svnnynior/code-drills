import { render, screen } from "@testing-library/react";
import BalanceSheetTable from "./BalanceSheetTable";
import {
  BalanceSheetRow,
  BalanceSheetRowType,
} from "./BalanceSheetTable.types";

const TEST_DEFAULT_ROWS_WITH_ONLY_HEADER: BalanceSheetRow[] = [
  {
    RowType: BalanceSheetRowType.Header,
    Cells: [
      { Value: "Test Header 1" },
      { Value: "Test Header 2" },
      { Value: "Test Header 3" },
    ],
  },
];

describe("BalanceSheetTable", () => {
  it("shows no-data message if tableRows is empty", () => {
    render(<BalanceSheetTable tableRows={[]} />);
    expect(screen.getByText("No data available")).toBeInTheDocument();
  });

  describe("table content", () => {
    it("renders RowType.Header cells as table headers", () => {
      const mockRows: BalanceSheetRow[] = [
        {
          RowType: BalanceSheetRowType.Header,
          Cells: [
            { Value: "Test Header 1" },
            { Value: "Test Header 2" },
            { Value: "Test Header 3" },
          ],
        },
      ];
      render(<BalanceSheetTable tableRows={mockRows} />);

      expect(
        screen.getByRole("columnheader", { name: "Test Header 1" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("columnheader", { name: "Test Header 2" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("columnheader", { name: "Test Header 3" })
      ).toBeInTheDocument();
    });

    it("renders RowType.Section cells as rowheader", () => {
      const mockRows: BalanceSheetRow[] = [
        ...TEST_DEFAULT_ROWS_WITH_ONLY_HEADER,
        {
          RowType: BalanceSheetRowType.Section,
          Title: "Test Section",
          Rows: [],
        },
      ];
      render(<BalanceSheetTable tableRows={mockRows} />);

      expect(
        screen.getByRole("rowheader", { name: "Test Section" })
      ).toBeInTheDocument();
    });

    it("emphasizes RowType.Section that does not have any children rows", () => {
      const mockRows: BalanceSheetRow[] = [
        ...TEST_DEFAULT_ROWS_WITH_ONLY_HEADER,
        {
          RowType: BalanceSheetRowType.Section,
          Title: "Test Section",
          Rows: [],
        },
      ];
      render(<BalanceSheetTable tableRows={mockRows} />);

      expect(
        screen.getByRole("rowheader", { name: "Test Section" })
      ).toHaveClass("text-xl font-bold italic underline");
    });

    it("renders RowType.Section cells with colspan equal to the number of columns", () => {
      const mockRows: BalanceSheetRow[] = [
        {
          RowType: BalanceSheetRowType.Header,
          Cells: [{ Value: "Test Header 1" }, { Value: "Test Header 2" }],
        },
        {
          RowType: BalanceSheetRowType.Section,
          Title: "Test Section",
          Rows: [],
        },
      ];
      render(<BalanceSheetTable tableRows={mockRows} />);

      expect(
        screen.getByRole("rowheader", { name: "Test Section" })
      ).toHaveAttribute("colspan", "2");
    });

    it("does not render a row if RowType.Section has no title", () => {
      const mockRows: BalanceSheetRow[] = [
        {
          RowType: BalanceSheetRowType.Header,
          Cells: [{ Value: "Test Header 1" }, { Value: "Test Header 2" }],
        },
        {
          RowType: BalanceSheetRowType.Section,
          Title: "",
          Rows: [],
        },
      ];
      render(<BalanceSheetTable tableRows={mockRows} />);

      expect(screen.queryByRole("rowheader")).not.toBeInTheDocument();
    });

    it("renders RowType.Row as a data cell if the data is presented under RowType.Section", () => {
      const mockRows: BalanceSheetRow[] = [
        ...TEST_DEFAULT_ROWS_WITH_ONLY_HEADER,
        {
          RowType: BalanceSheetRowType.Section,
          Title: "Test Section",
          Rows: [
            {
              RowType: BalanceSheetRowType.Row,
              Cells: [{ Value: "Test Row 1" }, { Value: "Test Row 2" }],
            },
          ],
        },
      ];

      render(<BalanceSheetTable tableRows={mockRows} />);

      expect(
        screen.getByRole("cell", { name: "Test Row 1" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("cell", { name: "Test Row 2" })
      ).toBeInTheDocument();
    });

    it("renders RowType.SummaryRow with an accented color and italic text", () => {
      const mockRows: BalanceSheetRow[] = [
        ...TEST_DEFAULT_ROWS_WITH_ONLY_HEADER,
        {
          RowType: BalanceSheetRowType.Section,
          Title: "Test Section",
          Rows: [
            {
              RowType: BalanceSheetRowType.SummaryRow,
              Cells: [{ Value: "Test Summary Row 1" }],
            },
          ],
        },
      ];

      render(<BalanceSheetTable tableRows={mockRows} />);

      expect(screen.getByTitle("table-Test Section-row-0")).toHaveClass(
        "bg-neutral-800 underline"
      );
    });
  });
});
