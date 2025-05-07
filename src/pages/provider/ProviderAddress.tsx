import ProfileHead from "@/components/common/profile/ProfileHead";
import { fetchProviderAddress, updateProviderProfileImage } from "@/utils/apis/provider.api";
import UserOrProviderAddressDetails from "@/components/common/profile/UserOrProviderAddressDetails";

const ProviderAddress = () => {

  return (
    <div className="min-h-full border border-[var(--boxBorder)] rounded-lg p-2 flex flex-col">
      <ProfileHead updateProfileImageApiFunction={updateProviderProfileImage} updation={true} />
      <UserOrProviderAddressDetails fetchApiFunction={fetchProviderAddress} quryKey="userAddress" />
    </div>
  )

}

export default ProviderAddress