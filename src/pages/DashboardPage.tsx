import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Camera, 
  Car, 
  FileText, 
  BarChart3, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { useVehicles } from '../contexts/VehicleContext';
import { useInspections } from '../contexts/InspectionContext';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const DashboardPage: React.FC = () => {
  const { vehicles } = useVehicles();
  const { inspections } = useInspections();

  const totalInspections = inspections.length;
  const completedInspections = inspections.filter(i => i.status === 'completed').length;
  const totalAnomalies = inspections.reduce((acc, i) => acc + i.anomalies.length, 0);
  const recentInspections = inspections
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const getVehicleInfo = (vehicleId: string) => {
    return vehicles.find(v => v.id === vehicleId);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'in-progress':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'failed':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Terminé';
      case 'in-progress':
        return 'En cours';
      case 'failed':
        return 'Échec';
      case 'pending':
        return 'En attente';
      default:
        return status;
    }
  };

  const stats = [
    { label: 'Véhicules', value: vehicles.length.toString(), icon: Car, color: 'blue', change: '+2' },
    { label: 'Inspections', value: totalInspections.toString(), icon: Camera, color: 'green', change: '+5' },
    { label: 'Rapports', value: completedInspections.toString(), icon: FileText, color: 'purple', change: '+3' },
    { label: 'Anomalies', value: totalAnomalies.toString(), icon: BarChart3, color: 'red', change: '-1' }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Tableau de bord</h1>
        <p className="text-gray-600">Vue d'ensemble de vos activités AutoInspect Pro</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change} cette semaine
                </p>
              </div>
              <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/dashboard/inspection/new"
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow group"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <Camera className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Nouvelle inspection</h4>
              <p className="text-sm text-gray-600">Démarrer une inspection IA</p>
            </div>
          </div>
        </Link>

        <Link
          to="/dashboard/vehicles"
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow group"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
              <Car className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Gérer les véhicules</h4>
              <p className="text-sm text-gray-600">Ajouter et modifier vos véhicules</p>
            </div>
          </div>
        </Link>

        <Link
          to="/dashboard/reports"
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow group"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Voir les rapports</h4>
              <p className="text-sm text-gray-600">Consulter tous les rapports</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Inspections */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Inspections récentes</h3>
              <Link
                to="/dashboard/inspections"
                className="text-blue-600 hover:text-blue-500 text-sm font-medium"
              >
                Voir tout
              </Link>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {recentInspections.length > 0 ? (
              recentInspections.map((inspection, index) => {
                const vehicle = getVehicleInfo(inspection.vehicleId);
                return (
                  <div key={inspection.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Car className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {vehicle ? `${vehicle.make} ${vehicle.model}` : 'Véhicule inconnu'}
                          </p>
                          <p className="text-sm text-gray-600">
                            {format(new Date(inspection.date), 'dd MMM yyyy', { locale: fr })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(inspection.status)}
                        <span className="text-sm text-gray-600">{getStatusText(inspection.status)}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center">
                <Camera className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">Aucune inspection récente</p>
              </div>
            )}
          </div>
        </div>

        {/* Performance Overview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Aperçu des performances</h3>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">Taux de réussite</span>
              </div>
              <span className="text-xl font-bold text-green-600">
                {totalInspections > 0 ? Math.round((completedInspections / totalInspections) * 100) : 0}%
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <span className="text-gray-700">Anomalies moyennes</span>
              </div>
              <span className="text-xl font-bold text-red-600">
                {totalInspections > 0 ? (totalAnomalies / totalInspections).toFixed(1) : '0'}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <span className="text-gray-700">Inspections ce mois</span>
              </div>
              <span className="text-xl font-bold text-blue-600">
                {inspections.filter(i => 
                  new Date(i.date).getMonth() === new Date().getMonth()
                ).length}
              </span>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <Link
                to="/dashboard/analytics"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-500 transition-colors text-center block"
              >
                Voir les analyses détaillées
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Vehicles */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Véhicules récents</h3>
            <Link
              to="/dashboard/vehicles"
              className="text-blue-600 hover:text-blue-500 text-sm font-medium"
            >
              Gérer les véhicules
            </Link>
          </div>
        </div>

        <div className="p-6">
          {vehicles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {vehicles.slice(0, 6).map((vehicle, index) => (
                <motion.div
                  key={vehicle.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Car className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {vehicle.make} {vehicle.model}
                      </h4>
                      <p className="text-sm text-gray-600">{vehicle.licensePlate}</p>
                      <p className="text-xs text-gray-500">{vehicle.year} • {vehicle.color}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Car className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 mb-4">Aucun véhicule enregistré</p>
              <Link
                to="/dashboard/vehicles"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-500 transition-colors"
              >
                Ajouter un véhicule
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;