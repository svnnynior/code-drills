import { BACKEND_API_BASE_URL } from "@/config";
import { BalanceSheetTableData } from ".";

export const getBalanceSheetData = async (): Promise<BalanceSheetTableData> => {
  const res = await fetch(`${BACKEND_API_BASE_URL}/api/balance-sheet`);
  const data: any = await res.json();
  return data;
};
