import CommonTable from '@/components/common/CommonTable';
import { adminFetchAllPayments } from '@/utils/apis/adminPayment.api';
import { AdminFetchAllPaymentsResponse } from '@/utils/interface/api/adminPaymentInterfac';
import { AdminAllPaymentsTableColumns } from '@/components/table/tableColumns/adminTableColumns';

const AdminPaymentsPage = () => {

    return (
        <CommonTable<AdminFetchAllPaymentsResponse, AdminFetchAllPaymentsResponse>
            fetchApiFunction={adminFetchAllPayments}
            queryKey='payments'
            heading='Payments'
            column={AdminAllPaymentsTableColumns}
            columnsCount={6}
        />
    )
}

export default AdminPaymentsPage
