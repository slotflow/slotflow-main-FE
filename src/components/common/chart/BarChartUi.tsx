import React from 'react';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend, 
  ChartLegendContent
} from "@/components/ui/chart";
import { Card } from '../../ui/card';
import ChartHeader from './ChartHeader';
import { filterChartData } from '@/utils/helper/dateFilter';
import { TimeRange } from '@/utils/interface/commonInterface';
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

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

interface BarChartUiInterface<T extends { date: string }> {
  title: string;
  description: string;
  chartData: T[];
  barOneDataKey: string;
  barTwoDataKey: string
}

const BarChartUi = <T extends { date: string },>({
  title,
  description,
  chartData,
  barOneDataKey,
  barTwoDataKey,
}: BarChartUiInterface<T>) => {

  const [timeRange, setTimeRange] = React.useState<TimeRange>("7d");
  const filteredData = filterChartData(chartData, timeRange);

  return (
    <Card className="pt-0 mt-4">
      <ChartHeader title={title} description={description} onValueChange={setTimeRange} value={timeRange} />
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
          <ChartLegend content={<ChartLegendContent />} />
          <Bar
            dataKey={barOneDataKey}
            fill="var(--mainColor)"
            radius={[8, 8, 0, 0]}
            barSize={20}
            label={{ position: "top", fill: "var(--textOne)", fontSize: 12 }}
            animationDuration={500}
          />
          <Bar
            dataKey={barTwoDataKey}
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