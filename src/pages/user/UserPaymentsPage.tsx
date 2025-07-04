import CommonTable from "@/components/common/CommonTable";
import { userFetchPayments } from "@/utils/apis/user.api";
import { PaymentsTableColumns } from "@/components/table/tableColumns/commonTableColumns";
import { FetchPaymentsResponse } from "@/utils/interface/api/commonApiInterface";

const UserPaymentsPage = () => {
  return (
    <CommonTable<FetchPaymentsResponse, FetchPaymentsResponse>
      fetchApiFunction={userFetchPayments}
      queryKey='payments'
      heading='Payment History'
      column={PaymentsTableColumns}
      columnsCount={6}
    />
  )
}

export default UserPaymentsPage