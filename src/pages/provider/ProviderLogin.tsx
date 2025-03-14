import { useSelector } from "react-redux"
import { RootState } from "@/utils/redux/appStore"
import LoginForm from "@/components/form/LoginForm"
import SignUpForm from "@/components/form/SignUpForm"
import { FormFilling } from "@/components/svgs/FormFilling"
import EmailVerificationForm from "@/components/form/EmailVerificationForm"
import ResetPasswordForm from "@/components/form/ResetPasswordForm"
import OtpVerificatioForm from "@/components/form/OtpVerificatioForm"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const ProviderLogin = () => {
  const { resetPasswordForm, signInForm, verifyEmailForm, verifyOtpForm, signUpForm } = useSelector((store: RootState) => store.signform);
  const navigate = useNavigate();
  const authUser = useSelector((store: RootState) => store.auth.authUser);

  useEffect(() => {
    if (authUser && authUser.role === "PROVIDER") {
      navigate("/provider");
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