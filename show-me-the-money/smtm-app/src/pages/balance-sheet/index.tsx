import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import React from "react";
import { getBalanceSheetData } from "./server";
import BalanceSheetTable from "@/_components/balance-sheet/BalanceSheetTable";
import Link from "next/link";
import { Option, Select } from "@mui/joy";

// TODO: Backend should change Reports to not be an array
export type BalanceSheetTableData = {
  Reports: {
    ReportID: string;
    ReportName: string;
    ReportType: string;
    ReportTitles: [string, string, string];
    ReportDate: string;
    UpdatedDateUTC: string;
    Rows: [];
  }[];
};

export const getServerSideProps = (async () => {
  const data = await getBalanceSheetData();
  return { props: { data } };
}) satisfies GetServerSideProps<{ data: BalanceSheetTableData }>;

export default function BalanceSheetPage({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(data);
  const title = data.Reports[0].ReportTitles[0];
  const orgName = data.Reports[0].ReportTitles[1];
  const asOfDateString = data.Reports[0].ReportDate;
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
      <h1 className="text-4xl font-bold">{title}</h1>
      <h2 className="text-2xl">{orgName}</h2>
      <div className="flex py-4">
        <Select placeholder="Select a timeframe">
          <Option value="month">MONTH</Option>
          <Option value="quarter">QUARTER</Option>
          <Option value="year">YEAR</Option>
        </Select>
      </div>
      <div className="flex justify-end">
        <span className="text-sm italic">
          Data last updated on {asOfDateString}
        </span>
      </div>
      <BalanceSheetTable tableRows={data.Reports[0].Rows} />
    </main>
  );
}
