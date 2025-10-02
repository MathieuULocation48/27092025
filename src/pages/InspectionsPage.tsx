import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Calendar, 
  Car, 
  FileText, 
  Download,
  Eye,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { useInspections } from '../contexts/InspectionContext';
import { useVehicles } from '../contexts/VehicleContext';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const InspectionsPage: React.FC = () => {
  const { inspections } = useInspections();
  const { vehicles } = useVehicles();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const getVehicleInfo = (vehicleId: string) => {
    return vehicles.find(v => v.id === vehicleId);
  };

  const filteredInspections = inspections.filter(inspection => {
    const vehicle = getVehicleInfo(inspection.vehicleId);
    const matchesSearch = vehicle ? 
      `${vehicle.make} ${vehicle.model} ${vehicle.licensePlate}`.toLowerCase().includes(searchTerm.toLowerCase()) :
      false;
    const matchesStatus = statusFilter === 'all' || inspection.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Historique des inspections</h1>
          <p className="text-gray-600">Consultez toutes vos inspections passées</p>
        </div>
        <Link
          to="/dashboard/inspection/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-500 transition-colors flex items-center space-x-2"
        >
          <Camera className="w-4 h-4" />
          <span>Nouvelle inspection</span>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par véhicule..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Tous les statuts</option>
            <option value="completed">Terminé</option>
            <option value="in-progress">En cours</option>
            <option value="pending">En attente</option>
            <option value="failed">Échec</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total inspections', value: inspections.length, color: 'blue' },
          { label: 'Terminées', value: inspections.filter(i => i.status === 'completed').length, color: 'green' },
          { label: 'En cours', value: inspections.filter(i => i.status === 'in-progress').length, color: 'yellow' },
          { label: 'Anomalies détectées', value: inspections.reduce((acc, i) => acc + i.anomalies.length, 0), color: 'red' }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
          >
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Inspections List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Véhicule
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Anomalies
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Images
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInspections.map((inspection) => {
                const vehicle = getVehicleInfo(inspection.vehicleId);
                return (
                  <tr key={inspection.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                          <Car className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {vehicle ? `${vehicle.make} ${vehicle.model}` : 'Véhicule inconnu'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {vehicle?.licensePlate}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {format(new Date(inspection.date), 'dd MMM yyyy', { locale: fr })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(inspection.status)}`}>
                        {getStatusIcon(inspection.status)}
                        <span>{getStatusText(inspection.status)}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className={`font-medium ${
                        inspection.anomalies.length > 0 ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {inspection.anomalies.length}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {inspection.images.length}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-500 p-1">
                          <Eye className="w-4 h-4" />
                        </button>
                        {inspection.reportGenerated && (
                          <button className="text-green-600 hover:text-green-500 p-1">
                            <Download className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty state */}
      {filteredInspections.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm || statusFilter !== 'all' ? 'Aucune inspection trouvée' : 'Aucune inspection'}
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || statusFilter !== 'all'
              ? 'Essayez de modifier vos filtres de recherche'
              : 'Commencez par créer votre première inspection'
            }
          </p>
          {!searchTerm && statusFilter === 'all' && (
            <Link
              to="/dashboard/inspection/new"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-500 transition-colors inline-flex items-center space-x-2"
            >
              <Camera className="w-4 h-4" />
              <span>Nouvelle inspection</span>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default InspectionsPage;