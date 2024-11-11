import { XERO_API_BASE_URL } from "../shared/config";
import {
  XeroBalanceSheetGetResponse,
  XeroBalanceSheetReport,
} from "../shared/xeroApi.types";
import { BALANCE_SHEET_UPSTREAM_ERROR } from "./errors";

type BalanceSheetData = {
  report: XeroBalanceSheetReport | null;
};
export const getBalanceSheet = async (): Promise<BalanceSheetData> => {
  try {
    const res = await fetch(
      `${XERO_API_BASE_URL}/api.xro/2.0/Reports/BalanceSheet`
    );

    if (res.status !== 200) {
      throw BALANCE_SHEET_UPSTREAM_ERROR;
    }

    const data: XeroBalanceSheetGetResponse = await res.json();
    if (data.Status !== "OK") {
      throw BALANCE_SHEET_UPSTREAM_ERROR;
    }

    if (data.Reports.length === 0) {
      return { report: null };
    }

    return { report: data.Reports[0] };
  } catch (error) {
    throw error;
  }
};
