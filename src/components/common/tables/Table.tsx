// import cx from 'clsx';
import { Checkbox, Pagination, rem, Table } from "@mantine/core";
import SortableTH from "./SortableTH";
import EmptyView from "../EmptyView";

export interface RowContext<T = any> {
  selected: boolean;
  value: string;
  row: T;
  rows: T[];
}

export interface Column<T = any> {
  /**
   * Header title of the column
   */
  title: string;
  /**
   * key in the row data object
   */
  key: string;
  /**
   * Accessor function to get the value of the cell
   */
  getValue?: (row: T) => string;
  /**
   * Whether the column can be sorted or not
   */
  sortable?: boolean;
  align?: "left" | "center" | "right";
  /**
   * Custom element to be rendered in the cell
   */
  Element?: (rowContext: RowContext<T>) => React.ReactNode;
  /**
   * for date columns, whether the date is filterable or not
   * @default false
   */
  isFilterableDate?: boolean;
}

interface CustomTableProps {
  className?: string;
  columns: Column[];
  data: any[];
  selection: string[];
  setSelection: React.Dispatch<React.SetStateAction<string[]>>;
  sortedData: any[];
  sortBy: string | null;
  reverseSortDirection: boolean;
  onSort: (sortBy: string) => void;
  pageSize?: number;
  page?: number;
  setPage?: React.Dispatch<React.SetStateAction<number>>;
  errorFetching?: boolean;
  loading?: boolean;
  dateRange?: [Date | null, Date | null];
}

export function CustomTable({
  columns,
  data,
  selection,
  setSelection,
  sortedData,
  sortBy,
  reverseSortDirection,
  onSort,
  pageSize,
  page = 1,
  setPage = () => {},
  errorFetching = false,
  loading,
  dateRange,
}: CustomTableProps) {
  const toggleRow = (id: string) =>
    setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  const toggleAll = () =>
    setSelection((current) =>
      current.length === data.length ? [] : data.map((item) => item.id)
    );
  const rows =
    sortedData.length === 0
      ? []
      : sortedData
          ?.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize)
          .map((item: any, item_index: number) => {
            return (
              <Table.Tr role="data-rows" key={item_index} className={""}>
                <Table.Td>
                  <Checkbox
                    checked={selection.includes(item.id)}
                    onChange={() => toggleRow(item.id)}
                  />
                </Table.Td>
                {columns.map((column, i: number) => {
                  return (
                    <Table.Td
                      data-test-id={item[column.key]}
                      key={i}
                      align={column.align}
                    >
                      {column.Element ? (
                        <column.Element
                          {...{
                            selected: selection.includes(item.id),
                            row: item,
                            rows: data,
                            value: item[column.key],
                          }}
                        />
                      ) : (
                        String(item[column.key])
                      )}
                    </Table.Td>
                  );
                })}
              </Table.Tr>
            );
          });

  return (
    <div className="overflow-x-auto mt-2 rounded-t-md">
      <Table miw={800} verticalSpacing="sm" striped={"even"}>
        <Table.Thead>
          <Table.Tr className=" text-[1rem] bg-gray-100 text-white border ">
            <Table.Th style={{ width: rem(40) }}>
              <Checkbox
                onChange={toggleAll}
                checked={selection.length === data.length}
                indeterminate={
                  selection.length > 0 && selection.length !== data.length
                }
              />
            </Table.Th>
            {columns.map((column, i: number) => {
              return (
                <SortableTH
                  className="whitespace-nowrap"
                  key={i}
                  {...(column.sortable && {
                    onSort: onSort.bind(null, column.key),
                    sorted: sortBy === column.key,
                    reversed: reverseSortDirection,
                  })}
                >
                  {column.title}
                </SortableTH>
              );
            })}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {rows.length ? (
            rows
          ) : !loading ? (
            <Table.Tr>
              <Table.Td colSpan={columns.length + 1}>
                {/* <div className="text-center text-gray-400">
                           {errorFetching ? 'Error Fetching Data' : 'No Data To Show'}
                        </div> */}
                <EmptyView
                  message={
                    errorFetching ? "Error Fetching Data" : "No Data To Show"
                  }
                />
              </Table.Td>
            </Table.Tr>
          ) : null}
        </Table.Tbody>
      </Table>
      <div className="flex justify-center items-center mt-3">
        <Pagination
          total={Math.ceil(sortedData.length / pageSize)}
          value={page}
          onChange={setPage}
          color="#0b7ff3"
        />
      </div>
    </div>
  );
}
