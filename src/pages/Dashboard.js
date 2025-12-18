import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Wallet, TrendingUp, DollarSign, Award } from 'lucide-react';
import { Card } from '@/components/ui/card';
import DashboardLayout from '../components/DashboardLayout';
import { dashboardAPI } from '../lib/api';
import { FaBitcoin, FaEthereum } from 'react-icons/fa';
import { SiTether } from 'react-icons/si';

// ✅ CHARTS
import {
  InvestmentGrowthChart,
  PortfolioPieChart,
} from '@/components/DashboardCharts';

const Dashboard = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const response = await dashboardAPI.getStats();
      return response.data;
    },
  });

  const getCryptoIcon = (currency) => {
    switch (currency) {
      case 'BTC':
        return <FaBitcoin className="w-6 h-6 text-[#FF9900]" />;
      case 'ETH':
        return <FaEthereum className="w-6 h-6 text-[#627EEA]" />;
      case 'USDT':
        return <SiTether className="w-6 h-6 text-[#26A17B]" />;
      default:
        return <Wallet className="w-6 h-6" />;
    }
  };

  /* =========================
     ✅ CHART DATA (BACKEND)
     ========================= */

  const growthData = [
    { date: 'Week 1', amount: (stats?.total_invested || 0) * 0.25 },
    { date: 'Week 2', amount: (stats?.total_invested || 0) * 0.5 },
    { date: 'Week 3', amount: (stats?.total_invested || 0) * 0.75 },
    { date: 'Week 4', amount: stats?.total_invested || 0 },
  ];

  // 🔥 FIX: remove zero balances (PieChart blank issue)
  const portfolioData = Object.entries(stats?.balances || {})
    .filter(([_, balance]) => balance > 0)
    .map(([currency, balance]) => ({
      name: currency,
      value: balance,
    }));

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-white/70">Loading...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Dashboard
          </h1>
          <p className="text-white/70 mt-2">
            Overview of your investments and portfolio
          </p>
        </div>

        {/* Balances */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {Object.entries(stats?.balances || {}).map(([currency, balance]) => (
            <Card
              key={currency}
              className="bg-[#121212] border border-white/5 p-6 rounded-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-white/70 font-medium">{currency}</span>
                {getCryptoIcon(currency)}
              </div>
              <div className="text-3xl font-bold text-white mb-1">
                {balance.toFixed(8)}
              </div>
              <div className="text-sm text-white/50">
                {currency} Balance
              </div>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<DollarSign className="w-6 h-6 text-[#FFD700]" />}
            label="Total Invested"
            value={`$${stats?.total_invested?.toFixed(2) || '0.00'}`}
          />
          <StatCard
            icon={<TrendingUp className="w-6 h-6 text-[#FFD700]" />}
            label="Active Investments"
            value={stats?.active_investments || 0}
          />
          <StatCard
            icon={<Award className="w-6 h-6 text-[#FFD700]" />}
            label="Total Earnings"
            value={`$${stats?.total_earnings?.toFixed(2) || '0.00'}`}
            highlight
          />
          <StatCard
            icon={<Wallet className="w-6 h-6 text-[#FFD700]" />}
            label="Portfolio Value"
            value={`$${(
              (stats?.total_invested || 0) +
              (stats?.total_earnings || 0)
            ).toFixed(2)}`}
          />
        </div>

        {/* ✅ CHARTS (FIXED) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <InvestmentGrowthChart data={growthData} />

          {portfolioData.length > 0 ? (
            <PortfolioPieChart data={portfolioData} />
          ) : (
            <Card className="bg-[#121212] border border-white/5 p-6 rounded-xl flex items-center justify-center text-white/50">
              No portfolio data available
            </Card>
          )}
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

const StatCard = ({ icon, label, value, highlight }) => (
  <Card className="bg-[#121212] border border-white/5 p-6 rounded-xl">
    <div className="flex items-center space-x-3 mb-3">
      <div className="bg-[#FFD700]/10 p-3 rounded-lg">
        {icon}
      </div>
      <span className="text-white/70 text-sm font-medium">
        {label}
      </span>
    </div>
    <div
      className={`text-2xl font-bold ${
        highlight ? 'text-[#10B981]' : 'text-white'
      }`}
    >
      {value}
    </div>
  </Card>
);

export default Dashboard;
