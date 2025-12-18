import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Card } from '@/components/ui/card';

const COLORS = ['#F7931A', '#627EEA', '#26A17B'];

export const InvestmentGrowthChart = ({ data = [] }) => {
  return (
    <Card className="bg-[#121212] border border-white/5 p-6 rounded-xl">
      <h3 className="text-lg font-bold text-white mb-4">
        Investment Growth
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="date" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#FFD700"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export const PortfolioPieChart = ({ data = [] }) => {
  return (
    <Card className="bg-[#121212] border border-white/5 p-6 rounded-xl">
      <h3 className="text-lg font-bold text-white mb-4">
        Portfolio Distribution
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};
