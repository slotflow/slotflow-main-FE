import CommonTable from "../common/CommonTable";
import { adminFetchProviderPayments } from "@/utils/apis/adminProvider.api";
import { ProviderPaymentsTableColumns } from "../table/providerTableColumns";
import { ProviderPaymentsTableColumnsProps } from "@/utils/interface/tableColumnInterface";
import { AdminFetchProviderPaymentsResponseProps } from "@/utils/interface/api/adminProviderApiInterface";

interface AdminFetchProviderPayments {
    providerId : string
}

const AdminProviderPayments: React.FC<AdminFetchProviderPayments> = ({ providerId }) => {

    return (
        <div className="p-6">
            <CommonTable<AdminFetchProviderPaymentsResponseProps, ProviderPaymentsTableColumnsProps>
                fetchApiFunction={() => adminFetchProviderPayments(providerId)}
                queryKey="providerPayments"
                column={ProviderPaymentsTableColumns}
                columnsCount={7}
                id={providerId}
            />
        </div>
    )
}

export default AdminProviderPayments