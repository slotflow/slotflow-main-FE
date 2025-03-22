import gsap from 'gsap';
import { Error404 } from '@/components/svgs/Error404';
import React, { useEffect, useRef } from 'react';

const ErrorDisplay: React.FC = () => {
  const errorRef = useRef(null);

  useEffect(() => {
    gsap.to(errorRef.current, {
      y: 20,
      duration: 1,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });
  },[]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Error404 ref={errorRef}/>
    </div>
  );
};

export default ErrorDisplay;