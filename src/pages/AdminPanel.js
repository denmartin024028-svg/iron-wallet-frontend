import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, TrendingUp, DollarSign, Activity } from 'lucide-react';
import { Card } from '@/components/ui/card';
import DashboardLayout from '../components/DashboardLayout';

const AdminPanel = () => {
  // 🔒 TEMP DATA (until backend admin APIs exist)
  const stats = {
    total_users: 0,
    total_investments: 0,
    total_transactions: 0,
    total_invested: 0,
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold font-['Outfit'] text-white flex items-center">
            <Shield className="w-8 h-8 mr-3 text-[#FFD700]" />
            Admin Panel
          </h1>
          <p className="text-white/70 mt-2">
            Admin features coming soon
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard icon={Users} label="Total Users" value={stats.total_users} />
          <StatCard icon={TrendingUp} label="Total Investments" value={stats.total_investments} />
          <StatCard icon={Activity} label="Total Transactions" value={stats.total_transactions} />
          <StatCard
            icon={DollarSign}
            label="Total Invested"
            value={`$${stats.total_invested.toFixed(2)}`}
          />
        </div>

        {/* Notice */}
        <div className="mt-10 text-white/60 text-sm">
          ⚠️ Admin APIs are not enabled yet.  
          This section will be activated once backend admin routes are added.
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

const StatCard = ({ icon: Icon, label, value }) => (
  <Card className="bg-[#121212] border border-white/5 p-6 rounded-xl">
    <div className="flex items-center space-x-3 mb-3">
      <div className="bg-[#FFD700]/10 p-3 rounded-lg">
        <Icon className="w-6 h-6 text-[#FFD700]" />
      </div>
      <span className="text-white/70 text-sm font-medium">{label}</span>
    </div>
    <div className="text-2xl font-bold text-white">{value}</div>
  </Card>
);

export default AdminPanel;
