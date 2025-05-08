import gsap from 'gsap';
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/utils/redux/appStore";
import { FormFilling } from "@/components/svgs/FormFilling";
import LoginForm from "@/components/form/CommonForms/LoginForm";
import { gsapBigSvgYDirectionAnimation } from '@/utils/constants';
import SignUpForm from "@/components/form/CommonForms/SignUpForm";
import ResetPasswordForm from "@/components/form/CommonForms/ResetPasswordForm";
import OtpVerificatioForm from "@/components/form/CommonForms/OtpVerificatioForm";
import EmailVerificationForm from "@/components/form/CommonForms/EmailVerificationForm";

const UserLoginPage = () => {
  
  const { resetPasswordForm, signInForm, verifyEmailForm, verifyOtpForm, signUpForm } = useSelector((store: RootState) => store.signform);
  const navigate = useNavigate();
  const authUser = useSelector((store: RootState) => store.auth.authUser);
  const formFillingRef = useRef(null);
  
  useEffect(() => {
    if(authUser && authUser.isLoggedIn){
      if(authUser.role === "ADMIN"){
        navigate("/admin");
      } else if(authUser.role === "USER"){
        navigate('/user');
      }else if(authUser.role === "PROVIDER"){
        navigate('/provider')
      }
    }
  }, [authUser, navigate]);

  useEffect(() => {
    gsap.to(formFillingRef.current, gsapBigSvgYDirectionAnimation);
  },[]);

  return (
    <div className='h-[100vh] flex bg-[var(--background)] justify-center items-center'>
      <div className="md:w-1/2 hidden md:flex items-center justify-center md:p-20">
        <FormFilling ref={formFillingRef}/>
      </div>
      <div className="w-full md:w-1/2 flex justify-center items-center">
        {signInForm && <LoginForm role={"USER"} title={"Continue to Book an Appointment"}/>}
        {signUpForm && <SignUpForm role={"USER"} />}
        {verifyEmailForm && <EmailVerificationForm role={"USER"}/>}
        {resetPasswordForm && <ResetPasswordForm />}
        {verifyOtpForm && <OtpVerificatioForm />}
      </div>
    </div>
  )
}

export default UserLoginPage