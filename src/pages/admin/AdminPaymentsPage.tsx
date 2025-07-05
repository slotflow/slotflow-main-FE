import CommonTable from '@/components/common/CommonTable';
import { adminFetchAllPayments } from '@/utils/apis/adminPayment.api';
import { FetchPaymentsResponse } from '@/utils/interface/api/commonApiInterface';
import { PaymentsTableColumns } from '@/components/table/tableColumns/commonTableColumns';


const AdminPaymentsPage = () => {

    return (
        <CommonTable<FetchPaymentsResponse>
            fetchApiFunction={adminFetchAllPayments}
            queryKey='payments'
            heading='Payments'
            column={PaymentsTableColumns}
            columnsCount={6}
        />
    )
}

export default AdminPaymentsPage
