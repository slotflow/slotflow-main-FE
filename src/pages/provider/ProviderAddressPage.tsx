// import { useState } from "react";
// import CommonButton from "@/components/common/CommonButton";
import ProfileHead from "@/components/common/profile/ProfileHead";
import UserOrProviderAddressDetails from "@/components/common/profile/UserOrProviderAddressDetails";
import { providerFetchProviderAddress, providerUpdateProviderProfileImage } from "@/utils/apis/provider.api";

const ProviderAddressPage = () => {

  // const [loading, setLoading] = useState<boolean>(false);
  // const [updateAddress, setUpdateAddress] = useState

  return (
    <div className="min-h-full p-2 flex flex-col">
      <ProfileHead
        updateProfileImageApiFunction={providerUpdateProviderProfileImage}
        updation={true}
      />
      <UserOrProviderAddressDetails
        fetchApiFunction={providerFetchProviderAddress}
        queryKey="userAddress"
      />
      {/* <CommonButton
          onClick={() => setAddAddress(!addAddress)}
          text={"Update Address"}
          className="w-2/12 mt-6"
        /> */}
    </div>
  )

}

export default ProviderAddressPage