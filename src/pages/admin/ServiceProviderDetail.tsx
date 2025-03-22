import { RootState } from "@/utils/redux/appStore";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ServiceProviderDetail = () => {

    const { providerId } = useParams();
    const themeMode = useSelector((store: RootState) => store.state.lightTheme);
    const [tab, setTab] = useState(0);

    const tabButtons: string[] = ["Details", "Address", "Service", "Availability"];

    return (
        <div className="min-h-full border border-[var(--boxBorder)] rounded-lg p-2">
            <div className="w-full h-50 flex justify-center items-center bg-[var(--menuItemHoverBg)]">
                <img className={`h-32 w-32 rounded-full ${!themeMode && "invert"}`} src={'/images/avatar.png'} alt={providerId} />
            </div>

            <ul className="flex justify-around my-2 border-b-2">
                {tabButtons.map((button, index) => (
                    <button className={`p-2 hover:bg-[var(--menuItemHoverBg)] w-3/12 cursor-pointer ${tab === index && `text-[var(--mainColor)] font-bold`}`} onClick={() => setTab(index)}>{button}</button>
                ))}
            </ul>

            <div className="w-full mx-auto mt-8 md:flex justify-center">
                <div className=" p-4 space-y-3 flex-1">
                    <h4 className="font-semibold text-xl">General Information</h4>
                    <div>
                        <label className="text-sm flex items-center my-1">Username</label>
                        <p className="py-1">Midhun K Paniker</p>
                    </div>
                    <div>
                        <label className="text-sm flex items-center my-1">Email</label>
                        <p className="py-1">midhunkalarikkalp@gmail.com</p>
                    </div>
                    <div>
                        <label className="text-sm flex items-center my-1">Phone number</label>
                        <p className="py-1">9890989900</p>
                    </div>
                    <div>
                        <label className="text-sm flex items-center my-1">Joined on</label>
                        <p className="py-1">10 - 10 - 2025</p>
                    </div>
                </div>

                <div className="md:w-1/2 p-4 space-y-3 flex-1">
                    <h4 className="font-semibold text-xl">Verification & Status</h4>
                    <div>
                        <label className="text-sm flex items-center my-1">Email verification</label>
                        <p className="py-1 w-8/12 text-green-600">Verified</p>
                    </div>
                    <div>
                        <label className="text-sm flex items-center my-1">Accound status</label>
                        <p className="py-1 w-8/12 text-blue-600">Active</p>
                    </div>
                    <div>
                        <label className="text-sm flex items-center my-1">Admin verifiction</label>
                        <p className="py-1 w-8/12 text-red-600">Pending</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ServiceProviderDetail