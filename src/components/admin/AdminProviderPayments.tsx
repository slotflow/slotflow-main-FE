import CommonTable from "../common/CommonTable";
import { adminFetchProviderPayments } from "@/utils/apis/adminProvider.api";
import { ProviderPaymentsTableColumns } from "../table/tableColumns/providerTableColumns";
import { ProviderPaymentsTableColumnsProps } from "@/utils/interface/tableColumnInterface";
import { AdminFetchProviderPaymentsApiResponse } from "@/utils/interface/api/adminProviderApiInterface";
import { AdminFetchProviderPaymentsComponentProps } from "@/utils/interface/componentInterface/adminComponentInterface";

const AdminProviderPayments: React.FC<AdminFetchProviderPaymentsComponentProps> = ({providerId}) => {

    return (
        <div className="p-6">
            <CommonTable<AdminFetchProviderPaymentsApiResponse, ProviderPaymentsTableColumnsProps>
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