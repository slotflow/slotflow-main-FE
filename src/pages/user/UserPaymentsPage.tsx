import CommonTable from "@/components/common/CommonTable";
import { userFetchPayments } from "@/utils/apis/user.api";
import { UserPaymentsTableColumnsProps } from "@/utils/interface/tableColumnInterface";
import { UserFetchPaymentsApiResponse } from "@/utils/interface/api/userApiInterface";
import { UserPaymentsTableColumns } from "@/components/table/tableColumns/userTableColumns";

const UserPaymentsPage = () => {
  return (
    <CommonTable<UserFetchPaymentsApiResponse, UserPaymentsTableColumnsProps>
      fetchApiFunction={userFetchPayments}
      queryKey='payments'
      heading='Payment History'
      column={UserPaymentsTableColumns}
      columnsCount={6}
    />
  )
}

export default UserPaymentsPage