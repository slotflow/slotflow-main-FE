import { toast } from "react-toastify";
import { formatTime } from "@/utils/helper";
import InputField from "./InputFieldWithLable";
import { useDispatch, useSelector } from "react-redux";
import { resendOtp, verifyOtp } from "@/utils/apis/auth.api";
import { AppDispatch, RootState } from "@/utils/redux/appStore";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { setResetPasswordForm, setsignInForm, setSignUpForm, setVerifyEmailForm, setVerifyOtpForm, stopTimer, updateTimer } from "@/utils/redux/slices/signFormSlice";

const OtpVerificatioForm = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { otpRemainingTime, otpTimerIsRunning, loading, forgotPassword } = useSelector((store: RootState) => store.signform);
    const { user, provider, authUser, authProvider } = useSelector((store: RootState) => store.auth);

    let role : string | undefined;
    let verificationToken : string | undefined;

    if (user) {
        role = "USER";
        verificationToken = authUser?.verificationToken;
    } else if (provider) {
        role = "PROVIDER";
        verificationToken = authProvider?.verificationToken;
    }

    const [formData, setFormData] = useState({
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
    }, []);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(verificationToken && role){
        dispatch(verifyOtp({ otp: formData.otp, verificationToken, role }))
            .unwrap()
            .then((res) => {
                if (res.success) {
                    toast.success(res.message);
                    dispatch(stopTimer());
                    if(forgotPassword){
                        dispatch(setVerifyOtpForm(false));
                        dispatch(setResetPasswordForm(true));
                        dispatch(setSignUpForm(false));
                        dispatch(setsignInForm(false));
                        dispatch(setVerifyEmailForm(false));
                    }else{
                        dispatch(setVerifyOtpForm(false));
                        dispatch(setSignUpForm(false));
                        dispatch(setsignInForm(true));
                        dispatch(setVerifyEmailForm(false));
                        dispatch(setResetPasswordForm(false));
                    }
                } else {
                    toast.error(res.message);
                }
            })
            .catch((error) => toast.error(error || "An error occurred."));
        }
    }

    const handleCancel = () => {
        dispatch(setVerifyOtpForm(false));
        dispatch(setSignUpForm(false));
        dispatch(setsignInForm(true));
        dispatch(setVerifyEmailForm(false));
        dispatch(setResetPasswordForm(false));
    }

    const handleResendOtp = () => {
        let role: string | undefined;
        let verificationToken: string | undefined;

        if (user) {
            role = "USER";
            verificationToken = authUser?.verificationToken;
        } else if (provider) {
            role = "PROVIDER";
            verificationToken = authProvider?.verificationToken;
        }

        dispatch(resendOtp({ verificationToken, role }))
            .unwrap()
            .then((res: { success: boolean; message: string }) => {
                if (res.success) {
                    toast.success(res.message);
                } else {
                    toast.error(res.message);
                }
            })
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-[var(--textTwo)] hover:text-[var(--textTwoHover)]">
                    Verify Otp
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6">

                    <InputField
                        label="Enter OTP"
                        id="otp"
                        placeholder="000000"
                        type="text"
                        value={formData.otp}
                        onChange={handleChange}
                        required={true}
                    />

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-[var(--mainColor)] hover:bg-[var(--mainColorHover)] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--mainColor)] cursor-pointer"
                        >
                            {loading ? "Loading" : "Verify"}
                        </button>
                    </div>
                </form>

                <p className="mt-6 flex justify-between text-xs md:text-sm/6 text-[var(--textTwo)] px-2">
                    <span className="font-semibold text-[var(--mainColor)] hover:text-[var(--mainColorHover)] cursor-pointer" onClick={handleCancel}>Cencel</span>
                    {otpTimerIsRunning ?
                        <span className="text-center text-xs md:text-sm/6 text-[var(--textTwo)]">{formatTime(otpRemainingTime)}</span>
                        :
                        <span className="font-semibold text-[var(--mainColor)] hover:text-[var(--mainColorHover)] cursor-pointer" onClick={handleResendOtp}>Resend OTP</span>
                    }
                </p>

            </div>
        </div >
    )
}

export default OtpVerificatioForm