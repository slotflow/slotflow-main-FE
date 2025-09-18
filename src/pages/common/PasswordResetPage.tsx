import gsap from 'gsap';
import { useEffect, useRef } from "react";
import { gsapBigSvgYDirectionAnimation } from '@/utils/constants';
import ForgotPasswordForm from "@/components/form/CommonForms/ResetPasswordForm";

const PasswordResetPage = () => {
  
  const changePasswordRef = useRef(null);

  useEffect(() => {
    gsap.to(changePasswordRef.current, gsapBigSvgYDirectionAnimation);
  },[]);

  return (
    <div className='h-[100vh] flex bg-[var(--background)] justify-center items-center'>
      <div className="w-full md:w-6/12 flex justify-center items-center">
        <ForgotPasswordForm />
      </div>
    </div>
  )
}

export default PasswordResetPage