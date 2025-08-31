import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useRef } from 'react';
import Error404 from '@/components/svgs/Error404';
import CommonButton from '@/components/common/CommonButton';
import { gsapBigSvgYDirectionAnimation } from '@/utils/constants';

const Error404Page: React.FC = () => {

  const errorRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    gsap.to(errorRef.current, gsapBigSvgYDirectionAnimation);
  },[]);

  return (
    <div className={`h-screen flex flex-col items-center justify-center bg-[var(--background)]`}>
      <Error404 ref={errorRef}/>
      <CommonButton text='Return to home' onClick={() => {
        navigate('/')
      }} className="mt-6" />
    </div>
  );
};

export default Error404Page;