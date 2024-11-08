import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import React from "react";
import { getBalanceSheetData } from "./server";

type BalanceSheetTableData = {
  name: string;
  stargazers_count: number;
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
    <main>
      <p>This should be the balance sheet page</p>
    </main>
  );
}
