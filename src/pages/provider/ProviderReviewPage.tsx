import React from 'react';
import ReviewsPage from '../common/ReviewsPage';
import { providerFetchAllReviews } from '@/utils/apis/provider.api';

const ProviderReviewPage: React.FC = () => {
  return (
    <div>
        <ReviewsPage isProvider fetchFun={providerFetchAllReviews} role='PROVIDER' className='p-4' />
    </div>
  )
}

export default ProviderReviewPage