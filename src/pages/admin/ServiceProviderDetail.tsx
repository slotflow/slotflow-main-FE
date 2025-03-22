import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "@/utils/redux/appStore";
import AdminProviderFUllPageDynamicSection from "@/components/admin/AdminProviderFUllPageDynamicSection";

const ServiceProviderDetail = () => {

    const { providerId } = useParams();
    const [tab, setTab] = useState(0);
    const themeMode = useSelector((store: RootState) => store.state.lightTheme);
    const [hasError, setHasError] = useState<boolean>(false);

    const tabButtons: string[] = ["Details", "Address", "Service", "Availability"];

    if(!providerId) return (
        <div>No rpovider found</div>
    )

    return (
        <div className="min-h-full border border-[var(--boxBorder)] rounded-lg p-2 flex flex-col">
            <div className="w-full h-50 flex justify-center items-center bg-[var(--menuItemHoverBg)]">
                <img className={`h-32 w-32 rounded-full ${!themeMode && "invert"}`} src={'/images/avatar.png'} />
            </div>

            <ul className="flex justify-around my-2 border-2">
                {tabButtons.map((button, index) => (
                    <button className={`p-2 hover:bg-[var(--menuItemHoverBg)] w-3/12 cursor-pointer ${tab === index && `text-[var(--mainColor)] font-bold`}`} onClick={() => setTab(index)}>{button}</button>
                ))}
            </ul>
            <div className={`flex-grow ${hasError && "flex items-center"}`}>

              <AdminProviderFUllPageDynamicSection _id={providerId} onError={setHasError} providerData={tab}/>
            </div>
        </div>
    )
}

export default ServiceProviderDetail