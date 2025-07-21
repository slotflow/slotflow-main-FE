import React from 'react';
import Heading from './Heading';
import { featureContent } from '@/utils/constants';
import { StickyScroll } from '@/components/ui/sticky-scroll-reveal';

const SectionFeatures:React.FC = () => {
  return (
    <section id="features" className="w-full bg-[var(--background)] space-x-2 transition-colors duration-300 ease-in-out">
      <div className='mx-auto max-w-7xl'>
        <Heading heading='Features' headingDescription='Walk through our features' />
        <StickyScroll content={featureContent} />
      </div>
    </section>
  )
}

export default SectionFeatures;




