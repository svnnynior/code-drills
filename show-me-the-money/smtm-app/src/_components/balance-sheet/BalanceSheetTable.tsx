import Table from "@mui/joy/Table";
import {
  BalanceSheetRow,
  BalanceSheetRowType,
} from "./BalanceSheetTable.types";
import { Sheet } from "@mui/joy";

type BalanceSheetTableProps = {
  title: string;
  orgName: string;
  asOfDateString: string;
  rows: BalanceSheetRow[];
};

export default function BalanceSheetTable({
  title,
  orgName,
  asOfDateString,
  rows,
}: BalanceSheetTableProps) {
  const headers = rows.filter(
    (row) => row.RowType === BalanceSheetRowType.Header
  );
  const sections = rows.filter(
    (row) => row.RowType === BalanceSheetRowType.Section
  );
  const maxColumnSpan = headers[0].Cells.length;
  return (
    <Sheet className="p-4">
      <h1 className="text-4xl font-bold">{title}</h1>
      <h2 className="text-2xl">{orgName}</h2>
      <p className="text-base">As at {asOfDateString}</p>
      <Table
        className="pt-4"
        aria-label="balance sheet table"
        borderAxis="bothBetween"
      >
        {headers && (
          <thead>
            {headers.map((header, index) => (
              <tr key={index}>
                {header.Cells.map((cell) => (
                  <th key={cell.Value}>{cell.Value}</th>
                ))}
              </tr>
            ))}
          </thead>
        )}
        {sections.map((section) => {
          return (
            <tbody key={section.Title} id={section.Title}>
              {section.Title && (
                <tr className="h-16">
                  <th
                    scope="row"
                    colSpan={maxColumnSpan}
                    className={
                      section.Rows.length === 0
                        ? "text-xl font-bold italic underline"
                        : "text-lg font-bold"
                    }
                  >
                    {section.Title}
                  </th>
                </tr>
              )}
              {section.Rows.map((row, index) => (
                <tr
                  title={`table-${section.Title}-row-${index}`}
                  key={`${section.Title}-${index}`}
                  className={
                    row.RowType === BalanceSheetRowType.SummaryRow
                      ? "bg-neutral-800 underline"
                      : ""
                  }
                >
                  {row.Cells.map((cell) => (
                    <td key={cell.Value}>{cell.Value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          );
        })}
      </Table>
    </Sheet>
  );
}
