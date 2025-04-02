import { DataTable } from "../table/data-table";
import { useQuery } from "@tanstack/react-query";
import ShimmerTable from "../shimmers/ShimmerTable";
import ShimmerTableTop from "../shimmers/ShimmerTableTop";
import { providerPaymentsColumns } from "../table/columns";
import DataFetchingError from "../common/DataFetchingError";
import { adminFetchProviderPayments } from "@/utils/apis/adminProvider.api";
import { AdminFetchProviderPayments } from "@/utils/interface/adminInterface";

const AdminProviderPayments: React.FC<AdminFetchProviderPayments> = ({ _id }) => {

    const { data, isLoading, isError, error } = useQuery({
        queryFn: () => adminFetchProviderPayments(_id),
        queryKey: ["PPayments", _id]
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
                <DataTable columns={providerPaymentsColumns} data={data} />
            ) : (
                <DataFetchingError message="No data found" />
            )}
        </div>
    )
}

export default AdminProviderPayments