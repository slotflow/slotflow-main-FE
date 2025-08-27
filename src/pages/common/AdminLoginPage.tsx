import gsap from 'gsap';
import { useEffect, useRef } from "react";
import { FormSvgs } from '@/components/svgs/FormSvgs';
import LeftSideBox from '@/components/common/LeftSideBox';
import LoginForm from "@/components/form/CommonForms/LoginForm";
import { gsapBigSvgYDirectionAnimation } from '@/utils/constants';
import { useAuthCheckInLogin } from '@/utils/hooks/useAuthCheckInLogin';

const AdminLoginPage = () => {

  const formFilling = useRef(null);

  useAuthCheckInLogin();

  useEffect(() => {
    gsap.to(formFilling.current, gsapBigSvgYDirectionAnimation);
  },[]);

  return (
    <div className='h-[100vh] flex bg-[var(--background)] justify-center items-center'>
      <LeftSideBox svg={<FormSvgs />} animateSvg />
      <div className="w-full md:w-6/12 flex justify-center items-center">
        <LoginForm isAdmin={true} role={"ADMIN"} />
      </div>
    </div>
  )
}

export default AdminLoginPage