import React from 'react';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart";
import ChartHeader from './ChartHeader';
import { Card, CardContent } from '../../ui/card';
import { TimeRange } from '@/utils/interface/commonInterface';
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { filterChartDataHelper } from '@/utils/helper/dateFilter';
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface BarChartUiInterface<T extends { date: string }> {
  title: string;
  description: string;
  chartData: T[];
  barOneDataKey: string;
  barTwoDataKey: string;
  chartConfig: ChartConfig;
}

const BarChartVertical = <T extends { date: string },>({
  title,
  description,
  chartData,
  barOneDataKey,
  barTwoDataKey,
  chartConfig
}: BarChartUiInterface<T>) => {

  const [timeRange, setTimeRange] = React.useState<TimeRange>("7d");
  const filteredData = filterChartDataHelper(chartData, timeRange);

  return (
    <Card >
      <ChartHeader title={title} description={description} onValueChange={setTimeRange} value={timeRange} />
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="min-h-[200px]" >
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
      </CardContent>
    </Card>
  )
}

export default BarChartVertical