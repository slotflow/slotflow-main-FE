import { fetchProviderProfileDetails } from "@/utils/apis/provider.api";
import ProviderProfileHead from "@/components/provider/ProviderProfileHead";
import UserOrProviderProfileDetails from "@/components/common/profile/UserOrProviderProfileDetails";

const ProviderProfile = () => {

  return (
    <div className="min-h-full border border-[var(--boxBorder)] rounded-lg p-2 flex flex-col">
      <ProviderProfileHead />
      <UserOrProviderProfileDetails fetchApiFunction={fetchProviderProfileDetails} authUserType='provider' profileuUserType='provider'/>
    </div>
  )
}

export default ProviderProfile