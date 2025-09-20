import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { RootState } from "@/utils/redux/appStore";
import DataFetchingError from "../DataFetchingError";
import InfoDisplayComponent from "../InfoDisplayComponent";
import { copyToClipboard, formatDate } from "@/utils/helper";
import ProfileDetailsShimmer from "@/components/shimmers/ProfileDetailsShimmer";
import { ProviderFetchProfileDetailsResponse } from "@/utils/interface/api/providerApiInterface";
import { AdminFetchProviderProfileDetailsResponse } from "@/utils/interface/api/adminProviderApiInterface";
import { UserFetchProviderProfileDetailsResponse, UserFetchUserProfileDetailsResponse } from "@/utils/interface/api/userApiInterface";


interface UserOrProviderProfileDetailsComponentProps {
    userOrProviderId?: string;
    fetchApiFunction: (userOrProviderId?: string) => Promise<
        AdminFetchProviderProfileDetailsResponse |
        ProviderFetchProfileDetailsResponse |
        UserFetchProviderProfileDetailsResponse |
        UserFetchUserProfileDetailsResponse
    >;
    queryKey: string;
    adminLookingProvider?: boolean;
    adminLookingUser?: boolean;
    providerSelf?: boolean;
    userSelf?: boolean;
    userLookingProvider?: boolean;
    setProfileImage?: (image: string) => void;
    shimmerRow: number;
}

const UserOrProviderProfileDetails: React.FC<UserOrProviderProfileDetailsComponentProps> = ({
    userOrProviderId,
    fetchApiFunction,
    queryKey,
    adminLookingProvider,
    // adminLookingUser,
    providerSelf,
    userSelf,
    userLookingProvider,
    setProfileImage,
    shimmerRow,
}) => {

    const { authUser } = useSelector((state: RootState) => state.auth);
    const { data, isLoading, isError, error } = useQuery({
        queryFn: () => fetchApiFunction(userOrProviderId),
        queryKey: [queryKey],
        staleTime: 60 * 60 * 1000,
        refetchOnWindowFocus: false,
    })

    useEffect(() => {
        if (setProfileImage && data && "profileImage" in data && data?.profileImage) {
            setProfileImage(data.profileImage);
        }
    }, [data, setProfileImage]);

    if (isError) {
        return <DataFetchingError message={error?.message} />
    }

    if (isLoading) {
        return <ProfileDetailsShimmer row={shimmerRow || 7} className="mt-2" />
    }

    if (!data) {
        return <DataFetchingError message="No Profile details found." />;
    }

    return (
        <div className=" border rounded-md overflow-hidden w-full mt-2">
            <table className="table-auto w-full">
                <tbody className="w-1/2">

                    {/* Admin looking provider profile */}
                    {adminLookingProvider && (() => {
                        const providerProfileData = data as (AdminFetchProviderProfileDetailsResponse);
                        return (
                            <>
                                <InfoDisplayComponent label="Username" value={providerProfileData.username} />
                                <InfoDisplayComponent label="Email" value={providerProfileData.email} copyToClipboard={copyToClipboard} />
                                <InfoDisplayComponent label="Phone Number" value={providerProfileData.phone ?? 'Not yet added'} />
                                <InfoDisplayComponent label="Slotflow Trusted" value={providerProfileData.trustedBySlotflow} isBoolean={true} />
                                <InfoDisplayComponent label="Joined On" value={providerProfileData.createdAt} formatDate={formatDate} />
                                <InfoDisplayComponent label="Email Verified" value={providerProfileData.isEmailVerified} isBoolean={true} />
                                <InfoDisplayComponent label="Account Blocked" value={providerProfileData.isBlocked} isBoolean={true} />
                                <InfoDisplayComponent label="Admin Verified" value={providerProfileData.isAdminVerified} isBoolean={true} isLast />
                            </>
                        );
                    })()}

                    {/* // TODO */}
                    {/* Admin looking user profile */}

                    {/* Provider looking self profile */}
                    {providerSelf && (() => {
                        const providerProfileData = data as (ProviderFetchProfileDetailsResponse);
                        return (
                            <>
                                <InfoDisplayComponent label="Username" value={authUser?.username || providerProfileData.username} />
                                <InfoDisplayComponent label="Email" value={authUser?.email || providerProfileData.email} />
                                <InfoDisplayComponent label="Phone Number" value={authUser?.phone || providerProfileData.phone || 'Not yet added'} />
                                <InfoDisplayComponent label="Slotflow Trusted" value={providerProfileData.trustedBySlotflow} isBoolean={true} />
                                <InfoDisplayComponent label="Joined On" value={providerProfileData.createdAt} formatDate={formatDate} />
                                <InfoDisplayComponent label="Email Verified" value={providerProfileData.isEmailVerified} isBoolean={true} />
                                <InfoDisplayComponent label="Account Blocked" value={providerProfileData.isBlocked} isBoolean={true} />
                                <InfoDisplayComponent label="Admin Verified" value={providerProfileData.isAdminVerified} isBoolean={true} isLast />
                            </>
                        );
                    })()}

                    {/* User looking provider profile */}
                    {userLookingProvider && (() => {
                        const providerProfileData = data as (UserFetchProviderProfileDetailsResponse);
                        return (
                            <>
                                <InfoDisplayComponent label="Username" value={providerProfileData.username} />
                                <InfoDisplayComponent label="Email" value={providerProfileData.email} copyToClipboard={copyToClipboard} />
                                <InfoDisplayComponent label="Phone Number" value={providerProfileData.phone ?? 'Not yet added'} />
                                <InfoDisplayComponent label="Slotflow Trusted" value={providerProfileData.trustedBySlotflow} isBoolean={true} isLast />
                            </>
                        );
                    })()}

                    {/* User looking self profile */}
                    {userSelf && (() => {
                        const userProfileData = data as (UserFetchUserProfileDetailsResponse);
                        return (
                            <>
                                <InfoDisplayComponent label="Username" value={authUser?.username || userProfileData?.username} />
                                <InfoDisplayComponent label="Email" value={authUser?.email || userProfileData?.email} />
                                <InfoDisplayComponent label="Phone Number" value={authUser?.phone || userProfileData?.phone} />
                                <InfoDisplayComponent label="Joined On" value={userProfileData?.createdAt} formatDate={formatDate} />
                                <InfoDisplayComponent label="Email Verified" value={userProfileData?.isEmailVerified} isBoolean={true} />
                                <InfoDisplayComponent label="Account Blocked" value={userProfileData?.isBlocked} isBoolean={true} isLast />
                            </>
                        );
                    })()}

                </tbody>
            </table>
        </div>
    )
}

export default UserOrProviderProfileDetails