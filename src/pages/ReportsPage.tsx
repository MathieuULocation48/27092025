import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Download, 
  Search, 
  Filter, 
  Calendar,
  Car,
  AlertTriangle,
  CheckCircle,
  Eye
} from 'lucide-react';
import { useInspections } from '../contexts/InspectionContext';
import { useVehicles } from '../contexts/VehicleContext';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const ReportsPage: React.FC = () => {
  const { inspections } = useInspections();
  const { vehicles } = useVehicles();
  const [searchTerm, setSearchTerm] = useState('');

  const completedInspections = inspections.filter(inspection => 
    inspection.status === 'completed' && inspection.reportGenerated
  );

  const getVehicleInfo = (vehicleId: string) => {
    return vehicles.find(v => v.id === vehicleId);
  };

  const filteredReports = completedInspections.filter(inspection => {
    const vehicle = getVehicleInfo(inspection.vehicleId);
    return vehicle ? 
      `${vehicle.make} ${vehicle.model} ${vehicle.licensePlate}`.toLowerCase().includes(searchTerm.toLowerCase()) :
      false;
  });

  const handleDownloadReport = (inspectionId: string) => {
    // Simulate PDF download
    alert(`Téléchargement du rapport pour l'inspection ${inspectionId}`);
  };

  const handleViewReport = (inspectionId: string) => {
    // Simulate report viewing
    alert(`Affichage du rapport pour l'inspection ${inspectionId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Rapports d'inspection</h1>
          <p className="text-gray-600">Consultez et téléchargez vos rapports PDF</p>
        </div>
      </div>

      {/* Search */}
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
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-600" />
            <span>Filtres</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Rapports générés</p>
              <p className="text-2xl font-bold text-gray-900">{completedInspections.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Ce mois</p>
              <p className="text-2xl font-bold text-gray-900">
                {completedInspections.filter(i => 
                  new Date(i.date).getMonth() === new Date().getMonth()
                ).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avec anomalies</p>
              <p className="text-2xl font-bold text-gray-900">
                {completedInspections.filter(i => i.anomalies.length > 0).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Rapports disponibles</h3>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredReports.map((inspection, index) => {
            const vehicle = getVehicleInfo(inspection.vehicleId);
            return (
              <motion.div
                key={inspection.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Rapport d'inspection - {vehicle ? `${vehicle.make} ${vehicle.model}` : 'Véhicule inconnu'}
                      </h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <span className="flex items-center space-x-1">
                          <Car className="w-4 h-4" />
                          <span>{vehicle?.licensePlate}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{format(new Date(inspection.date), 'dd MMM yyyy', { locale: fr })}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          {inspection.anomalies.length > 0 ? (
                            <>
                              <AlertTriangle className="w-4 h-4 text-red-500" />
                              <span className="text-red-600">{inspection.anomalies.length} anomalie(s)</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-green-600">Aucune anomalie</span>
                            </>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleViewReport(inspection.id)}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Voir le rapport"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDownloadReport(inspection.id)}
                      className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Télécharger PDF"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Report Summary */}
                {inspection.anomalies.length > 0 && (
                  <div className="mt-4 ml-16">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <h5 className="text-sm font-medium text-red-800 mb-2">Anomalies détectées :</h5>
                      <div className="space-y-1">
                        {inspection.anomalies.slice(0, 3).map((anomaly, anomalyIndex) => (
                          <p key={anomalyIndex} className="text-sm text-red-700">
                            • {anomaly.description} ({anomaly.severity === 'high' ? 'Élevé' : 
                                                     anomaly.severity === 'medium' ? 'Moyen' : 'Faible'})
                          </p>
                        ))}
                        {inspection.anomalies.length > 3 && (
                          <p className="text-sm text-red-600">
                            ... et {inspection.anomalies.length - 3} autre(s)
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Empty state */}
      {filteredReports.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm ? 'Aucun rapport trouvé' : 'Aucun rapport disponible'}
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm 
              ? 'Essayez de modifier votre recherche'
              : 'Les rapports seront générés automatiquement après chaque inspection'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default ReportsPage;