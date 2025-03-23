import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DataFetchingError from "../common/DataFetchingError";
import InfoDisplayComponent from "../common/InfoDisplayComponent";
import { Availability, Slot } from "@/utils/interface/providerInterface";
import { fetchProviderServiceAvailability } from "@/utils/apis/adminProvider.api";
import ShimmerProviderAvailability from "../shimmers/ShimmerProviderAvailability";
import { AdminProviderServiceAvailabilityProps } from "@/utils/interface/adminInterface";

const AdminProviderServiceAvailability: React.FC<AdminProviderServiceAvailabilityProps> = ({ _id, onError }) => {

    const [tab, setTab] = useState(0);
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["PSAvailability", _id],
        queryFn: () => fetchProviderServiceAvailability(_id)
    });

    if (isError) {
        onError(true);
        return (
            <DataFetchingError message={error.message} />
        )
    }

    if (isLoading) {
        return (
            <ShimmerProviderAvailability btCount={6} slotCount={20} />
        )
    }

    return (
        <div className="flex w-full mx-auto mt-8 p-6 rounded-lg">
            <div className="flex flex-col w-3/12 space-y-4 border-r border-[var(--boxBorder)] py-2">
                {data.availability.map((avail: Availability, index: number) => (
                    <button key={index} className={`cursor-pointer bg-[var(--menuBg)] hover:bg-[var(--menuItemHoverBg)] p-2 rounded-lg ${tab === index && "text-[var(--mainColor)] font-semibold"}`} onClick={() => setTab(index)}>{avail.day}</button>
                ))}
            </div>
            <table className="table-auto w-full flex flex-col">
                <tbody className="w-1/2">
                    <InfoDisplayComponent label="Start Time" value={data?.availability[tab]?.startTime} />
                    <InfoDisplayComponent label="End Time" value={data?.availability[tab]?.endTime} />
                    <InfoDisplayComponent label="Duration" value={data?.availability[tab]?.duration} />
                    <InfoDisplayComponent label="Service Modes" value={data?.availability[tab]?.modes.map((item: string) => item + " ")} />
                </tbody>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 px-2">
                    {data?.availability[tab]?.slots.map((slot: Slot) => (
                        <div
                            key={slot._id}
                            className={`text-xs text-center border rounded-md py-2 px-4 hover:bg-[var(--mainColor)/10] transition-colors duration-200 cursor-pointer ${slot.available ? 'bg-[var(--mainColor)/20] border-[var(--mainColor)]' : 'border-gray-300'}`}
                        >
                            {slot.slot}
                        </div>
                    ))}
                </div>
            </table>
        </div>
    )
}

export default AdminProviderServiceAvailability