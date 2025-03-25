import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/table/data-table";
import { providerColumns } from "@/components/table/columns";
import ShimmerTable from "@/components/shimmers/ShimmerTable";
import { fetchProviders } from "@/utils/apis/adminProvider.api";
import ShimmerTableTop from "@/components/shimmers/ShimmerTableTop";
import DataFetchingError from "@/components/common/DataFetchingError";

const AdminServiceProviders = () => {

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["providers"],
    queryFn: fetchProviders,
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
          <h2 className="text-2xl font-bold mb-4">Service Providers</h2>
          <DataTable columns={providerColumns} data={data} />
        </>
      ) : (
        <DataFetchingError message={"No data found"} />
      )}
    </>
  );
};

export default AdminServiceProviders;
