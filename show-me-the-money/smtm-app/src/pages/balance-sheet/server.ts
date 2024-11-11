import { BACKEND_API_BASE_URL } from "@/config";

export type BalanceSheetTableData = {
  ReportID: string;
  ReportName: string;
  ReportType: string;
  ReportTitles: [string, string, string];
  ReportDate: string;
  UpdatedDateUTC: string;
  Rows: [];
};

type BalanceSheetTableResponse = {
  report: BalanceSheetTableData;
};

export const getBalanceSheetData =
  async (): Promise<BalanceSheetTableResponse> => {
    const res = await fetch(`${BACKEND_API_BASE_URL}/api/balance-sheet`);
    const data: any = await res.json();
    return data;
  };
