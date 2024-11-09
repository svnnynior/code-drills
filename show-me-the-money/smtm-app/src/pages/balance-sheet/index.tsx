import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import React from "react";
import { getBalanceSheetData } from "./server";
import BalanceSheetTable from "@/_components/balance-sheet/BalanceSheetTable";
import Link from "next/link";

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
      <div className="flex justify-start px-2 md:px-0 md:justify-end hover:underline">
        <span className="block md:hidden">
          <Link href="/">&larr;</Link>
        </span>
        <span className="hidden md:block">
          <Link href="/">&larr; Back to Home</Link>
        </span>
      </div>
      <BalanceSheetTable
        title={data.Reports[0].ReportTitles[0]}
        orgName={data.Reports[0].ReportTitles[1]}
        asOfDateString={data.Reports[0].ReportDate}
        rows={data.Reports[0].Rows}
      />
    </main>
  );
}
