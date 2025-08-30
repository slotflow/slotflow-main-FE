import { Loader } from 'lucide-react';
import { toast } from 'react-toastify';
import CommonButton from './CommonButton';
import { PhoneInput } from '../form/phone-input';
import InputField from '../form/InputFieldWithLable';
import { useDispatch, useSelector } from 'react-redux';
import { userUpdateUserInfo } from '@/utils/apis/user.api';
import { UserData } from '@/utils/interface/sliceInterface';
import { AppDispatch, RootState } from '@/utils/redux/appStore';
import { FormEvent, useCallback, 
    // useEffect, 
    useState } from 'react';
import { providerUpdateProviderInfo } from '@/utils/apis/provider.api';
import { HandleChangeFunction } from '@/utils/interface/commonInterface';

interface UserInfoAddingOrUpdatingComponentInterface {
    title: string;
    // userInfo: { username: string, phone: string };
    setOpenUserInfoForm: (data: boolean) => void;
}

const UserInfoAddingOrUpdating: React.FC<UserInfoAddingOrUpdatingComponentInterface> = ({
    title,
    // userInfo,
    setOpenUserInfoForm,
}) => {

    const dispatch = useDispatch<AppDispatch>();
    const authUser: UserData | null = useSelector((store: RootState) => store.auth.authUser);
    const role: string | null = authUser?.role || null;

    const [loading, setLoading] = useState<boolean>(false);
    const [hasErrors, setHasErrors] = useState<boolean>(false);
    const [formData, setFormData] = useState<{ username: string, phone: string }>({
        username: "",
        phone: "",
    });

    // useEffect(() => {
    //     if (userInfo) {
    //         setFormData({
    //             username: userInfo.username,
    //             phone: userInfo.phone
    //         });
    //     }
    // }, [userInfo])

    const handleChange = useCallback<HandleChangeFunction>((e) => {
        setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
        setHasErrors(false);
    }, []);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!role) {
            toast.error("Please try again");
            return;
        }
        if (hasErrors) {
            toast.error("Please fix the form errors.");
            return;
        }
        setLoading(true);

        try {
            let updateFn;
            if (role === "PROVIDER") {
                updateFn = providerUpdateProviderInfo;
            } else if (role === "USER") {
                updateFn = userUpdateUserInfo;
            } else {
                toast.error("Invalid user role");
                return;
            }

            await dispatch(
                updateFn({
                    username: formData.username,
                    phone: formData.phone,
                })
            ).unwrap().then((res) => {
                if (res.success) {
                    setOpenUserInfoForm(false);
                    toast.success(res.message || "Info updated successfully");
                }
            })
                .catch((error) => {
                    toast.success(error.message || "Info updated successfully");
                })

        } catch {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleErrorChange = (hasError: boolean) => {
        setHasErrors(hasError);
    };


    return (
        <div className='p-4 border w-1/2'>
            <h1 className='my-4 text-xl font-smibold'>{title}</h1>
            {!loading ? (
                <form onSubmit={handleSubmit} className='w-full'>
                    <InputField
                        label="Username"
                        id="username"
                        placeholder="Username"
                        type="text"
                        // value={formData.username}
                        value={authUser?.username || ""}
                        onChange={handleChange}
                        required={true}
                        isPassword={false}
                        onHasError={handleErrorChange}
                    />
                    <div className="space-y-2">
                        <label className="block text-xs md:text-sm/6 font-medium text-[var(--textTwo)] hover:text-[var(--textTwoHover)]">
                            Phone
                        </label>
                        <PhoneInput
                            // value={formData.phone}
                            value={authUser?.phone || ""}
                            onChange={(value) => {
                                setFormData((prev) => ({ ...prev, phone: value || "" }));
                                setHasErrors(false);
                            }}
                            defaultCountry="IN"
                            international
                            placeholder="Enter your phone number"
                            className="w-full"
                            required
                        />
                    </div>
                    <CommonButton text='Update' type='submit' className='my-4' />
                </form>
            ) : (
                <Loader className='animate-spin size-5' />
            )}
        </div>
    )
}

export default UserInfoAddingOrUpdating