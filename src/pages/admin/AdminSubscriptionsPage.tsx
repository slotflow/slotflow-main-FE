import CommonTable from '@/components/common/CommonTable';
import { adminFetchAllSubscriptions } from '@/utils/apis/adminSubscription.api';
import { AdminFetchAllSubscriptionsApiResponse } from '@/utils/interface/api/adminSubscription.interface';
import { AdminProvidersSubscriptionsTableColumnsProps } from '@/utils/interface/tableColumnInterface';
import { AdminProvidersSubscriptionsTableColumns } from '@/components/table/tableColumns/adminTableColumns';

const AdminSubscriptionsPage = () => {

    return (
        <CommonTable<AdminFetchAllSubscriptionsApiResponse, AdminProvidersSubscriptionsTableColumnsProps>
            fetchApiFunction={adminFetchAllSubscriptions}
            queryKey="subscription"
            heading="Subscription"
            column={AdminProvidersSubscriptionsTableColumns}
            columnsCount={6}
        />
    )
}

export default AdminSubscriptionsPage