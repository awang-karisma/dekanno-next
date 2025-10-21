"use client";

import type { FC } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface AttendancePoint {
  date: string;
  present: number;
  absent: number;
}

interface AttendanceTrendChartProps {
  data: AttendancePoint[];
  presentLabel: string;
  absentLabel: string;
}

const tooltipStyles = {
  wrapper: {
    background: "hsl(var(--background))",
    borderRadius: "0.75rem",
    border: "1px solid hsl(var(--border))",
    padding: "0.75rem",
    boxShadow: "0 16px 40px -24px rgba(15, 23, 42, 0.45)",
  },
};

export const AttendanceTrendChart: FC<AttendanceTrendChartProps> = ({
  data,
  presentLabel,
  absentLabel,
}) => {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart
        data={data}
        margin={{ top: 16, right: 24, left: 0, bottom: 8 }}
      >
        <defs>
          <linearGradient id="presentGradient" x1="0" x2="0" y1="0" y2="1">
            <stop
              offset="5%"
              stopColor="hsl(var(--primary))"
              stopOpacity={0.9}
            />
            <stop
              offset="95%"
              stopColor="hsl(var(--primary))"
              stopOpacity={0.05}
            />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="4 4"
          stroke="rgba(148, 163, 184, 0.25)"
        />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          stroke="rgba(148, 163, 184, 0.75)"
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          allowDecimals={false}
          width={32}
          stroke="rgba(148, 163, 184, 0.75)"
        />
        <Tooltip
          contentStyle={tooltipStyles.wrapper}
          labelStyle={{ color: "hsl(var(--muted-foreground))" }}
          formatter={(value, name) => [
            value as number,
            name === "present" ? presentLabel : absentLabel,
          ]}
        />
        <Area
          type="monotone"
          dataKey="present"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          fill="url(#presentGradient)"
        />
        <Area
          type="monotone"
          dataKey="absent"
          stroke="hsl(var(--destructive))"
          strokeWidth={2}
          fill="rgba(248, 113, 113, 0.08)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
