import { useState } from "react";
import { useParams } from "react-router-dom";
import DataFetchingError from "@/components/common/DataFetchingError";
import ProviderServiceDetails from "@/components/common/profile/ProviderServiceDetails";
import ProviderServiceAvailability from "@/components/common/profile/ProviderServiceAvailability";
import UserOrProviderAddressDetails from "@/components/common/profile/UserOrProviderAddressDetails";
import UserOrProviderProfileDetails from "@/components/common/profile/UserOrProviderProfileDetails";
import { userFetchProviderAddress, userFetchProviderDetails, userFetchProviderService, userFetchProviderServiceAvailability } from "@/utils/apis/user.api";

const UserServiceProviderDetailPage = () => {

    const { providerId } = useParams<string>();
    const [tab, setTab] = useState<number>(0);
    const [providerProfileImg, setProviderProfileImg] = useState<string | null>(null);

    const tabButtons: string[] = ["Details", "Address", "Service", "Availability"];

    if (!providerId) return <DataFetchingError message={"Provider Profile fetching error"} />

    return (
        <div className="min-h-full border border-[var(--boxBorder)] rounded-lg p-2 flex flex-col">
            <div className="w-full h-50 flex justify-center items-center bg-[var(--menuItemHoverBg)] rounded-[6px]">
                <img className={`h-32 w-32 rounded-full`} src={providerProfileImg || '/images/avatar.png'} />
            </div>

            <ul className="flex justify-around my-2 border-2 overflow-x-scroll no-scrollbar">
                {tabButtons.map((button, index) => (
                    <button key={index} className={`p-2 hover:bg-[var(--menuItemHoverBg)] w-3/12 cursor-pointer text-xs md:text-[1rem] ${tab === index && `text-[var(--mainColor)] font-bold`}`} onClick={() => setTab(index)}>{button}</button>
                ))}
            </ul>
            <div className={`flex-grow`}>
                {tab === 0 && (
                    <UserOrProviderProfileDetails fetchApiFunction={() => userFetchProviderDetails(providerId)} queryKey="providerProfile" setProfileImage={setProviderProfileImg} userOrProviderId={providerId} authUserType="user" profileuUserType="provider" />
                ) || tab === 1 && (
                    <UserOrProviderAddressDetails userOrProviderId={providerId} fetchApiFunction={() => userFetchProviderAddress(providerId)} quryKey="providerAddress" authUserType="user" addressUserType="provider" />
                ) || tab === 2 && (
                    <ProviderServiceDetails providerId={providerId} fetchApiFunction={() => userFetchProviderService(providerId)} queryKey="providerService" authUserType="user" />
                ) || tab === 3 && (
                    <ProviderServiceAvailability providerId={providerId} fetchApiFuntion={() => userFetchProviderServiceAvailability(new Date(), providerId)} userType="user" queryKey="providerServiceAvailability" />
                )}
            </div>
        </div>
    )
}

export default UserServiceProviderDetailPage