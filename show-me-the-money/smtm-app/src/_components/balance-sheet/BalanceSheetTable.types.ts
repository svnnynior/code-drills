export enum BalanceSheetRowType {
  Header = "Header",
  Section = "Section",
  Row = "Row",
  SummaryRow = "SummaryRow",
}

export type BalanceSheetRow =
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
  Rows: (BalanceSheetRowData | BalanceSheetRowSummaryRow)[];
};

type BalanceSheetRowData = {
  RowType: BalanceSheetRowType.Row;
  Cells: BalanceSheetCell[];
};

type BalanceSheetRowSummaryRow = {
  RowType: BalanceSheetRowType.SummaryRow;
  Cells: BalanceSheetCell[];
};

export type BalanceSheetCell = {
  Value: string;
  Attributes?: BalanceSheetCellAttribute[];
};

export type BalanceSheetCellAttribute = {
  Value: string;
  Id: string;
};
