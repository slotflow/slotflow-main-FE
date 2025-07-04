import CommonTable from '@/components/common/CommonTable';
import { PaymentsTableColumns } from '@/components/table/tableColumns/commonTableColumns';
import { adminFetchAllPayments } from '@/utils/apis/adminPayment.api';
import { FetchPaymentsResponse } from '@/utils/interface/api/commonApiInterface';


const AdminPaymentsPage = () => {

    return (
        <CommonTable<FetchPaymentsResponse,FetchPaymentsResponse >
            fetchApiFunction={adminFetchAllPayments}
            queryKey='payments'
            heading='Payments'
            column={PaymentsTableColumns}
            columnsCount={6}
        />
    )
}

export default AdminPaymentsPage
