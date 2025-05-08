import { format } from "date-fns";
import { toast } from "react-toastify";
import { dayMap } from "@/utils/constants";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Calendar } from "@/components/ui/calendar";
import DataFetchingError from "../DataFetchingError";
import InfoDisplayComponent from "../InfoDisplayComponent";
import UserPaymentSelection from "@/components/user/UserPaymentSelection";
import { ServiceAvailability, Slot } from "@/utils/interface/serviceAvailabilityInterface";
import ProviderAvailabilityShimmer from "@/components/shimmers/ProviderAvailabilityShimmer";

type ProviderServiceAvailabilityFetchApiFunctionResponseProps = Pick<ServiceAvailability, "availabilities">;

interface ProviderServiceAvailabilityComponentProps {
    providerId?: string;
    fetchApiFuntion: (date: Date, providerId?: string) => Promise<ProviderServiceAvailabilityFetchApiFunctionResponseProps>;
    queryKey: string;
    isUser?: boolean;
}

const ProviderServiceAvailability: React.FC<ProviderServiceAvailabilityComponentProps> = ({
    providerId,
    fetchApiFuntion,
    queryKey,
    isUser
}) => {

    const [tab, setTab] = useState<number>(0);
    const [day, setDay] = useState<string>("");
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [openPayment, setOpenPayment] = useState<boolean>(false);
    const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);

    const { data, isLoading, isError, error } = useQuery({
        queryFn: () => fetchApiFuntion(date || new Date(), providerId),
        queryKey: [queryKey],
        staleTime: 1 * 60 * 1000,
        refetchOnWindowFocus: false,
    });

    const findDayFromCalendar = (date: Date) => {
        const dayName = format(date, "EEE");
        const mapDay = dayMap[dayName];
        setDay(mapDay.day);
        setTab(mapDay.tab);
    }

    useEffect(() => {
        if (!data || !date || date === null) return;
        findDayFromCalendar(date)
    }, [data, date])

    if (isError) {
        return <DataFetchingError message={error.message} />
    }

    if (isLoading) {
        return <ProviderAvailabilityShimmer slotCount={20} />
    }

    if (!data?.availabilities) {
        return <DataFetchingError message="No availability found." />;
    }

    const handleBookAnAppoint = (slotId: string, availability: boolean) => {
        if (!availability) {
            toast.error("Slot already booked.");
            return;
        }
        setSelectedSlotId(slotId);
        setOpenPayment(true);
    }

    return (
        <>
            <div className="flex w-full mx-auto">
                <div>
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className={`rounded-md border mx-1`}
                    />
                </div>
                <div className="table-auto w-full flex flex-col">

                    <div className="border-[var(--boxBorder)] border rounded-md overflow-hidden w-full">
                        <table className="table-auto w-full">
                            <tbody className="w-1/2">
                                <InfoDisplayComponent label="Day" value={data?.availabilities[tab]?.day} />
                                <InfoDisplayComponent label="Start Time" value={data?.availabilities[tab]?.startTime} />
                                <InfoDisplayComponent label="End Time" value={data?.availabilities[tab]?.endTime} />
                                <InfoDisplayComponent label="Duration" value={data?.availabilities[tab]?.duration} />
                                <InfoDisplayComponent label="Service Modes" value={data?.availabilities[tab]?.modes.map((item: string) => item + " ")} isLast />
                            </tbody>
                        </table>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
                        {data.availabilities[tab]?.slots?.length ? (
                            data.availabilities[tab].slots.map((slot: Slot) => {
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

                </div>
            </div>

            {openPayment && selectedSlotId && providerId && (
                <UserPaymentSelection
                    modes={data?.availabilities[tab]?.modes}
                    setOpenPayment={setOpenPayment}
                    providerId={providerId}
                    selectedDay={day}
                    slotId={selectedSlotId}
                    date={date || new Date()}
                />
            )}

        </>
    )
}

export default ProviderServiceAvailability;