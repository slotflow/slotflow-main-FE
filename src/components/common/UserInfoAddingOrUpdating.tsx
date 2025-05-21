import CommonButton from './CommonButton';
import InputField from '../form/InputFieldWithLable';
import { useSelector } from 'react-redux';
import { UserData } from '@/utils/interface/sliceInterface';
import { RootState } from '@/utils/redux/appStore';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { HandleChangeFunction } from '@/utils/interface/commonInterface';
import { toast } from 'react-toastify';
import { providerUpdateProviderInfo } from '@/utils/apis/provider.api';

interface UserInfoAddingOrUpdatingComponentInterface {
    title: string;
    userInfo: { username: string, phone: string };
}

const UserInfoAddingOrUpdating: React.FC<UserInfoAddingOrUpdatingComponentInterface> = ({
    title,
    userInfo
}) => {

    const authUser: UserData | null = useSelector((store: RootState) => store.auth.authUser);

    const role: string | null = authUser?.role || null;
    // const verificationToken : string | undefined = authUser?.verificationToken;

    const [hasErrors, setHasErrors] = useState<boolean>(false);
    const [formData, setFormData] = useState<{ username: string, phone: string }>({
        username: "",
        phone: "",
    });

    useEffect(() => {
        if (userInfo) {
            setFormData({
                username: userInfo.username,
                phone: userInfo.phone
            });
        }
    }, [userInfo])

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

        if (role === "PROVIDER") {
            const data = await providerUpdateProviderInfo({ username: formData.username, phone: formData.phone });
            if (data.success) {
                toast.success("Info updated successfully");
            } else {
                toast.error("Info updation failed");
            }
        }
    };

    const handleErrorChange = (hasError: boolean) => {
        setHasErrors(hasError);
    };


    return (
        <div className='p-4 border w-1/2'>
            <h1 className='my-4 text-xl font-smibold'>{title}</h1>
            <form onSubmit={handleSubmit} className='w-full'>
                <InputField
                    label="Username"
                    id="username"
                    placeholder="Username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    required={true}
                    isPassword={false}
                    onHasError={handleErrorChange}
                />
                <InputField
                    label="Phone"
                    id="phone"
                    placeholder="phone"
                    type="text"
                    value={formData.phone}
                    onChange={handleChange}
                    required={true}
                    isPassword={false}
                    onHasError={handleErrorChange}
                />
                <CommonButton text='Update' type='submit' className='my-4' />
            </form>
        </div>
    )
}

export default UserInfoAddingOrUpdating