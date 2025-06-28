import CommonTable from "../common/CommonTable";
import { adminFetchProviderPayments } from "@/utils/apis/adminProvider.api";
import { ProviderPaymentsTableColumns } from "../table/tableColumns/providerTableColumns";
import { ProviderPaymentsTableColumnsProps } from "@/utils/interface/tableColumnInterface";
import { AdminFetchProviderPaymentsResponse } from "@/utils/interface/api/adminProviderApiInterface";
import { AdminFetchProviderPaymentsComponentProps } from "@/utils/interface/componentInterface/adminComponentInterface";

const AdminProviderPayments: React.FC<AdminFetchProviderPaymentsComponentProps> = ({providerId}) => {

    return (
        <div className="p-6">
            <CommonTable<AdminFetchProviderPaymentsResponse, ProviderPaymentsTableColumnsProps>
                fetchApiFunction={() => adminFetchProviderPayments({id: providerId, pagination : { page: 1, limit: 10}})}
                queryKey="providerPayments"
                column={ProviderPaymentsTableColumns}
                columnsCount={7}
                id={providerId}
            />
        </div>
    )
}

export default AdminProviderPayments