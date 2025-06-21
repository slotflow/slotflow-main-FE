import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';
import { Error404 } from '@/components/svgs/Error404';
import { gsapBigSvgYDirectionAnimation } from '@/utils/constants';

const Error404Page: React.FC = () => {
  const errorRef = useRef(null);

  useEffect(() => {
    gsap.to(errorRef.current, gsapBigSvgYDirectionAnimation);
  },[]);

  return (
    <div className="flex flex-col items-center justify-center min-h-full">
      <Error404 ref={errorRef}/>
    </div>
  );
};

export default Error404Page;