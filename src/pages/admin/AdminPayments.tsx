import { useQuery } from '@tanstack/react-query';
import { DataTable } from '@/components/table/data-table';
import ShimmerTable from '@/components/shimmers/ShimmerTable';
import ShimmerTableTop from '@/components/shimmers/ShimmerTableTop';
import DataFetchingError from '@/components/common/DataFetchingError';
import { adminFetchAllPayments } from '@/utils/apis/adminPayment.api';
import { AdminPaymentsTableColumn } from '@/components/table/columns';

const AdminPayments = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["payments"],
        queryFn: adminFetchAllPayments,
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
                    <DataTable columns={AdminPaymentsTableColumn} data={data} />
                </>
            ) : (
                <DataFetchingError message={"No data found"} />
            )}
        </>
    )
}

export default AdminPayments
