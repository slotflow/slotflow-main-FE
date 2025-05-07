import CommonTable from "@/components/common/CommonTable";
import { userfetchPayments } from "@/utils/apis/user.api";
import { UserPaymentsTableColumns } from "@/components/table/userTableColumns";
import { UserPaymentsTableColumnsProps } from "@/utils/interface/tableColumnInterface";
import { UserFetchPaymentsResponseProps } from "@/utils/interface/api/userApiInterface";

const UserPaymentsPage = () => {
  return (
    <CommonTable<UserFetchPaymentsResponseProps, UserPaymentsTableColumnsProps>
      fetchApiFunction={userfetchPayments}
      queryKey='payments'
      heading='Payment History'
      column={UserPaymentsTableColumns}
      columnsCount={6}
    />
  )
}

export default UserPaymentsPage