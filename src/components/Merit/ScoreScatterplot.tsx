import { User } from '@prisma/client';
import React, { useState } from 'react';
import {
  CartesianGrid,
  Label,
  XAxis,
  YAxis,
  Tooltip,
  TooltipProps,
  ScatterChart,
  Scatter,
  ZAxis,
} from 'recharts';

export type ScoreScatterplotData = {
  userId: User['id'];
  score: number;
}[];

const mockTenureScores: number[] = [
  10, 10, 10, 10, 9.6, 9.6, 9.2, 9.2, 9.1, 9, 9, 8.8, 8.8, 8.6, 8.5, 8, 8, 8,
  7.8, 7.6, 7.2, 7, 7, 6.8, 6.5, 6.5, 6.5, 6.5, 6.2, 6, 6, 6, 5.4, 5.2, 4.8,
  4.6, 4.6, 4.2, 4, 3.8, 3.6, 3.6, 3.4, 3, 3, 2.6,
];

const mockNonTenureScores: number[] = [
  10, 10, 10, 10, 9.6, 9.6, 9.2, 9.2, 9.1, 9, 9, 8.8, 8.8, 8.6, 8.5, 8, 8, 8,
  7.8, 7.6, 7.2, 7, 7, 6.8, 6.5, 6.5, 6.5, 6.5, 6.2, 6, 6, 6, 5.4, 5.2, 4.8,
  4.6, 4.6, 4.2, 4, 3.8, 3.6, 3.6, 3.4, 3, 3, 2.6,
];

export const mockTenureScatterplotData: ScoreScatterplotData =
  mockTenureScores.map((score, idx) => ({ userId: idx, score }));
export const mockNonTenureScatterplotData: ScoreScatterplotData =
  mockNonTenureScores.map((score, idx) => ({ userId: idx, score }));

interface ScoreScatterplotProps {
  label: string;
  data: ScoreScatterplotData;
}

const CustomTooltip = ({ active, payload }: TooltipProps<string, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="flex w-max rounded-lg border border-red-400 bg-white px-2 py-0.5">
        <p className="text-sm text-red-400">{`Score: ${payload[1].value}`}</p>
      </div>
    );
  }

  return null;
};

const ScoreScatterplot: React.FC<ScoreScatterplotProps> = ({ label, data }) => {
  const [posData, setPosData] = useState({ x: 0, y: 0 });
  return (
    <div className="px-4">
      <div className="flex flex-col rounded-lg bg-gray-100 px-5 py-5">
        <p className="mb-4 text-heading-3">{label}</p>
        <ScatterChart width={330} height={230} data={data} margin={{ top: 10 }}>
          <XAxis
            dataKey="userId"
            tickLine={false}
            tick={false}
            axisLine={false}
          >
            <Label value="Professors" dx={-12} position="insideBottom" />
          </XAxis>
          <YAxis
            dataKey="score"
            tickCount={11}
            domain={[0, 10]}
            interval={0}
            axisLine={false}
            tickLine={false}
            width={40}
          >
            <Label
              value="Final Score"
              angle={-90}
              position="insideLeft"
              dy={30}
              dx={0}
            />
          </YAxis>
          <ZAxis range={[20, 21]} />
          <Tooltip
            cursor={{ fill: 'transparent' }}
            position={{ x: posData.x - 35, y: posData.y - 35 }}
            content={<CustomTooltip />}
          />
          <CartesianGrid vertical={false} />
          <Scatter
            data={data}
            dataKey="score"
            fill="#DB4D4D"
            onMouseOver={(data) => {
              setPosData(data);
            }}
          />
        </ScatterChart>
      </div>
    </div>
  );
};

export default ScoreScatterplot;
