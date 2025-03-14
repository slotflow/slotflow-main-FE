import EmailVerificationForm from "@/components/form/CommonForms/EmailVerificationForm"
import LoginForm from "@/components/form/CommonForms/LoginForm"
import OtpVerificatioForm from "@/components/form/CommonForms/OtpVerificatioForm"
import ResetPasswordForm from "@/components/form/CommonForms/ResetPasswordForm"
import SignUpForm from "@/components/form/CommonForms/SignUpForm"
import { FormFilling } from "@/components/svgs/FormFilling"
import { RootState } from "@/utils/redux/appStore"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const UserLogin = () => {
  
  const { resetPasswordForm, signInForm, verifyEmailForm, verifyOtpForm, signUpForm } = useSelector((store: RootState) => store.signform);
  const navigate = useNavigate();
  const authUser = useSelector((store: RootState) => store.auth.authUser);
  
  useEffect(() => {
    if (authUser && authUser.role === "USER" && authUser.isLoggedIn) {
      navigate("/user");
    }
  }, [authUser, navigate]);

  return (
    <div className='h-[100vh] flex bg-[var(--background)]'>
      <div className="md:w-6/12 hidden md:flex items-center justify-center">
        <FormFilling />
      </div>
      <div className="w-full md:w-6/12 flex justify-center items-center">
        {signInForm && <LoginForm role={"USER"} title={"Continue to Book an Appointment"}/>}
        {signUpForm && <SignUpForm role={"USER"} />}
        {verifyEmailForm && <EmailVerificationForm />}
        {resetPasswordForm && <ResetPasswordForm />}
        {verifyOtpForm && <OtpVerificatioForm />}
      </div>
    </div>
  )
}

export default UserLogin