import { useState } from "react";
import { useParams } from "react-router-dom";
import ProfileHead from "@/components/common/profile/ProfileHead";
import DataFetchingError from "@/components/common/DataFetchingError";
import ProfileHorizontalTabs from "@/components/common/ProfileHorizontalTabs";
import ProviderServiceDetails from "@/components/common/profile/ProviderServiceDetails";
import ProviderServiceAvailability from "@/components/common/profile/ProviderServiceAvailability";
import UserOrProviderAddressDetails from "@/components/common/profile/UserOrProviderAddressDetails";
import UserOrProviderProfileDetails from "@/components/common/profile/UserOrProviderProfileDetails";
import { userFetchProviderAddress, userFetchProviderDetails, userFetchProviderService, userFetchProviderServiceAvailability } from "@/utils/apis/user.api";

const UserServiceProviderDetailPage = () => {

    const { providerId } = useParams<string>();
    const [tab, setTab] = useState<number>(0);

    if (!providerId) return <DataFetchingError message={"Provider Profile fetching error"} />

    return (
        <div className="min-h-full p-2 flex flex-col">

            <ProfileHead updation={false} />

            <ProfileHorizontalTabs isAdmin={false} setTab={setTab} tab={tab} />

            <div className={`flex-grow`}>
                {tab === 0 && (
                    <UserOrProviderProfileDetails fetchApiFunction={() => userFetchProviderDetails(providerId)} queryKey="providerProfile" userOrProviderId={providerId} userLookingProvider shimmerRow={4} />
                ) || tab === 1 && (
                    <UserOrProviderAddressDetails userOrProviderId={providerId} fetchApiFunction={() => userFetchProviderAddress(providerId)} queryKey="providerAddress" />
                ) || tab === 2 && (
                    <ProviderServiceDetails providerId={providerId} fetchApiFunction={() => userFetchProviderService(providerId)} queryKey="providerService" isUser shimmerRow={5} />
                ) || tab === 3 && (
                    <ProviderServiceAvailability providerId={providerId} fetchApiFuntion={userFetchProviderServiceAvailability} queryKey="providerServiceAvailability" role="User" />
                )}
            </div>

        </div>
    )
}

export default UserServiceProviderDetailPage