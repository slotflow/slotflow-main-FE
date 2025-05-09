import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import DataFetchingError from "../DataFetchingError";
import InfoDisplayComponent from "../InfoDisplayComponent";
import { copyToClipboard, formatDate } from "@/utils/helper";
import ProfileDetailsShimmer from "@/components/shimmers/ProfileDetailsShimmer";
import { ProviderFetchProfileDetailsResponseProps } from "@/utils/interface/api/providerApiInterface";
import { AdminFetchProviderProfileDetailsResponseProps } from "@/utils/interface/api/adminProviderApiInterface";
import { UserFetchProviderProfileDetailsResponse, UserFetchUserProfileResponse } from "@/utils/interface/api/userApiInterface";


interface UserOrProviderProfileDetailsComponentProps {
    userOrProviderId?: string;
    fetchApiFunction: (userOrProviderId?: string) => Promise<
        AdminFetchProviderProfileDetailsResponseProps |
        ProviderFetchProfileDetailsResponseProps |
        UserFetchProviderProfileDetailsResponse |
        UserFetchUserProfileResponse
    >;
    queryKey: string;
    adminLookingProvider?: boolean;
    adminLookingUser?: boolean;
    providerSelf?: boolean;
    userSelf?: boolean;
    userLookingProvider?: boolean;
    setProfileImage?: (image: string) => void,
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

    const { data, isLoading, isError, error } = useQuery({
        queryFn: () => fetchApiFunction(userOrProviderId),
        queryKey: [queryKey],
        staleTime: 5 * 60 * 1000,
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
        <div className="border-[var(--boxBorder)] border rounded-md overflow-hidden w-full mt-2">
            <table className="table-auto w-full">
                <tbody className="w-1/2">

                    {/* Admin looking provider profile */}
                    {adminLookingProvider && (() => {
                        const providerProfileData = data as (AdminFetchProviderProfileDetailsResponseProps);
                        return (
                            <>
                                <InfoDisplayComponent label="Username" value={providerProfileData.username} />
                                <InfoDisplayComponent label="Email" value={providerProfileData.email} copyToClipboard={copyToClipboard} />
                                <InfoDisplayComponent label="Phone Number" value={providerProfileData.phone ?? 'Not yet added'} copyToClipboard={copyToClipboard} />
                                <InfoDisplayComponent label="Slotflow Trusted" value={providerProfileData.trustedBySlotflow} isBoolean={true} />
                                <InfoDisplayComponent label="Joined On" value={providerProfileData.createdAt} formatDate={formatDate} />
                                <InfoDisplayComponent label="Email Verified" value={providerProfileData.isEmailVerified} isBoolean={true} />
                                <InfoDisplayComponent label="Account Blocked" value={providerProfileData.isBlocked} isBoolean={true} />
                                <InfoDisplayComponent label="Admin Verified" value={providerProfileData.isAdminVerified} isBoolean={true} />
                            </>
                        );
                    })()}

                    {/* // TODO */}
                    {/* Admin looking user profile */}

                    {/* Provider looking self profile */}
                    {providerSelf && (() => {
                        const providerProfileData = data as (ProviderFetchProfileDetailsResponseProps);
                        return (
                            <>
                                <InfoDisplayComponent label="Username" value={providerProfileData.username} />
                                <InfoDisplayComponent label="Email" value={providerProfileData.email} copyToClipboard={copyToClipboard} />
                                <InfoDisplayComponent label="Phone Number" value={providerProfileData.phone ?? 'Not yet added'} copyToClipboard={copyToClipboard} />
                                <InfoDisplayComponent label="Slotflow Trusted" value={providerProfileData.trustedBySlotflow} isBoolean={true} />
                                <InfoDisplayComponent label="Joined On" value={providerProfileData.createdAt} formatDate={formatDate} />
                                <InfoDisplayComponent label="Email Verified" value={providerProfileData.isEmailVerified} isBoolean={true} />
                                <InfoDisplayComponent label="Account Blocked" value={providerProfileData.isBlocked} isBoolean={true} />
                                <InfoDisplayComponent label="Admin Verified" value={providerProfileData.isAdminVerified} isBoolean={true} />
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
                                <InfoDisplayComponent label="Phone Number" value={providerProfileData.phone ?? 'Not yet added'} copyToClipboard={copyToClipboard} />
                                <InfoDisplayComponent label="Slotflow Trusted" value={providerProfileData.trustedBySlotflow} isBoolean={true} />
                            </>
                        );
                    })()}

                    {/* User looking self profile */}
                    {userSelf && (() => {
                        const userProfileData = data as (UserFetchUserProfileResponse);
                        return (
                            <>
                                <InfoDisplayComponent label="Username" value={userProfileData?.username} />
                                <InfoDisplayComponent label="Email" value={userProfileData?.email} />
                                <InfoDisplayComponent label="Phone Number" value={userProfileData?.phone} />
                                <InfoDisplayComponent label="Joined On" value={userProfileData?.createdAt} formatDate={formatDate} />
                                <InfoDisplayComponent label="Email Verified" value={userProfileData?.isEmailVerified} isBoolean={true} />
                                <InfoDisplayComponent label="Account Blocked" value={userProfileData?.isBlocked} isBoolean={true} />
                            </>
                        );
                    })()}

                </tbody>
            </table>
        </div>
    )
}

export default UserOrProviderProfileDetails