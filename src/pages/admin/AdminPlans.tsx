import { useQuery } from '@tanstack/react-query';
import { DataTable } from '@/components/table/data-table';
import { fetchAllPlans } from '@/utils/apis/adminPlan.api';
import PlanForm from '@/components/form/AdminForms/planForm';
import ShimmerTable from '@/components/shimmers/ShimmerTable';
import ShimmerTableTop from '@/components/shimmers/ShimmerTableTop';
import { AdminPlansTableColumns } from '@/components/table/adminTableColumns';
import DataFetchingError from '@/components/common/DataFetchingError';

const AdminPlans = () => {

    const { data, isLoading, isError, error } = useQuery({
        queryFn: fetchAllPlans,
        queryKey: ["plans"],
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });

    if (isError) return <DataFetchingError message={error.message} />

    return (
        <>
            <h2 className="text-2xl font-bold mb-4">Subscription Plans</h2>
            <div className='flex'>
                <div className='w-8/12'>
                    {isLoading ? (
                        <>
                            <ShimmerTableTop />
                            <ShimmerTable />
                        </>
                    ) : data && data ? (
                        <DataTable columns={AdminPlansTableColumns} data={data} />
                    ) : (
                        <DataFetchingError message={"No data found"} />
                    )}
                </div>
                <div className='w-4/12 mx-2'>
                    <PlanForm />
                </div>
            </div>
        </>
    )
}

export default AdminPlans