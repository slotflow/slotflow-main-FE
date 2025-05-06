import CommonTable from '@/components/common/CommonTable';
import { adminFetchAllPayments } from '@/utils/apis/adminPayment.api';
import { AdminAllPaymentsTableColumns } from '@/components/table/adminTableColumns';
import { AdminAllPaymentsTableColumnsProps } from '@/utils/interface/tableColumnInterface';
import { AdminFetchAllPaymentsResponseProps } from '@/utils/interface/api/adminPaymentInterfac';

const AdminPayments = () => {

    return (

        <CommonTable<AdminFetchAllPaymentsResponseProps, AdminAllPaymentsTableColumnsProps>
            fetchApiFunction={adminFetchAllPayments}
            queryKey='payments'
            heading='Payments'
            column={AdminAllPaymentsTableColumns}
            columnsCount={6}
        />
    )
}

export default AdminPayments
