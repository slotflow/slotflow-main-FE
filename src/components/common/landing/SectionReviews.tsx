import React from 'react';
import DevOrBugFixSvg from '@/components/svgs/DevOrBugFixSvg';

const SectionReviews:React.FC = () => {
  return (
    <div className="h-screen flex justify-center items-center">
        <DevOrBugFixSvg isUnderDev={true} />
    </div>
  )
}

export default SectionReviews