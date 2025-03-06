import { useDispatch, useSelector } from "react-redux";
import InputField from "./InputFieldWithLable";
import { AppDispatch, RootState } from "@/utils/redux/appStore";
import { toggleForm } from "@/utils/redux/stateSlice";
import { FormEvent, useCallback, useState } from "react";
import { formatTime } from "@/utils/helper";

const SignUpForm = () => {

    const dispatch = useDispatch<AppDispatch>()

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        otp: ""
    });

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }, []);

    const { signUpForm, verifyOtpForm, otpRemainingTime, otpTimerIsRunning, loading } = useSelector((store: RootState) => store.signupform);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Form submitted:", formData);
    };

    const handleToggleForm = () => {
        dispatch(toggleForm());
    };

    const handleResendOtp = () => {
        
    }

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-[var(--textTwo)] hover:text-[var(--textTwoHover)]">
                    Sign up for Continue
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {signUpForm && !verifyOtpForm && (
                        <>
                            <InputField
                                label="Username"
                                id="username"
                                placeholder="Midhun K Paniker"
                                type="text"
                                value={formData.username}
                                onChange={handleChange}
                                required={true}
                            />
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
                                placeholder="Enter your password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                required={true}
                                isPassword={true}
                            />
                            <InputField
                                label="Confirm Password"
                                id="confirmPassword"
                                placeholder="Confirm your password"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required={true}
                                isPassword={true}
                            />
                        </>
                    )}

                    {verifyOtpForm && !signUpForm && (
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

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-[var(--mainColor)] hover:bg-[var(--mainColorHover)] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--mainColor)] cursor-pointer"
                        >
                            {loading ? "Loading" : signUpForm ? "Sign Up" : verifyOtpForm && "Verify"}
                        </button>
                    </div>
                </form>

                {(!signUpForm && verifyOtpForm) && (
                    <p className="mt-8 text-center text-xs md:text-sm/6 text-[var(--textTwo)]">
                        {!otpTimerIsRunning ?
                            <span className="font-semibold text-[var(--mainColor)] hover:text-[var(--mainColorHover)] cursor-pointer" onClick={handleResendOtp}>Resend OTP</span>
                            :
                            <span className="text-center text-xs md:text-sm/6 text-[var(--textTwo)]">{formatTime(otpRemainingTime)}</span>
                        }
                    </p>
                )}

                {!verifyOtpForm && (
                    <p className="mt-10 text-center text-sm/6 text-[var(--textOne)] hover:text-[var(--textOneHover)]">
                        Already a Slotflow member?
                        <span className="font-semibold text-[var(--mainColor)] hover:text-[var(--mainColorHover)] cursor-pointer" onClick={handleToggleForm}>
                            {" "}Sign In
                        </span>
                    </p>
                )}
            </div>
        </div >
    )
}

export default SignUpForm