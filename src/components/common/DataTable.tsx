import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps {
  columns: { key: string; label: string; render?: (val: any, row: any) => React.ReactNode }[];
  data: any[];
  onRowClick?: (row: any) => void;
}

export const DataTable = ({ columns, data, onRowClick }: DataTableProps) => {
  return (
    <div className="border border-surface-3 rounded-xl bg-surface overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
        <TableHeader className="bg-surface-2">
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col.key} className="font-semibold text-text-secondary whitespace-nowrap">
                {col.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center text-text-muted">
                No data available.
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, i) => (
              <TableRow 
                key={row.id || i} 
                className={onRowClick ? "cursor-pointer hover:bg-surface-2 transition-colors" : ""}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((col) => (
                  <TableCell key={col.key} className="py-4">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  </div>
  );
};
