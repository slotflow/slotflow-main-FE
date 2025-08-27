import { useSelector } from "react-redux";
import { RootState } from "@/utils/redux/appStore";
import { FormSvgs } from "@/components/svgs/FormSvgs";
import LeftSideBox from '@/components/common/LeftSideBox';
import LoginForm from "@/components/form/CommonForms/LoginForm";
import SignUpForm from "@/components/form/CommonForms/SignUpForm";
import { useAuthCheckInLogin } from "@/utils/hooks/useAuthCheckInLogin";
import ResetPasswordForm from "@/components/form/CommonForms/ResetPasswordForm";
import OtpVerificatioForm from "@/components/form/CommonForms/OtpVerificatioForm";
import EmailVerificationForm from "@/components/form/CommonForms/EmailVerificationForm";

const ProviderLoginPage = () => {

  const { resetPasswordForm, signInForm, verifyEmailForm, verifyOtpForm, signUpForm } = useSelector((store: RootState) => store.signform);
  useAuthCheckInLogin();
  
  return (
    <div className='h-[100vh] flex bg-[var(--background)] justify-center items-center'>
     
      <LeftSideBox svg={<FormSvgs />} animateSvg />

      <div className="w-full md:w-6/12 flex justify-center items-center">
        {signInForm && <LoginForm role={"PROVIDER"} />}
        {signUpForm && <SignUpForm role={"PROVIDER"} />}
        {verifyEmailForm && <EmailVerificationForm role={"PROVIDER"}/>}
        {resetPasswordForm && <ResetPasswordForm />}
        {verifyOtpForm && <OtpVerificatioForm />}
      </div>
    </div>
  )
}

export default ProviderLoginPage