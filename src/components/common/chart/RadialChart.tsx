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
import { LabelList, RadialBar, RadialBarChart } from "recharts";

type ChartDataItem = Record<string, string | number>;

interface RadialChartInterface<T extends ChartDataItem> {
  title: string;
  description: string;
  chartData: T[];
  dataKey: keyof T;
  nameKey: keyof T;
  chartConfig: ChartConfig;
}

const RadialChart = <T extends ChartDataItem>({
  title,
  description,
  chartData,
  dataKey,
  nameKey,
  chartConfig
}: RadialChartInterface<T>) => {

  const coloredChartData = chartData.map((item) => {
    const key = item[nameKey];
    const keyString = String(key);
    const fill = chartConfig[keyString]?.color || "#8884d8";
    return {
      ...item,
      fill,
    };
  });

  return (
    <Card>
      <ChartHeader title={title} description={description} />
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="min-h-[200px]">
          <RadialBarChart
            data={coloredChartData}
            startAngle={-90}
            endAngle={380}
            innerRadius={30}
            outerRadius={110}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey={String(nameKey)} />}
            />
            <RadialBar
              dataKey={String(dataKey)}
              background
              isAnimationActive
              label
            >
              <LabelList
                dataKey={String(nameKey)}
                position="insideStart"
                className="fill-white capitalize mix-blend-luminosity"
                fontSize={11}
              />
            </RadialBar>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default RadialChart;
