import ForgotPasswordForm from "@/components/form/ResetPasswordForm";
import { ChangePassword } from "@/components/svgs/ChangePassword";

const PasswordReset = () => {
  
  return (
    <div className='h-[100vh] flex bg-[var(--background)]'>
      <div className="md:w-6/12 hidden md:flex items-center justify-center">
        <ChangePassword />
      </div>
      <div className="w-full md:w-6/12 flex justify-center items-center">
        <ForgotPasswordForm />
      </div>
    </div>
  )
}

export default PasswordReset