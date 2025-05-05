import { DataTable } from "../table/data-table";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import ShimmerTable from "../shimmers/ShimmerTable";
import DataFetchingError from "./DataFetchingError";
import ShimmerTableTop from "../shimmers/ShimmerTableTop";

interface CommonTableComponentProps<TData, TColumn> {
    fetchApiFunction: () => Promise<TData[]>;
    queryKey: string;
    heading: string;
    column: ColumnDef<TColumn>[];
    columnsCount: number;
}

const CommonTable = <TData extends TColumn, TColumn> ({
    fetchApiFunction,
    queryKey,
    heading,
    column,
    columnsCount,
}: CommonTableComponentProps<TData, TColumn>) => {

    const { data, isLoading, isError, error } = useQuery({
        queryFn: fetchApiFunction,
        queryKey: [queryKey],
        staleTime: 1 * 60 * 1000,
        refetchOnWindowFocus: false,
    });

  return (
    <>
        <h2 className="text-2xl font-bold my-4">{heading}</h2>
        {isLoading ? (
            <>
            <ShimmerTableTop />
            <ShimmerTable columnsCount={columnsCount}/>
            </>
        ) : data ? (
            <DataTable columns={column} data={data} />
        ) : isError ? (
            <DataFetchingError message={error.message} />
        ) : (
            <DataFetchingError message={"No data found"} />
        )}
    </>
  )
}

export default CommonTable