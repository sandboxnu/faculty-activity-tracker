import React, { useState } from 'react';
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

export type ActivityHistogramData = {
  activityGroup: string;
  professorCount: number;
}[];

export const mockTenureHistogramData: ActivityHistogramData = [
  { activityGroup: '0-5', professorCount: 62 },
  { activityGroup: '5-10', professorCount: 86 },
  { activityGroup: '10-15', professorCount: 104 },
  { activityGroup: '15-20', professorCount: 82 },
  { activityGroup: '20+', professorCount: 18 },
];

export const mockNonTenureHistogramData: ActivityHistogramData = [
  { activityGroup: '0-5', professorCount: 60 },
  { activityGroup: '5-10', professorCount: 82 },
  { activityGroup: '10-15', professorCount: 78 },
  { activityGroup: '15-20', professorCount: 22 },
  { activityGroup: '20+', professorCount: 8 },
];

interface ActivityHistogramProps {
  label: string;
  data: ActivityHistogramData;
}

export const backgroundTriangleStyle: React.CSSProperties = {
  content: ' ',
  position: 'absolute',
  top: '100%',
  left: '50%',
  transform: 'translate(-50%, 0)',
  borderTop: '6.5px solid #DB4D4D',
  borderRight: '6.5px solid transparent',
  borderLeft: '6.5px solid transparent',
  marginTop: '0px',
  zIndex: '20',
};

export const foregroundTriangleStyle: React.CSSProperties = {
  content: ' ',
  position: 'absolute',
  top: '100%',
  left: '50%',
  transform: 'translate(-50%, 0)',
  borderTop: '5px solid white',
  borderRight: '5px solid transparent',
  borderLeft: '5px solid transparent',
  marginTop: '0px',
  zIndex: '20',
};

const CustomTooltip = ({ active, payload }: TooltipProps<string, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="relative flex w-max rounded-lg border border-red-400 bg-white px-2 py-0.5">
        <p className="text-sm text-red-400">{`${payload[0].value} Professors`}</p>
        <div style={backgroundTriangleStyle} />
        <div style={foregroundTriangleStyle} />
      </div>
    );
  }

  return null;
};

const ActivityHistogram: React.FC<ActivityHistogramProps> = ({
  label,
  data,
}) => {
  const [posData, setPosData] = useState({ x: 0, y: 0 });
  return (
    <div className="px-4">
      <div className="flex flex-col rounded-lg bg-gray-100 px-5 py-5">
        <p className="mb-4 text-heading-3">{label}</p>
        <BarChart
          width={330}
          height={230}
          data={data}
          margin={{ top: 10, bottom: 10 }}
        >
          <XAxis dataKey="activityGroup" tickLine={false} axisLine={false}>
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
            position={{ x: posData.x - 35, y: posData.y - 35 }}
            offset={0}
            content={<CustomTooltip />}
          />
          <CartesianGrid vertical={false} />
          <Bar
            dataKey="professorCount"
            fill="#DB4D4D"
            barSize={35}
            onMouseOver={(data) => {
              setPosData(data);
            }}
          />
        </BarChart>
      </div>
    </div>
  );
};

export default ActivityHistogram;
