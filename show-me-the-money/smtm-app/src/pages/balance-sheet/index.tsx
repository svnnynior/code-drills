import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import React from "react";
import { getBalanceSheetData } from "./server";
import BalanceSheetTable from "@/_components/balance-sheet/BalanceSheetTable";

// TODO: Backend should change Reports to not be an array
type BalanceSheetTableData = {
  Reports: {
    ReportID: string;
    ReportName: string;
    ReportType: string;
    ReportTitles: string[3];
    ReportDate: string;
    UpdatedDateUTC: string;
    Rows: [];
  }[];
};

export const getServerSideProps = (async () => {
  const data = await getBalanceSheetData();
  return { props: { data } };
}) satisfies GetServerSideProps<{ data: BalanceSheetTableData }>;

export default function BalanceSheet({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(data);
  return (
    <main className="p-12">
      <BalanceSheetTable
        title={data.Reports[0].ReportTitles[0]}
        orgName={data.Reports[0].ReportTitles[1]}
        asOfDateString={data.Reports[0].ReportDate}
        rows={data.Reports[0].Rows}
      />
    </main>
  );
}
