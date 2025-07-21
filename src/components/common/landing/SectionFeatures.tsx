import React from 'react';
import DevOrBugFixSvg from '@/components/svgs/DevOrBugFixSvg';

const SectionFeatures:React.FC = () => {
  return (
    <section id="features" className='h-screen flex justify-center items-cneter'>
        <DevOrBugFixSvg isUnderDev={true} />
    </section>
  )
}

export default SectionFeatures