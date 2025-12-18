import React, { useState, useMemo } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ArrowDownCircle, Copy, Check } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { toast } from 'sonner';
import DashboardLayout from '../components/DashboardLayout';
import { transactionAPI } from '../lib/api';
import { FaBitcoin, FaEthereum } from 'react-icons/fa';
import { SiTether } from 'react-icons/si';

/* 🔗 YOUR WALLET ADDRESSES */
const WALLET_ADDRESSES = {
  BTC: 'bc1q8fe0udjk9aj7kkwu0yplypxz04djdyqynw5655',
  ETH: '0x317D9024a737c53C9EDf9903792A0eFA01b2859D',
  USDT: 'TKfPFrFzM2HztrfgDUD2yGT4EEPpMqgA5V'
};

/* 🖼️ YOUR QR IMAGES */
import btcQR from '@/assets/qr/btc.jpeg';
import ethQR from '@/assets/qr/eth.jpeg';
import usdtQR from '@/assets/qr/usdt.jpeg';

const QR_IMAGES = {
  BTC: btcQR,
  ETH: ethQR,
  USDT: usdtQR
};

const DepositPage = () => {
  const queryClient = useQueryClient();
  const [currency, setCurrency] = useState('BTC');
  const [amount, setAmount] = useState('');
  const [copied, setCopied] = useState(false);

  const depositAddress = useMemo(
    () => WALLET_ADDRESSES[currency],
    [currency]
  );

  const depositMutation = useMutation({
    mutationFn: (data) => transactionAPI.deposit(data),
    onSuccess: () => {
      toast.success('Deposit request submitted!');
      setAmount('');
      queryClient.invalidateQueries(['user-profile']);
      queryClient.invalidateQueries(['dashboard-stats']);
    },
    onError: (error) => {
      toast.error(error.response?.data?.detail || 'Deposit failed');
    }
  });

  const handleDeposit = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Enter a valid amount');
      return;
    }

    depositMutation.mutate({
      currency,
      amount: parseFloat(amount)
    });
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(depositAddress);
    setCopied(true);
    toast.success('Address copied');
    setTimeout(() => setCopied(false), 1500);
  };

  const getCryptoIcon = (curr) => {
    switch (curr) {
      case 'BTC':
        return <FaBitcoin className="w-8 h-8 text-[#F7931A]" />;
      case 'ETH':
        return <FaEthereum className="w-8 h-8 text-[#627EEA]" />;
      case 'USDT':
        return <SiTether className="w-8 h-8 text-[#26A17B]" />;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Deposit Funds
          </h1>
          <p className="text-white/70 mt-2">
            Send crypto to the address below
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT */}
          <Card className="bg-[#121212] border border-white/5 p-8 rounded-xl">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
              <ArrowDownCircle className="w-6 h-6 mr-2 text-white" />
              Deposit Details
            </h2>

            <div className="space-y-6">
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger className="bg-white/5 border border-white/10 text-white h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#0A0A0A] border border-white/10">
                  <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                  <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                  <SelectItem value="USDT">Tether (USDT)</SelectItem>
                </SelectContent>
              </Select>

              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount (optional)"
                className="bg-white/5 border border-white/10 text-white h-12"
              />

              <div className="border border-white/10 rounded-lg p-4">
                <p className="text-sm text-white/80">
                  Send funds to the address shown. Balance updates after confirmation.
                </p>
              </div>

              <Button
                onClick={handleDeposit}
                disabled={depositMutation.isPending}
                className="w-full bg-white text-black font-bold py-3 rounded-full"
              >
                {depositMutation.isPending ? 'Processing...' : 'I Have Sent Funds'}
              </Button>
            </div>
          </Card>

          {/* RIGHT */}
          <Card className="bg-[#121212] border border-white/5 p-8 rounded-xl">
            <h2 className="text-xl font-bold text-white mb-6">
              Deposit Address
            </h2>

            <div className="flex flex-col items-center space-y-6">
              <div className="p-4 rounded-xl bg-white/5">
                {getCryptoIcon(currency)}
              </div>

              {/* 🔥 YOUR QR IMAGE */}
              <div className="bg-white p-4 rounded-xl">
                <img
                  src={QR_IMAGES[currency]}
                  alt={`${currency} QR`}
                  className="w-[200px] h-[200px] object-contain"
                />
              </div>

              <div className="w-full">
                <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-lg p-4">
                  <code className="text-white text-sm break-all">
                    {depositAddress}
                  </code>
                  <button onClick={copyAddress}>
                    {copied ? (
                      <Check className="w-5 h-5 text-green-400" />
                    ) : (
                      <Copy className="w-5 h-5 text-white/70" />
                    )}
                  </button>
                </div>
              </div>

              <div className="text-sm text-white/70 space-y-1">
                <p>• Send only {currency}</p>
                <p>• Network confirmations required</p>
                <p>• Processing: 10–30 minutes</p>
              </div>
            </div>
          </Card>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default DepositPage;
