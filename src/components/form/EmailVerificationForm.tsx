import { toast } from 'react-toastify';
import InputField from './InputFieldWithLable'
import { resendOtp } from '@/utils/apis/auth.api';
import { useDispatch, useSelector } from 'react-redux';
import { FormEvent, useCallback, useState } from 'react';
import { AppDispatch, RootState } from '@/utils/redux/appStore';
import { changeAdmin, changeProvider, changeUser } from '@/utils/redux/slices/authSlice';
import { setResetPasswordForm, setsignInForm, setSignUpForm, setVerifyEmailForm, setVerifyOtpForm } from '@/utils/redux/slices/signFormSlice';

const EmailVerificationForm = () => {
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
        email: "",
    });

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }, []);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(role){
            
            dispatch(resendOtp({ role, email: formData.email }))
            .unwrap()
            .then((res) => {
                if (res.success) {
                    toast.success(res.message);
                    dispatch(setVerifyOtpForm(true));
                    dispatch(setVerifyEmailForm(false));
                    dispatch(setSignUpForm(false));
                    dispatch(setsignInForm(false));
                    dispatch(setResetPasswordForm(false));
                } else {
                    toast.error(res.message);
                }
            })
            .catch((error) => {
                toast.error(error || "An error occurred.");
            });
        }else{
            toast.info("Select your account type.");
        }
    };

    const handleCancel = () => {
        dispatch(setVerifyEmailForm(false));
        dispatch(setsignInForm(true));
        dispatch(setVerifyOtpForm(false));
        dispatch(setSignUpForm(false));
        dispatch(setResetPasswordForm(false));
    }
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-[var(--textTwo)] hover:text-[var(--textTwoHover)]">
                    Email Verification
                </h2>
            </div>

            <div className="flex mt-7 text-xs md:text-md font-semibold sm:w-full sm:max-w-sm sm:mx-auto">
                <div onClick={() => { dispatch(changeUser(true)); dispatch(changeProvider(false)); dispatch(changeAdmin(false)); }} className={`shadow-md border-[1px] border-[var(--mainColor)] rounded-l-md w-6/12 p-1 md:p-2 text-center text-[var(--mainColor)] hover:bg-[var(--mainColorHover)] hover:text-white cursor-pointer ${user && 'bg-[var(--mainColor)] text-white'}`}>Book An Appointment</div>
                <div onClick={() => { dispatch(changeProvider(true)); dispatch(changeUser(false)); dispatch(changeAdmin(false)); }} className={`shadow-md border-[1px] border-[var(--mainColor)] rounded-r-md w-6/12 p-1 md:p-2 text-center text-[var(--mainColor)] hover:bg-[var(--mainColorHover)] hover:text-white cursor-pointer ${provider && 'bg-[var(--mainColor)] text-white'}`}>Provide A Service</div>
            </div>

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
                </p>
            </div>
        </div>
    )
}

export default EmailVerificationForm