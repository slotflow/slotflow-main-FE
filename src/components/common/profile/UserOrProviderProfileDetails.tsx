import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import DataFetchingError from "../DataFetchingError";
import InfoDisplayComponent from "../InfoDisplayComponent";
import { copyToClipboard, formatDate } from "@/utils/helper";
import ShimmerProfileDetails from "@/components/shimmers/ShimmerProfileDetails";
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
    authUserType: "admin" | "user" | "provider";
    profileuUserType: "user" | "provider";
    setProfileImage?: (image: string) => void,
}

const UserOrProviderProfileDetails: React.FC<UserOrProviderProfileDetailsComponentProps> = ({
    userOrProviderId,
    fetchApiFunction,
    queryKey,
    authUserType,
    profileuUserType,
    setProfileImage
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
        return (
            <DataFetchingError message={error?.message} />
        )
    }

    if (isLoading) {
        return (
            <div className="w-full mx-auto md:flex justify-start flex-grow bg">
                <ShimmerProfileDetails row={7} />
            </div>
        )
    }

    if (!data) {
        return <DataFetchingError message="No Profile details found." />;
    }

    return (
        <div className="w-full mx-auto py-6 rounded-lg">
            <table className="table-auto border-collapse border border-[var(--boxBorder)] w-full">
                <tbody>

                    {/* Admin looking provider profile */}
                    {(authUserType === "admin" && profileuUserType === "provider") && (() => {
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
                    {(authUserType === "provider" && profileuUserType === "provider") && (() => {
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
                    {(authUserType === "user" && profileuUserType === "provider") && (() => {
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
                    {(authUserType === "user" && profileuUserType === "user") && (() => {
                        const userProfileData = data as (UserFetchUserProfileResponse);
                        return (
                            <>
                                <InfoDisplayComponent label="Username" value={data?.username} />
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