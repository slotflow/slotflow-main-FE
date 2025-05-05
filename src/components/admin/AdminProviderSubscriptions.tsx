import { memo } from "react";
import CommonTable from "../common/CommonTable";
import { adminFetchProviderSubscriptions } from "@/utils/apis/adminProvider.api";
import { ProviderSubscriptionsTableColumns } from "../table/providerTableColumns";
import { ProviderSubscriptionsTableColumnsProps } from "@/utils/interface/tableColumnInterface";
import { AdminFetchProviderSubscriptionsResponseProps } from "@/utils/interface/api/adminProviderApiInterface";

interface AdminFetchProviderSubscriptions {
    providerId: string
}

const AdminProviderSubscriptions: React.FC<AdminFetchProviderSubscriptions> = memo(({ providerId }) => {

    return (
        <div className="p-6">
            <CommonTable<AdminFetchProviderSubscriptionsResponseProps, ProviderSubscriptionsTableColumnsProps>
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