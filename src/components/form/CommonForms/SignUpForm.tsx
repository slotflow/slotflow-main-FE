import { toast } from "react-toastify";
import InputField from "../InputFieldWithLable";
import { signup, } from "@/utils/apis/auth.api";
import { useDispatch, useSelector } from "react-redux";
import { FormButton, FormHeading } from "../FormSplits";
import React, { FormEvent, useCallback, useState } from "react";
import { AppDispatch, RootState } from "@/utils/redux/appStore";
import { SignUpFormDataProps, signUpProps } from "@/utils/interface/commonInterface";
import { setResetPasswordForm, setsignInForm, setSignUpForm, setVerifyEmailForm, setVerifyOtpForm, startTimer } from "@/utils/redux/slices/signFormSlice";

const SignUpForm: React.FC<signUpProps> = ({role}) => {

    const dispatch = useDispatch<AppDispatch>();
    const { loading } = useSelector((store: RootState) => store.signform);
    const [hasErrors, setHasErrors] = useState<boolean>(false);

    const [formData, setFormData] = useState<SignUpFormDataProps>({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
        setHasErrors(false);
    }, []);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(hasErrors){
            toast.error("Please fix the form errors.");
            return;
        }
        if (role) {
            dispatch(signup({
                username: formData.username,
                email: formData.email,
                password: formData.password,
                role: role
            }))
                .unwrap()
                .then((res: { success: boolean; message: string }) => {
                    if (res.success) {
                        toast.success(res.message);
                        dispatch(setSignUpForm(false));
                        dispatch(setVerifyOtpForm(true));
                        dispatch(setsignInForm(false));
                        dispatch(setVerifyEmailForm(false));
                        dispatch(setResetPasswordForm(false));
                        dispatch(startTimer(300));
                    } else {
                        toast.error(res.message);
                    }
                })
                .catch((error) => {
                    toast.error(error || "An error occurred during signup.");
                });
        } else {
            toast.error("Select your account type.");
        }
    };

    const changeToSignIn = () => {
        dispatch(setsignInForm(true));
        dispatch(setSignUpForm(false));
        dispatch(setVerifyEmailForm(false));
        dispatch(setVerifyOtpForm(false));
        dispatch(setResetPasswordForm(false));
    }

    const handleErrorChange = (hasError: boolean) => {
        setHasErrors(hasError);
      };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <FormHeading title={"Sign Up"} />
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <InputField
                        label="Username"
                        id="username"
                        placeholder="Midhun K Paniker"
                        type="text"
                        value={formData.username}
                        onChange={handleChange}
                        required={true}
                        onHasError={handleErrorChange}
                    />
                    <InputField
                        label="Email address"
                        id="email"
                        placeholder="midhun@gmail.com"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required={true}
                        onHasError={handleErrorChange}
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
                        onHasError={handleErrorChange}
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
                        onHasError={handleErrorChange}
                    />
                    <FormButton text={"Sign Up"} loading={loading} />
                </form>
                <p className="mt-10 text-center text-sm/6 text-[var(--textOne)] hover:text-[var(--textOneHover)]">
                    Already a Slotflow member?
                    <span className="font-semibold text-[var(--mainColor)] hover:text-[var(--mainColorHover)] cursor-pointer" onClick={changeToSignIn}>
                        {" "}Sign In
                    </span>
                </p>
            </div>
        </div >
    )
}

export default SignUpForm