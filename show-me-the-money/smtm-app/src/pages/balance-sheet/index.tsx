import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import React, { useState } from "react";
import { BalanceSheetTableData, getBalanceSheetData } from "./server";
import BalanceSheetTable from "@/_components/balance-sheet/BalanceSheetTable";
import Link from "next/link";
import { Option, Select } from "@mui/joy";
import dayjs from "dayjs";

enum ReportTimeframe {
  MONTH = "MONTH",
  QUARTER = "QUARTER",
  YEAR = "YEAR",
}

type Props = { reportData: BalanceSheetTableData };

export default function BalanceSheetPage({
  reportData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const title = reportData?.ReportTitles[0];
  const orgName = reportData?.ReportTitles[1];
  const asOfDateString = reportData?.ReportDate;

  const [reportDate, setReportDate] = useState<string>(
    dayjs().format("YYYY-MM-DD")
  );
  const [reportTimeframe, setReportTimeframe] = useState<ReportTimeframe>(
    ReportTimeframe.MONTH
  );
  const [reportNumPeriods, setReportNumPeriods] = useState<string>("1");

  const handleReportDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReportDate(dayjs(e.target.value).format("YYYY-MM-DD"));
  };

  const handleReportTimeframeChange = (
    _: React.MouseEvent | React.KeyboardEvent | React.FocusEvent | null,
    value: ReportTimeframe | null
  ) => {
    if (value) {
      setReportTimeframe(value);
    }
  };

  const handleReportNumPeriodsChange = (
    _: React.MouseEvent | React.KeyboardEvent | React.FocusEvent | null,
    value: string | null
  ) => {
    if (value) {
      setReportNumPeriods(value);
    }
  };

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
      {reportData ? (
        <>
          <h1 className="text-4xl font-bold">{title}</h1>
          <h2 className="text-2xl">{orgName}</h2>
          <div className="flex flex-col md:flex-row py-4 gap-4">
            <input
              className="border-2 border-gray-800 rounded-md p-1"
              type="date"
              id="date"
              name="date"
              defaultValue={reportDate}
              onChange={handleReportDateChange}
            />
            <Select
              sx={{ minWidth: 200 }}
              defaultValue={reportTimeframe}
              value={reportTimeframe}
              onChange={handleReportTimeframeChange}
            >
              <Option value={ReportTimeframe.MONTH}>MONTH</Option>
              <Option value={ReportTimeframe.QUARTER}>QUARTER</Option>
              <Option value={ReportTimeframe.YEAR}>YEAR</Option>
            </Select>
            <Select
              sx={{ minWidth: 200 }}
              defaultValue={reportNumPeriods}
              value={reportNumPeriods}
              onChange={handleReportNumPeriodsChange}
            >
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
              <Option value="4">4</Option>
              <Option value="5">5</Option>
              <Option value="6">6</Option>
              <Option value="7">7</Option>
              <Option value="8">8</Option>
              <Option value="9">9</Option>
              <Option value="10">10</Option>
              <Option value="11">11</Option>
            </Select>
          </div>
          <div className="flex justify-end">
            <span className="text-sm italic">
              Data last updated on {asOfDateString}
            </span>
          </div>
          <BalanceSheetTable tableRows={reportData.Rows} />
        </>
      ) : (
        <div className="pt-20 text-center text-xl">
          <p>😔</p>
          <p>Cannot find Balance Sheet data.</p>
        </div>
      )}
    </main>
  );
}

export const getServerSideProps = (async () => {
  const data = await getBalanceSheetData();
  return { props: { reportData: data.report ?? null } };
}) satisfies GetServerSideProps<Props>;
