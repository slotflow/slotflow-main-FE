import CommonTable from '@/components/common/CommonTable';
import { adminFetchAllSubscriptions } from '@/utils/apis/adminSubscription.api';
import { FetchProviderSubscriptionsResponse } from '@/utils/interface/api/commonApiInterface';
import { ProvidersSubscriptionsTableColumns } from '@/components/table/tableColumns/commonTableColumns';

const AdminSubscriptionsPage = () => {

    return (
        <CommonTable<FetchProviderSubscriptionsResponse>
            fetchApiFunction={adminFetchAllSubscriptions}
            queryKey="subscriptions"
            heading="Subscriptions"
            column={ProvidersSubscriptionsTableColumns}
            columnsCount={6}
        />
    )
}

export default AdminSubscriptionsPage