import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/utils/redux/appStore";
import { FormFilling } from "@/components/svgs/FormFilling";
import LoginForm from "@/components/form/CommonForms/LoginForm";
import SignUpForm from "@/components/form/CommonForms/SignUpForm";
import ResetPasswordForm from "@/components/form/CommonForms/ResetPasswordForm";
import OtpVerificatioForm from "@/components/form/CommonForms/OtpVerificatioForm";
import EmailVerificationForm from "@/components/form/CommonForms/EmailVerificationForm";

const ProviderLogin = () => {

  const { resetPasswordForm, signInForm, verifyEmailForm, verifyOtpForm, signUpForm } = useSelector((store: RootState) => store.signform);
  const navigate = useNavigate();
  const authUser = useSelector((store: RootState) => store.auth.authUser);

  useEffect(() => {
    if(authUser){
      if(authUser.role === "ADMIN"){
        navigate("/admin");
      } else if(authUser.role === "USER"){
        navigate('/user');
      }else if(authUser.role === "PROVIDER"){
        navigate('/provider')
      }
    }
  }, [authUser, navigate]);
  
  return (
    <div className='h-[100vh] flex bg-[var(--background)]'>
      <div className="md:w-6/12 hidden md:flex items-center justify-center">
        <FormFilling />
      </div>
      <div className="w-full md:w-6/12 flex justify-center items-center">
        {signInForm && <LoginForm role={"PROVIDER"} title={"Continue to your Service Account"}/>}
        {signUpForm && <SignUpForm role={"PROVIDER"} />}
        {verifyEmailForm && <EmailVerificationForm />}
        {resetPasswordForm && <ResetPasswordForm />}
        {verifyOtpForm && <OtpVerificatioForm />}
      </div>
    </div>
  )
}

export default ProviderLogin