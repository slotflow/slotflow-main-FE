import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "@/utils/redux/adminHanlder";
import { DataTable } from "@/components/table/data-table";
import ShimmerTable from "@/components/shimmers/ShimmerTable";
import { userOrProvidercolumns } from "@/components/table/columns";
import ShimmerTableTop from "@/components/shimmers/ShimmerTableTop";

const Users = () => {

  const { data: users, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  if (isError) return <div>Error {error.message}</div>

  console.log("users : ",users)

  return (
    <>
    {isLoading ? 
    <>
    <ShimmerTableTop />
    <ShimmerTable />
    </>
    :
    <>
      <h2 className="text-xl font-bold mb-4">Users</h2>
      <DataTable columns={userOrProvidercolumns} data={users} />
    </>
    }
    </>
     
  );
};

export default Users;
