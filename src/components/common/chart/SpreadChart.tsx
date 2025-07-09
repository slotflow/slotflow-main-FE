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
import { filterChartData } from "@/utils/helper/dateFilter";
import { TimeRange } from "@/utils/interface/commonInterface";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

export const description = "An interactive area chart"

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--mainColor)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--mainColorHover)",
  },
} satisfies ChartConfig

interface SpreadChartInterface<T extends { date: string }> {
  title: string;
  description: string;
  chartData: T[];
  areaOneDataKey: string;
  areaTwoDataKey: string
}

const SpreadChart = <T extends { date: string },>({
  title,
  description,
  chartData,
  areaOneDataKey,
  areaTwoDataKey,
}: SpreadChartInterface<T>) => {

  const [timeRange, setTimeRange] = React.useState<TimeRange>("7d")
  const filteredData = filterChartData(chartData, timeRange)

  return (
    <Card className="pt-0 mt-4">
      <ChartHeader title={title} description={description} onValueChange={setTimeRange} value={timeRange} />
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
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
              fill="url(#fillMobile)"
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey={areaTwoDataKey}
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-desktop)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default SpreadChart;