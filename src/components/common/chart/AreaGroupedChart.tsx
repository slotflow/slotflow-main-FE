import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartLegend,
  ChartTooltip,
  ChartContainer,
  ChartLegendContent,
  ChartTooltipContent,
} from "@/components/ui/chart";
import * as React from "react";
import ChartHeader from "./ChartHeader";
import { TimeRange } from "@/utils/interface/commonInterface";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { filterChartDataHelper } from "@/utils/helper/dateFilter";

interface SpreadChartInterface<T extends { date: string }> {
  title: string;
  description: string;
  chartData: T[];
  areaOneDataKey: string;
  areaTwoDataKey: string;
  areaThreeDataKey: string;
  chartConfig: ChartConfig;
}

const AreaGroupedChart = <T extends { date: string },>({
  title,
  description,
  chartData,
  areaOneDataKey,
  areaTwoDataKey,
  areaThreeDataKey,
  chartConfig
}: SpreadChartInterface<T>) => {

  const [timeRange, setTimeRange] = React.useState<TimeRange>("7d");
  const filteredData = filterChartDataHelper(chartData, timeRange);

  return (
    <Card>
      <ChartHeader title={title} description={description} onValueChange={setTimeRange} value={timeRange} />
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="min-h-[200px]" >
          <AreaChart data={filteredData}>
            <defs>
              {[
                { key: areaOneDataKey, id: "fillOne" },
                { key: areaTwoDataKey, id: "fillTwo" },
                { key: areaThreeDataKey, id: "fillThree" },
              ].map(({ key, id }) => (
                <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={chartConfig[key]?.color}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={chartConfig[key]?.color}
                    stopOpacity={0.1}
                  />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey={areaOneDataKey}
              type="natural"
              fill="url(#fillOne)"
              stroke={chartConfig[areaOneDataKey]?.color}
              stackId="a"
            />
            <Area
              dataKey={areaTwoDataKey}
              type="natural"
              fill="url(#fillTwo)"
              stroke={chartConfig[areaTwoDataKey]?.color}
              stackId="a"
            />
            <Area
              dataKey={areaThreeDataKey}
              type="natural"
              fill="url(#fillThree)"
              stroke={chartConfig[areaThreeDataKey]?.color}
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default AreaGroupedChart;