import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "@/utils/apis/adminUser.api";
import { DataTable } from "@/components/table/data-table";
import ShimmerTable from "@/components/shimmers/ShimmerTable";
import { userColumns } from "@/components/table/columns";
import ShimmerTableTop from "@/components/shimmers/ShimmerTableTop";

const AdminUsers = () => {

  const { data: users, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  if (isError) return <div>Error {error.message}</div>

  return (
    <>
    {isLoading ? 
    <>
    <ShimmerTableTop />
    <ShimmerTable />
    </>
    :
    <>
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <DataTable columns={userColumns} data={users} />
    </>
    }
    </>
     
  );
};

export default AdminUsers;
