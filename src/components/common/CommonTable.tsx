import { DataTable } from "../table/data-table";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import TableShimmer from "../shimmers/TableShimmer";
import DataFetchingError from "./DataFetchingError";

interface CommonTableComponentProps<TData, TColumn> {
    fetchApiFunction: (id?: string) => Promise<TData[]>;
    queryKey: string;
    heading?: string;
    headingClassName?: string;
    column: ColumnDef<TColumn>[];
    columnsCount: number;
    id?: string
}

const CommonTable = <TData extends TColumn, TColumn>({
    fetchApiFunction,
    queryKey,
    heading,
    headingClassName,
    column,
    columnsCount,
    id,
}: CommonTableComponentProps<TData, TColumn>) => {

    const { data, isLoading, isError, error } = useQuery({
        queryFn: () => fetchApiFunction(id),
        queryKey: [queryKey],
        staleTime: 1 * 60 * 1000,
        refetchOnWindowFocus: false,
    });

    return (
        <>
            {heading && (
                <h2 className={`text-2xl font-bold ${headingClassName}`}>{heading}</h2>
            )}
            {isLoading ? (
                <div className="mt-2">
                    <TableShimmer columnsCount={columnsCount} />
                </div>
            ) : data ? (

                <DataTable columns={column} data={data} />
            ) : isError ? (
                <DataFetchingError message={error?.message} className="min-h-full" />
            ) : (
                <DataFetchingError message={"No service providers found"} className="min-h-full" />
            )}
        </>
    )
}

export default CommonTable