"use client";

import * as React from "react";
import { CaretSortIcon } from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { NFTLink } from "./nft-link";
import { Badge } from "./ui/badge";
import { NFTWithId } from "../types/nft";

export const columns: ColumnDef<NFTWithId>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0 text-lg"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Pool Name
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-lg font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "principal",
    header: () => <div className="text-lg">TVL</div>,
    cell: ({ row }) => {
      return (
        <div className="capitalize flex items-center text-xl gap-2 font-medium">
          {row.getValue("principal")}
        </div>
      );
    },
  },
  {
    accessorKey: "interestRate",
    header: () => <div className="text-lg">APY</div>,
    cell: ({ row }) => (
      <div className="capitalize font-medium text-xl">
        {row.getValue("interestRate")}%
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: () => <div className="text-lg">Status</div>,
    cell: ({ row }) => (
      <div className="capitalize font-medium text-lg">
        <Badge variant={"secondary"}>(row.getValue("status")</Badge>
      </div>
    ),
  },
  {
    accessorKey: "seniorTrancheRatio",
    header: () => <div className="text-lg">Tranches</div>,
    cell: ({ row }) => {
      return (
        <div className="capitalize font-medium text-xl">
          {row.getValue("seniorTrancheRatio")}%
        </div>
      );
    },
  },
  {
    accessorKey: "chainId",
    header: () => <div className="text-lg">Chain</div>,
    cell: ({ row }) => {
      const chainId = Number(row.getValue("chainId"));
      return (
        <div className="capitalize flex items-center gap-2 text-lg font-medium">
          chainId
        </div>
      );
    },
  },
  {
    accessorKey: "id",
    header: "",
    cell: ({ row }) => {
      const id = row.getValue("id") as string;
      return <NFTLink id={id} />;
    },
  },
];

export function NFTTable({ data }: { data: NFTWithId[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageSize: 6,
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="rounded-md">
        <Table>
          <TableHeader className="bg-transparent border-b-transparent">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                className="bg-transparent border-b-transparent"
                key={headerGroup.id}
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      className="bg-transparent border-b-transparent"
                      key={header.id}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
