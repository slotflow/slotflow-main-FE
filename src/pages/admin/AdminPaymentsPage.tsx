import CommonTable from '@/components/common/CommonTable';
import { adminFetchAllPayments } from '@/utils/apis/adminPayment.api';
import { AdminFetchAllPayments } from '@/utils/interface/api/adminPaymentInterfac';
import { AdminAllPaymentsTableColumns } from '@/components/table/tableColumns/adminTableColumns';

const AdminPaymentsPage = () => {

    return (
        <CommonTable<AdminFetchAllPayments, AdminFetchAllPayments>
            fetchApiFunction={adminFetchAllPayments}
            queryKey='payments'
            heading='Payments'
            column={AdminAllPaymentsTableColumns}
            columnsCount={6}
        />
    )
}

export default AdminPaymentsPage
