import { DataTable } from "../table/data-table";
import { useQuery } from "@tanstack/react-query";
import ShimmerTable from "../shimmers/ShimmerTable";
import ShimmerTableTop from "../shimmers/ShimmerTableTop";
import DataFetchingError from "../common/DataFetchingError";
import { adminFetchProviderPayments } from "@/utils/apis/adminProvider.api";
import { ProviderPaymentsTableColumns } from "../table/providerTableColumns";
import { AdminFetchProviderPayments } from "@/utils/interface/adminInterface";

const AdminProviderPayments: React.FC<AdminFetchProviderPayments> = ({ _id }) => {

    const { data, isLoading, isError, error } = useQuery({
        queryFn: () => adminFetchProviderPayments(_id),
        queryKey: ["PPayments", _id],
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    })

    return (
        <div className="p-6">
            {isError ? (
                <DataFetchingError message={error.message} />
            ) : isLoading ? (
                <>
                    <ShimmerTableTop />
                    <ShimmerTable />
                </>
            ) : data ? (
                <DataTable columns={ProviderPaymentsTableColumns} data={data} />
            ) : (
                <DataFetchingError message="No data found" />
            )}
        </div>
    )
}

export default AdminProviderPayments