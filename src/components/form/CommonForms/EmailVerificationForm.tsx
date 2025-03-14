import { toast } from 'react-toastify';
import InputField from '../InputFieldWithLable'
import { resendOtp } from '@/utils/apis/auth.api';
import { useDispatch, useSelector } from 'react-redux';
import { FormButton, FormHeading } from '../FormSplits';
import { FormEvent, useCallback, useState } from 'react';
import { AppDispatch, RootState } from '@/utils/redux/appStore';
import { setResetPasswordForm, setsignInForm, setSignUpForm, setVerifyEmailForm, setVerifyOtpForm } from '@/utils/redux/slices/signFormSlice';

const EmailVerificationForm = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { loading } = useSelector((store: RootState) => store.signform);
    const [hasErrors, setHasErrors] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        role: "",
    });

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
        setHasErrors(false);
    }, []);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(hasErrors){
            toast.error("Please fix the form errors.");
            return;
        }
        if (formData.role) {
            dispatch(resendOtp({ role: formData.role, email: formData.email }))
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
        } else {
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

    const handleErrorChange = (hasError: boolean) => {
        setHasErrors(hasError);
      };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <FormHeading title={"Email Verification"} />

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6">

                    <div>
                        <div className='flex justify-between'>
                            <label htmlFor="role" className="block text-xs md:text-sm/6 font-medium text-[var(--textTwo)] hover:text-[var(--textTwoHover)]">
                                Select account type
                            </label>
                        </div>
                        <div className="mt-2">
                            <select
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                required
                                className="block w-full rounded-md bg-[var(--inputBg)] px-2 py-1 md:px-3 md:py-2 text-[var(--textOne)] outline-1 -outline-offset-1 outline-[var(--boxBorder)] placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[var(--mainColor)] text-xs md:text-sm"
                            >
                                <option value="">Select account type</option>
                                <option value="USER">User</option>
                                <option value="PROVIDER">Service provider</option>
                            </select>
                        </div>
                    </div>


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

                    <FormButton text={"Submit"} loading={loading} />
                </form>

                <p className="mt-6 flex justify-between text-xs md:text-sm/6 text-[var(--textTwo)] px-2">
                    <span className="font-semibold text-[var(--mainColor)] hover:text-[var(--mainColorHover)] cursor-pointer" onClick={handleCancel}>Cencel</span>
                </p>
            </div>
        </div>
    )
}

export default EmailVerificationForm