import { useQuery } from "@tanstack/react-query";
import InfoDisplayComponent from "../common/InfoDisplayComponent";
import DataFetchingError from "../common/DataFetchingError";
import ShimmerProfileDetails from "../shimmers/ShimmerProfileDetails";
import { formatDate } from "@/utils/helper";
import { fetchProviderProfileDetails } from "@/utils/apis/provider.api";

interface ProviderProfileDetailsProps {
    onError: (hasError: boolean) => void;
}

const ProviderDetails: React.FC<ProviderProfileDetailsProps> = ({ onError }) => {

  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => fetchProviderProfileDetails(),
    queryKey: ["ProviderDetails"]
  })

  if (isError) {
    onError(true);
    return (
      <DataFetchingError message={error.message} />
    )
  }

  if (isLoading) {
    return (
      <div className="w-full mx-auto mt-8 md:flex justify-start flex-grow bg">
        <ShimmerProfileDetails row={7} />
      </div>
    )
  }

  return (
    <div className="w-full mx-auto mt-8 p-6 rounded-lg">
      <table className="table-auto border-collapse border border-[var(--boxBorder)] w-full">
        <tbody>
          <InfoDisplayComponent label="Username" value={data?.username} />
          <InfoDisplayComponent label="Email" value={data?.email}  />
          <InfoDisplayComponent label="Phone Number" value={data?.phone || 'Not yet added'}  />
          <InfoDisplayComponent label="Joined On" value={data?.createdAt} formatDate={formatDate} />
          <InfoDisplayComponent label="Email Verified" value={data?.isEmailVerified} isBoolean={true} />
          <InfoDisplayComponent label="Account Blocked" value={data?.isBlocked} isBoolean={true} />
          <InfoDisplayComponent label="Admin Verified" value={data?.isAdminVerified} isBoolean={true} />
        </tbody>
      </table>
    </div>
  )
}

export default ProviderDetails