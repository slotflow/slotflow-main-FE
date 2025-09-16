import CommonTable from "../common/CommonTable";
import { adminFetchProviderPayments } from "@/utils/apis/adminProvider.api";
import { PaymentsTableColumn } from "../table/tableColumns/PaymentsTableColumn";
import { FetchPaymentsResponse } from "@/utils/interface/api/commonApiInterface";
import { AdminFetchProviderPaymentsComponentProps } from "@/utils/interface/componentInterface/adminComponentInterface";

const AdminProviderPayments: React.FC<AdminFetchProviderPaymentsComponentProps> = ({ providerId }) => {

    const column = PaymentsTableColumn();

    return (
        <div className="p-6">
            <CommonTable<FetchPaymentsResponse>
                fetchApiFunction={() => adminFetchProviderPayments({ id: providerId, pagination: { page: 1, limit: 10 } })}
                queryKey="providerPayments"
                column={column}
                columnsCount={7}
                id={providerId}
            />
        </div>
    )
}

export default AdminProviderPayments