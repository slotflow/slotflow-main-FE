import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import InputField from "./InputFieldWithLable";
import { formatTime } from "../../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import React, { useCallback, useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../utils/redux/appStore";
import { resendOtp, signin, signup, verifyOtp } from "../../utils/redux/authHandler";
import { changeForgotPassword, changeToOtpSend, changeToSignupForm, stopTimer, toggleSigninForm, updateTimer } from "../../utils/redux/stateSlice";
import { changeAdminFalse, changeProviderFalse, changeProviderTrue, changeUserFalse, changeUserTrue, setTempEmail } from "../../utils/redux/authSlice";

const SignForm = ()  => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const {loading, user, provider, admin, tempEmail} = useSelector((store: RootState) => store.auth);
    const { loginForm, otpForm, otpRemainingTime, otpTimerIsRunning, forgotPassword } = useSelector((state: RootState) => state.state);

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        otp: ""
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
    },[]);

    const handleNavigation = (role: string) => {
        if (role === "ADMIN") navigate("/admin");
        else if (role === "USER") navigate("/user");
        else if (role === "PROVIDER") navigate("/provider");
    };

    const handleResponse = (res : {success : boolean, message: string, role?: string, userData?: {username : string, profileImage: string | null}}) => {
        if (res.success) {
            toast.success(res.message);
            handleNavigation(res.role ?? "");
        } else {
            toast.error(res.message);
        }
    };


    const handleResendOtp = () => {
        dispatch(resendOtp(tempEmail))
          .unwrap()
          .then(handleResponse)
          .catch((error) => toast.error(error?.message || "An error occurred."));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(forgotPassword){
            dispatch(setTempEmail(formData.email));
            if(tempEmail){
                handleResendOtp();
            }
            return;
        }

     if (otpForm) {
            dispatch(verifyOtp(formData.otp))
                .unwrap()
                .then(handleResponse)
                .catch((error) => toast.error(error || "An error occurred."));
                
            setFormData({ username: "", email: "", password: "", otp: "" });
            return;
        } 
        else if (!otpForm && !loginForm) {
            dispatch(signup({
                username: formData.username,
                email: formData.email,
                password: formData.password,
                role: user ? "USER" : "PROVIDER"
            }))
                .unwrap()
                .then(handleResponse)
                .catch((error) => toast.error(error || "An error occurred."));
                return;
        } 
        else if (!otpForm && loginForm) {
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
        dispatch(changeForgotPassword(true))
    }

    return (
        <div className="flex flex-col justify-center shadow-md rounded-md border-2 border-[var(--boxBorder)] py-2 md:py-10 w-11/12 md:w-7/12">
            
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-2 text-center text-xl md:text-2xl font-bold tracking-tight text-[var(--textTwo)] hover:text-[var(--textTwoHover)]">
                    {admin ? "Admin Sign In" : forgotPassword || otpForm ? "Verify Email" : loginForm ? "Sign In" : "Sign Up"}
                </h2>
            </div>

            {!admin && !forgotPassword && !otpForm &&
                <div className="flex rounded-md border-[1px] border-[var(--mainColor)] mt-7 shadow md text-xs md:text-[16px] sm:w-full sm:max-w-sm sm:mx-auto">
                    <div onClick={() => {dispatch(changeUserTrue()); dispatch(changeProviderFalse()); dispatch(changeAdminFalse());}} className={`border-r-[1px] border-[var(--mainColor)] w-6/12 p-1 md:p-2 text-center text-[var(--textOne)] hover:bg-[var(--mainColorHover)] hover:text-white cursor-pointer rounded-tl-md ${user && 'bg-[var(--mainColor)] text-white'}`}>Book An Appointment</div>
                    <div onClick={() => {dispatch(changeProviderTrue()); dispatch(changeUserFalse()); dispatch(changeAdminFalse());}} className={`w-6/12 p-1 md:p-2 text-center text-[var(--textOne)] hover:bg-[var(--mainColorHover)] hover:text-white cursor-pointer rounded-tr-md ${provider && 'bg-[var(--mainColor)] text-white'}`}>Provide A Service</div>
                </div>
            }

            <div className="mt-4 md:mt-10 mb-4 md:mb-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-2 md:space-y-6">
                    {!admin && !forgotPassword && otpForm ? (
                        <InputField
                            label="Enter OTP"
                            id="otp"
                            placeholder="000000"
                            type="text"
                            value={formData.otp}
                            onChange={handleChange}
                            required={true}
                        />
                    ) : (
                        <>
                            {!admin && !loginForm && !forgotPassword && (
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
                            <InputField
                                label="Email address"
                                id="email"
                                placeholder="midhun@gmail.com"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required={true}
                            />
                            {!forgotPassword && 
                                <InputField
                                    label="Password"
                                    id="password"
                                    placeholder="********"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required={true}
                                    admin={admin}
                                    onForgotPassword={handleForgotPassword}
                                />
                            }
                        </>
                    )}

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-[var(--mainColor)] px-3 py-1.5 text-xs md:text-sm font-semibold text-white shadow-xs hover:bg-[var(--mainColorHover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
                        >
                            {loading ? "Loading..." : forgotPassword ? "send Otp" : otpForm ? "Verify" : loginForm ? "Sign In" : "Sign Up"}
                        </button>
                    </div>
                </form>

                    
                {!admin && (otpForm ?
                <>
                    <p className="mt-8 text-center text-xs md:text-sm/6 text-[var(--textTwo)]">
                        {!otpTimerIsRunning ?
                            <span className="font-semibold text-[var(--mainColor)] hover:text-[var(--mainColorHover)] cursor-pointer" onClick={handleResendOtp}>Resend OTP</span>
                        :
                        <>
                            <span className="text-center text-xs md:text-sm/6 text-[var(--textTwo)]">{formatTime(otpRemainingTime)}</span>
                        </>
                        }
                        <span className="mx-2 text-center text-xs md:text-sm/6 text-[var(--mainColor)] hover:text-[var(--mainColorHover)] font-semibold cursor-pointer" onClick={() => {
                            dispatch(changeForgotPassword(false));
                            dispatch(changeToOtpSend(false)); 
                            dispatch(changeToSignupForm());
                            dispatch(setTempEmail(""));
                            dispatch(stopTimer());
                            }}>Cancel</span>
                    </p>
                </>
                    :
                    <p className="mt-6 md:mt-10 text-center text-xs md:text-sm/6 text-[var(--textTwo)]" onClick={() => {dispatch(toggleSigninForm()); dispatch(changeForgotPassword(false));}}>
                        {loginForm ? "New to Slotflow?" : "Already have an account."}
                        <a href="#" className="font-semibold text-[var(--mainColor)] hover:text-[var(--mainColorHover)]">
                            {loginForm ? " Sign Up" : " Sign In"}
                        </a>
                    </p>
                )}
            </div>
        </div>
    );
}

export default SignForm;

