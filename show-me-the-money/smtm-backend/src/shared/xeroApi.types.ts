export type XeroBalanceSheetReport = {
  ReportID: string;
  ReportName: string;
  ReportType: string;
  ReportTitles: [string, string, string];
  ReportDate: string;
  UpdatedDateUTC: string;
  Rows: [];
};
export type XeroBalanceSheetGetResponse = {
  Status: string;
  Reports: XeroBalanceSheetReport[];
};
