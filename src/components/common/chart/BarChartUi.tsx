import React from 'react';
import {
  ChartConfig,
  ChartContainer,
  // ChartLegend, 
  // ChartLegendContent
} from "@/components/ui/chart";
import { Card } from '../../ui/card';
import ChartHeader from './ChartHeader';
import { filterChartData } from '@/utils/helper/dateFilter';
import { TimeRange } from '@/utils/interface/commonInterface';
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
  { date: "2025-04-01", provider: 222, user: 150 },
  { date: "2025-04-02", provider: 97, user: 180 },
  { date: "2025-04-03", provider: 167, user: 120 },
  { date: "2025-04-04", provider: 242, user: 260 },
  { date: "2025-04-05", provider: 373, user: 290 },
  { date: "2025-04-06", provider: 301, user: 340 },
  { date: "2025-04-07", provider: 245, user: 180 },
  { date: "2025-04-08", provider: 409, user: 320 },
  { date: "2025-04-09", provider: 59, user: 110 },
  { date: "2025-04-10", provider: 261, user: 190 },
  { date: "2025-04-11", provider: 327, user: 350 },
  { date: "2025-04-12", provider: 292, user: 210 },
  { date: "2025-04-13", provider: 342, user: 380 },
  { date: "2025-04-14", provider: 137, user: 220 },
  { date: "2025-04-15", provider: 120, user: 170 },
  { date: "2025-04-16", provider: 138, user: 190 },
  { date: "2025-04-17", provider: 446, user: 360 },
  { date: "2025-04-18", provider: 364, user: 410 },
  { date: "2025-04-19", provider: 243, user: 180 },
  { date: "2025-04-20", provider: 89, user: 150 },
  { date: "2025-04-21", provider: 137, user: 200 },
  { date: "2025-04-22", provider: 224, user: 170 },
  { date: "2025-04-23", provider: 138, user: 230 },
  { date: "2025-04-24", provider: 387, user: 290 },
  { date: "2025-04-25", provider: 215, user: 250 },
  { date: "2025-04-26", provider: 75, user: 130 },
  { date: "2025-04-27", provider: 383, user: 420 },
  { date: "2025-04-28", provider: 122, user: 180 },
  { date: "2025-04-29", provider: 315, user: 240 },
  { date: "2025-04-30", provider: 454, user: 380 },
  { date: "2025-05-01", provider: 165, user: 220 },
  { date: "2025-05-02", provider: 293, user: 310 },
  { date: "2025-05-03", provider: 247, user: 190 },
  { date: "2025-05-04", provider: 385, user: 420 },
  { date: "2025-05-05", provider: 481, user: 390 },
  { date: "2025-05-06", provider: 498, user: 520 },
  { date: "2025-05-07", provider: 388, user: 300 },
  { date: "2025-05-08", provider: 149, user: 210 },
  { date: "2025-05-09", provider: 227, user: 180 },
  { date: "2025-05-10", provider: 293, user: 330 },
  { date: "2025-05-11", provider: 335, user: 270 },
  { date: "2025-05-12", provider: 197, user: 240 },
  { date: "2025-05-13", provider: 197, user: 160 },
  { date: "2025-05-14", provider: 448, user: 490 },
  { date: "2025-05-15", provider: 473, user: 380 },
  { date: "2025-05-16", provider: 338, user: 400 },
  { date: "2025-05-17", provider: 499, user: 420 },
  { date: "2025-05-18", provider: 315, user: 350 },
  { date: "2025-05-19", provider: 235, user: 180 },
  { date: "2025-05-20", provider: 177, user: 230 },
  { date: "2025-05-21", provider: 82, user: 140 },
  { date: "2025-05-22", provider: 81, user: 120 },
  { date: "2025-05-23", provider: 252, user: 290 },
  { date: "2025-05-24", provider: 294, user: 220 },
  { date: "2025-05-25", provider: 201, user: 250 },
  { date: "2025-05-26", provider: 213, user: 170 },
  { date: "2025-05-27", provider: 420, user: 460 },
  { date: "2025-05-28", provider: 233, user: 190 },
  { date: "2025-05-29", provider: 78, user: 130 },
  { date: "2025-05-30", provider: 340, user: 280 },
  { date: "2025-05-31", provider: 178, user: 230 },
  { date: "2025-06-01", provider: 178, user: 200 },
  { date: "2025-06-02", provider: 470, user: 410 },
  { date: "2025-06-03", provider: 103, user: 160 },
  { date: "2025-06-04", provider: 439, user: 380 },
  { date: "2025-06-05", provider: 88, user: 140 },
  { date: "2025-06-06", provider: 294, user: 250 },
  { date: "2025-06-07", provider: 323, user: 370 },
  { date: "2025-06-08", provider: 385, user: 320 },
  { date: "2025-06-09", provider: 438, user: 480 },
  { date: "2025-06-10", provider: 155, user: 200 },
  { date: "2025-06-11", provider: 92, user: 150 },
  { date: "2025-06-12", provider: 492, user: 420 },
  { date: "2025-06-13", provider: 81, user: 130 },
  { date: "2025-06-14", provider: 426, user: 380 },
  { date: "2025-06-15", provider: 307, user: 350 },
  { date: "2025-06-16", provider: 371, user: 310 },
  { date: "2025-06-17", provider: 475, user: 520 },
  { date: "2025-06-18", provider: 107, user: 170 },
  { date: "2025-06-19", provider: 341, user: 290 },
  { date: "2025-06-20", provider: 408, user: 450 },
  { date: "2025-06-21", provider: 169, user: 210 },
  { date: "2025-06-22", provider: 317, user: 270 },
  { date: "2025-06-23", provider: 480, user: 530 },
  { date: "2025-06-24", provider: 132, user: 180 },
  { date: "2025-06-25", provider: 141, user: 190 },
  { date: "2025-06-26", provider: 434, user: 380 },
  { date: "2025-06-27", provider: 448, user: 490 },
  { date: "2025-06-28", provider: 149, user: 200 },
  { date: "2025-06-29", provider: 103, user: 160 },
  { date: "2025-06-30", provider: 446, user: 400 },
  { date: "2025-07-01", provider: 178, user: 200 },
  { date: "2025-07-02", provider: 470, user: 410 },
  { date: "2025-07-03", provider: 103, user: 160 },
  { date: "2025-07-04", provider: 439, user: 380 },
  { date: "2025-07-05", provider: 88, user: 140 },
  { date: "2025-07-06", provider: 294, user: 250 },
  { date: "2025-07-07", provider: 323, user: 370 },
  { date: "2025-07-08", provider: 385, user: 320 },
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

const BarChartUi: React.FC = () => {

  const [timeRange, setTimeRange] = React.useState<TimeRange>("7d")
  const filteredData = filterChartData(chartData, timeRange)

  return (
    <Card className="pt-0 mt-4">
      <ChartHeader title="Users Data Graph" description="Providers and users engagement data" onValueChange={setTimeRange} value={timeRange} />
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart accessibilityLayer data={filteredData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          {/* <ChartLegend content={<ChartLegendContent />} /> */}
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
    </Card>
  )
}

export default BarChartUi