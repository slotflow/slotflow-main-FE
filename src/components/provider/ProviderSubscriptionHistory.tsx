import CommonTable from '../common/CommonTable';
import { useCommonHook } from '@/utils/hooks/commonHooks/useCommonActions';
import { providerFetchProviderSubscriptions } from '@/utils/apis/provider.api';
import { FetchProviderSubscriptionsResponse } from '@/utils/interface/api/commonApiInterface';
import { ProvidersSubscriptionsTableColumns } from '../table/tableColumns/ProviderSubscriptionsTableColumn';

const ProviderSubscriptionHistory = () => {

    const {
        handleAdminGetProviderDetailPage
    } = useCommonHook();

    const column = ProvidersSubscriptionsTableColumns(
        handleAdminGetProviderDetailPage
    );

    return (
        <CommonTable<FetchProviderSubscriptionsResponse>
            fetchApiFunction={providerFetchProviderSubscriptions}
            queryKey='subscriptions'
            heading='Subscription History'
            column={column}
            columnsCount={5}
        />
    );
}

export default ProviderSubscriptionHistory