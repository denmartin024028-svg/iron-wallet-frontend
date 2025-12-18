import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import {
  Award,
  DollarSign,
  Clock,
  Wallet,
  Phone,
  Mail
} from 'lucide-react';

import PublicNavbar from '@/components/PublicNavbar';
import PublicFooter from '@/components/PublicFooter';

function Products() {
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Starter',
      return: '5%',
      min: '$100',
      max: '$499',
      duration: '30 days',
    },
    {
      name: 'Silver',
      return: '8%',
      min: '$500',
      max: '$999',
      duration: '30 days',
    },
    {
      name: 'Gold',
      return: '10%',
      min: '$1000',
      max: '$4999',
      duration: '45 days',
    },
    {
      name: 'Premium',
      return: '15%',
      min: '$5000',
      max: '$100000',
      duration: '45 days',
    },
  ];

  return (
    <>
      {/* NAVBAR */}
      <PublicNavbar />

      {/* Page Content */}
      <div className="pt-32 min-h-screen bg-void text-white px-6 md:px-12 py-24">
        <div className="container mx-auto">

          {/* Header */}
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-bold font-['Outfit'] mb-3">
              Investment Plans
            </h1>
            <p className="text-white/70 text-lg">
              Choose the perfect plan for your investment goals
            </p>
          </div>

          {/* Plans */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className="
                  bg-[#0A0A0A] border border-white/10 rounded-2xl
                  p-8 flex flex-col justify-between
                  transition-all duration-300
                  hover:-translate-y-2
                  hover:border-[#FFD700]
                  hover:shadow-[0_0_40px_rgba(255,215,0,0.25)]
                "
              >
                <div>
                  {/* Icon */}
                  <div className="w-14 h-14 mb-6 rounded-full bg-[#FFD700]/10 flex items-center justify-center">
                    <Award className="w-7 h-7 text-[#FFD700]" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-6">
                    {plan.name}
                  </h3>

                  {/* Return */}
                  <div className="text-5xl font-bold text-[#FFD700] mb-2">
                    {plan.return}
                  </div>
                  <p className="text-white/60 mb-8">Returns</p>

                  {/* Details */}
                  <div className="space-y-3 text-white/80 text-sm">
                    <div className="flex justify-between">
                      <span className="flex items-center gap-2">
                        <DollarSign size={16} /> Min. Investment
                      </span>
                      <span className="text-white font-semibold">
                        {plan.min}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="flex items-center gap-2">
                        <DollarSign size={16} /> Max. Investment
                      </span>
                      <span className="text-white font-semibold">
                        {plan.max}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="flex items-center gap-2">
                        <Clock size={16} /> Duration
                      </span>
                      <span className="text-white font-semibold">
                        {plan.duration}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Button */}
                <Button
                  onClick={() => navigate('/signup')}
                  className="
                    mt-10 w-full bg-[#FFD700] text-black
                    font-bold py-3 rounded-full
                    hover:bg-[#FFE55C]
                    transition
                  "
                >
                  Get Started
                </Button>
              </Card>
            ))}
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <PublicFooter />
    </>
  );
}

export default Products;
