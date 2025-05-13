import CommonTable from '@/components/common/CommonTable';
import { adminFetchAllPayments } from '@/utils/apis/adminPayment.api';
import { AdminAllPaymentsTableColumnsProps } from '@/utils/interface/tableColumnInterface';
import { AdminFetchAllPaymentsApiResponse } from '@/utils/interface/api/adminPaymentInterfac';
import { AdminAllPaymentsTableColumns } from '@/components/table/tableColumns/adminTableColumns';

const AdminPaymentsPage = () => {

    return (
        <CommonTable<AdminFetchAllPaymentsApiResponse, AdminAllPaymentsTableColumnsProps>
            fetchApiFunction={adminFetchAllPayments}
            queryKey='payments'
            heading='Payments'
            column={AdminAllPaymentsTableColumns}
            columnsCount={6}
        />
    )
}

export default AdminPaymentsPage
