"use client";

import type { FC } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ClassAttendancePoint {
  name: string;
  present: number;
}

interface ClassAttendanceChartProps {
  data: ClassAttendancePoint[];
  presentLabel: string;
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

export const ClassAttendanceChart: FC<ClassAttendanceChartProps> = ({
  data,
  presentLabel,
}) => {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 16, right: 24, left: 0, bottom: 8 }}>
        <CartesianGrid vertical={false} stroke="rgba(148, 163, 184, 0.25)" />
        <XAxis
          dataKey="name"
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
          formatter={(value: number) => [value, presentLabel]}
        />
        <Bar dataKey="present" fill="hsl(var(--primary))" radius={8} />
      </BarChart>
    </ResponsiveContainer>
  );
};
