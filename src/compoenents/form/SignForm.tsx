import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import InputField from "./InputFieldWithLable";
import { formatTime } from "../../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import React, { useCallback, useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../utils/redux/appStore";
import { resendOtp, signin, signup, verifyOtp } from "../../utils/redux/authHandler";
import { changeToOtpSend, changeToSignupForm, stopTimer, toggleSigninForm, updateTimer } from "../../utils/redux/stateSlice";
import { changeAdminFalse, changeProviderFalse, changeProviderTrue, changeUserFalse, changeUserTrue, setTempEmail } from "../../utils/redux/authSlice";

const SignForm = ()  => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const {loading, user, provider, admin, tempEmail} = useSelector((store: RootState) => store.auth);
    const { loginForm, otpForm, otpRemainingTime, otpTimerIsRunning } = useSelector((state: RootState) => state.state);

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

    const handleResponse = (res : {success : boolean, message: string, role?: string, userData?: {username : string, profileImage: string | null}}) => {
        if (res.success) {
            toast.success(res.message);
            handleNavigation(res.role ?? "");
        } else {
            toast.error(res.message);
        }
    };

    const handleNavigation = (role: string) => {
        if (role === "ADMIN") navigate("/admin");
        else if (role === "USER") navigate("/user");
        else if (role === "PROVIDER") navigate("/provider");
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        if (otpForm) {
            dispatch(verifyOtp(formData.otp))
                .unwrap()
                .then(handleResponse)
                .catch((error) => toast.error(error || "An error occurred."));
                
            setFormData({ username: "", email: "", password: "", otp: "" });
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
        } 
        else if (!otpForm && loginForm) {
            dispatch(signin({
                email: formData.email,
                password: formData.password,
                role: user ? "USER" : provider ? "PROVIDER" : admin ? "ADMIN" : ""
            }))
                .unwrap()
                .then(handleResponse)
                .catch((error) => toast.error(error || "An error occurred."));
        }
    };

    const handleForgotPassword = () => {

    }

    const handleResendOtp = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        dispatch(resendOtp(tempEmail))
          .unwrap()
          .then(handleResponse)
          .catch((error) => toast.error(error?.message || "An error occurred."));
      };

    return (
        <div className="flex flex-col justify-center w-11/12 md:w-10/12 lg:w-8/12 shadow-md rounded-md border-2 border-[var(--boxBorder)]  py-2 px-4 md:py-10 md:px-10">
            
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-2 text-center text-xl md:text-2xl font-bold tracking-tight text-[var(--textTwo)] hover:text-[var(--textTwoHover)]">
                    {admin ? "Admin Sign In" : otpForm ? "Verify Your Email" : loginForm ? "Sign In To Your Account" : "Sign Up"}
                </h2>
            </div>

            {!admin &&
                <div className="flex rounded-md border-[1px] border-[var(--mainColor)] mt-7 shadow md text-xs md:text-[16px] sm:w-full sm:max-w-sm sm:mx-auto">
                    <div onClick={() => {dispatch(changeUserTrue()); dispatch(changeProviderFalse()); dispatch(changeAdminFalse());}} className={`border-r-[1px] border-[var(--mainColor)] w-6/12 p-1 md:p-2 text-center text-[var(--textOne)] hover:bg-[var(--mainColorHover)] hover:text-white cursor-pointer rounded-tl-md ${user && 'bg-[var(--mainColor)] text-white'}`}>Book An Appointment</div>
                    <div onClick={() => {dispatch(changeProviderTrue()); dispatch(changeUserFalse()); dispatch(changeAdminFalse());}} className={`w-6/12 p-1 md:p-2 text-center text-[var(--textOne)] hover:bg-[var(--mainColorHover)] hover:text-white cursor-pointer rounded-tr-md ${provider && 'bg-[var(--mainColor)] text-white'}`}>Provide A Service</div>
                </div>
            }

            <div className="mt-4 md:mt-10 mb-4 md:mb-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-2 md:space-y-6">
                    {!admin && otpForm ? (
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
                            {!admin && !loginForm && (
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
                            <InputField
                                label="Password"
                                id="password"
                                placeholder="********"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                required={true}
                                onForgotPassword={handleForgotPassword}
                            />
                        </>
                    )}

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-[var(--mainColor)] px-3 py-1.5 text-xs md:text-sm font-semibold text-white shadow-xs hover:bg-[var(--mainColorHover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
                        >
                            {loading ? "Loading..." : otpForm ? "Verify" : loginForm ? "Sign In" : "Sign Up"}
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
                            dispatch(changeToOtpSend(false)); 
                            dispatch(changeToSignupForm());
                            dispatch(setTempEmail(""));
                            dispatch(stopTimer());
                            }}>Cancel</span>
                    </p>
                </>
                    :
                    <p className="mt-6 md:mt-10 text-center text-xs md:text-sm/6 text-[var(--textTwo)]" onClick={() => dispatch(toggleSigninForm())}>
                        {loginForm ? "New user?" : "Already have an account."}
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