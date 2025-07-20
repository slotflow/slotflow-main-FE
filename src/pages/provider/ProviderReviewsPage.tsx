import DevOrBugFixSvg from '@/components/svgs/DevOrBugFixSvg';
import React from 'react';

const ProviderReviewsPage:React.FC = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <DevOrBugFixSvg isUnderDev={true} />
    </div>
  )
}

export default ProviderReviewsPage