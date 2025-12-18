import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';

function PublicNavbar() {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 w-full z-50 bg-void/80 backdrop-blur-xl border-b border-white/5">
      <div className="container mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
        
        <div className="flex items-center space-x-2">
          <Wallet className="w-8 h-8 text-gold" />
          <span
            onClick={() => navigate('/')}
            className="cursor-pointer text-2xl font-bold font-['Outfit'] text-gold"
          >
            Iron Wallet Investment
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            onClick={() => navigate('/login')}
            className="
              bg-transparent border border-[#FFD700] text-[#FFD700]
              font-bold px-6 py-2 rounded-full
              transition-all duration-300
              hover:bg-[#FFD700]/10
              hover:shadow-[0_0_12px_rgba(255,215,0,0.4)]
            "
          >
            Login
          </Button>

          <Button
            onClick={() => navigate('/signup')}
            className="
              bg-[#FFD700] text-black font-bold px-6 py-2 rounded-full
              transition-all duration-300
              hover:bg-[#FFE55C]
              hover:scale-105
              hover:shadow-[0_0_20px_rgba(255,215,0,0.6)]
            "
          >
            Sign Up
          </Button>
        </div>

      </div>
    </header>
  );
}

export default PublicNavbar;
