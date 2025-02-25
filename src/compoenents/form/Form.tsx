import React, { useState } from "react";
import InputField from "./InputFieldWithLable";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../utils/redux/authSlice";
import { AppDispatch, RootState } from "../../utils/redux/appStore";

export function Form() {
    console.log("Form loading");
    const dispatch = useDispatch<AppDispatch>();
    const [loginForm, setLoginForm] = useState(true);

    const otpForm = useSelector((store: RootState) => store.state?.otpForm);
    const serviceProvider = useSelector((store: RootState) => store.auth?.serviceProvider);
    const loading = useSelector((store: RootState) => store.auth?.loading);

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        otp: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!otpForm && !loginForm) {
            dispatch(signup({
                username: formData.username,
                email: formData.email,
                password: formData.password,
                role: serviceProvider ? "PROVIDER" : "USER"
            }));
        }
    };

    const handleForgotPassword = () => {

    }

    return (
        <div className="flex flex-col justify-center px-10 py-16 w-full md:w-10/12 lg:w-8/12 shadow-md">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    {otpForm ? "Verify Your Email" : loginForm ? "Sign In To Your Account" : "Sign Up"}
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {otpForm ? (
                        <InputField
                            label="Enter OTP"
                            id="otp"
                            type="text"
                            value={formData.otp}
                            onChange={handleChange}
                            required={true}
                        />
                    ) : (
                        <>
                            {!loginForm && (
                                <InputField
                                    label="Username"
                                    id="username"
                                    type="text"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required={true}
                                />
                            )}
                            <InputField
                                label="Email address"
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required={true}
                            />
                            <InputField
                                label="Password"
                                id="password"
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
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
                        >
                            {loading ? "Loading..." : otpForm ? "Verify" : loginForm ? "Sign In" : "Sign Up"}
                        </button>
                    </div>
                </form>


                {otpForm ?
                    <p className="mt-10 text-center text-sm/6 text-gray-500" onClick={() => setLoginForm(!loginForm)}>

                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Resend OTP
                        </a>
                    </p>
                    :
                    <p className="mt-10 text-center text-sm/6 text-gray-500" onClick={() => setLoginForm(!loginForm)}>
                        {loginForm ? "New user?" : "Already have an account."}
                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            {loginForm ? "Sign Up" : "Sign In"}
                        </a>
                    </p>
                }
            </div>
        </div>
    );
}

