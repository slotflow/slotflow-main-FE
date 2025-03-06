import { useSelector } from "react-redux";
import InputField from "./InputFieldWithLable";
import { RootState } from "@/utils/redux/appStore";
import { FormEvent, useCallback, useState } from "react";

const ForgotPasswordForm = () => {
    const [formData, setFormData] = useState({
        email: "",
        otp: "",
        password: "",
        confirmPassword: ""
    });

    const { verifyEmailForm, verifyOtpForm, changePasswordForm } = useSelector((store: RootState) => store.passWordReset);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
        }, []);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Form submitted:", formData);
    };

    let currentForm;

    if (verifyEmailForm) {
        currentForm = (
            <InputField
                label="Email address"
                id="email"
                placeholder="midhun@gmail.com"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required={true}
            />
        );
    } else if (verifyOtpForm) {
        currentForm = (
            <InputField
                label="Enter OTP"
                id="otp"
                placeholder="000000"
                type="text"
                value={formData.otp}
                onChange={handleChange}
                required={true}
            />
        );
    } else if (changePasswordForm) {
        currentForm = (
            <>
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
        );
    }

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-[var(--textTwo)] hover:text-[var(--textTwoHover)]">
                    Verify Email
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {currentForm}

                    <div className="space-y-3">
                        <button type="submit" className="flex w-full justify-center rounded-md bg-[var(--mainColor)] hover:bg-[var(--mainColorHover)] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--mainColor)] cursor-pointer" >
                            Verify Email
                        </button>
                        <p className="text-center rounded-md text-[var(--mainColor)] hover:text-[var(--mainColorHover)] px-3 py-1.5 text-sm/6 font-semibold cursor-pointer">
                            Cancel
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ForgotPasswordForm;