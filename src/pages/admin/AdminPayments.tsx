import { useQuery } from '@tanstack/react-query';
import { DataTable } from '@/components/table/data-table';
import ShimmerTable from '@/components/shimmers/ShimmerTable';
import ShimmerTableTop from '@/components/shimmers/ShimmerTableTop';
import DataFetchingError from '@/components/common/DataFetchingError';
import { adminFetchAllPayments } from '@/utils/apis/adminPayment.api';
import { AdminAllPaymentsTableColumns } from '@/components/table/adminTableColumns';

const AdminPayments = () => {

    const { data, isLoading, isError, error } = useQuery({
        queryFn: adminFetchAllPayments,
        queryKey: ["payments"],
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
                    <h2 className="text-2xl font-bold mb-4">Payments</h2>
                    <DataTable columns={AdminAllPaymentsTableColumns} data={data} />
                </>
            ) : (
                <DataFetchingError message={"No payments data found"} />
            )}
        </>
    )
}

export default AdminPayments
