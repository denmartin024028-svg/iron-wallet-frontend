import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import {
  ArrowRight,
  Shield,
  TrendingUp,
  Lock,
  Wallet,
  Phone,
  Mail,
  Award,
  DollarSign,
  Clock
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import PublicNavbar from '@/components/PublicNavbar';
import PublicFooter from '@/components/PublicFooter';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-void text-white">

      {/* NAVBAR */}
      <PublicNavbar />

      {/* Hero Section */}
      <section className="pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1736607633200-7fa36bd1f413?crop=entropy&cs=srgb&fm=jpg&q=85"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050505]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="container mx-auto relative z-10"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold font-['Outfit'] mb-6">
              Build Your Wealth with
              <span className="block text-gold mt-2">
                Crypto Investment
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Secure, transparent, and high-return cryptocurrency investment plans powered by blockchain technology
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate('/signup')}
                className="bg-[#FFD700] text-black font-bold px-8 py-6 text-lg rounded-full hover:bg-[#FFE55C] hover:scale-105"
              >
                Get Started <ArrowRight className="ml-2 w-5 h-5" />
              </Button>

              <Button
                onClick={() =>
                  document.getElementById('features')
                    .scrollIntoView({ behavior: 'smooth' })
                }
                className="bg-transparent border-2 border-[#FFD700] text-[#FFD700] font-bold px-8 py-6 text-lg rounded-full hover:bg-[#FFD700]/10"
              >
                Learn More
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 md:px-12 bg-paper">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose Iron Wallet
            </h2>
            <p className="text-white/70">
              Industry-leading security, transparency, and returns
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: 'Secure Platform',
                desc: 'Bank-grade security with multi-layer encryption and cold storage',
              },
              {
                icon: TrendingUp,
                title: 'High Returns',
                desc: 'Earn consistent returns with expert-backed strategies',
              },
              {
                icon: Lock,
                title: 'Transparent',
                desc: 'Real-time tracking and complete transparency',
              },
            ].map((item, i) => (
              <Card
                key={i}
                className="bg-[#0A0A0A] border border-white/5 p-8 rounded-2xl hover:border-[#FFD700] hover:-translate-y-2"
              >
                <div className="bg-[#FFD700]/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  <item.icon className="w-8 h-8 text-[#FFD700]" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">
                  {item.title}
                </h3>
                <p className="text-white/70">
                  {item.desc}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-6 md:px-12 bg-void">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-center">
          {[
            { value: '$6M+', label: 'Total Invested' },
            { value: '10K+', label: 'Active Users' },
            { value: '25%', label: 'Max Returns' },
            { value: '24/7', label: 'Support' },
          ].map((s, i) => (
            <div key={i}>
              <div className="text-5xl font-bold text-[#FFD700] mb-2">
                {s.value}
              </div>
              <p className="text-white/70 text-lg">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Investment Plans (PRODUCTS STYLE) */}
      <section className="py-24 px-6 md:px-12 bg-paper">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Investment Plans
          </h2>
          <p className="text-white/70 mb-16">
            Choose the plan that fits your investment goals
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
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
                min: '$1,000',
                max: '$4,999',
                duration: '45 days',
              },
              {
                name: 'Premium',
                return: '15%',
                min: '$5,000',
                max: '$100,000',
                duration: '45 days',
              },
            ].map((plan, index) => (
              <Card
                key={index}
                className="
                  bg-[#0A0A0A] border border-white/10 rounded-2xl
                  p-8 flex flex-col justify-between text-left
                  transition-all duration-300
                  hover:-translate-y-2
                  hover:border-[#FFD700]
                  hover:shadow-[0_0_40px_rgba(255,215,0,0.25)]
                "
              >
                <div>
                  <div className="w-14 h-14 mb-6 rounded-full bg-[#FFD700]/10 flex items-center justify-center">
                    <Award className="w-7 h-7 text-[#FFD700]" />
                  </div>

                  <h3 className="text-2xl font-bold mb-6">
                    {plan.name}
                  </h3>

                  <div className="text-5xl font-bold text-[#FFD700] mb-2">
                    {plan.return}
                  </div>
                  <p className="text-white/60 mb-8">Returns</p>

                  <div className="space-y-3 text-white/80 text-sm">
                    <div className="flex justify-between">
                      <span className="flex items-center gap-2">
                        <DollarSign size={16} /> Min. Investment
                      </span>
                      <span className="font-semibold">{plan.min}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="flex items-center gap-2">
                        <DollarSign size={16} /> Max. Investment
                      </span>
                      <span className="font-semibold">{plan.max}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="flex items-center gap-2">
                        <Clock size={16} /> Duration
                      </span>
                      <span className="font-semibold">{plan.duration}</span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => navigate('/signup')}
                  className="mt-10 w-full bg-[#FFD700] text-black font-bold py-3 rounded-full hover:bg-[#FFE55C]"
                >
                  Get Started
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <PublicFooter />

    </div>
  );
};

export default LandingPage;
