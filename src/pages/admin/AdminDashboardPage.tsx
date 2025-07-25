import BarChartStacked from "@/components/common/chart/BarChartStacked";

export const earningsOverTime = [
  { date: "2025-07-15", stripe: 1500, razorpay: 700, paypal: 300 },
  { date: "2025-07-16", stripe: 1600, razorpay: 600, paypal: 500 },
  { date: "2025-07-17", stripe: 1400, razorpay: 800, paypal: 400 },
  { date: "2025-07-18", stripe: 1700, razorpay: 750, paypal: 300 },
  { date: "2025-07-19", stripe: 1550, razorpay: 850, paypal: 250 },
  { date: "2025-07-20", stripe: 1600, razorpay: 900, paypal: 400 },
  { date: "2025-07-21", stripe: 1800, razorpay: 950, paypal: 350 },
  { date: "2025-07-22", stripe: 1650, razorpay: 870, paypal: 300 },
  { date: "2025-07-23", stripe: 1750, razorpay: 820, paypal: 380 },
  { date: "2025-07-24", stripe: 1900, razorpay: 920, paypal: 450 },
];

const earningsOverTimeChartConfig = {
  stripe: {
    label: "Stripe",
    color: "#22c55e",
  },
  razorpay: {
    label: "Razorpay",
    color: "#f97316",
  },
  paypal: {
    label: "Paypal",
    color: "#ef4444",
  },
}

const AdminDashboardPage = () => {
  return (
    <div className="p-2">
      <BarChartStacked
        title="Earnings by Payment Gateway"
        description="Stripe, Razorpay, and Paypal Payments per day."
        chartData={earningsOverTime}
        dataKeyOne='stripe'
        dataKeyTwo='razorpay'
        dataKeyThree='paypal'
        chartConfig={earningsOverTimeChartConfig}
        isLocked={false}
      />
    </div>
  )
}

export default AdminDashboardPage