import { toast } from "react-toastify";
import { FormEvent, useState } from "react";
import AddAddress from "@/components/common/AddAddress";
import CommonButton from "@/components/common/CommonButton";
import UserProfileHead from "@/components/user/UserProfileHead";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AddressFormProps } from "@/utils/interface/addressInterface";
import DataFetchingError from "@/components/common/DataFetchingError";
import { addUserAddress, fetchUserAddress } from "@/utils/apis/user.api";
import InfoDisplayComponent from "@/components/common/InfoDisplayComponent";
import ShimmerProfileDetails from "@/components/shimmers/ShimmerProfileDetails";

const UserAddressPage = () => {

  const queryClient = useQueryClient();
  const { data, isLoading, isError, error } = useQuery({
    queryFn: fetchUserAddress,
    queryKey: ["UserAddress"],
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const [addAddress, setAddAddress] = useState<boolean>(false);
  const [hasErrors, setHasErrors] = useState<boolean>(false);

  const handleAAddAddress = async (e: FormEvent<HTMLFormElement>, formData: AddressFormProps) => {
    e.preventDefault();
    if (hasErrors) {
      toast.error("Please fix the form errors.");
      return;
    }
    const res = await addUserAddress({ formData });
    toast.success(res.message);
    queryClient.invalidateQueries({ queryKey: ["UserAddress"] });
    setAddAddress(false);
  }

  return (
    <div className="min-h-full border border-[var(--boxBorder)] rounded-lg p-2 flex flex-col">
      <UserProfileHead />
      <div className="w-full mx-auto py-6 rounded-lg flex-grow">
        {data === null && (
          <CommonButton onClick={() => setAddAddress(!addAddress)} text={!addAddress ? "Add Address" : "Close"} />
        )}
        {isError ? (
          <DataFetchingError message={error.message} />
        ) : isLoading ? (
          <ShimmerProfileDetails row={8} />
        ) : addAddress ? (
          <AddAddress onSubmit={handleAAddAddress} formClassNames={"my-4 border rounded-lg py-6"} headingSize={"xs:text-md md:text-xl"} heading={"Lets Add Address"} buttonText={"Submit"} setHasErrors={setHasErrors} />
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

export default UserAddressPage