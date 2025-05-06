import CommonTable from '@/components/common/CommonTable';
import { fetchAllPlans } from '@/utils/apis/adminPlan.api';
import PlanForm from '@/components/form/AdminForms/planForm';
import { AdminPlansTableColumns } from '@/components/table/adminTableColumns';
import { AdminPlansTableColumnsProps } from '@/utils/interface/tableColumnInterface';
import { AdminFetchAllPlansResponseProps } from '@/utils/interface/api/adminPlanApiInterface';

const AdminPlans = () => {

    return (
        <>
            <div className='flex'>
                <div className='w-8/12'>
                    <CommonTable<AdminFetchAllPlansResponseProps, AdminPlansTableColumnsProps>
                        fetchApiFunction={fetchAllPlans}
                        queryKey='plans'
                        heading='Plans'
                        column={AdminPlansTableColumns}
                        columnsCount={4}
                    />
                </div>
                <div className='w-4/12 mx-2'>
                    <PlanForm />
                </div>
            </div>
        </>
    )
}

export default AdminPlans