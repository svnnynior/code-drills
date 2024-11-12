import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import React, { Suspense, useEffect, useState } from "react";
import { BalanceSheetTableResponse, getBalanceSheetData } from "./server";
import BalanceSheetTable from "@/_components/balance-sheet/BalanceSheetTable";
import Link from "next/link";
import { Option, Select } from "@mui/joy";
import dayjs from "dayjs";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

enum ReportTimeframe {
  MONTH = "MONTH",
  QUARTER = "QUARTER",
  YEAR = "YEAR",
}

const formatDateFromQuery = (dateQuery: string | null): string | null => {
  return dateQuery ? dayjs(dateQuery).format("YYYY-MM-DD") : null;
};

const formatTimeframeFromQuery = (
  timeframeQuery: string | null
): ReportTimeframe | null => {
  if (timeframeQuery?.toUpperCase() === ReportTimeframe.MONTH.toString()) {
    return ReportTimeframe.MONTH;
  }
  if (timeframeQuery?.toUpperCase() === ReportTimeframe.QUARTER.toString()) {
    return ReportTimeframe.QUARTER;
  }
  if (timeframeQuery?.toUpperCase() === ReportTimeframe.YEAR.toString()) {
    return ReportTimeframe.YEAR;
  }
  return null;
};

type Props = { reportData: BalanceSheetTableResponse };

export const getServerSideProps = (async (req) => {
  const data = await getBalanceSheetData(req.query);
  return { props: { reportData: data } };
}) satisfies GetServerSideProps<Props>;

export default function BalanceSheetPage({
  reportData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const searchParams = useSearchParams();
  const dateQuery = searchParams.get("date");
  const periodsQuery = searchParams.get("periods");
  const timeframeQuery = searchParams.get("timeframe");
  const [reportDate, setReportDate] = useState<string>(
    formatDateFromQuery(dateQuery) || dayjs().format("YYYY-MM-DD")
  );
  const [reportTimeframe, setReportTimeframe] = useState<ReportTimeframe>(
    formatTimeframeFromQuery(timeframeQuery) || ReportTimeframe.MONTH
  );
  const [reportNumPeriods, setReportNumPeriods] = useState<string>(
    periodsQuery || "1"
  );

  const { data, refetch } = useSuspenseQuery({
    queryKey: [
      "balance-sheet",
      {
        date: reportDate,
        periods: reportNumPeriods,
        timeframe: reportTimeframe.toString(),
      },
    ],
    queryFn: ({ queryKey }) => {
      const [_key, { date, periods, timeframe }] = queryKey as [
        string,
        { date: string; periods: string; timeframe: string }
      ];
      return getBalanceSheetData({ date, periods, timeframe });
    },
    initialData: reportData,
  });

  const title = data.report?.ReportTitles[0];
  const orgName = data.report?.ReportTitles[1];
  const asOfDateString = data.report?.ReportDate;

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

  useEffect(() => {
    refetch();
  }, [refetch, reportDate, reportTimeframe, reportNumPeriods]);

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
      <Suspense fallback={<div>Loading new balance sheet data...</div>}>
        {data.report ? (
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
                max={dayjs().format("YYYY-MM-DD")}
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
            <BalanceSheetTable tableRows={data.report.Rows} />
          </>
        ) : (
          <div className="pt-20 text-center text-xl">
            <p>😔</p>
            <p>Cannot find Balance Sheet data.</p>
          </div>
        )}
      </Suspense>
    </main>
  );
}
