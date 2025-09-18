import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/utils/redux/appStore';
import { Role } from '@/utils/interface/commonInterface';
import LoginForm from '@/components/form/CommonForms/LoginForm';
import SignUpForm from '@/components/form/CommonForms/SignUpForm';
import { useAuthCheckInLogin } from '@/utils/hooks/useAuthCheckInLogin';
import ResetPasswordForm from '@/components/form/CommonForms/ResetPasswordForm';
import OtpVerificatioForm from '@/components/form/CommonForms/OtpVerificatioForm';
import EmailVerificationForm from '@/components/form/CommonForms/EmailVerificationForm';

interface AuthPageProp {
    role: Role
}

const AuthPage: React.FC<AuthPageProp> = ({
    role
}) => {

    const { resetPasswordForm, signInForm, verifyEmailForm, verifyOtpForm, signUpForm } = useSelector((store: RootState) => store.signform);
    useAuthCheckInLogin();

    return (
        <div className='h-[100vh] flex bg-[var(--background)] justify-center items-center'>
            <div className="w-full md:w-6/12 flex justify-center items-center">
                {signInForm && <LoginForm role={role} />}
                {role !== "ADMIN" && (
                    <>
                        {signUpForm && <SignUpForm role={role} />}
                        {verifyEmailForm && <EmailVerificationForm role={role} />}
                        {resetPasswordForm && <ResetPasswordForm />}
                        {verifyOtpForm && <OtpVerificatioForm />}
                    </>
                )}
            </div>
        </div>
    )
}

export default AuthPage