import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Car, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2,
  Calendar,
  Gauge
} from 'lucide-react';
import { useVehicles } from '../contexts/VehicleContext';
import { Vehicle } from '../types';
import VehicleModal from '../components/VehicleModal';

const VehiclesPage: React.FC = () => {
  const { vehicles, deleteVehicle } = useVehicles();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setIsModalOpen(true);
  };

  const handleDelete = (vehicleId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce véhicule ?')) {
      deleteVehicle(vehicleId);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingVehicle(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des véhicules</h1>
          <p className="text-gray-600">Gérez votre flotte de véhicules</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-500 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Ajouter un véhicule</span>
        </button>
      </div>

      {/* Search and filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par marque, modèle ou plaque..."
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
              <p className="text-sm font-medium text-gray-600">Total véhicules</p>
              <p className="text-2xl font-bold text-gray-900">{vehicles.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Car className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Inspections ce mois</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Camera className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Anomalies détectées</p>
              <p className="text-2xl font-bold text-gray-900">7</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Vehicles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVehicles.map((vehicle, index) => (
          <motion.div
            key={vehicle.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Car className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {vehicle.make} {vehicle.model}
                    </h3>
                    <p className="text-sm text-gray-600">{vehicle.year}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEdit(vehicle)}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(vehicle.id)}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Plaque</span>
                  <span className="text-sm font-medium text-gray-900">{vehicle.licensePlate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Couleur</span>
                  <span className="text-sm font-medium text-gray-900">{vehicle.color}</span>
                </div>
                {vehicle.mileage && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Kilométrage</span>
                    <span className="text-sm font-medium text-gray-900">
                      {vehicle.mileage.toLocaleString()} km
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Ajouté le</span>
                  <span className="text-sm font-medium text-gray-900">
                    {new Date(vehicle.createdAt).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-500 transition-colors flex items-center justify-center space-x-2">
                  <Camera className="w-4 h-4" />
                  <span>Nouvelle inspection</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty state */}
      {filteredVehicles.length === 0 && (
        <div className="text-center py-12">
          <Car className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm ? 'Aucun véhicule trouvé' : 'Aucun véhicule'}
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm 
              ? 'Essayez de modifier votre recherche'
              : 'Commencez par ajouter votre premier véhicule'
            }
          </p>
          {!searchTerm && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-500 transition-colors flex items-center space-x-2 mx-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Ajouter un véhicule</span>
            </button>
          )}
        </div>
      )}

      {/* Vehicle Modal */}
      <VehicleModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        vehicle={editingVehicle}
      />
    </div>
  );
};

export default VehiclesPage;