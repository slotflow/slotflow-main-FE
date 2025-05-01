import { useQuery } from "@tanstack/react-query";
import { fetchProviderAddress } from "@/utils/apis/provider.api";
import DataFetchingError from "@/components/common/DataFetchingError";
import InfoDisplayComponent from "@/components/common/InfoDisplayComponent";
import ProviderProfileHead from "@/components/provider/ProviderProfileHead";
import ShimmerProfileDetails from "@/components/shimmers/ShimmerProfileDetails";

const ProviderAddress = () => {

  const { data, isLoading, isError, error } = useQuery({
    queryFn: fetchProviderAddress,
    queryKey: ["ProviderAddress"],
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="min-h-full border border-[var(--boxBorder)] rounded-lg p-2 flex flex-col">
      <ProviderProfileHead />
      <div className="w-full mx-auto py-6 rounded-lg flex-grow">
        {isError ? (
          <DataFetchingError message={error.message} />
        ) : isLoading ? (
          <ShimmerProfileDetails row={7} />
        ) : data? (
          <table className="table-auto w-full">
            <tbody>
              <InfoDisplayComponent label="Address Line" value={data?.addressLine} />
              <InfoDisplayComponent label="Place" value={data?.place} />
              <InfoDisplayComponent label="City" value={data?.city} />
              <InfoDisplayComponent label="Phone" value={data?.phone} />
              <InfoDisplayComponent label="State" value={data?.state} />
              <InfoDisplayComponent label="Pincode" value={data?.pincode} />
              <InfoDisplayComponent label="Distrcit" value={data?.district} />
              <InfoDisplayComponent label="Google Map Link" value={data?.googleMapLink} link={true} />
              <InfoDisplayComponent label="Country" value={data?.country} />
            </tbody>
          </table>
        ) : (
          <DataFetchingError message="No address found." />
        )}
      </div>
    </div>
  )
}

export default ProviderAddress