import { toast } from "react-toastify";
import { FormEvent, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import CommonButton from "@/components/common/CommonButton";
import ProfileHead from "@/components/common/profile/ProfileHead";
import AddAddress, { AddressFormProps } from "@/components/common/AddAddress";
import UserOrProviderAddressDetails from "@/components/common/profile/UserOrProviderAddressDetails";
import { userAddUserAddress, userFetchUserAddress, userUpdateUserProfileImage } from "@/utils/apis/user.api";

const UserAddressPage = () => {

  const queryClient = useQueryClient();
  const [hasErrors, setHasErrors] = useState<boolean>(false);
  const [addAddress, setAddAddress] = useState<boolean>(false);
  const [showAddAddressBtn, setShowAddAddressBtn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleAAddAddress = async (e: FormEvent<HTMLFormElement>, formData: AddressFormProps) => {
    e.preventDefault();
    if (hasErrors) {
      toast.error("Please fix the form errors.");
      return;
    }
    const res = await userAddUserAddress({ formData });
    toast.success(res.message);
    queryClient.invalidateQueries({ queryKey: ["UserAddress"] });
    setAddAddress(false);
  }

  return (
    <div className="min-h-full border border-[var(--boxBorder)] rounded-lg p-2 flex flex-col">
      <ProfileHead updateProfileImageApiFunction={userUpdateUserProfileImage} updation={true} />
        {showAddAddressBtn && !loading && (
          <CommonButton onClick={() => setAddAddress(!addAddress)} text={!addAddress ? "Add Address" : "Close"} className="w-3/12 mt-6"/>
        )}
        {addAddress ? (
          <AddAddress onSubmit={handleAAddAddress} formClassNames={"my-4 border rounded-lg py-6"} headingSize={"xs:text-md md:text-xl"} heading={"Lets Add Address"} buttonText={"Submit"} setHasErrors={setHasErrors} />
        ) : (
          <UserOrProviderAddressDetails fetchApiFunction={userFetchUserAddress} quryKey="userAddress" isUser setShowAddAddressBtn={setShowAddAddressBtn} setLoading={setLoading}/>
        )}
    </div>
  )

}

export default UserAddressPage