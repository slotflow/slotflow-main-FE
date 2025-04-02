import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DataFetchingError from "@/components/common/DataFetchingError";
import { Slot } from "@/utils/interface/serviceAvailabilityInterface";
import InfoDisplayComponent from "@/components/common/InfoDisplayComponent";
import ProviderProfileHead from "@/components/provider/ProviderProfileHead";
import { fetchProviderServiceAvailability } from "@/utils/apis/provider.api";
import ShimmerProviderAvailability from "@/components/shimmers/ShimmerProviderAvailability";

const ProviderAvailability = () => {

    const [tab, setTab] = useState<number>(0);
    const { data, isLoading, isError, error } = useQuery({
        queryFn: () => fetchProviderServiceAvailability(),
        queryKey: ["ProviderServiceAvailability"]
    })

    return (
        <div className="min-h-full border border-[var(--boxBorder)] rounded-lg p-2 flex flex-col">
            <ProviderProfileHead />
            <div className="w-full mx-auto mt-8 p-6 rounded-lg flex-grow">
                {isError ? (
                    <DataFetchingError message={error.message} />
                ) : isLoading ? (
                    <ShimmerProviderAvailability btCount={7} slotCount={20} />
                ) : data ? (
                    <div className="flex space-x-4">
                        <div className="flex flex-col w-3/12 space-y-4 px-2 items-start">
                            {data.availability?.map((avail, index: number) => (
                                <button key={index} className={`w-full cursor-pointer bg-[var(--menuBg)] hover:bg-[var(--menuItemHoverBg)] p-2 rounded-lg ${tab === index && "text-[var(--mainColor)] font-semibold"}`} onClick={() => setTab(index)}>{avail.day}</button>
                            ))}
                        </div>
                        <div className="table-auto w-full flex flex-col">
                            <table className="table-auto border-collapse border border-[var(--boxBorder)] w-full">
                                <tbody className="w-1/2">
                                    <InfoDisplayComponent label="Start Time" value={data && data.availability[tab]?.startTime} />
                                    <InfoDisplayComponent label="End Time" value={data && data.availability[tab]?.endTime} />
                                    <InfoDisplayComponent label="Duration" value={data && data.availability[tab]?.duration} />
                                    <InfoDisplayComponent label="Service Modes" value={data && data.availability[tab]?.modes.map((item: string) => item + " ")} />
                                </tbody>
                            </table>
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 px-2 mt-4">
                                {data && data.availability[tab]?.slots.map((slot: Slot) => (
                                    <div
                                        key={slot._id}
                                        className={`text-xs text-center border rounded-md py-2 px-4 hover:bg-[var(--mainColor)/10] transition-colors duration-200 cursor-pointer ${slot.available ? 'bg-[var(--mainColor)/20] border-[var(--mainColor)]' : 'border-gray-300'}`}
                                    >
                                        {slot.slot}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <DataFetchingError message="No availability found." />
                )}
            </div>
        </div>
    )
}

export default ProviderAvailability;