import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "@/utils/redux/appStore";
import DataFetchingError from "@/components/common/DataFetchingError";
import UserProviderService from "@/components/user/UserProviderService";
import UserProviderAddress from "@/components/user/UserProviderAddress";
import UserProviderProfileDetails from "@/components/user/UserProviderProfileDetails";
import UserProviderServiceAvailability from "@/components/user/UserProviderServiceAvailability";

const UserServiceProviderDetailPage = () => {

    const { providerId } = useParams<string>();
    const [tab, setTab] = useState<number>(0);
    const themeMode = useSelector((store: RootState) => store.state.lightTheme);
    const [providerProfileImg, setProviderProfileImg] = useState<string | null>(null)

    const tabButtons: string[] = ["Details", "Address", "Service", "Availability" ];

    if(!providerId) return <DataFetchingError message={"Provider Profile fetching error"}/>

    return (
        <div className="min-h-full border border-[var(--boxBorder)] rounded-lg p-2 flex flex-col">
            <div className="w-full h-50 flex justify-center items-center bg-[var(--menuItemHoverBg)] rounded-[6px]">
                <img className={`h-32 w-32 rounded-full ${!themeMode && "invert"}`} src={providerProfileImg || '/images/avatar.png'} />
            </div>

            <ul className="flex justify-around my-2 border-2 overflow-x-scroll no-scrollbar">
                {tabButtons.map((button, index) => (
                    <button key={index} className={`p-2 hover:bg-[var(--menuItemHoverBg)] w-3/12 cursor-pointer text-xs md:text-[1rem] ${tab === index && `text-[var(--mainColor)] font-bold`}`} onClick={() => setTab(index)}>{button}</button>
                ))}
            </ul>
            <div className={`flex-grow`}>

            {tab === 0 && (
                <UserProviderProfileDetails _id={providerId} setProfileImage={setProviderProfileImg}/>
            ) || tab === 1 && (
                <UserProviderAddress _id={providerId} />
            ) || tab === 2 && (
                <UserProviderService _id={providerId} />
            ) || tab === 3 && (
                <UserProviderServiceAvailability _id={providerId} />
            )}
            </div>
        </div>
    )
}

export default UserServiceProviderDetailPage