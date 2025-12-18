import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ArrowUpCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import DashboardLayout from '../components/DashboardLayout';
import { transactionAPI, userAPI } from '../lib/api';

const WithdrawPage = () => {
  const queryClient = useQueryClient();
  const [currency, setCurrency] = useState('BTC');
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');

  const { data: profile } = useQuery({
    queryKey: ['user-profile'],
    queryFn: async () => {
      const response = await userAPI.getProfile();
      return response.data;
    },
  });

  const withdrawMutation = useMutation({
    mutationFn: (data) => transactionAPI.withdraw(data),
    onSuccess: () => {
      toast.success('Withdrawal request submitted!');
      setAmount('');
      setAddress('');
      queryClient.invalidateQueries(['user-profile']);
      queryClient.invalidateQueries(['dashboard-stats']);
    },
    onError: (error) => {
      toast.error(error.response?.data?.detail || 'Withdrawal failed');
    },
  });

  const handleWithdraw = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (!address) {
      toast.error('Please enter a withdrawal address');
      return;
    }

    withdrawMutation.mutate({
      currency,
      amount: parseFloat(amount),
      address,
    });
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold font-['Outfit'] text-white">Withdraw Funds</h1>
          <p className="text-white/70 mt-2">Transfer your crypto to an external wallet</p>
        </div>

        <div className="max-w-2xl">
          <Card className="bg-[#121212] border border-white/5 p-8 rounded-xl">
            <h2 className="text-xl font-bold font-['Outfit'] text-white mb-6 flex items-center">
              <ArrowUpCircle className="w-6 h-6 mr-2 text-[#FFD700]" />
              Withdrawal Details
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">Select Cryptocurrency</label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger data-testid="withdraw-currency-select" className="bg-white/5 border border-white/10 text-white h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0A0A0A] border border-white/10">
                    <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                    <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                    <SelectItem value="USDT">Tether (USDT)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-white/50 mt-2">
                  Available: {profile?.balances?.[currency]?.toFixed(8) || '0.00000000'} {currency}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">Withdrawal Amount</label>
                <Input
                  data-testid="withdraw-amount-input"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  step="0.00000001"
                  className="bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] rounded-lg h-12"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">Withdrawal Address</label>
                <Input
                  data-testid="withdraw-address-input"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder={`Enter your ${currency} address`}
                  className="bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] rounded-lg h-12 font-mono text-sm"
                />
              </div>

              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <p className="text-sm text-red-400">
                  <strong>Warning:</strong> Double check the withdrawal address. Cryptocurrency transactions are irreversible.
                </p>
              </div>

              <div className="space-y-2 text-sm text-white/70">
                <p>• Minimum withdrawal: 0.001 {currency}</p>
                <p>• Network fee: 0.0001 {currency}</p>
                <p>• Processing time: 10-60 minutes</p>
                <p>• Your withdrawal will be reviewed for security</p>
              </div>

              <Button
                data-testid="withdraw-submit-btn"
                onClick={handleWithdraw}
                disabled={withdrawMutation.isPending}
                className="w-full bg-[#FFD700] text-black hover:bg-[#FFE55C] font-bold py-3 rounded-full button-hover-glow"
              >
                {withdrawMutation.isPending ? 'Processing...' : 'Submit Withdrawal'}
              </Button>
            </div>
          </Card>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default WithdrawPage;
