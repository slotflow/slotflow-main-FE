import { toast } from "react-toastify";
import { formatTime } from "@/utils/helper";
import InputField from "../InputFieldWithLable";
import { FormButton, FormHeading } from "../FormSplits";
import { useDispatch, useSelector } from "react-redux";
import { resendOtp, verifyOtp } from "@/utils/apis/auth.api";
import { AppDispatch, RootState } from "@/utils/redux/appStore";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { setResetPasswordForm, setsignInForm, setSignUpForm, setVerifyEmailForm, setVerifyOtpForm, stopTimer, updateTimer } from "@/utils/redux/slices/signFormSlice";

const OtpVerificatioForm = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { otpRemainingTime, otpTimerIsRunning, loading, forgotPassword } = useSelector((store: RootState) => store.signform);
    const { authUser } = useSelector((store: RootState) => store.auth);
    const [hasErrors, setHasErrors] = useState(false);

    const role : string | null = authUser?.role || null;
    const verificationToken : string | undefined = authUser?.verificationToken;

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
        setHasErrors(false);
    }, []);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(hasErrors){
            toast.error("Please fix the form errors.");
            return;
        }
        if (verificationToken && role) {
            dispatch(verifyOtp({ otp: formData.otp, verificationToken, role }))
                .unwrap()
                .then((res) => {
                    if (res.success) {
                        toast.success(res.message);
                        dispatch(stopTimer());
                        if (forgotPassword) {
                            dispatch(setVerifyOtpForm(false));
                            dispatch(setResetPasswordForm(true));
                            dispatch(setSignUpForm(false));
                            dispatch(setsignInForm(false));
                            dispatch(setVerifyEmailForm(false));
                        } else {
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
        if (verificationToken && role) {
            dispatch(resendOtp({ verificationToken, role }))
                .unwrap()
                .then((res: { success: boolean; message: string }) => {
                    if (res.success) {
                        toast.success(res.message);
                    } else {
                        toast.error(res.message);
                    }
                })
        }
    };

    const handleErrorChange = (hasError: boolean) => {
        setHasErrors(hasError);
      };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <FormHeading title={"Verify OTP"} />

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
                        onHasError={handleErrorChange}
                    />
                    <FormButton text={"Verify"} loading={loading} />

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