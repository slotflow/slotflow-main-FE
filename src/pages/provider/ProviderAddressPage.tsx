import ProfileHead from "@/components/common/profile/ProfileHead";
import UserOrProviderAddressDetails from "@/components/common/profile/UserOrProviderAddressDetails";
import { providerFetchProviderAddress, providerUpdateProviderProfileImage } from "@/utils/apis/provider.api";

const ProviderAddressPage = () => {

  return (
    <div className="min-h-full border border-[var(--boxBorder)] rounded-lg p-2 flex flex-col">
      <ProfileHead updateProfileImageApiFunction={providerUpdateProviderProfileImage} updation={true} />
      <UserOrProviderAddressDetails fetchApiFunction={providerFetchProviderAddress} quryKey="userAddress" />
    </div>
  )

}

export default ProviderAddressPage