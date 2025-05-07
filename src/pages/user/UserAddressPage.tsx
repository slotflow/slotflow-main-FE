import { toast } from "react-toastify";
import { FormEvent, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import AddAddress from "@/components/common/AddAddress";
import CommonButton from "@/components/common/CommonButton";
import ProfileHead from "@/components/common/profile/ProfileHead";
import { AddressFormProps } from "@/utils/interface/addressInterface";
import { addUserAddress, fetchUserAddress, updateUserProfileImage } from "@/utils/apis/user.api";
import UserOrProviderAddressDetails from "@/components/common/profile/UserOrProviderAddressDetails";

const UserAddressPage = () => {

  const queryClient = useQueryClient();
  const [hasErrors, setHasErrors] = useState<boolean>(false);
  const [addAddress, setAddAddress] = useState<boolean>(false);
  const [showAddAddressBtn, setShowAddAddressBtn] = useState<boolean>(false);

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
      <ProfileHead updateProfileImageApiFunction={updateUserProfileImage} updation={true} />
        {showAddAddressBtn && (
          <CommonButton onClick={() => setAddAddress(!addAddress)} text={!addAddress ? "Add Address" : "Close"} className="w-3/12 mt-6"/>
        )}
        {addAddress ? (
          <AddAddress onSubmit={handleAAddAddress} formClassNames={"my-4 border rounded-lg py-6"} headingSize={"xs:text-md md:text-xl"} heading={"Lets Add Address"} buttonText={"Submit"} setHasErrors={setHasErrors} />
        ) : (
          <UserOrProviderAddressDetails fetchApiFunction={fetchUserAddress} quryKey="userAddress" isUser setShowAddAddressBtn={setShowAddAddressBtn} />
        )}
    </div>
  )

}

export default UserAddressPage