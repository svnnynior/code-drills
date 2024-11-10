import Table from "@mui/joy/Table";
import {
  BalanceSheetRow,
  BalanceSheetRowType,
} from "./BalanceSheetTable.types";
import { Sheet } from "@mui/joy";

type BalanceSheetTableProps = {
  tableRows: BalanceSheetRow[];
};

export default function BalanceSheetTable({
  tableRows,
}: BalanceSheetTableProps) {
  if (tableRows.length === 0) {
    return <div className="pt-12 text-center text-lg">No data available</div>;
  }
  const headers = tableRows.filter(
    (row) => row.RowType === BalanceSheetRowType.Header
  );
  const sections = tableRows.filter(
    (row) => row.RowType === BalanceSheetRowType.Section
  );
  const maxColumnSpan = headers[0].Cells.length;
  return (
    <Sheet className="p-2 md:p-4">
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
                  <th key={`header-${index}-${cell.Value}`}>{cell.Value}</th>
                ))}
              </tr>
            ))}
          </thead>
        )}
        {sections.map((section, sectionIndex) => {
          return (
            <tbody
              key={`table-section-${sectionIndex}-${section.Title}`}
              id={section.Title}
            >
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
                  {row.Cells.map((cell, cellIndex) => (
                    <td
                      key={`table-${section.Title}-row-${index}-cell-${cellIndex}`}
                    >
                      {cell.Value}
                    </td>
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
