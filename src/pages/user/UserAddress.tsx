import { useQuery } from "@tanstack/react-query";
import { fetchUserAddress } from "@/utils/apis/user.api";
import CommonButton from "@/components/common/CommonButton";
import UserProfileHead from "@/components/user/UserProfileHead";
import DataFetchingError from "@/components/common/DataFetchingError";
import InfoDisplayComponent from "@/components/common/InfoDisplayComponent";
import ShimmerProfileDetails from "@/components/shimmers/ShimmerProfileDetails";
import { useState } from "react";
import AddAddress from "@/components/common/AddAddress";

const UserAddress = () => {

  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => fetchUserAddress(),
    queryKey: ["UserAddress"]
  });

  const [addAddress, setAddAddress] = useState<boolean>(false);
  const [hasErrors, setHasErrors] = useState<boolean>(false);

  const handleAAddAddress = () => {
    console.log(hasErrors);
  }



  return (
    <div className="min-h-full border border-[var(--boxBorder)] rounded-lg p-2 flex flex-col">
      <UserProfileHead />
      <div className="w-full mx-auto mt-8 py-6 rounded-lg flex-grow">
        {data === null && (
          <CommonButton onClick={() => setAddAddress(!addAddress)} text={"Add Address"}/>
        )}
        {isError ? (
          <DataFetchingError message={error.message} />
        ) : isLoading ? (
          <ShimmerProfileDetails row={8} />
        ) : addAddress ? (
          <AddAddress onSubmit={handleAAddAddress} formClassNames={"my-4 border rounded-lg py-6"} headingSize={"xs:text-md md:text-xl"} heading={"Lets Add Address"} buttonText={"Submit"} setHasErrors={setHasErrors}/>
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
              <InfoDisplayComponent label="Google Map Link" value={data?.googleMapLink} link={true} />
              <InfoDisplayComponent label="Country" value={data?.country} />
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default UserAddress