import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/utils/redux/appStore";
import LeftSideBox from '@/components/common/LeftSideBox';
import LoginForm from "@/components/form/CommonForms/LoginForm";
import SignUpForm from "@/components/form/CommonForms/SignUpForm";
import ResetPasswordForm from "@/components/form/CommonForms/ResetPasswordForm";
import OtpVerificatioForm from "@/components/form/CommonForms/OtpVerificatioForm";
import EmailVerificationForm from "@/components/form/CommonForms/EmailVerificationForm";
import { FormSvgs } from "@/components/svgs/FormSvgs";

const ProviderLoginPage = () => {

  const { resetPasswordForm, signInForm, verifyEmailForm, verifyOtpForm, signUpForm } = useSelector((store: RootState) => store.signform);
  const authUser = useSelector((store: RootState) => store.auth.authUser);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if(authUser && authUser.isLoggedIn){
  //     if(authUser.role === "ADMIN"){
  //       navigate("/admin");
  //     } else if(authUser.role === "USER"){
  //       navigate('/user');
  //     }else if(authUser.role === "PROVIDER"){
  //       navigate('/provider')
  //     }
  //   }
  // }, [authUser, navigate]);

  useEffect(() => {
    if(authUser && authUser.isLoggedIn){
      if(authUser.role === "ADMIN"){
        navigate("/admin/dashboard");
      } else if(authUser.role === "USER"){
        navigate('/user/dashboard');
      }else if(authUser.role === "PROVIDER"){
        navigate('/provider/dashboard')
      }
    }
  }, [authUser, navigate]);
  
  return (
    <div className='h-[100vh] flex bg-[var(--background)] justify-center items-center'>
     
      <LeftSideBox svg={<FormSvgs />} animateSvg />

      <div className="w-full md:w-6/12 flex justify-center items-center">
        {signInForm && <LoginForm role={"PROVIDER"} title={"Continue to your Service Account"}/>}
        {signUpForm && <SignUpForm role={"PROVIDER"} />}
        {verifyEmailForm && <EmailVerificationForm role={"PROVIDER"}/>}
        {resetPasswordForm && <ResetPasswordForm />}
        {verifyOtpForm && <OtpVerificatioForm />}
      </div>
    </div>
  )
}

export default ProviderLoginPage