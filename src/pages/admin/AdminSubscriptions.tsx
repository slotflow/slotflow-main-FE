import { useQuery } from '@tanstack/react-query';
import { DataTable } from '@/components/table/data-table';
import ShimmerTable from '@/components/shimmers/ShimmerTable';
import ShimmerTableTop from '@/components/shimmers/ShimmerTableTop';
import DataFetchingError from '@/components/common/DataFetchingError';
import { adminFetchAllSubscriptions } from '@/utils/apis/adminSubscription.api';
import { AdminProvidersSubscriptionsTableColumns } from '@/components/table/adminTableColumns';

const AdminSubscriptions = () => {

    const { data, isLoading, isError, error } = useQuery({
        queryFn: adminFetchAllSubscriptions,
        queryKey: ["subscriptions"],
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });

    if (isError) return <DataFetchingError message={error.message} />

    return (
        <>
            {isLoading ? (
                <>
                    <ShimmerTableTop />
                    <ShimmerTable />
                </>
            ) : data ? (
                <>
                    <h2 className="text-2xl font-bold mb-4">Subscriptions</h2>
                    <DataTable columns={AdminProvidersSubscriptionsTableColumns} data={data} />
                </>
            ) : (
                <DataFetchingError message={"No data found"} />
            )}
        </>
    )
}

export default AdminSubscriptions