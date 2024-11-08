enum BalanceSheetRowType {
  Header = "Header",
  Section = "Section",
  Row = "Row",
  SummaryRow = "SummaryRow",
}

type BalanceSheetRow =
  | BalanceSheetRowHeader
  | BalanceSheetRowSection
  | BalanceSheetRowData
  | BalanceSheetRowSummaryRow;

type BalanceSheetRowHeader = {
  RowType: BalanceSheetRowType.Header;
  Cells: BalanceSheetCell[];
};

type BalanceSheetRowSection = {
  RowType: BalanceSheetRowType.Section;
  Title: string;
  Rows: BalanceSheetRowData[];
};

type BalanceSheetRowData = {
  RowType: BalanceSheetRowType.Row;
  Cells: BalanceSheetCell[];
};

type BalanceSheetRowSummaryRow = {
  RowType: BalanceSheetRowType.SummaryRow;
  Cells: BalanceSheetCell[];
};

type BalanceSheetCell = {
  Value: string;
  Attributes?: BalanceSheetCellAttribute[];
};

type BalanceSheetCellAttribute = {
  Value: string;
  Id: string;
};

type BalanceSheetTableProps = {
  title: string;
  orgName: string;
  asOfDateString: string;
  rows: BalanceSheetRow[];
};

export default function BalanceSheetTable({
  title,
  orgName,
  asOfDateString,
}: BalanceSheetTableProps) {
  return (
    <div>
      <h1 className="text-4xl font-bold">{title}</h1>
      <h2 className="text-2xl">{orgName}</h2>
      <p className="text-base">{asOfDateString}</p>
    </div>
  );
}
