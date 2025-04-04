import { memo } from "react";
import { DataTable } from "../table/data-table";
import { useQuery } from "@tanstack/react-query";
import ShimmerTable from "../shimmers/ShimmerTable";
import ShimmerTableTop from "../shimmers/ShimmerTableTop";
import DataFetchingError from "../common/DataFetchingError";
import { ProviderSubscriptionSTableColumns } from "../table/columns";
import { adminFetchProviderSubscriptions } from "@/utils/apis/adminProvider.api";
import { AdminFetchProviderSubscriptions } from "@/utils/interface/adminInterface";


const AdminProviderSubscriptions: React.FC<AdminFetchProviderSubscriptions> = memo(({ _id }) => {

    const { data, isLoading, isError, error } = useQuery({
        queryFn: () => adminFetchProviderSubscriptions(_id),
        queryKey: ["PSubscriptions", _id]
    })

    return (
        <div className="p-6">
            {isError ? (
                <DataFetchingError message={(error as Error).message} />
            ) : isLoading ? (
                <>
                    <ShimmerTableTop />
                    <ShimmerTable />
                </>
            ) : data ? (
                <DataTable columns={ProviderSubscriptionSTableColumns} data={data} />
            ) : (
                <DataFetchingError message="No data found" />
            )}
        </div>
    )
})

export default AdminProviderSubscriptions