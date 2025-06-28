import { memo } from "react";
import CommonTable from "../common/CommonTable";
import { adminFetchProviderSubscriptions } from "@/utils/apis/adminProvider.api";
import { ProvidersSubscriptionsTableColumns } from "../table/tableColumns/commonTableColumns";
import { AdminFetchProviderSubscriptionsComponentProps } from "@/utils/interface/componentInterface/adminComponentInterface";
import { FetchProviderSubscriptionsResponse } from "@/utils/interface/api/commonApiInterface";

const AdminProviderSubscriptions: React.FC<AdminFetchProviderSubscriptionsComponentProps> = memo(({ providerId }) => {

    return (
        <div className="p-6">
            <CommonTable<FetchProviderSubscriptionsResponse, FetchProviderSubscriptionsResponse>
                fetchApiFunction={() => adminFetchProviderSubscriptions({id: providerId, pagination : { page: 1, limit: 10}})}
                queryKey="providerSubscription"
                column={ProvidersSubscriptionsTableColumns}
                columnsCount={7}
                id={providerId}
            />
        </div>
    )
})

export default AdminProviderSubscriptions