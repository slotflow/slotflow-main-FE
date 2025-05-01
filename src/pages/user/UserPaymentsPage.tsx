import DataFetchingError from "@/components/common/DataFetchingError";
import ShimmerTable from "@/components/shimmers/ShimmerTable";
import ShimmerTableTop from "@/components/shimmers/ShimmerTableTop";
import { DataTable } from "@/components/table/data-table";
import { UserPaymentsTableColumns } from "@/components/table/userTableColumns";
import { userfetchPayments } from "@/utils/apis/user.api";
import { useQuery } from "@tanstack/react-query";

const UserPaymentsPage = () => {

  const { data, isLoading, isError, error } = useQuery({
    queryFn: userfetchPayments,
    queryKey: ["Payments"],
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Payments</h2>
      {isError ? (
        <DataFetchingError message={(error as Error).message} />
      ) : isLoading ? (
        <>
          <ShimmerTableTop />
          <ShimmerTable />
        </>
      ) : data ? (
        <DataTable columns={UserPaymentsTableColumns} data={data} />
      ) : (
        <DataFetchingError message="No data found" />
      )}
    </div>
  )
}

export default UserPaymentsPage