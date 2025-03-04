import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import InputField from "./InputFieldWithLable";
import { formatTime } from "../../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import React, { useCallback, useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../utils/redux/appStore";
import { resendOtp, signin, signup, updatePassword, verifyOtp } from "../../utils/redux/authHandler";
import { changeAdminFalse, changeProviderFalse, changeProviderTrue, changeUserFalse, changeUserTrue } from "@/utils/redux/authSlice";
import { setAdminForm, setLoginForm, setSignUpForm, setVerifyEmailForm, setVerifyOtpForm, startTimer, stopTimer, toggleForm, updateTimer, setChangePassword, setChangePasswordForm } from "../../utils/redux/stateSlice";

const SignForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { loading, 
            user, 
            provider, 
            admin, 
            authData } = useSelector((store: RootState) => store.auth);

    const { otpRemainingTime, 
            otpTimerIsRunning, 
            loginForm,
            signUpForm,
            verifyEmailForm,
            verifyOtpForm,
            changePassword,
            changePasswordForm,
            adminForm } = useSelector((state: RootState) => state.state);


    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        otp: "",
        cpassword: "",
    });

    useEffect(() => {
        if (otpTimerIsRunning) {
            const interval = setInterval(() => {
                dispatch(updateTimer());
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [otpTimerIsRunning, dispatch]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }, []);

    const handleNavigation = (role: string) => {
        if (role === "ADMIN") navigate("/admin");
        else if (role === "USER") navigate("/user");
        else if (role === "PROVIDER") navigate("/provider");
    };

    const handleResponse = (res: { success: boolean, message: string, role?: string, userData?: { username: string, profileImage: string | null } }) => {
        if (res.success) {
            toast.success(res.message);
            handleNavigation(res.role ?? "");
        } else {
            toast.error(res.message);
        }
    };

    const handleResendOtp = () => {
        if (authData && authData.verificationToken && authData.role) {
            const { verificationToken, role } = authData;
            dispatch(resendOtp({ verificationToken, role }))
                .unwrap()
                .then(handleResponse)
                .catch((error) => {
                    toast.error(error?.message || "An error occurred.")
                });
        } else {
            toast.error("Something went wrong.");
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(changePasswordForm){
            dispatch(updatePassword({role: authData?.role, verificationToken : authData?.verificationToken, password: formData.password}))
            .unwrap()
            .then((res) => {
                if(res.success){
                    dispatch(setLoginForm(true));
                    dispatch(setChangePassword(false));
                    setFormData({ username: "", email: "", password: "", otp: "", cpassword:"" });
                }else{
                    dispatch(setLoginForm(false));
                    dispatch(setChangePassword(true));
                }
                dispatch(setChangePasswordForm(false));        
                dispatch(setVerifyEmailForm(false));
                dispatch(setVerifyOtpForm(false));
                dispatch(setSignUpForm(false));
                dispatch(setAdminForm(false));
                handleResponse(res);
            })
            .catch((error) => {
                toast.error(error || "An error occurred.")
            })
            return;
        }

        if (verifyEmailForm){
            if (!(user || provider)) {
                toast.info("Please select your account type.");
                return;
            } else {
                dispatch(resendOtp({ role: user ? "USER" : "PROVIDER", email: formData.email }))
                    .unwrap()
                    .then((res) => {
                        dispatch(setVerifyOtpForm(true));
                        dispatch(setVerifyEmailForm(false));
                        dispatch(setLoginForm(false));
                        dispatch(setSignUpForm(false));
                        dispatch(setAdminForm(false));
                        dispatch(setChangePassword(true));
                        dispatch(setChangePasswordForm(false));
                        handleResponse(res);
                    })
                    .catch((error) => {
                        toast.error(error || "An error occurred.")
                    });
                return;
            }
        }

        if (signUpForm) {
            if (!admin && !(user || provider)) {
                toast.info("Please select your account type.");
                return;
            }
            dispatch(signup({
                username: formData.username,
                email: formData.email,
                password: formData.password,
                role: user ? "USER" : "PROVIDER"
            }))
                .unwrap()
                .then((res) => {
                    if (res.success) {
                        dispatch(setVerifyOtpForm(true));
                        dispatch(setVerifyEmailForm(false));
                        dispatch(setLoginForm(false));
                        dispatch(setSignUpForm(false));
                        dispatch(setAdminForm(false));
                        dispatch(setChangePassword(false));
                        dispatch(setChangePasswordForm(false));
                        dispatch(startTimer(300));
                    }
                    handleResponse(res);
                })
                .catch((error) => toast.error(error || "An error occurred."));
            return;
        }

        if (verifyOtpForm && authData && authData.verificationToken && authData.role) {
            const { otp } = formData;
            const { verificationToken, role } = authData;
            dispatch(verifyOtp({ otp, verificationToken, role }))
                .unwrap()
                .then((res) => {
                    dispatch(stopTimer());
                    dispatch(setVerifyOtpForm(false));
                    dispatch(setVerifyEmailForm(false));
                    dispatch(setSignUpForm(false));
                    dispatch(setAdminForm(false));
                    if(changePassword){
                        dispatch(setLoginForm(false));
                        dispatch(setChangePassword(false));
                        dispatch(setChangePasswordForm(true));
                    }else{
                        dispatch(setLoginForm(true));
                    }
                    handleResponse(res) 
                })
                .catch((error) => toast.error(error || "An error occurred."));
            setFormData({ username: "", email: "", password: "", otp: "", cpassword:"" });
            return;
        }

        if (loginForm || adminForm) {
            if(!adminForm){
                if (!admin && !(user || provider)) {
                    toast.info("Please select your account type.");
                    return;
                }
            }
            dispatch(signin({
                email: formData.email,
                password: formData.password,
                role: user ? "USER" : provider ? "PROVIDER" : admin ? "ADMIN" : null
            }))
                .unwrap()
                .then(handleResponse)
                .catch((error) => toast.error(error || "An error occurred."));
            return;
        }

    };

    const handleForgotPassword = () => {
        dispatch(setVerifyOtpForm(false));
        dispatch(setVerifyEmailForm(true));
        dispatch(setLoginForm(false));
        dispatch(setSignUpForm(false));
        dispatch(setAdminForm(false));
        dispatch(setChangePassword(true));
        dispatch(setChangePasswordForm(false));
    }

    return (
        <div className="flex flex-col justify-center shadow-md rounded-md border-2 border-[var(--boxBorder)] py-2 md:py-10 w-11/12 md:w-8/12 xl:w-7/12">

            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-2 text-center text-xl md:text-2xl font-bold tracking-tight text-[var(--textTwo)] hover:text-[var(--textTwoHover)]">
                    {loginForm ? "Sign In" : signUpForm ? "Sign Up" : verifyEmailForm ? "Email Verification" : verifyOtpForm ? "Otp Verification" : adminForm ? "Admin Sign In" : changePasswordForm && "Update Password"}
                </h2>
            </div>

            {(loginForm || signUpForm || verifyEmailForm) && !adminForm && !verifyOtpForm && (
                <div className="flex rounded-md border-[1px] border-[var(--mainColor)] mt-7 shadow md text-xs md:text-[16px] sm:w-full sm:max-w-sm sm:mx-auto">
                    <div onClick={() => { dispatch(changeUserTrue()); dispatch(changeProviderFalse()); dispatch(changeAdminFalse()); }} className={`border-r-[1px] border-[var(--mainColor)] w-6/12 p-1 md:p-2 text-center text-[var(--textOne)] hover:bg-[var(--mainColorHover)] hover:text-white cursor-pointer rounded-tl-md ${user && 'bg-[var(--mainColor)] text-white'}`}>Book An Appointment</div>
                    <div onClick={() => { dispatch(changeProviderTrue()); dispatch(changeUserFalse()); dispatch(changeAdminFalse()); }} className={`w-6/12 p-1 md:p-2 text-center text-[var(--textOne)] hover:bg-[var(--mainColorHover)] hover:text-white cursor-pointer rounded-tr-md ${provider && 'bg-[var(--mainColor)] text-white'}`}>Provide A Service</div>
                </div>
            )}

            <div className="mt-4 md:mt-10 mb-4 md:mb-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-2 md:space-y-6">

                    {(!loginForm && !signUpForm && !adminForm && !verifyEmailForm && verifyOtpForm) && (
                        <InputField
                            label="Enter OTP"
                            id="otp"
                            placeholder="000000"
                            type="text"
                            value={formData.otp}
                            onChange={handleChange}
                            required={true}
                        />
                    )}

                    {(signUpForm && !loginForm && !adminForm && !verifyEmailForm && !verifyOtpForm) && (
                        <InputField
                            label="Username"
                            id="username"
                            placeholder="Midhun K Paniker"
                            type="text"
                            value={formData.username}
                            onChange={handleChange}
                            required={true}
                        />
                    )}

                    {(loginForm || signUpForm || adminForm || verifyEmailForm && !verifyOtpForm && !changePasswordForm) && (
                        <InputField
                            label="Email address"
                            id="email"
                            placeholder="midhun@gmail.com"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required={true}
                        />
                    )}

                    {(loginForm || signUpForm || adminForm || changePasswordForm) && !verifyEmailForm && !verifyOtpForm && (
                        <InputField
                            label="Password"
                            id="password"
                            placeholder="********"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            required={true}
                            admin={admin}
                            changePasswordForm={changePasswordForm}
                            onForgotPassword={handleForgotPassword}
                        />
                    )}

                    {(changePasswordForm && !loginForm && !signUpForm && ! verifyOtpForm && ! verifyEmailForm) && (
                        <InputField
                            label="Change Password"
                            id="cpassword"
                            placeholder="********"
                            type="password"
                            value={formData.cpassword}
                            onChange={handleChange}
                            required={true}
                            admin={admin}
                        />
                    )}

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-[var(--mainColor)] px-3 py-2 text-xs md:text-sm font-semibold text-white shadow-xs hover:bg-[var(--mainColorHover)] focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer"
                        >
                            {loading ? "Loading" : loginForm ? "Sign In" : signUpForm ? "Sign Up" : verifyEmailForm ? "Send OTP" : verifyOtpForm ? "Verify" : adminForm ? "Sign In" : changePasswordForm && "Update" }
                        </button>
                    </div>

                </form>

                {(!adminForm && !verifyEmailForm && !signUpForm && !loginForm && verifyOtpForm) && (
                    <p className="mt-8 text-center text-xs md:text-sm/6 text-[var(--textTwo)]">
                        {!otpTimerIsRunning ?
                            <span className="font-semibold text-[var(--mainColor)] hover:text-[var(--mainColorHover)] cursor-pointer" onClick={handleResendOtp}>Resend OTP</span>
                            :
                            <span className="text-center text-xs md:text-sm/6 text-[var(--textTwo)]">{formatTime(otpRemainingTime)}</span>
                        }
                    </p>
                )}

                {(verifyOtpForm || verifyEmailForm || adminForm || changePasswordForm && !loginForm && !signUpForm) && (
                    <p className="mt-8 text-center text-xs md:text-sm/6 text-[var(--textTwo)]">
                        <span className="mx-2 text-center text-xs md:text-sm/6 text-[var(--mainColor)] hover:text-[var(--mainColorHover)] font-semibold cursor-pointer" onClick={() => {
                            dispatch(stopTimer());
                            dispatch(setVerifyOtpForm(false));
                            dispatch(setVerifyEmailForm(false));
                            dispatch(setLoginForm(true));
                            dispatch(setSignUpForm(false));
                            dispatch(setAdminForm(false));
                        }}>Cancel</span>
                    </p>
                )}

                {(loginForm || signUpForm) && !verifyOtpForm && !verifyEmailForm && !adminForm && (
                    <p className="mt-6 md:mt-10 text-center text-xs md:text-sm/6 text-[var(--textTwo)]">
                        {loginForm ? "New to Slotflow?" : "Already have an account."}
                        <a href="#" className="font-semibold text-[var(--mainColor)] hover:text-[var(--mainColorHover)]" onClick={() => {
                            dispatch(toggleForm());
                        }}>
                            {loginForm ? " Sign Up" : " Sign In"}
                        </a>
                    </p>
                )}
            </div>

        </div>
    );
}

export default SignForm;

