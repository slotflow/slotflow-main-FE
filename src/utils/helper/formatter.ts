// **** Format timestamp to 24 hour
export function formatTo24HourTime(date: string) {

    return new Date(date).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

}


// **** Format number to price
export const formatNumberToPrice = (amount: number, decimal = 2): string => {

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: decimal,
  }).format(amount);

};