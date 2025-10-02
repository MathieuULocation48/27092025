import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="hidden lg:block lg:w-70">
        <Sidebar isOpen={true} onClose={() => {}} />
      </div>
      
      {/* Mobile sidebar */}
      <div className="lg:hidden">
        <Sidebar isOpen={sidebarOpen} onClose={handleSidebarClose} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuClick={handleMenuClick} />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;