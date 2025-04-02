import { useQuery } from '@tanstack/react-query';
import { DataTable } from '@/components/table/data-table';
import ShimmerTable from '@/components/shimmers/ShimmerTable';
import ShimmerTableTop from '@/components/shimmers/ShimmerTableTop';
import DataFetchingError from '@/components/common/DataFetchingError';
import { fetchProviderPayments } from '@/utils/apis/provider.api';
import { providerPaymentsColumns } from '@/components/table/columns';

const ProviderPayments = () => {

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["Payments"],
    queryFn: () => fetchProviderPayments(),
  });

  if (!data || data.length === 0) {
    return <DataFetchingError message="No payments found." />;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Payments</h2>
      {isError ? (
        <DataFetchingError message={(error as Error).message} />
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

export default ProviderPayments