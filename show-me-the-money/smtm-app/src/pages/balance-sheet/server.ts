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

export type BalanceSheetTableResponse = {
  report: BalanceSheetTableData | null;
};

export const getBalanceSheetData = async ({
  date,
  periods,
  timeframe,
}: {
  date?: string | null;
  periods?: string | null;
  timeframe?: string | null;
} = {}): Promise<BalanceSheetTableResponse> => {
  const params = new URLSearchParams();

  if (date) params.append("date", date);
  if (periods) params.append("periods", periods);
  if (timeframe) params.append("timeframe", timeframe.toUpperCase());

  const queryString = params.toString();
  const res = await fetch(
    `${BACKEND_API_BASE_URL}/api/balance-sheet${
      queryString ? `?${queryString}` : ""
    }`
  );
  const data = await res.json();
  return data;
};
