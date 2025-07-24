import React from 'react';
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import ChartHeader from './ChartHeader';
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { TimeRange } from '@/utils/interface/commonInterface';
import { filterChartDataHelper } from '@/utils/helper/dateFilter';

interface BarChartHorizontalInterface<T extends { date: string }> {
    title: string;
    description: string;
    chartData: T[];
    yAxisDataKey: string;
    xAxisDataKey: string;
    barDataKey: string;
    chartConfig: ChartConfig
}

const BarChartHorizontal = <T extends { date: string },>({
    title,
    description,
    chartData,
    yAxisDataKey,
    xAxisDataKey,
    barDataKey,
    chartConfig
}: BarChartHorizontalInterface<T>) => {

    const [timeRange, setTimeRange] = React.useState<TimeRange>("7d");
    const filteredData = filterChartDataHelper(chartData, timeRange);

    return (
        <Card>
            <ChartHeader title={title} description={description} onValueChange={setTimeRange} value={timeRange} />
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer config={chartConfig} className='min-h-[200px]'>
                    <BarChart
                        data={filteredData}
                        layout="vertical"
                        margin={{ left: 0 }}
                    >
                        <YAxis
                            dataKey={yAxisDataKey}
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <XAxis dataKey={xAxisDataKey} type="number" />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel={false} />}
                        />
                        <Bar
                            dataKey={barDataKey}
                            radius={[5, 5, 5, 5]}
                            fill={chartConfig[barDataKey as keyof typeof chartConfig]?.color}
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

export default BarChartHorizontal
