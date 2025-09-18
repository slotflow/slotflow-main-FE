import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useRef } from 'react';
import error404 from '../../assets/svgs/error404.svg';
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
      <img 
        src={error404}
        className='h-40 md:h-80'
      />
      <CommonButton text='Return to home' onClick={() => {
        navigate('/')
      }} className="mt-6" />
    </div>
  );
};

export default Error404Page;