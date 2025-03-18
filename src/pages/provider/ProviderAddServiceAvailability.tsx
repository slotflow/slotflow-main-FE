import React, { useState, ChangeEvent, FormEvent } from 'react';
import RightSideBox from '@/components/admin/RightSideBox';
import SelectFiledWithLabel from '@/components/form/SelectFiledWithLabel';
import CustomButton from '@/components/button/CustomButton';
import { addAvailability } from '@/utils/redux/slices/providerSlice';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/utils/redux/appStore';
// import CustomButton from '@/components/button/CustomButton';

interface TimeSlot {
  startTime: string;
  endTime: string;
}


const ProviderAddServiceAvailability = () => {
  console.log("rendering")
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedDay, setSelectedDay] = useState<string>('Sunday');
  const [selectedDuration, setSelectedDuration] = useState<string>("15 mimnutes");
  const [timeSlots, setTimeSlots] = useState<string[]>([])
  const [newTimeSlot, setNewTimeSlot] = useState<TimeSlot>({
    startTime: '00:00',
    endTime: '00:00',
  });
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
  const { availabilities } = useSelector((store: RootState) => store.provider);

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const serviceDurations = ['15 minutes', '30 minutes', '1 hour'];

  const handleDayChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedDay(e.target.value);
  };

  const handleDurationChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedDuration(e.target.value);
  };

  const handleStartTimeChange = (time: string) => {
    setNewTimeSlot({ ...newTimeSlot, startTime: time });
  };

  const handleEndTimeChange = (time: string) => {
    setNewTimeSlot({ ...newTimeSlot, endTime: time });
  };

  const generateTimeSlots = (startTime: string, endTime: string, intervalMinutes: string): void => {
    const slots: string[] = [];
    let currentTime = startTime;
    let interval = 0;

    if (intervalMinutes === "15 minutes") {
      interval = 15;
    } else if (intervalMinutes === "30 minutes") {
      interval = 30;
    } else if (intervalMinutes === "1 hour") {
      interval = 60;
    }

    while (currentTime <= endTime) {
      slots.push(format12HourTime(currentTime));
      const [hours, minutes] = currentTime.split(':').map(Number);
      const nextMinutes = minutes + interval;
      const nextHours = hours + Math.floor(nextMinutes / 60);
      const nextMinutesAdjusted = nextMinutes % 60;
      currentTime = `${String(nextHours).padStart(2, '0')}:${String(nextMinutesAdjusted).padStart(2, '0')}`;
    }
    setTimeSlots(slots);
  };

  const format12HourTime = (time24: string): string => {
    const [hours, minutes] = time24.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 === 0 ? 12 : hours % 12;
    return `${hour12}:${String(minutes).padStart(2, '0')} ${period}`;
  };

  const handleTimeSlotAdding = (timeSlot: string) => {
    if (selectedTimeSlots.includes(timeSlot)) {
      setSelectedTimeSlots(selectedTimeSlots.filter((slot) => slot !== timeSlot));
    } else {
      setSelectedTimeSlots([...selectedTimeSlots, timeSlot]);
    }
  };

  const handleAddAvailability = () => {
    const data = {
      day : selectedDay,
      duration : selectedDuration,
      startTime : newTimeSlot.startTime,
      endTime : newTimeSlot.endTime,
      slots : selectedTimeSlots
    }
    dispatch(addAvailability(data));
    console.log("availability : ",data);
    toast.success(`${selectedDay} availability added.`);
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if(availabilities.length === 0){
      toast.info("You didnt added any availability.");
      setLoading(false);
      return;
    }
    console.log("Availability : ",availabilities)
  }


  return (
    <div className="h-screen pt-16 flex justify-center w-full bg-[var(--background)]">

      <div className="w-8/12 px-10 overflow-y-scroll no-scrollbar">
        <form className="mt-10 p-12" onSubmit={handleSubmit}>
          <h4 className="text-2xl font-semibold mb-6 text-start">Let's fill out your Service Availability</h4>

          <div className="flex w-full flex-col">

            <div className="w-full flex space-x-2">
              <div className="w-1/2 py-6">
                <SelectFiledWithLabel
                  label="Select Day"
                  id="serviceDay"
                  value={selectedDay}
                  onChange={handleDayChange}
                  options={daysOfWeek}
                  required={true}
                />
              </div>
              <div className="w-1/2 py-6">
                <SelectFiledWithLabel
                  label="Select Duration"
                  id="serviceDuration"
                  value={selectedDuration}
                  onChange={handleDurationChange}
                  options={serviceDurations}
                  required={true}
                />
              </div>
            </div>

            <div className="flex items-end space-x-4 justify-between">
              <div className="w-4/12">
                <label className="block text-sm font-medium text-gray-700">Start Time (HH:mm)</label>
                <input
                  type="time"
                  value={newTimeSlot.startTime}
                  onChange={(e) => handleStartTimeChange(e.target.value)}
                  className="block w-full rounded-md bg-[var(--inputBg)] px-2 py-1 md:px-3 md:py-2 text-[var(--textOne)] outline-1 -outline-offset-1 outline-[var(--boxBorder)] placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[var(--mainColor)] text-xs  md:text-sm"
                />
              </div>
              <div className="w-4/12">
                <label className="block text-sm font-medium text-gray-700">End Time (HH:mm)</label>
                <input
                  type="time"
                  value={newTimeSlot.endTime}
                  onChange={(e) => handleEndTimeChange(e.target.value)}
                  className="block w-full rounded-md bg-[var(--inputBg)] px-2 py-1 md:px-3 md:py-2 text-[var(--textOne)] outline-1 -outline-offset-1 outline-[var(--boxBorder)] placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[var(--mainColor)] text-xs  md:text-sm"
                />
              </div>
              <button
                type="button"
                onClick={() => generateTimeSlots(newTimeSlot.startTime, newTimeSlot.endTime, selectedDuration)}
                className="bg-[var(--mainColor)] hover:bg-[var(--mainColorHover)] text-white font-bold py-1.5 px-4 rounded cursor-pointer"
              >
                Generate Slots
              </button>
            </div>

            <div className="w-full space-y-6">
              {timeSlots && timeSlots.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Select your time slots
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {timeSlots.map((timeSlot) => (
                      <div
                        key={timeSlot}
                        className={`text-xs border rounded-md py-2 px-4 hover:bg-[var(--mainColor)/10] transition-colors duration-200 cursor-pointer ${selectedTimeSlots.includes(timeSlot)
                          ? 'bg-[var(--mainColor)/20] border-[var(--mainColor)]'
                          : 'border-gray-300'
                          }`}
                        onClick={() => handleTimeSlotAdding(timeSlot)}
                      >
                        {timeSlot}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>

          {selectedTimeSlots.length > 0 && (
            <div className="mt-10 flex justify-end space-x-2">
              <button
                type="button"
                onClick={handleAddAvailability}
                className="bg-[var(--mainColor)] hover:bg-[var(--mainColorHover)] text-white font-bold py-1.5 px-4 rounded cursor-pointer"
              >
                Add
              </button>
              <CustomButton props={{ loading, text: "Submit" }} />
            </div>
          )}

        </form>
      </div>

      <RightSideBox props={{ pageNumber: 3 }} />
    </div>
  );
};

export default ProviderAddServiceAvailability;


// [{sunday: {
//   duration: { durationId: 0, durationTime: "15 minutes"},
//   startTime: "09:00 AM",
//   endTime: "16:00 PM",
//   slots : [
//     { slotId: 0, slotTime: "09:00 AM"},
//     { slotId: 1, slotTime: "09:15 AM"},
//     { slotId: 3, slotTime: "09:30 AM"}
//   ]
// }},
// {monday: {
//   duration: { durationId: 0, durationTime: "15 minutes"},
//   startTime: "09:00 AM",
//   endTime: "16:00 PM",
//   slots : [
//     { slotId: 0, slotTime: "09:00 AM"},
//     { slotId: 1, slotTime: "09:15 AM"},
//     { slotId: 3, slotTime: "09:30 AM"}
//   ]
// }}]