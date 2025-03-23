//  otp form timer
export const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
};

// Header greetings
export const greetings = (): string => {
    const date = new Date();
    const hour = date.getHours();
    if(hour >= 12 && hour <= 12){
        return "Good Morning"
    }else if(hour > 12 && hour < 4){
        return "Good Afternoon"
    }else{
        return "Good Evening"
    }
}

//  Provider slot availability generator
export const generateTimeSlots = (startTime: string, endTime: string, intervalMinutes: string): string[] => {
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
    return slots
  };

// Provider availability time selector time formatter
const format12HourTime = (time24: string): string => {
    const [hours, minutes] = time24.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 === 0 ? 12 : hours % 12;
    return `${hour12}:${String(minutes).padStart(2, '0')} ${period}`;
  };

// Formate date for infoDisplayCompoenent
export  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
};

// Coupy to Clipboard
export const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
};

// Formating the boolean value
export const formatBoolean = (val: boolean) => (val ? "Yes" : "No");

// link
export const handleLinkClick = (url: string) => {
  if (url) {
    window.open(url, '_blank');
  }
}