import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Camera, 
  Car, 
  FileText, 
  BarChart3, 
  Settings,
  Home,
  Plus,
  Search
} from 'lucide-react';
import { motion } from 'framer-motion';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Tableau de bord', path: '/dashboard' },
    { icon: Camera, label: 'Nouvelle inspection', path: '/dashboard/inspection/new' },
    { icon: Car, label: 'Véhicules', path: '/dashboard/vehicles' },
    { icon: Search, label: 'Inspections', path: '/dashboard/inspections' },
    { icon: FileText, label: 'Rapports', path: '/dashboard/reports' },
    { icon: BarChart3, label: 'Statistiques', path: '/dashboard/analytics' },
    { icon: Settings, label: 'Paramètres', path: '/dashboard/settings' }
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={{ x: -280 }}
        animate={{ x: isOpen ? 0 : -280 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed left-0 top-0 h-full w-70 bg-white shadow-xl z-50 lg:relative lg:translate-x-0 lg:shadow-none lg:border-r lg:border-gray-200"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AutoInspect</h1>
                <p className="text-sm text-gray-600">Pro</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={onClose}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <item.icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Quick Actions */}
          <div className="p-4 border-t border-gray-200">
            <Link
              to="/dashboard/inspection/new"
              onClick={onClose}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-500 transition-colors flex items-center justify-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Nouvelle inspection</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;