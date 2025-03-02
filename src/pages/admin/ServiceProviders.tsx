import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/table/data-table";
import { fetchProviders } from "@/utils/redux/adminHanlder";
import { userOrProvidercolumns } from "@/components/table/columns";
import ShimmerTableTop from "@/components/shimmers/ShimmerTableTop";
import ShimmerTable from "@/components/shimmers/ShimmerTable";

const ServiceProviders = () => {

  const { data: providers, isLoading, isError, error } = useQuery({
    queryKey: ["providers"],
    queryFn: fetchProviders,
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
          <h2 className="text-xl font-bold mb-4">Service Providers</h2>
          <DataTable columns={userOrProvidercolumns} data={providers} />
        </>
      }
    </>
  );
};

export default ServiceProviders;
