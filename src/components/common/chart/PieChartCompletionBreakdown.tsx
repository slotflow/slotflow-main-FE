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
import ChartHeader from "./ChartHeader";
import { Pie, PieChart, Cell } from "recharts";

interface CompletionBreakdownData {
  status: string;
  value: number;
}

interface CompletionChartProps {
  title: string;
  description: string;
  chartData: CompletionBreakdownData[];
  dataKey: string;
  chartConfig: ChartConfig;
  nameKey: string;
}

const PieChartCompletionBreakdown = ({
  title,
  description,
  chartData,
  dataKey,
  chartConfig,
  nameKey
}: CompletionChartProps) => {
  return (
    <Card className="flex flex-col">
      <ChartHeader title={title} description={description} />
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="min-h-[200px]" >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey={dataKey}
              nameKey={nameKey}
              label
              outerRadius="80%"
            >
              {chartData.map((entry) => (
                <Cell
                  key={entry.status}
                  fill={chartConfig[entry.status]?.color || "#8884d8"}
                />
              ))}
            </Pie>
            <ChartLegend content={<ChartLegendContent />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default PieChartCompletionBreakdown;
