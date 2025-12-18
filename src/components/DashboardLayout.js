import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Wallet, LayoutDashboard, TrendingUp, ArrowDownCircle, ArrowUpCircle, History, User, Shield, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: TrendingUp, label: 'Investment Plans', path: '/investments' },
    { icon: ArrowDownCircle, label: 'Deposit', path: '/deposit' },
    { icon: ArrowUpCircle, label: 'Withdraw', path: '/withdraw' },
    { icon: History, label: 'Transactions', path: '/transactions' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  if (user.role === 'admin') {
    menuItems.push({ icon: Shield, label: 'Admin Panel', path: '/admin' });
  }

  return (
    <div className="min-h-screen bg-void">
      {/* Top Bar */}
      <header className="bg-paper border-b border-white/5 sticky top-0 z-50">
        <div className="px-6 py-4 flex justify-between items-center">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <Wallet className="w-8 h-8 text-[#FFD700]" />
            <span className="text-2xl font-bold font-['Outfit'] text-[#FFD700]">Iron Wallet</span>
          </Link>
          <div className="flex items-center space-x-4">
            <div className="text-right hidden md:block">
              <div className="text-sm text-white/70">Welcome back,</div>
              <div className="text-white font-semibold">{user.name}</div>
            </div>
            <Button
              data-testid="logout-btn"
              onClick={handleLogout}
              className="bg-transparent border border-white/20 text-white hover:bg-white/5 px-4 py-2 rounded-lg"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-paper border-r border-white/5 min-h-screen sticky top-[73px] hidden md:block">
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  data-testid={`nav-${item.label.toLowerCase().replace(' ', '-')}`}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/5 ${
                    isActive ? 'bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/30' : 'text-white/70'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8">
          {children}
        </main>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-paper border-t border-white/5 px-2 py-2">
        <div className="flex justify-around">
          {menuItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center p-2 rounded-lg ${
                  isActive ? 'text-[#FFD700]' : 'text-white/50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs mt-1">{item.label.split(' ')[0]}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
