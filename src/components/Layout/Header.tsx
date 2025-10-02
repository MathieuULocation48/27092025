import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Menu,
  Bell,
  User,
  LogOut,
  Settings
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-4 lg:px-6">
      {/* Left side */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
        >
          <Menu className="w-5 h-5 text-gray-600" />
        </button>
        
        <div className="hidden lg:block">
          <h1 className="text-xl font-semibold text-gray-900">
            {location.pathname.includes('/inspection/new') ? 'Nouvelle inspection' :
             location.pathname.includes('/vehicles') ? 'Gestion des véhicules' :
             location.pathname.includes('/inspections') ? 'Historique des inspections' :
             location.pathname.includes('/reports') ? 'Rapports' :
             location.pathname.includes('/analytics') ? 'Statistiques' :
             location.pathname.includes('/settings') ? 'Paramètres' :
             'Tableau de bord'}
          </h1>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
        </button>

        {/* User menu */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-blue-600" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-900">
                {user?.firstName} {user?.lastName}
              </p>
              {user?.isOwner && (
                <p className="text-xs text-blue-600 font-medium">Propriétaire</p>
              )}
            </div>
          </div>

          {/* Dropdown menu */}
          <div className="relative group">
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Settings className="w-4 h-4 text-gray-600" />
            </button>
            
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="py-2">
                <Link
                  to="/dashboard/settings"
                  className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Settings className="w-4 h-4" />
                  <span>Paramètres</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Déconnexion</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;