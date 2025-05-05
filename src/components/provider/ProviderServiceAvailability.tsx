import { format } from "date-fns";
import { toast } from "react-toastify";
import { Calendar } from "../ui/calendar";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DataFetchingError from "../common/DataFetchingError";
import UserPaymentSelection from "../user/UserPaymentSelection";
import InfoDisplayComponent from "../common/InfoDisplayComponent";
import ShimmerProviderAvailability from "../shimmers/ShimmerProviderAvailability";
import { ServiceAvailability, Slot } from "@/utils/interface/serviceAvailabilityInterface";

type ProviderServiceAvailabilityFetchApiFunctionResponseProps = Pick<ServiceAvailability, "availabilities">;

const dayMap: {
    [key: string]: {
        day: string,
        tab: number
    }
} = {
    "Sun": { day: "Sunday", tab: 0 },
    "Mon": { day: "Monday", tab: 1 },
    "Tue": { day: "Tuesday", tab: 2 },
    "Wed": { day: "Wednesday", tab: 3 },
    "Thu": { day: "Thursday", tab: 4 },
    "Fri": { day: "Friday", tab: 5 },
    "Sat": { day: "Saturday", tab: 6 }
}

interface ProviderServiceAvailabilityComponentProps {
    providerId?: string;
    fetchApiFuntion: (date: Date, providerId?: string) => Promise<ProviderServiceAvailabilityFetchApiFunctionResponseProps>;
    userType: "admin" | "user" | "provider";
}

const ProviderServiceAvailability: React.FC<ProviderServiceAvailabilityComponentProps> = ({
    providerId,
    fetchApiFuntion,
    userType
}) => {

    const [tab, setTab] = useState<number>(0);
    const [day, setDay] = useState<string>("");
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [openPayment, setOpenPayment] = useState<boolean>(false);
    const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);

    const { data, isLoading, isError, error } = useQuery({
        queryFn: () => fetchApiFuntion(date || new Date(), providerId),
        queryKey: ["PSAvailability", providerId, date?.toDateString()],
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
        return (
            <DataFetchingError message={error.message} />
        )
    }

    if (isLoading) {
        return (
            <ShimmerProviderAvailability btCount={6} slotCount={20} />
        )
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
            <div className="flex w-full mx-auto p-6 rounded-lg">
                <div>
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className={`rounded-md border mx-1`}
                    />
                </div>
                <div className="table-auto w-full flex flex-col">
                    <table className="table-auto border-collapse border border-[var(--boxBorder)] w-full">
                        <tbody className="w-1/2">
                            <InfoDisplayComponent label="Day" value={data && data.availabilities[tab]?.day} />
                            <InfoDisplayComponent label="Start Time" value={data && data.availabilities[tab]?.startTime} />
                            <InfoDisplayComponent label="End Time" value={data && data.availabilities[tab]?.endTime} />
                            <InfoDisplayComponent label="Duration" value={data && data.availabilities[tab]?.duration} />
                            <InfoDisplayComponent label="Service Modes" value={data && data.availabilities[tab]?.modes.map((item: string) => item + " ")} />
                        </tbody>
                    </table>
                    {(userType === "admin" || userType === "provider") && (
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 px-2 mt-4">
                            {data.availabilities[tab]?.slots?.map((slot: Slot) => (
                                <div
                                    key={slot._id}
                                    className={`text-xs text-center border rounded-md py-2 px-4 hover:bg-[var(--mainColor)/10] transition-colors duration-200 ${slot.available ? 'bg-[var(--mainColor)/20] border-[var(--mainColor)]' : 'border-gray-300'}`}
                                >
                                    {slot.time}
                                </div>
                            )) || "No slots available"}
                        </div>
                    )}
                    {userType === "user" && (
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 px-2 mt-4">
                            {data.availabilities[tab]?.slots?.map((slot: Slot) => (
                                <button
                                    key={slot._id}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleBookAnAppoint(slot?._id, slot.available)
                                    }}
                                    className={`text-xs text-center border rounded-md py-2 px-4 hover:bg-[var(--mainColor)/10] transition-colors duration-200 ${slot.available ? 'bg-[var(--mainColor)/20] border-[var(--mainColor)] cursor-pointer' : 'border-gray-300'}`}
                                >
                                    {slot.time}
                                </button>
                            )) || "No slots available"}
                        </div>
                    )}
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