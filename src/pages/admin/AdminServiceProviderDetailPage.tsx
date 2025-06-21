import { useState } from "react";
import { useParams } from "react-router-dom";
import ProfileHead from "@/components/common/profile/ProfileHead";
import DataFetchingError from "@/components/common/DataFetchingError";
import AdminProviderPayments from "@/components/admin/AdminProviderPayments";
import ProfileHorizontalTabs from "@/components/common/ProfileHorizontalTabs";
import AdminProviderSubscriptions from "@/components/admin/AdminProviderSubscriptions";
import ProviderServiceDetails from "@/components/common/profile/ProviderServiceDetails";
import ProviderServiceAvailability from "@/components/common/profile/ProviderServiceAvailability";
import UserOrProviderAddressDetails from "@/components/common/profile/UserOrProviderAddressDetails";
import UserOrProviderProfileDetails from "@/components/common/profile/UserOrProviderProfileDetails";
import { adminFetchProviderServiceAvailability, adminFetchProviderAddress, adminFetchProviderProfileDetails, adminFetchProviderService } from "@/utils/apis/adminProvider.api";

const AdminServiceProviderDetailPage = () => {

    const { providerId } = useParams();
    const [tab, setTab] = useState<number>(0);
    

    if (!providerId) return <DataFetchingError message={"Provider Profile fetching error"} />

    return (
        <div className="min-h-full border border-[var(--boxBorder)] rounded-lg p-2 flex flex-col">

            <ProfileHead updation={false} profileImage={"/images/avatar.png"} />

            <ProfileHorizontalTabs isAdmin={true} setTab={setTab} tab={tab} />

            <div className={`flex-grow`}>
                {tab === 0 && (
                    <UserOrProviderProfileDetails fetchApiFunction={() => adminFetchProviderProfileDetails(providerId)} queryKey="providerProfile" userOrProviderId={providerId} adminLookingProvider shimmerRow={8} />
                ) || tab === 1 && (
                    <UserOrProviderAddressDetails userOrProviderId={providerId} fetchApiFunction={() => adminFetchProviderAddress(providerId)} quryKey="providerAddress" />
                ) || tab === 2 && (
                    <ProviderServiceDetails providerId={providerId} fetchApiFunction={() => adminFetchProviderService(providerId)} queryKey="providerService" />
                ) || tab === 3 && (
                    <ProviderServiceAvailability providerId={providerId} fetchApiFuntion={adminFetchProviderServiceAvailability} queryKey="providerServiceAvailability" role="Admin"/>
                ) || tab === 4 && (
                    <AdminProviderSubscriptions providerId={providerId} />
                ) || tab === 5 && (
                    <AdminProviderPayments providerId={providerId} />
                )}
            </div>
            
        </div>
    )
}

export default AdminServiceProviderDetailPage