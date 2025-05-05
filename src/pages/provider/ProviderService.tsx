import { fetchProviderServiceDetails } from '@/utils/apis/provider.api';
import ProviderProfileHead from '@/components/provider/ProviderProfileHead';
import ProviderServiceDetails from '@/components/common/profile/ProviderServiceDetails';

const ProviderService = () => {

  return (
    <div className="min-h-full border border-[var(--boxBorder)] rounded-lg p-2 flex flex-col">
      <ProviderProfileHead />
      <ProviderServiceDetails fetchApiFunction={fetchProviderServiceDetails} queryKey="providerService" authUserType="provider" />
    </div>
  )
}

export default ProviderService