import CommonTable from "../common/CommonTable";
import { PaymentsTableColumn } from "../table/tableColumns/PaymentsTableColumn";
import { FetchPaymentsResponse } from "@/utils/interface/api/commonApiInterface";
import { AdminFetchProviderPaymentsComponentProps } from "@/utils/interface/componentInterface/adminComponentInterface";

const AdminUserOrProviderPayments: React.FC<AdminFetchProviderPaymentsComponentProps> = ({
    id,
    fethFunction
}) => {

    const column = PaymentsTableColumn();

    return (
        <div className="p-6">
            <CommonTable<FetchPaymentsResponse>
                fetchApiFunction={() => fethFunction({ id, pagination: { page: 1, limit: 10 } })}
                queryKey="providerPayments"
                column={column}
                columnsCount={7}
                id={id}
            />
        </div>
    )
}

export default AdminUserOrProviderPayments;