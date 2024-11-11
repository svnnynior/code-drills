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

export const getBalanceSheetData = async ({
  date,
  periods,
  timeframe,
}: {
  date?: string;
  periods?: string;
  timeframe?: string;
} = {}): Promise<BalanceSheetTableResponse> => {
  const params = new URLSearchParams();

  if (date) params.append("date", date);
  if (periods) params.append("periods", periods);
  if (timeframe) params.append("timeframe", timeframe);

  const queryString = params.toString();
  const res = await fetch(
    `${BACKEND_API_BASE_URL}/api/balance-sheet${
      queryString ? `?${queryString}` : ""
    }`
  );
  const data: any = await res.json();
  return data;
};
