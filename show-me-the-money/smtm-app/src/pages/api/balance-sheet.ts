// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { XERO_API_BASE_URL } from "./config";

type BalanceSheetResponseData = {
  reports: any[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BalanceSheetResponseData>
) {
  const response = await fetch(
    `${XERO_API_BASE_URL}/api.xro/2.0/Reports/BalanceSheet`
  );
  console.log("response: ", response);
  const data: any = await response.json();

  res.status(200).json(data);
}
