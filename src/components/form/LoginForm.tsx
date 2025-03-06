import { toast } from "react-toastify";
import InputField from "./InputFieldWithLable";
import { signin } from "@/utils/apis/auth.api";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FormEvent, useCallback, useState } from "react";
import { AppDispatch, RootState } from "@/utils/redux/appStore";
import { changeAdmin, changeProvider, changeUser } from "@/utils/redux/slices/authSlice";
import { setResetPasswordForm, setsignInForm, setSignUpForm, setVerifyEmailForm, setVerifyOtpForm } from "@/utils/redux/slices/signFormSlice";


interface LoginFormProp {
    isAdmin?: boolean;
}

const LoginForm: React.FC<LoginFormProp> = ({ isAdmin }) => {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { user, provider, admin } = useSelector((store: RootState) => store.auth)
    const { loading } = useSelector((store: RootState) => store.signform);
    let role: string | undefined;

    if (user) {
        role = "USER";
    } else if (provider) {
        role = "PROVIDER";
    }else if (admin) {
        role = "ADMIN";
    }

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }, []);

    const handleNavigation = (role: string) => {
        if (role === "ADMIN") navigate("/admin");
        else if (role === "USER") navigate("/user");
        else if (role === "PROVIDER") navigate("/provider");
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (role) {
            dispatch(signin({
                email: formData.email,
                password: formData.password,
                role
            }))
                .unwrap()
                .then((res) => {
                    if (res.success) {
                        toast.success(res.message);
                        handleNavigation(res.authUser.role);
                    } else {
                        toast.error(res.message);
                    }
                })
                .catch((error) => toast.error(error || "An error occurred."));
            return;
        } else {
            toast.info("select your account type");
        }
    };

    const changeToSingUpForm = () => {
        dispatch(setSignUpForm(true));
        dispatch(setsignInForm(false));
        dispatch(setVerifyEmailForm(false));
        dispatch(setVerifyOtpForm(false));
        dispatch(setResetPasswordForm(false));
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-[var(--textTwo)] hover:text-[var(--textTwoHover)]">
                    Sign in to your account
                </h2>
            </div>

            {!isAdmin && (
                <div className="flex mt-7 text-xs md:text-md font-semibold sm:w-full sm:max-w-sm sm:mx-auto">
                    <div onClick={() => { dispatch(changeUser(true)); dispatch(changeProvider(false)); dispatch(changeAdmin(false)); }} className={`shadow-md border-[1px] border-[var(--mainColor)] rounded-l-md w-6/12 p-1 md:p-2 text-center text-[var(--mainColor)] hover:bg-[var(--mainColorHover)] hover:text-white cursor-pointer ${user && 'bg-[var(--mainColor)] text-white'}`}>Book An Appointment</div>
                    <div onClick={() => { dispatch(changeProvider(true)); dispatch(changeUser(false)); dispatch(changeAdmin(false)); }} className={`shadow-md border-[1px] border-[var(--mainColor)] rounded-r-md w-6/12 p-1 md:p-2 text-center text-[var(--mainColor)] hover:bg-[var(--mainColorHover)] hover:text-white cursor-pointer ${provider && 'bg-[var(--mainColor)] text-white'}`}>Provide A Service</div>
                </div>
            )}

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
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
                        forgotPassword={true}
                    />

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-[var(--mainColor)] hover:bg-[var(--mainColorHover)] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--mainColor)] cursor-pointer"
                        >
                            {loading ? "Loading" : "Sign In"}
                        </button>
                    </div>
                </form>

                {!isAdmin && (
                    <p className="mt-10 text-center text-sm/6 text-[var(--textOne)] hover:text-[var(--textOneHover)]">
                        New to Slotflow?
                        <span className="font-semibold text-[var(--mainColor)] hover:text-[var(--mainColorHover)] cursor-pointer" onClick={changeToSingUpForm}>
                            {" "}Sign Up
                        </span>
                    </p>
                )}

            </div>
        </div>
    )
}

export default LoginForm