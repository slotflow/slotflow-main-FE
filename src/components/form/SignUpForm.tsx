import { toast } from "react-toastify";
import InputField from "./InputFieldWithLable";
import { signup, } from "@/utils/apis/auth.api";
import { useDispatch, useSelector } from "react-redux";
import { FormEvent, useCallback, useState } from "react";
import { AppDispatch, RootState } from "@/utils/redux/appStore";
import { changeAdmin, changeProvider, changeUser } from "@/utils/redux/slices/authSlice";
import { setResetPasswordForm, setsignInForm, setSignUpForm, setVerifyEmailForm, setVerifyOtpForm, startTimer } from "@/utils/redux/slices/signFormSlice";

const SignUpForm = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { user, provider } = useSelector((store: RootState) => store.auth);
    const { loading } = useSelector((store: RootState) => store.signform);
    let role: string | undefined;

    if (user) {
        role = "USER";
    } else if (provider) {
        role = "PROVIDER";
    }

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }, []);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (role) {
            dispatch(signup({
                username: formData.username,
                email: formData.email,
                password: formData.password,
                role
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
                    toast.info(error || "An error occurred during signup.");
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

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-[var(--textTwo)] hover:text-[var(--textTwoHover)]">
                    Sign up for Continue
                </h2>
            </div>

            <div className="flex mt-7 text-xs md:text-md font-semibold sm:w-full sm:max-w-sm sm:mx-auto">
                <div onClick={() => { dispatch(changeUser(true)); dispatch(changeProvider(false)); dispatch(changeAdmin(false)); }} className={`shadow-md border-[1px] border-[var(--mainColor)] rounded-l-md w-6/12 p-1 md:p-2 text-center text-[var(--mainColor)] hover:bg-[var(--mainColorHover)] hover:text-white cursor-pointer ${user && 'bg-[var(--mainColor)] text-white'}`}>Book An Appointment</div>
                <div onClick={() => { dispatch(changeProvider(true)); dispatch(changeUser(false)); dispatch(changeAdmin(false)); }} className={`shadow-md border-[1px] border-[var(--mainColor)] rounded-r-md w-6/12 p-1 md:p-2 text-center text-[var(--mainColor)] hover:bg-[var(--mainColorHover)] hover:text-white cursor-pointer ${provider && 'bg-[var(--mainColor)] text-white'}`}>Provide A Service</div>
            </div>

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


                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-[var(--mainColor)] hover:bg-[var(--mainColorHover)] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--mainColor)] cursor-pointer"
                        >
                            {loading ? "Loading" : "Sign Up"}
                        </button>
                    </div>
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