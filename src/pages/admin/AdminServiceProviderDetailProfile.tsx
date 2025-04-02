import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "@/utils/redux/appStore";
import DataFetchingError from "@/components/common/DataFetchingError";
import AdmiProviderService from "@/components/admin/AdmiProviderService";
import AdminProviderAddress from "@/components/admin/AdminProviderAddress";
import AdminProviderDetails from "@/components/admin/AdminProviderDetails";
import AdminProviderServiceAvailability from "@/components/admin/AdminProviderServiceAvailability";
import AdminProviderSubscriptions from "@/components/admin/AdminProviderSubscriptions";
import AdminProviderPayments from "@/components/admin/AdminProviderPayments";

const AdminServiceProviderDetailProfile = () => {

    const { providerId } = useParams();
    const [tab, setTab] = useState<number>(0);
    const themeMode = useSelector((store: RootState) => store.state.lightTheme);

    const tabButtons: string[] = ["Details", "Address", "Service", "Availability", "Subscriptions", "Payments"];

    if(!providerId) return <DataFetchingError message={"Provider Profile fetching error"}/>

    return (
        <div className="min-h-full border border-[var(--boxBorder)] rounded-lg p-2 flex flex-col">
            <div className="w-full h-50 flex justify-center items-center bg-[var(--menuItemHoverBg)] rounded-[6px]">
                <img className={`h-32 w-32 rounded-full ${!themeMode && "invert"}`} src={'/images/avatar.png'} />
            </div>

            <ul className="flex justify-around my-2 border-2 overflow-x-scroll no-scrollbar">
                {tabButtons.map((button, index) => (
                    <button key={index} className={`p-2 hover:bg-[var(--menuItemHoverBg)] w-3/12 cursor-pointer text-xs md:text-[1rem] ${tab === index && `text-[var(--mainColor)] font-bold`}`} onClick={() => setTab(index)}>{button}</button>
                ))}
            </ul>
            <div className={`flex-grow`}>

            {tab === 0 && (
                <AdminProviderDetails _id={providerId} />
            ) || tab === 1 && (
                <AdminProviderAddress userId={providerId} />
            ) || tab === 2 && (
                <AdmiProviderService providerId={providerId} />
            ) || tab === 3 && (
                <AdminProviderServiceAvailability _id={providerId} />
            ) || tab === 4 && (
                <AdminProviderSubscriptions _id={providerId} />
            ) || tab === 5 && (
                <AdminProviderPayments _id={providerId} />
            )}
            </div>
        </div>
    )
}

export default AdminServiceProviderDetailProfile