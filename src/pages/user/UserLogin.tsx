import EmailVerificationForm from "@/components/form/EmailVerificationForm"
import LoginForm from "@/components/form/LoginForm"
import OtpVerificatioForm from "@/components/form/OtpVerificatioForm"
import ResetPasswordForm from "@/components/form/ResetPasswordForm"
import SignUpForm from "@/components/form/SignUpForm"
import { FormFilling } from "@/components/svgs/FormFilling"
import { RootState } from "@/utils/redux/appStore"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const UserLogin = () => {
  const { resetPasswordForm, signInForm, verifyEmailForm, verifyOtpForm, signUpForm } = useSelector((store: RootState) => store.signform);
  const navigate = useNavigate();
  const token = sessionStorage.getItem("adminToken");

  useEffect(() => {
    console.log("User login checking ")
    if (token) {
      navigate("/user");
    }
  }, [token, navigate]);
  
  return (
    <div className='h-[100vh] flex bg-[var(--background)]'>
      <div className="md:w-6/12 hidden md:flex items-center justify-center">
        <FormFilling />
      </div>
      <div className="w-full md:w-6/12 flex justify-center items-center">
        {signInForm && <LoginForm role={"USER"} />}
        {signUpForm && <SignUpForm role={"USER"} />}
        {verifyEmailForm && <EmailVerificationForm />}
        {resetPasswordForm && <ResetPasswordForm />}
        {verifyOtpForm && <OtpVerificatioForm />}
      </div>
    </div>
  )
}

export default UserLogin