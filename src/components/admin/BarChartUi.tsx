import React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
  { month: "January", provider: 186, user: 80 },
  { month: "February", provider: 305, user: 200 },
  { month: "March", provider: 237, user: 120 },
  { month: "April", provider: 73, user: 190 },
  { month: "May", provider: 209, user: 130 },
  { month: "June", provider: 214, user: 140 },
  { month: "January", provider: 186, user: 80 },
  { month: "February", provider: 305, user: 200 },
  { month: "March", provider: 237, user: 120 },
  { month: "April", provider: 73, user: 190 },
  { month: "May", provider: 209, user: 130 },
  { month: "June", provider: 214, user: 140 },
]
const chartConfig = {
  provider: {
    label: "Providers",
    color: "#2563eb",
  },
  user: {
    label: "Users",
    color: "#60a5fa",
  },
} satisfies ChartConfig

const BarChartUi:React.FC = () => {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar
            dataKey="provider"
            fill="var(--mainColor)"
            radius={[8, 8, 0, 0]}
            barSize={20}
            label={{ position: "top", fill: "var(--textOne)", fontSize: 12 }}
            animationDuration={500}
            />
          <Bar
            dataKey="user"
            fill="var(--mainColorHover)"
            radius={[8, 8, 0, 0]}
            barSize={20}
            label={{ position: "top", fill: "var(--textOne)", fontSize: 12 }}
            animationDuration={700}
          />
        </BarChart>
      </ChartContainer>
  )
}

export default BarChartUi