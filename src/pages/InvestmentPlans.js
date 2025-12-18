import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Award, Clock, DollarSign } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import DashboardLayout from '../components/DashboardLayout';
import { investmentAPI, userAPI } from '../lib/api';

const InvestmentPlans = () => {
  const queryClient = useQueryClient();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('BTC');
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data: plans, isLoading } = useQuery({
    queryKey: ['investment-plans'],
    queryFn: async () => {
      const response = await investmentAPI.getPlans();
      return response.data;
    },
  });

  const { data: profile } = useQuery({
    queryKey: ['user-profile'],
    queryFn: async () => {
      const response = await userAPI.getProfile();
      return response.data;
    },
  });

  const activateMutation = useMutation({
    mutationFn: (data) => investmentAPI.activate(data),
    onSuccess: () => {
      toast.success('Investment activated successfully!');
      setDialogOpen(false);
      setAmount('');
      queryClient.invalidateQueries(['user-profile']);
      queryClient.invalidateQueries(['dashboard-stats']);
    },
    onError: (error) => {
      const err = error.response?.data;
      let message = 'Failed to activate investment';

      if (typeof err?.detail === 'string') {
        message = err.detail;
      } else if (Array.isArray(err?.detail)) {
        message = err.detail.map(e => e.msg).join(', ');
      }

      toast.error(message);
    },
  });

  const handleActivate = () => {
    if (!selectedPlan || !amount) {
      toast.error('Please select a plan and enter an amount');
      return;
    }

    const amountNum = parseFloat(amount);

    if (amountNum < selectedPlan.min_amount) {
      toast.error(`Minimum investment is ${selectedPlan.min_amount} ${currency}`);
      return;
    }

    // ✅ MAX AMOUNT CHECK (ADDED)
    if (selectedPlan.max_amount && amountNum > selectedPlan.max_amount) {
      toast.error(`Maximum investment is ${selectedPlan.max_amount} ${currency}`);
      return;
    }

    activateMutation.mutate({
      plan_id: selectedPlan.id,
      amount: amountNum,
      currency,
    });
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-white/70">Loading plans...</div>
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
          <h1 className="text-3xl md:text-4xl font-bold font-['Outfit'] text-white">
            Investment Plans
          </h1>
          <p className="text-white/70 mt-2">
            Choose the perfect plan for your investment goals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans?.map((plan) => (
            <Card
              key={plan.id}
              className="bg-[#0A0A0A] border border-white/10 p-6 rounded-2xl hover:border-[#FFD700] hover:shadow-[0_0_30px_rgba(255,215,0,0.1)] transition-all duration-300"
            >
              <div className="text-center mb-6">
                <div className="bg-[#FFD700]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-[#FFD700]" />
                </div>
                <h3 className="text-2xl font-bold font-['Outfit'] text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-white/50 text-sm">{plan.description}</p>
              </div>

              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-[#FFD700] mb-2">
                  {plan.percentage}%
                </div>
                <div className="text-white/50">Returns</div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2 text-white/70">
                    <DollarSign className="w-4 h-4" />
                    <span>Min. Investment</span>
                  </div>
                  <span className="text-white font-semibold">
                    ${plan.min_amount}
                  </span>
                </div>

                {/* ✅ MAX INVESTMENT DISPLAY */}
                {plan.max_amount && (
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2 text-white/70">
                      <DollarSign className="w-4 h-4" />
                      <span>Max. Investment</span>
                    </div>
                    <span className="text-white font-semibold">
                      ${plan.max_amount}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2 text-white/70">
                    <Clock className="w-4 h-4" />
                    <span>Duration</span>
                  </div>
                  <span className="text-white font-semibold">
                    {plan.duration_days} days
                  </span>
                </div>
              </div>

              <Dialog
                open={dialogOpen && selectedPlan?.id === plan.id}
                onOpenChange={setDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button
                    onClick={() => {
                      setSelectedPlan(plan);
                      setDialogOpen(true);
                    }}
                    className="w-full bg-[#FFD700] text-black hover:bg-[#FFE55C] font-bold py-3 rounded-full button-hover-glow"
                  >
                    Activate Plan
                  </Button>
                </DialogTrigger>

                <DialogContent className="bg-[#0A0A0A] border border-white/10 text-white">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold font-['Outfit']">
                      Activate {plan.name}
                    </DialogTitle>
                  </DialogHeader>

                  <div className="space-y-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        Select Currency
                      </label>
                      <Select value={currency} onValueChange={setCurrency}>
                        <SelectTrigger className="bg-white/5 border border-white/10 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0A0A0A] border border-white/10">
                          <SelectItem value="BTC">BTC</SelectItem>
                          <SelectItem value="ETH">ETH</SelectItem>
                          <SelectItem value="USDT">USDT</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="mt-2 text-sm text-white/50">
                        Available:{' '}
                        {profile?.balances?.[currency]?.toFixed(8) || '0.00000000'}{' '}
                        {currency}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        Investment Amount
                      </label>
                      <Input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder={
                          plan.max_amount
                            ? `Min: ${plan.min_amount} | Max: ${plan.max_amount}`
                            : `Min: ${plan.min_amount}`
                        }
                        step="0.00000001"
                        className="bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] rounded-lg h-12"
                      />
                    </div>

                    <Button
                      onClick={handleActivate}
                      disabled={activateMutation.isPending}
                      className="w-full bg-[#FFD700] text-black hover:bg-[#FFE55C] font-bold py-3 rounded-full"
                    >
                      {activateMutation.isPending ? 'Processing...' : 'Confirm Investment'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </Card>
          ))}
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default InvestmentPlans;
