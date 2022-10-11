import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

export interface DataTableProps<ITEM extends { _id: string }> {
  data: ITEM[];
  head?: React.ReactNode;
  renderRow: (item: ITEM, index: number) => React.ReactElement;
  columnsNumber: number;
  emptyFallback?: React.ReactNode;
  isFetching?: boolean;
  onRowClick?: (item: ITEM) => void;
}

export const DataTable = <ITEM extends { _id: string }>({
  data,
  emptyFallback,
  isFetching,
  head,
  renderRow,
  columnsNumber,
  onRowClick,
}: DataTableProps<ITEM>): React.ReactElement => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 600 }}>
        <TableHead>
          <TableRow>{head}</TableRow>
        </TableHead>
        <TableBody sx={{ position: "relative" }}>
          {data.length > 0 ? (
            data.map((item, index) => (
              <TableRow
                hover={!!onRowClick}
                key={item._id}
                onClick={() => onRowClick?.(item)}
              >
                {renderRow(item, index)}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell variant="footer" colSpan={columnsNumber}>
                {emptyFallback}
              </TableCell>
            </TableRow>
          )}
          {isFetching && (
            <TableRow
              sx={{
                position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(255, 255, 255, 0.7)",
              }}
            >
              <TableCell
                sx={{
                  display: "block",
                  border: "none",
                  width: "100%",
                  height: "100%",
                }}
              >
                <CircularProgress />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
