import { useQuery } from '@tanstack/react-query';
import { DataTable } from '@/components/table/data-table';
import ShimmerTable from '@/components/shimmers/ShimmerTable';
import ShimmerTableTop from '@/components/shimmers/ShimmerTableTop';
import { fetchPlans } from '@/utils/apis/adminPlan.api';
import PlanForm from '@/components/form/AdminForms/planForm';
import { planColumns } from '@/components/table/columns';

const AdminPlans = () => {

    const { data: plans, isLoading, isError, error } = useQuery({
        queryKey: ["plans"],
        queryFn: fetchPlans,
    });

    if (isError) return <div>Error {error.message}</div>

    return (
        <>
            <h2 className="text-2xl font-bold mb-4">Subscription Plans</h2>
            <div className='flex'>
                <div className='w-8/12'>
                    {isLoading ?
                        <>
                            <ShimmerTableTop />
                            <ShimmerTable />
                        </>
                        :
                        <DataTable columns={planColumns} data={plans} />
                    }
                </div>
                <div className='w-4/12 mx-2'>
                    <PlanForm />
                </div>
            </div>
        </>
    )
}

export default AdminPlans