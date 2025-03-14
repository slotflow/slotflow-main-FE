
export const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
};

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