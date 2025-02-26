import InputField from "./InputFieldWithLable";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSigninForm } from "../../utils/redux/stateSlice";
import { AppDispatch, RootState } from "../../utils/redux/appStore";
import { signin, signup, verifyOtp } from "../../utils/redux/authHandler";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { changeAdminFalse, changeProviderFalse, changeProviderTrue, changeUserFalse, changeUserTrue } from "../../utils/redux/authSlice";

const Form = ()  => {
    console.log("Form loading");
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const loginForm = useSelector((store: RootState) => store.state?.loginForm);
    const otpForm = useSelector((store: RootState) => store.state?.otpForm);
    const loading = useSelector((store: RootState) => store.auth?.loading);
    const user = useSelector((store: RootState) => store.auth?.user);
    const provider = useSelector((store: RootState) => store.auth?.provider);
    const admin = useSelector((store: RootState) => store.auth?.admin);

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        otp: ""
    });

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    },[]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

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

    return (
        <div className="flex flex-col justify-center w-full md:w-10/12 lg:w-8/12 shadow-md rounded-md">
            {!admin &&
                <div className="flex bg-indigo-300 rounded-t-md shadow-md">
                    <div onClick={() => {dispatch(changeUserTrue()); dispatch(changeProviderFalse()); dispatch(changeAdminFalse());}} className={`w-6/12 p-2 text-center text-white hover:bg-indigo-400 cursor-pointer rounded-tl-md ${user && 'bg-indigo-400'}`}>Book An Appointment</div>
                    <div onClick={() => {dispatch(changeProviderTrue()); dispatch(changeUserFalse()); dispatch(changeAdminFalse());}} className={`w-6/12 p-2 text-center text-white hover:bg-indigo-400 cursor-pointer rounded-tr-md ${provider && 'bg-indigo-400'}`}>Provide A Service</div>
                </div>
            }
            <div className="px-10 py-10">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-2 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    {admin ? "Admin Sign In" : otpForm ? "Verify Your Email" : loginForm ? "Sign In To Your Account" : "Sign Up"}
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {!admin && otpForm ? (
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
                            {!admin && !loginForm && (
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

                    
                {!admin && (otpForm ?
                    <p className="mt-10 text-center text-sm/6 text-gray-500" onClick={() => dispatch(toggleSigninForm())}>
                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Resend OTP
                        </a>
                    </p>
                    :
                    <p className="mt-10 text-center text-sm/6 text-gray-500" onClick={() => dispatch(toggleSigninForm())}>
                        {loginForm ? "New user?" : "Already have an account."}
                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            {loginForm ? " Sign Up" : " Sign In"}
                        </a>
                    </p>
                )}
            </div>
            </div>
        </div>
    );
}

export default Form;