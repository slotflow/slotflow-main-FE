import { useDispatch } from "react-redux";
import { AppDispatch } from "@/utils/redux/appStore";
import { toggleForm } from "@/utils/redux/stateSlice";
import { FormEvent, useCallback, useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const SignUpForm = () => {

    const dispatch = useDispatch<AppDispatch>()
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }, []);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Form submitted:", formData);
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleToggleForm = () => {
            dispatch(toggleForm());
        };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-[var(--textTwo)] hover:text-[var(--textTwoHover)]">
                    Sign up for Continue
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium text-[var(--textTwo)] hover:text-[var(--textTwoHover)]">
                            Username
                        </label>
                        <div className="mt-2">
                            <input
                                id="username"
                                name="username"
                                type="text"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                autoComplete="username"
                                className="block w-full rounded-md bg-[var(--inputBg)] px-3 py-1.5 text-base text-[var(--textOne)] outline-1 -outline-offset-1 outline-[var(--boxBorder)] placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[var(--mainColor)] sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium text-[var(--textTwo)] hover:text-[var(--textTwoHover)]">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                autoComplete="email"
                                className="block w-full rounded-md bg-[var(--inputBg)] px-3 py-1.5 text-base text-[var(--textOne)] outline-1 -outline-offset-1 outline-[var(--boxBorder)] placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[var(--mainColor)] sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm/6 font-medium text-[var(--textTwo)] hover:text-[var(--textTwoHover)]">
                                Password
                            </label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-[var(--mainColor)] hover:text-[var(--mainColorHover)]">
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <div className="mt-2 relative">
                            <input
                                id="password"
                                name="password"
                                type={passwordVisible ? "text" : "password"}
                                value={formData.password}
                                required
                                autoComplete="current-password"
                                className="block w-full rounded-md bg-[var(--inputBg)] px-3 py-1.5 text-base text-[var(--textOne)] outline-1 -outline-offset-1 outline-[var(--boxBorder)] placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[var(--mainColor)] sm:text-sm/6"
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                                onClick={togglePasswordVisibility}
                            >
                                {passwordVisible ? (
                                    <VisibilityIcon />
                                ) : (
                                    <VisibilityOffIcon />
                                )}
                            </button>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-[var(--mainColor)] hover:bg-[var(--mainColorHover)] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--mainColor)] cursor-pointer"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm/6 text-[var(--textOne)] hover:text-[var(--textOneHover)]">
                    Already a Slotflow member?
                    <span className="font-semibold text-[var(--mainColor)] hover:text-[var(--mainColorHover)] cursor-pointer" onClick={handleToggleForm}>
                        {" "}Sign In
                    </span>
                </p>
            </div>
        </div>
  )
}

export default SignUpForm