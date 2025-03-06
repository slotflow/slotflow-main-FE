import { useDispatch, useSelector } from "react-redux";
import InputField from "./InputFieldWithLable";
import { FormEvent, useCallback, useState } from "react";
import { AppDispatch, RootState } from "@/utils/redux/appStore";
import { setForgotPassword, setResetPasswordForm, setsignInForm, setSignUpForm, setVerifyEmailForm, setVerifyOtpForm } from "@/utils/redux/slices/signFormSlice";
import { toast } from "react-toastify";
import { updatePassword } from "@/utils/apis/auth.api";


const ResetPasswordForm = () => {

    const dispatch = useDispatch<AppDispatch>();

    const { user, provider, authUser, authProvider } = useSelector((store: RootState) => store.auth);
    const { loading } = useSelector((store: RootState) => store.signform);

    let role: string | undefined;
    let verificationToken: string | undefined;

    if (user) {
        role = "USER";
        verificationToken = authUser?.verificationToken;
    } else if (provider) {
        role = "PROVIDER";
        verificationToken = authProvider?.verificationToken;
    }

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }, []);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (role && verificationToken) {
            dispatch(updatePassword({
                role,
                verificationToken,
                password: formData.password,
            }))
                .unwrap()
                .then((res) => {
                    if (res.success) {
                        toast.success(res.message);
                        dispatch(setForgotPassword(false));
                        dispatch(setResetPasswordForm(false));
                        dispatch(setsignInForm(true));
                        dispatch(setVerifyEmailForm(false));
                        dispatch(setVerifyOtpForm(false));
                        dispatch(setSignUpForm(false));
                    } else {
                        toast.error(res.message);
                    }
                })
                .catch((error) => {
                    toast.error(error || "An error occurred.");
                });
        }
    };

    const handleCancel = () => {
        dispatch(setResetPasswordForm(false));
        dispatch(setsignInForm(true));
        dispatch(setVerifyEmailForm(false));
        dispatch(setVerifyOtpForm(false));
        dispatch(setSignUpForm(false));
    }

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-[var(--textTwo)] hover:text-[var(--textTwoHover)]">
                    Change Password
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6">


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

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-[var(--mainColor)] hover:bg-[var(--mainColorHover)] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--mainColor)] cursor-pointer"
                        >
                            {loading ? "Loading" : "Reset"}
                        </button>
                    </div>
                </form>

                <p className="mt-6 flex justify-between text-xs md:text-sm/6 text-[var(--textTwo)] px-2">
                    <span className="font-semibold text-[var(--mainColor)] hover:text-[var(--mainColorHover)] cursor-pointer" onClick={handleCancel}>Cencel</span>
                </p>


            </div>
        </div >
    )
}

export default ResetPasswordForm;