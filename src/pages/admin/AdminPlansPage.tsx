import CommonTable from '@/components/common/CommonTable';
import PlanForm from '@/components/form/AdminForms/planForm';
import { adminFetchAllPlans } from '@/utils/apis/adminPlan.api';
import { AdminFetchAllPlansResponse } from '@/utils/interface/api/adminPlanApiInterface';
import { AdminPlansTableColumns } from '@/components/table/tableColumns/adminTableColumns';

const AdminPlansPage = () => {

    return (
        <>
            <div className='flex'>
                <div className='w-8/12'>
                    <CommonTable<AdminFetchAllPlansResponse>
                        fetchApiFunction={adminFetchAllPlans}
                        queryKey='plans'
                        heading='Plans'
                        column={AdminPlansTableColumns}
                        columnsCount={4}
                    />
                </div>
                <div className='w-4/12 mx-2 mt-12'>
                    <PlanForm />
                </div>
            </div>
        </>
    )
}

export default AdminPlansPage