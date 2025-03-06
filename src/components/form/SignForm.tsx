import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import InputField from "./InputFieldWithLable";
import { formatTime } from "../../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import React, { useCallback, useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../utils/redux/appStore";
import { changeAdmin, changeProvider, changeUser } from "@/utils/redux/authSlice";
import { resendOtp, signin, signup, updatePassword, verifyOtp } from "../../utils/apis/auth.api";
import { setAdminForm, setLoginForm, setSignUpForm, setVerifyEmailForm, setVerifyOtpForm, startTimer, stopTimer, toggleForm, updateTimer, setChangePassword, setChangePasswordForm } from "../../utils/redux/signupFormSlice";

const SignForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { 
            user, 
            provider, 
            admin, 
            } = useSelector((store: RootState) => store.auth);

    const { loading } = useSelector((store: RootState) => store.form);

    const { otpRemainingTime, 
            otpTimerIsRunning, 
            loginForm,
            signUpForm,
            verifyEmailForm,
            verifyOtpForm,
            changePassword,
            changePasswordForm,
            adminForm } = useSelector((state: RootState) => state.form);


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


    const handleResendOtp = () => {
        const authUserString = sessionStorage.getItem("authUser");
        let verificationToken: string | undefined;
        let role: string | undefined;
        if (authUserString) {
            const parsedUser: { verificationToken?: string; role?: string } = JSON.parse(authUserString);
            if (parsedUser.verificationToken && parsedUser.role){
            dispatch(resendOtp({ verificationToken, role }))
                .unwrap()
                .then((res) => {
                    if(res.success){
                        toast.success(res.message);
                    }else{
                        toast.error(res.message);
                    }
                })
                .catch((error) => {
                    toast.error(error?.message || "An error occurred.")
                });
            }
        } else {
            toast.error("Something went wrong.");
        }
    };

    //  Form submit
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Login
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
            .then((res) => {
                if(res.success){
                        toast.success(res.message);
                        handleNavigation(res.authUser.role);
                    }else{
                        toast.error(res.message);
                    }
                })
                .catch((error) => toast.error(error || "An error occurred."));
            return;
        }

        // Sign up
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
                        toast.success(res.message);
                        dispatch(setVerifyOtpForm(true));
                        dispatch(setVerifyEmailForm(false));
                        dispatch(setLoginForm(false));
                        dispatch(setSignUpForm(false));
                        dispatch(setAdminForm(false));
                        dispatch(setChangePassword(false));
                        dispatch(setChangePasswordForm(false));
                        dispatch(startTimer(300));
                    }else{
                        toast.error(res.message);
                    }
                })
                .catch((error) => toast.error(error || "An error occurred."));
            return;
        }


        //  OTP verification
        interface verifyOtpData {
            verificationToken: string;
            role: string;
        }

        if (verifyOtpForm) {
            const { otp } = formData;
            const authUserString  = sessionStorage.getItem("authUser");
            let verificationToken: string | undefined;
            let role: string | undefined;
            if (authUserString) {
                const parsedUser : verifyOtpData = JSON.parse(authUserString);
                if (parsedUser.verificationToken && parsedUser.role){
                    verificationToken = parsedUser.verificationToken;
                    role = parsedUser.role;
                    dispatch(verifyOtp({ otp, verificationToken, role }))
                    .unwrap()
                    .then((res) => {
                        if(res.success){
                            toast.success(res.message);
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
                        }else{
                            toast.error(res.message);
                        }
                    })
                    .catch((error) => toast.error(error || "An error occurred."));
                }
            }
            setFormData({ username: "", email: "", password: "", otp: "", cpassword:"" });
            return;
        }


        //  Verify email for chaging password
        if (verifyEmailForm){
            if (!(user || provider)) {
                toast.info("Please select your account type.");
                return;
            } else {
                dispatch(resendOtp({ role: user ? "USER" : "PROVIDER", email: formData.email }))
                    .unwrap()
                    .then((res) => {
                        if(res.success){
                            toast.success(res.message);
                            dispatch(setVerifyOtpForm(true));
                            dispatch(setChangePassword(true));
                            dispatch(setLoginForm(false));
                            dispatch(setSignUpForm(false));
                            dispatch(setAdminForm(false));
                            dispatch(setVerifyEmailForm(false));
                            dispatch(setChangePasswordForm(false));
                        }else{
                            toast.error(res.message);
                        }
                    })
                    .catch((error) => {
                        toast.error(error || "An error occurred.")
                    });
                return;
            }
        }


        // Update password
        interface ParsedUser {
            verificationToken?: string;
            role?: string;
        }

        if (changePasswordForm) {
            const authUserString = sessionStorage.getItem("authUser");
            if (authUserString) {
                try {
                    const parsedUser: ParsedUser = JSON.parse(authUserString);
                    if (parsedUser.verificationToken && parsedUser.role) {
                        dispatch(
                            updatePassword({
                                role: parsedUser.role,
                                verificationToken: parsedUser.verificationToken,
                                password: formData.password,
                            })
                        )
                            .unwrap()
                            .then((res) => {
                                if (res.success) {
                                    toast.success(res.message);
                                    dispatch(setLoginForm(true));
                                    dispatch(setChangePassword(false));
                                    setFormData({ username: "", email: "", password: "", otp: "", cpassword: "" });
                                } else {
                                    toast.error(res.message);
                                    dispatch(setLoginForm(false));
                                    dispatch(setChangePassword(true));
                                }
                                dispatch(setChangePasswordForm(false));
                                dispatch(setVerifyEmailForm(false));
                                dispatch(setVerifyOtpForm(false));
                                dispatch(setSignUpForm(false));
                                dispatch(setAdminForm(false));
                            })
                            .catch((error) => {
                                if (error instanceof AxiosError) {
                                    toast.error(error.response?.data?.message || "An error occurred.");
                                } else {
                                    toast.error(error?.message || "An error occurred.");
                                }
                            });
                    } else {
                        toast.error("verificationToken or role missing from authUser");
                    }
                } catch {
                    toast.error("Error parsing authUser data.");
                }
            } else {
                toast.error("authUser not found in session storage");
            }
            return;
        }

    };

    const handleForgotPassword = () => {
        dispatch(setVerifyEmailForm(true));
        dispatch(setChangePassword(true));
        dispatch(setVerifyOtpForm(false));
        dispatch(setLoginForm(false));
        dispatch(setSignUpForm(false));
        dispatch(setAdminForm(false));
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
                <div className="flex mt-7 text-xs md:text-md font-semibold sm:w-full sm:max-w-sm sm:mx-auto">
                    <div onClick={() => { dispatch(changeUser(true)); dispatch(changeProvider(false)); dispatch(changeAdmin(false)); }} className={`shadow-md border-[1px] border-[var(--mainColor)] rounded-l-md w-6/12 p-1 md:p-2 text-center text-[var(--mainColor)] hover:bg-[var(--mainColorHover)] hover:text-white cursor-pointer ${user && 'bg-[var(--mainColor)] text-white'}`}>Book An Appointment</div>
                    <div onClick={() => { dispatch(changeProvider(true)); dispatch(changeUser(false)); dispatch(changeAdmin(false)); }} className={`shadow-md border-[1px] border-[var(--mainColor)] rounded-r-md w-6/12 p-1 md:p-2 text-center text-[var(--mainColor)] hover:bg-[var(--mainColorHover)] hover:text-white cursor-pointer ${provider && 'bg-[var(--mainColor)] text-white'}`}>Provide A Service</div>
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
                            dispatch(setLoginForm(true));
                            dispatch(setVerifyOtpForm(false));
                            dispatch(setVerifyEmailForm(false));
                            dispatch(setSignUpForm(false));
                            dispatch(setAdminForm(false));
                            dispatch(setChangePassword(false));
                            dispatch(setChangePasswordForm(false));
                            dispatch(changeAdmin(false));
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

