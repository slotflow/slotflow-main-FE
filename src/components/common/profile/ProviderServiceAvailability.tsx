import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Calendar } from "@/components/ui/calendar";
import DataFetchingError from "../DataFetchingError";
import InfoDisplayComponent from "../InfoDisplayComponent";
import CommonPaymentSelection from "../CommonPaymentSelection";
import { Slot } from "@/utils/interface/entityInterface/serviceAvailabilityInterface";
import ProviderAvailabilityShimmer from "@/components/shimmers/ProviderAvailabilityShimmer";
import { ProviderApiFunctionForPSAcomponent, ProviderServiceAvailabilityComponentProps, UserOrAdminApiFunctionForPSAcomponent } from "@/utils/interface/componentInterface/commonComponentInterface";


const ProviderServiceAvailability: React.FC<ProviderServiceAvailabilityComponentProps> = ({
    providerId,
    fetchApiFuntion,
    queryKey,
    isUser
}) => {

    const [date, setDate] = useState<Date | undefined>(new Date());
    const [openPayment, setOpenPayment] = useState<boolean>(false);
    const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
    const [selectedMode, setSelectedMode] = useState<string | null>(null);

    const { data, isLoading, isError, error } = useQuery({
        queryFn: () => {
            if (!date) throw new Error("Missing date");

            if (isUser) {
                if (!providerId) throw new Error("Missing provider _id for user/admin fetch");
                return (fetchApiFuntion as UserOrAdminApiFunctionForPSAcomponent)({ date, providerId });
            } else {
                return (fetchApiFuntion as ProviderApiFunctionForPSAcomponent)(date);
            }
        },
        queryKey: [queryKey, date],
        staleTime: 1 * 60 * 1000,
        refetchOnWindowFocus: false,
        enabled: !!date,
    });

    useEffect(() => {
        if (!data || !date || date === null || !data.modes) {
            return;
        }
        setSelectedMode(data?.modes[0]);
    }, [data, date])

    if (isError) {
        return <DataFetchingError message={error.message} />
    }

    const handleBookAnAppoint = (slotId: string, availability: boolean) => {
        if (!availability) {
            toast.info("Slot is not available.");
            return;
        }
        setSelectedSlotId(slotId);
        setOpenPayment(true);
    }

    return (
        <>
            <div className="flex w-full mt-2 space-x-1">
                <div className="w-[21%]">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className={`rounded-md border border-[var(--boxBorder)]`}
                    />
                </div>

                {isLoading ? (
                    <ProviderAvailabilityShimmer slotCount={20} />
                ) : (
                    <div className="w-full flex flex-col">
                        {!data ? (
                            <DataFetchingError message="No availability found." />
                        ) : (
                            <>
                                <div className="border-[var(--boxBorder)] border rounded-md overflow-hidden w-full">
                                    <table className="table-auto w-full">
                                        <tbody className="w-1/2">
                                            <InfoDisplayComponent label="Day" value={data?.day} />
                                            <InfoDisplayComponent label="Start Time" value={data?.startTime} />
                                            <InfoDisplayComponent label="End Time" value={data?.endTime} />
                                            <InfoDisplayComponent label="Duration" value={data?.duration} />
                                            <InfoDisplayComponent
                                                label="Service Modes"
                                                value={data?.modes}
                                                isRadioGroup
                                                selectedRadioValue={selectedMode}
                                                onRadioChange={(val) => setSelectedMode(val)}
                                                isLast
                                            />
                                        </tbody>
                                    </table>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
                                    {data?.slots?.length ? (
                                        data?.slots.map((slot: Slot) => {
                                            const commonClasses = `text-xs text-center border rounded-md py-2 px-4 hover:bg-[var(--mainColor)] transition-colors duration-200 ${slot.available
                                                ? 'bg-[var(--mainColor)/20] border-[var(--mainColor)]'
                                                : 'border-gray-300'
                                                }`;

                                            return isUser ? (
                                                <button
                                                    key={slot._id}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        handleBookAnAppoint(slot._id, slot.available);
                                                    }}
                                                    className={`${commonClasses} ${slot.available ? 'cursor-pointer' : ''}`}
                                                >
                                                    {slot.time}
                                                </button>
                                            ) : (
                                                <div key={slot._id} className={commonClasses}>
                                                    {slot.time}
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <p className="col-span-full text-sm text-gray-500 text-center">No slots available</p>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>

            {openPayment && selectedSlotId && providerId && selectedMode && (
                <CommonPaymentSelection
                    setOpenPayment={setOpenPayment}
                    data={{
                        providerId,
                        slotId: selectedSlotId,
                        date: date || new Date(),
                        selectedServiceMode: selectedMode
                    }}
                    isAppointmentBooking
                />
            )}

        </>
    )
}

export default ProviderServiceAvailability;