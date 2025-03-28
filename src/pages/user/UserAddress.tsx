import { useQuery } from "@tanstack/react-query";
import UserProfileHead from "@/components/user/UserProfileHead";
import DataFetchingError from "@/components/common/DataFetchingError"
import InfoDisplayComponent from "@/components/common/InfoDisplayComponent";
import ShimmerProfileDetails from "@/components/shimmers/ShimmerProfileDetails";
import { fetchUserAddress } from "@/utils/apis/user.api";

const UserAddress = () => {

  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => fetchUserAddress(),
    queryKey: ["UserAddress"]
});

  return (
    <div className="min-h-full border border-[var(--boxBorder)] rounded-lg p-2 flex flex-col">
     <UserProfileHead />
        <div className="w-full mx-auto mt-8 py-6 rounded-lg flex-grow">
          {isError ? (
            <DataFetchingError message={error.message} />
          ) : isLoading ? (
            <ShimmerProfileDetails row={7} />
          ) : (
            <table className="table-auto w-full">
            <tbody>
            <InfoDisplayComponent label="Address Line" value={data?.addressLine} />
            <InfoDisplayComponent label="Place" value={data?.place} />
            <InfoDisplayComponent label="City" value={data?.city} />
            <InfoDisplayComponent label="Phone" value={data?.phone} />
            <InfoDisplayComponent label="State" value={data?.state} />
            <InfoDisplayComponent label="Pincode" value={data?.pincode} />
            <InfoDisplayComponent label="Distrcit" value={data?.district} />
            <InfoDisplayComponent label="Google Map Link" value={data?.googleMapLink} link={true}/>
            <InfoDisplayComponent label="Country" value={data?.country} />
            </tbody>
          </table>
          )}
        </div>
    </div>
  )
}

export default UserAddress