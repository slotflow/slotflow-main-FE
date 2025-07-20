import React from 'react';
import DevOrBugFixSvg from '@/components/svgs/DevOrBugFixSvg';

const SectionFeatures:React.FC = () => {
  return (
    <div className='h-screen flex justify-center items-cneter'>
        <DevOrBugFixSvg isUnderDev={true} />
    </div>
  )
}

export default SectionFeatures