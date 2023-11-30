import React from 'react';
import {
  BarChart,
  Bar,
  CartesianGrid,
  Label,
  XAxis,
  YAxis,
  Tooltip,
  TooltipProps,
} from 'recharts';

interface ProfessorScoreScatterPlotProps {
  label: string;
  data: { professorScore: number }[];
}

const CustomTooltip = ({ active, payload }: TooltipProps<string, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="flex w-max rounded-lg border border-red-400 bg-white px-2 py-0.5">
        <p className="text-sm text-red-400">{`${payload[0].value} Professors`}</p>
      </div>
    );
  }

  return null;
};

const ProfessorScoreScatterPlot: React.FC<ProfessorScoreScatterPlotProps> = ({
  label,
  data,
}) => {
  return (
    <div className="px-4">
      <div className="flex flex-col rounded-lg bg-gray-100 px-5 py-5 shadow-lg">
        <p className="mb-4 text-heading-3">{label}</p>
        <BarChart
          width={330}
          height={230}
          data={data}
          margin={{ top: 10, bottom: 10 }}
        >
          <XAxis dataKey="x" tickLine={false} axisLine={false}>
            <Label
              value="# of Activities"
              dy={10}
              dx={-12}
              position="insideBottom"
            />
          </XAxis>
          <YAxis
            tickCount={7}
            domain={[0, 120]}
            interval={0}
            axisLine={false}
            tickLine={false}
            width={44}
          >
            <Label
              value="# of Professors"
              angle={-90}
              position="insideLeft"
              dy={40}
            />
          </YAxis>
          <Tooltip
            cursor={{ fill: 'transparent' }}
            content={<CustomTooltip />}
          />
          <CartesianGrid vertical={false} />
          <Bar dataKey="y" fill="#DB4D4D" barSize={35} />
        </BarChart>
      </div>
    </div>
  );
};

export default ProfessorScoreScatterPlot;
