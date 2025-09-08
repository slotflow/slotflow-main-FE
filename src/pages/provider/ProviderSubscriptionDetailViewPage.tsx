import React from 'react';
import { providerFetchSubscriptionDetails } from '@/utils/apis/provider.api';
import SubscriptionDetailViewPage from '../common/SubscriptionDetailViewPage';

const ProviderSubscriptionDetailViewPage: React.FC = () => {
  return (
    <SubscriptionDetailViewPage queryFunction={providerFetchSubscriptionDetails} />
  )
}

export default ProviderSubscriptionDetailViewPage