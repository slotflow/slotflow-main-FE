import { memo } from "react";
import CommonTable from "../common/CommonTable";
import { adminFetchProviderSubscriptions } from "@/utils/apis/adminProvider.api";
import { AdminFetchProviderSubscriptionsResponse } from "@/utils/interface/api/adminProviderApiInterface";
import { AdminFetchProviderSubscriptionsComponentProps } from "@/utils/interface/componentInterface/adminComponentInterface";
import { ProvidersSubscriptionsTableColumns } from "../table/tableColumns/commonTableColumns";

const AdminProviderSubscriptions: React.FC<AdminFetchProviderSubscriptionsComponentProps> = memo(({ providerId }) => {

    return (
        <div className="p-6">
            <CommonTable<AdminFetchProviderSubscriptionsResponse, AdminFetchProviderSubscriptionsResponse>
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