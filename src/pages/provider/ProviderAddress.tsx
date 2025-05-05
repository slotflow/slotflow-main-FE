import { fetchProviderAddress } from "@/utils/apis/provider.api";
import ProviderProfileHead from "@/components/provider/ProviderProfileHead";
import UserOrProviderAddressDetails from "@/components/common/profile/UserOrProviderAddressDetails";

const ProviderAddress = () => {

  return (
    <div className="min-h-full border border-[var(--boxBorder)] rounded-lg p-2 flex flex-col">
      <ProviderProfileHead />
      <UserOrProviderAddressDetails fetchApiFunction={fetchProviderAddress} quryKey="userAddress" authUserType="provider" addressUserType="provider" />
    </div>
  )
}

export default ProviderAddress