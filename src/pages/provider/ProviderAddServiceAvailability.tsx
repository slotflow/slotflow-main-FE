import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useState, ChangeEvent, FormEvent } from 'react';
import RightSideBox from '@/components/provider/RightSideBox';
import { AppDispatch, RootState } from '@/utils/redux/appStore';
import { addAvailability } from '@/utils/redux/slices/providerSlice';
import { setServiceAvailability } from '@/utils/redux/slices/authSlice';
import SelectFiledWithLabel from '@/components/form/SelectFiledWithLabel';
import { addProviderServiceAvailability } from '@/utils/apis/provider.api';

interface TimeSlot {
  startTime: string;
  endTime: string;
}


const ProviderAddServiceAvailability = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedDay, setSelectedDay] = useState<string>('Sunday');
  const [selectedDuration, setSelectedDuration] = useState<string>("15 minutes");
  const [timeSlots, setTimeSlots] = useState<string[]>([])
  const [newTimeSlot, setNewTimeSlot] = useState<TimeSlot>({
    startTime: '00:00',
    endTime: '00:00',
  });
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
  const { availabilities } = useSelector((store: RootState) => store.provider);
  const [modes, setModes] = useState<string[]>([]);

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
    console.log("Generating");
    console.log("startTime : ",startTime);
    console.log("EndTime : ",endTime);
    console.log("Interval in minutes : ", intervalMinutes);
    const slots: string[] = [];
    let currentTime = startTime;
    let interval = 0;

    console.log("typeof intevalMinutes : ",typeof intervalMinutes);

    console.log(intervalMinutes === "15 minutes")

    if (intervalMinutes === "15 minutes") {
      interval = 15;
    } else if (intervalMinutes === "30 minutes") {
      interval = 30;
    } else if (intervalMinutes === "1 hour") {
      interval = 60;
    }else{
      return;
    }
    
    while (currentTime <= endTime) {
      console.log("inside while");
      slots.push(format12HourTime(currentTime));
      const [hours, minutes] = currentTime.split(':').map(Number);
      const nextMinutes = minutes + interval;
      const nextHours = hours + Math.floor(nextMinutes / 60);
      const nextMinutesAdjusted = nextMinutes % 60;
      currentTime = `${String(nextHours).padStart(2, '0')}:${String(nextMinutesAdjusted).padStart(2, '0')}`;
    }
    console.log("timeSlots : ",slots);
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

  const toggleMode = (mode: string) => {
    if (modes.includes(mode)) {
      setModes(modes.filter((m) => m !== mode));
    } else {
      setModes([...modes, mode]);
    }
  };

  const handleAddAvailability = () => {
    const data = {
      day: selectedDay,
      duration: selectedDuration,
      startTime: newTimeSlot.startTime,
      endTime: newTimeSlot.endTime,
      modes: modes,
      slots: selectedTimeSlots
    }
    dispatch(addAvailability(data));
    console.log("availability : ", data);
    toast.success(`${selectedDay} availability added.`);
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (availabilities.length === 0) {
      toast.info("You didnt added any availability.");
      setLoading(false);
      return;
    }
    if(modes.length === 0){
      toast.info("Please select your service mode.");
      return;
    }
    dispatch(addProviderServiceAvailability({ data: availabilities }))
    .unwrap()
    .then((res) => {
      if(res.success){
        toast.success(res.message);
        dispatch(setServiceAvailability(true));
        setLoading(false);
      }else{
        toast.error(res.message);
      }
    })
    setLoading(false);
  }

  const isModeSelected = (mode: string) => modes.includes(mode);

  return (
    <div className="h-screen pt-16 flex justify-center w-full bg-[var(--background)]">

      <div className="w-8/12 px-10 overflow-y-scroll no-scrollbar">
        <form className="mt-10 p-12" onSubmit={handleSubmit}>
          <h4 className="text-2xl font-semibold mb-6 text-start">Let's fill out your Service Availability</h4>

          <div className="flex w-full flex-col space-y-6">

            <div className="w-full flex space-x-2">
              <div className="w-6/12">
                <SelectFiledWithLabel
                  label="Select Day"
                  id="serviceDay"
                  value={selectedDay}
                  onChange={handleDayChange}
                  options={daysOfWeek}
                  required={true}
                />
              </div>
              <div className="w-6/12">
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

            <div>
              <h6>Select service modes</h6>
              <div className="w-1/2 flex space-x-4 mt-2">
                <div
                  className={`w-1/2 text-xs text-center border rounded-md py-2 px-4 hover:bg-[var(--mainColor)/10] transition-colors duration-200 cursor-pointer ${isModeSelected('online') ? 'bg-[var(--mainColor)/20] border-[var(--mainColor)]' : 'border-gray-300'
                    }`}
                  onClick={() => toggleMode('online')}
                >
                  Online
                </div>
                <div
                  className={`w-1/2 text-xs text-center border rounded-md py-2 px-4 hover:bg-[var(--mainColor)/10] transition-colors duration-200 cursor-pointer ${isModeSelected('offline') ? 'bg-[var(--mainColor)/20] border-[var(--mainColor)]' : 'border-gray-300'
                    }`}
                  onClick={() => toggleMode('offline')}
                >
                  Offline
                </div>
              </div>
            </div>

            <div className="flex items-end space-x-4 justify-between">
              <div className="w-4/12">
                <label className="block text-sm font-medium">Start Time (HH:mm)</label>
                <input
                  type="time"
                  value={newTimeSlot.startTime}
                  onChange={(e) => handleStartTimeChange(e.target.value)}
                  className="mt-2 block w-full rounded-md bg-[var(--inputBg)] px-2 py-1 md:px-3 md:py-2 text-[var(--textOne)] outline-1 -outline-offset-1 outline-[var(--boxBorder)] placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[var(--mainColor)] text-xs  md:text-sm"
                />
              </div>
              <div className="w-4/12">
                <label className="block text-sm font-medium">End Time (HH:mm)</label>
                <input
                  type="time"
                  value={newTimeSlot.endTime}
                  onChange={(e) => handleEndTimeChange(e.target.value)}
                  className="mt-2 block w-full rounded-md bg-[var(--inputBg)] px-2 py-1 md:px-3 md:py-2 text-[var(--textOne)] outline-1 -outline-offset-1 outline-[var(--boxBorder)] placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[var(--mainColor)] text-xs  md:text-sm"
                />
              </div>
              <button
                type="button"
                onClick={() => generateTimeSlots(newTimeSlot.startTime, newTimeSlot.endTime, selectedDuration)}
                className="mt-2 bg-[var(--mainColor)] hover:bg-[var(--mainColorHover)] text-white font-bold py-1.5 px-4 rounded cursor-pointer"
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
                        className={`text-xs text-center border rounded-md py-2 px-4 hover:bg-[var(--mainColor)/10] transition-colors duration-200 cursor-pointer ${selectedTimeSlots.includes(timeSlot)
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
              <button
                type="submit"
                className="bg-[var(--mainColor)] hover:bg-[var(--mainColorHover)] text-white font-bold py-1.5 px-4 rounded cursor-pointer"
              >
                {loading ? "Loading" : "Submit"}
              </button>
            </div>
          )}

        </form>
      </div>

      <RightSideBox props={{ pageNumber: 3 }} />
    </div>
  );
};

export default ProviderAddServiceAvailability;
