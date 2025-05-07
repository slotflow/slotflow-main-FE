import ProfileHead from "@/components/common/profile/ProfileHead";
import { fetchProviderProfileDetails, updateProviderProfileImage } from "@/utils/apis/provider.api";
import UserOrProviderProfileDetails from "@/components/common/profile/UserOrProviderProfileDetails";

const ProviderProfile = () => {

  return (
    <div className="min-h-full border border-[var(--boxBorder)] rounded-lg p-2 flex flex-col">
      <ProfileHead updateProfileImageApiFunction={updateProviderProfileImage} updation={true} />
      <UserOrProviderProfileDetails fetchApiFunction={fetchProviderProfileDetails} queryKey="profileDetails" providerSelf shimmerRow={8} />
    </div>
  )
  
}

export default ProviderProfile