import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import UserPaymentSelection from './UserPaymentSelection';
import DataFetchingError from '../common/DataFetchingError';
import InfoDisplayComponent from '../common/InfoDisplayComponent';
import { Slot } from '@/utils/interface/serviceAvailabilityInterface';
import { userFetchProviderServiceAvailability } from '@/utils/apis/user.api';
import ShimmerProviderAvailability from '../shimmers/ShimmerProviderAvailability';
import { UserProviderServiceAvailabilityProps } from '@/utils/interface/userInterface';
import CommonButton from '../common/CommonButton';

const UserProviderServiceAvailability: React.FC<UserProviderServiceAvailabilityProps> = ({ _id }) => {

    const [openPayment, setOpenPayment] = useState<boolean>(false);
    const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
    const [tab, setTab] = useState<number>(0);
    const [day, setDay] = useState<string>("");
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [showCalendar, setShowCalendar] = useState<boolean>(false);

    const { data, isLoading, isError, error } = useQuery({
        queryFn: () => userFetchProviderServiceAvailability(_id),
        queryKey: ["PSAvailability", _id],
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        setOpenPayment(false);
        if (!data) return;
        setDay(data?.availability[0].day || "")
    }, [data])

    if (!data?.availability) {
        return <DataFetchingError message="No availability found." />;
    }

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
            <div className='px-8 space-y-4'>
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className={`rounded-md border w-3/12 ${!showCalendar && 'hidden'}`}
                />
            </div>
            <div className="flex w-full mx-auto p-6 rounded-lg">
                <div className="flex flex-col w-3/12 space-y-4 px-2 items-start">
                <CommonButton 
                    onClick={() => setShowCalendar(!showCalendar)} 
                    text={`${showCalendar ? "Close calendar" : "Show calendar"}`}
                />
                    {data && data.availability?.map((avail, index: number) => (
                        <button key={index} className={`w-full cursor-pointer bg-[var(--menuBg)] hover:bg-[var(--menuItemHoverBg)] p-2 rounded-lg ${tab === index && "text-[var(--mainColor)] font-semibold"}`} onClick={() => { setTab(index); setDay(avail.day) }}>{avail.day}</button>
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
                        {data.availability[tab]?.slots?.map((slot: Slot) => (
                            <button
                                key={slot._id}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleBookAnAppoint(slot?._id, slot.available)
                                }}
                                className={`text-xs text-center border rounded-md py-2 px-4 hover:bg-[var(--mainColor)/10] transition-colors duration-200 ${slot.available ? 'bg-[var(--mainColor)/20] border-[var(--mainColor)] cursor-pointer' : 'border-gray-300'}`}
                            >
                                {slot.slot}
                            </button>
                        )) || "No slots available"}
                    </div>
                </div>
            </div>
            {openPayment && selectedSlotId && (
                <UserPaymentSelection
                    modes={data?.availability[tab]?.modes}
                    setOpenPayment={setOpenPayment}
                    providerId={_id}
                    selectedDay={day}
                    slotId={selectedSlotId}
                    date={date || new Date()}
                />
            )}
        </>
    )
}

export default UserProviderServiceAvailability