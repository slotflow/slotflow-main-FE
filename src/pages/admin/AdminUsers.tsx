import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "@/utils/apis/adminUser.api";
import { DataTable } from "@/components/table/data-table";
import ShimmerTable from "@/components/shimmers/ShimmerTable";
import ShimmerTableTop from "@/components/shimmers/ShimmerTableTop";
import DataFetchingError from "@/components/common/DataFetchingError";
import { userColumns } from "@/components/table/columns";

const AdminUsers = () => {

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  if (isError) return <DataFetchingError message={error.message} />

  return (
    <>
      {isLoading ? (
        <>
          <ShimmerTableTop />
          <ShimmerTable />
        </>
      ) : data ? (
        <>
          <h2 className="text-2xl font-bold mb-4">Users</h2>
          <DataTable columns={userColumns} data={data} />
        </>
      ) : (
        <DataFetchingError message={"No data found"} />
      )}
    </>
  );
};

export default AdminUsers;
