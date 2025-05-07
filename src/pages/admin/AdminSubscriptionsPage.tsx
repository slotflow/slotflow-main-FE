import CommonTable from '@/components/common/CommonTable';
import { adminFetchAllSubscriptions } from '@/utils/apis/adminSubscription.api';
import { AdminProvidersSubscriptionsTableColumns } from '@/components/table/adminTableColumns';
import { AdminProvidersSubscriptionsTableColumnsProps } from '@/utils/interface/tableColumnInterface';
import { AdminFetchAllSubscriptionsResponseProps } from '@/utils/interface/api/adminSubscription.api';

const AdminSubscriptionsPage = () => {

    return (
        <CommonTable<AdminFetchAllSubscriptionsResponseProps, AdminProvidersSubscriptionsTableColumnsProps>
            fetchApiFunction={adminFetchAllSubscriptions}
            queryKey="subscription"
            heading="Subscription"
            column={AdminProvidersSubscriptionsTableColumns}
            columnsCount={6}
        />
    )
}

export default AdminSubscriptionsPage