import { toast } from 'react-toastify';
import React, { useEffect } from 'react';
import { formatDate } from '@/utils/helper';
import { useQuery } from '@tanstack/react-query';
import { Check, UserRoundPen, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { } from '@/utils/interface/api/userApiInterface';
import GoogleButton from '@/components/form/GoogleButton';
import { AppDispatch, RootState } from '@/utils/redux/appStore';
import ProfileHead from '@/components/common/profile/ProfileHead';
import { handleConnectGoogle } from '@/utils/helper/googleConnect';
import { updateGoogleConnect } from '@/utils/redux/slices/authSlice';
import DataFetchingError from '@/components/common/DataFetchingError';
import { userFetchUserProfileDetails, userUpdateUserProfileImage } from '@/utils/apis/user.api';
import { providerFetchProviderProfileDetails, providerUpdateProviderProfileImage } from '@/utils/apis/provider.api';

const SettingsPage: React.FC = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { authUser } = useSelector((state: RootState) => state.auth);

    const isProvider = authUser?.role === "PROVIDER";

    const fetchApiFunction = isProvider
        ? providerFetchProviderProfileDetails
        : userFetchUserProfileDetails;

    const { data: profileData, isLoading: profileDataLoading, isError: profileDataIsError, error: profileDataError } = useQuery({
        queryFn: () => fetchApiFunction(),
        queryKey: ["profileData"],
        staleTime: 60 * 60 * 1000,
        refetchOnWindowFocus: false,
    })

    const updateProfileImageApiFunction = isProvider
        ? providerUpdateProviderProfileImage
        : userUpdateUserProfileImage;

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const data = params.get("response");
        if (!data) return;
        try {
            const response = JSON.parse(decodeURIComponent(data));
            if (!response.success) {
                toast.error("Google connection failed, please try again");
            } else {
                dispatch(updateGoogleConnect());
                toast.success("Google successfully connected!");
            }
        } catch (err) {
            toast.error("Invalid response from Google connect");
            console.error("Google connect parse error:", err);
        } finally {
            const url = new URL(window.location.href);
            url.searchParams.delete("response");
            window.history.replaceState({}, "", url.toString());
        }
    }, [dispatch]);

    if (!authUser) return <DataFetchingError message='User not found' />

    return (
        <div className="min-h-full p-2 flex flex-col">
            <div className='flex space-x-2 justify-center'>
                <UserRoundPen />
                <h2 className="text-xl font-semibold mb-4"> Account Settings</h2>
            </div>

            <ProfileHead updateProfileImageApiFunction={updateProfileImageApiFunction} updation={true} showDetails />


            <div className="border-[var(--boxBorder)] border rounded-md overflow-hidden w-full mt-2">
                <table className="table-auto w-full">
                    <tbody>
                        {(profileDataIsError && profileDataError) ? (
                            <DataFetchingError message="Profile details fetching error" />
                        ) : profileData && (
                            <>
                                <tr className={`${"border-b border-[var(--boxBorder)]"}`}>
                                    <td className="p-4 font-medium text-[var(--infoDataLabel)] w-4/12">Username</td>
                                    <td className="p-4 w-8/12">{profileDataLoading ? "Fetching.." : profileData.username}</td>
                                </tr>
                                <tr className={`${"border-b border-[var(--boxBorder)]"}`}>
                                    <td className="p-4 font-medium text-[var(--infoDataLabel)] w-4/12">Email</td>
                                    <td className="p-4 w-8/12">{profileDataLoading ? "Fetching.." : profileData.email}</td>
                                </tr>
                                <tr className={`${"border-b border-[var(--boxBorder)]"}`}>
                                    <td className="p-4 font-medium text-[var(--infoDataLabel)] w-4/12">Phone</td>
                                    <td className="p-4 w-8/12">{profileDataLoading ? "Fetching.." : profileData.phone ?? "Not yet added"}</td>
                                </tr>
                                <tr className={`${"border-b border-[var(--boxBorder)]"}`}>
                                    <td className="p-4 font-medium text-[var(--infoDataLabel)] w-4/12">Account Status</td>
                                    <td className="p-4 w-8/12">{profileDataLoading ? "Fetching.." : profileData.isBlocked ? <span className='text-red-500'>Blocked</span> : <span className='text-green-500'>Active</span>}</td>
                                </tr>
                                <tr className={`${"border-b border-[var(--boxBorder)]"}`}>
                                    <td className="p-4 font-medium text-[var(--infoDataLabel)] w-4/12">Email Verified</td>
                                    <td className="p-4 w-8/12">{profileDataLoading ? "Fetching.." : profileData.isEmailVerified ? <span className='text-green-500'>Verified</span> : <span className='text-red-500'>Pending</span>}</td>
                                </tr>
                                <tr className={`${"border-b border-[var(--boxBorder)]"}`}>
                                    <td className="p-4 font-medium text-[var(--infoDataLabel)] w-4/12">Joined On</td>
                                    <td className="p-4 w-8/12">{profileDataLoading ? "Fetching.." : formatDate(profileData.createdAt)}</td>
                                </tr>
                            </>
                        )}
                        {authUser.role === "PROVIDER" && (
                            <>
                                <tr className={`${"border-b border-[var(--boxBorder)]"}`}>
                                    <td className="p-4 font-medium text-[var(--infoDataLabel)] w-4/12">Address Added</td>
                                    <td className="p-4 w-8/12">{authUser.isAddressAdded ? <Check className="text-green-500" /> : <X className="text-red-500" />}</td>
                                </tr>
                                <tr className={`${"border-b border-[var(--boxBorder)]"}`}>
                                    <td className="p-4 font-medium text-[var(--infoDataLabel)] w-4/12">Service Details Added</td>
                                    <td className="p-4 w-8/12">{authUser.isServiceDetailsAdded ? <Check className="text-green-500" /> : <X className="text-red-500" />}</td>
                                </tr>
                                <tr className={`${"border-b border-[var(--boxBorder)]"}`}>
                                    <td className="p-4 font-medium text-[var(--infoDataLabel)] w-4/12">Service Availability Added</td>
                                    <td className="p-4 w-8/12">{authUser.isServiceAvailabilityAdded ? <Check className="text-green-500" /> : <X className="text-red-500" />}</td>
                                </tr>
                                <tr className={`${"border-b border-[var(--boxBorder)]"}`}>
                                    <td className="p-4 font-medium text-[var(--infoDataLabel)] w-4/12">Subscription</td>
                                    <td className="p-4 w-8/12">{authUser.providerSubscription ? <Check className="text-green-500" /> : <X className="text-red-500" />}</td>
                                </tr>
                            </>
                        )}
                        <tr className={`${"border-b border-[var(--boxBorder)]"}`}>
                            <td className="p-4 font-medium text-[var(--infoDataLabel)] w-4/12">Google Connected</td>
                            <td className="p-4 w-8/12">{authUser.googleConnected ? <Check className="text-green-500" /> : <GoogleButton text='Connect Google' onClick={handleConnectGoogle} className="w-full md:w-4/12" />}</td>
                        </tr>
                        <tr className={`${"border-b border-[var(--boxBorder)]"}`}>
                            <td className="p-4 font-medium text-[var(--infoDataLabel)] w-4/12">Info updated on</td>
                            <td className="p-4 w-8/12">{formatDate(authUser.updatedAt)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SettingsPage