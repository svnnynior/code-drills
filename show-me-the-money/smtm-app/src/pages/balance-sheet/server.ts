import { BalanceSheetTableData } from ".";

export const getBalanceSheetData = async (): Promise<BalanceSheetTableData> => {
  const res = await fetch(
    "http://localhost:3000/api.xro/2.0/Reports/BalanceSheet"
  );
  const data: any = await res.json();
  return data;
};
