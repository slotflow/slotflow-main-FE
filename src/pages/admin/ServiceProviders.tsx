import { useQuery } from "@tanstack/react-query";
import { fetchProviders } from "@/utils/apis/admin.api";
import { DataTable } from "@/components/table/data-table";
import { providerColumns } from "@/components/table/columns";
import ShimmerTable from "@/components/shimmers/ShimmerTable";
import ShimmerTableTop from "@/components/shimmers/ShimmerTableTop";

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
          <h2 className="text-2xl font-bold mb-4">Service Providers</h2>
          <DataTable columns={providerColumns} data={providers} />
        </>
      }
    </>
  );
};

export default ServiceProviders;
