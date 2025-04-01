import { DataTable } from '../table/data-table';
import { useQuery } from '@tanstack/react-query';
import ShimmerTable from '../shimmers/ShimmerTable';
import ShimmerTableTop from '../shimmers/ShimmerTableTop';
import DataFetchingError from '../common/DataFetchingError';
import { providerSubscriptionColumns } from '../table/columns';
import { fetchProviderSubscriptions } from '@/utils/apis/provider.api';

const SubscriptionHistory = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["subscriptions"],
        queryFn: () => fetchProviderSubscriptions(),
    });

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Your Subscription History</h2>
            {isError ? (
                <DataFetchingError message={(error as Error).message} />
            ) : isLoading ? (
                <>
                    <ShimmerTableTop />
                    <ShimmerTable />
                </>
            ) : data ? (
                <DataTable columns={providerSubscriptionColumns} data={data} />
            ) : (
                <DataFetchingError message="No data found" />
            )}
        </div>
    );
}

export default SubscriptionHistory