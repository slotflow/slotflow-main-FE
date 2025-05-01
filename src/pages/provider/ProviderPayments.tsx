import { useQuery } from '@tanstack/react-query';
import { DataTable } from '@/components/table/data-table';
import ShimmerTable from '@/components/shimmers/ShimmerTable';
import { fetchProviderPayments } from '@/utils/apis/provider.api';
import ShimmerTableTop from '@/components/shimmers/ShimmerTableTop';
import DataFetchingError from '@/components/common/DataFetchingError';
import { ProviderPaymentsTableColumns } from '@/components/table/providerTableColumns';

const ProviderPayments = () => {

  const { data, isLoading, isError, error } = useQuery({
    queryFn: fetchProviderPayments,
    queryKey: ["Payments"],
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

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
        <DataTable columns={ProviderPaymentsTableColumns} data={data} />
      ) : (
        <DataFetchingError message="No data found" />
      )}
    </div>
  )
}

export default ProviderPayments