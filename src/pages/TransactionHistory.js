import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { History, ArrowDownCircle, ArrowUpCircle, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import DashboardLayout from '../components/DashboardLayout';
import { transactionAPI } from '../lib/api';
import { FaBitcoin, FaEthereum } from 'react-icons/fa';
import { SiTether } from 'react-icons/si';

const TransactionHistory = () => {
  const { data: transactions, isLoading } = useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      const response = await transactionAPI.getTransactions();
      return response.data;
    },
  });

  const getCryptoIcon = (currency) => {
    switch (currency) {
      case 'BTC':
        return <FaBitcoin className="w-5 h-5 text-[#FF9900]" />;
      case 'ETH':
        return <FaEthereum className="w-5 h-5 text-[#627EEA]" />;
      case 'USDT':
        return <SiTether className="w-5 h-5 text-[#26A17B]" />;
      default:
        return null;
    }
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'deposit':
        return <ArrowDownCircle className="w-5 h-5 text-[#10B981]" />;
      case 'withdrawal':
        return <ArrowUpCircle className="w-5 h-5 text-[#EF4444]" />;
      case 'investment':
        return <TrendingUp className="w-5 h-5 text-[#FFD700]" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      completed: 'bg-[#10B981]/20 text-[#10B981] border-[#10B981]/30',
      pending: 'bg-[#F59E0B]/20 text-[#F59E0B] border-[#F59E0B]/30',
      failed: 'bg-[#EF4444]/20 text-[#EF4444] border-[#EF4444]/30',
    };
    return (
      <Badge className={`${styles[status]} border`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-white/70">Loading transactions...</div>
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
          <h1 className="text-3xl md:text-4xl font-bold font-['Outfit'] text-white flex items-center">
            <History className="w-8 h-8 mr-3 text-[#FFD700]" />
            Transaction History
          </h1>
          <p className="text-white/70 mt-2">View all your transactions</p>
        </div>

        <Card className="bg-[#121212] border border-white/5 rounded-xl overflow-hidden">
          {transactions && transactions.length > 0 ? (
            <div className="divide-y divide-white/5">
              {transactions.map((tx) => (
                <div
                  key={tx.id}
                  data-testid={`transaction-row-${tx.id}`}
                  className="p-6 hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-white/5 p-3 rounded-lg">
                        {getTransactionIcon(tx.type)}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="text-white font-semibold capitalize">{tx.type}</h3>
                          {getStatusBadge(tx.status)}
                        </div>
                        <p className="text-sm text-white/50 mt-1">
                          {new Date(tx.created_at).toLocaleString()}
                        </p>
                        {tx.transaction_hash && (
                          <p className="text-xs text-white/30 mt-1 font-mono">
                            Hash: {tx.transaction_hash.slice(0, 20)}...
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        {getCryptoIcon(tx.currency)}
                        <span
                          className={`text-lg font-bold ${
                            tx.type === 'deposit'
                              ? 'text-[#10B981]'
                              : tx.type === 'withdrawal'
                              ? 'text-[#EF4444]'
                              : 'text-[#FFD700]'
                          }`}
                        >
                          {tx.type === 'deposit' ? '+' : '-'}
                          {tx.amount}
                        </span>
                      </div>
                      <div className="text-sm text-white/50 mt-1">{tx.currency}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <History className="w-16 h-16 text-white/20 mx-auto mb-4" />
              <p className="text-white/50 text-lg">No transactions yet</p>
              <p className="text-white/30 text-sm mt-2">Your transaction history will appear here</p>
            </div>
          )}
        </Card>
      </motion.div>
    </DashboardLayout>
  );
};

export default TransactionHistory;
