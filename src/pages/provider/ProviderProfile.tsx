import { formatDate } from "@/utils/helper";
import { useQuery } from "@tanstack/react-query";
import DataFetchingError from "@/components/common/DataFetchingError";
import { fetchProviderProfileDetails } from "@/utils/apis/provider.api";
import InfoDisplayComponent from "@/components/common/InfoDisplayComponent";
import ProviderProfileHead from "@/components/provider/ProviderProfileHead";
import ShimmerProfileDetails from "@/components/shimmers/ShimmerProfileDetails";

const ProviderProfile = () => {

  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => fetchProviderProfileDetails(),
    queryKey: ["ProviderDetails"]
  })

  return (
    <div className="min-h-full border border-[var(--boxBorder)] rounded-lg p-2 flex flex-col">
      <ProviderProfileHead />
      <div className="w-full mx-auto mt-8 py-6 rounded-lg flex-grow">
        {isError ? (
          <DataFetchingError message={error.message} />
        ) : isLoading ? (
          <ShimmerProfileDetails row={7} />
        ) : (
          <table className="table-auto border-collapse border border-[var(--boxBorder)] w-full">
            <tbody>
              <InfoDisplayComponent label="Username" value={data?.username} />
              <InfoDisplayComponent label="Email" value={data?.email} />
              <InfoDisplayComponent label="Phone Number" value={data?.phone || 'Not yet added'} />
              <InfoDisplayComponent label="Joined On" value={data?.createdAt} formatDate={formatDate} />
              <InfoDisplayComponent label="Email Verified" value={data?.isEmailVerified} isBoolean={true} />
              <InfoDisplayComponent label="Account Blocked" value={data?.isBlocked} isBoolean={true} />
              <InfoDisplayComponent label="Admin Verified" value={data?.isAdminVerified} isBoolean={true} />
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default ProviderProfile