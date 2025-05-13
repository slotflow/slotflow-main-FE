import { memo } from "react";
import CommonTable from "../common/CommonTable";
import { adminFetchProviderSubscriptions } from "@/utils/apis/adminProvider.api";
import { ProviderSubscriptionsTableColumns } from "../table/tableColumns/providerTableColumns";
import { ProviderSubscriptionsTableColumnsProps } from "@/utils/interface/tableColumnInterface";
import { AdminFetchProviderSubscriptionsApiResponse } from "@/utils/interface/api/adminProviderApiInterface";
import { AdminFetchProviderSubscriptionsComponentProps } from "@/utils/interface/componentInterface/adminComponentInterface";

const AdminProviderSubscriptions: React.FC<AdminFetchProviderSubscriptionsComponentProps> = memo(({ providerId }) => {

    return (
        <div className="p-6">
            <CommonTable<AdminFetchProviderSubscriptionsApiResponse, ProviderSubscriptionsTableColumnsProps>
                fetchApiFunction={() => adminFetchProviderSubscriptions(providerId)}
                queryKey="providerSubscription"
                column={ProviderSubscriptionsTableColumns}
                columnsCount={7}
                id={providerId}
            />
        </div>
    )
})

export default AdminProviderSubscriptions