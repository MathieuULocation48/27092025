import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Car, Calendar, Palette, Hash } from 'lucide-react';
import { useVehicles } from '../contexts/VehicleContext';
import { Vehicle } from '../types';

interface VehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle?: Vehicle | null;
}

const VehicleModal: React.FC<VehicleModalProps> = ({ isOpen, onClose, vehicle }) => {
  const { addVehicle, updateVehicle } = useVehicles();
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    licensePlate: '',
    vin: '',
    color: '',
    mileage: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (vehicle) {
      setFormData({
        make: vehicle.make,
        model: vehicle.model,
        year: vehicle.year,
        licensePlate: vehicle.licensePlate,
        vin: vehicle.vin || '',
        color: vehicle.color,
        mileage: vehicle.mileage?.toString() || ''
      });
    } else {
      setFormData({
        make: '',
        model: '',
        year: new Date().getFullYear(),
        licensePlate: '',
        vin: '',
        color: '',
        mileage: ''
      });
    }
  }, [vehicle, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const vehicleData = {
        make: formData.make,
        model: formData.model,
        year: formData.year,
        licensePlate: formData.licensePlate.toUpperCase(),
        vin: formData.vin || undefined,
        color: formData.color,
        mileage: formData.mileage ? parseInt(formData.mileage) : undefined
      };

      if (vehicle) {
        updateVehicle(vehicle.id, vehicleData);
      } else {
        addVehicle(vehicleData);
      }

      onClose();
    } catch (error) {
      console.error('Error saving vehicle:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const carMakes = [
    'Audi', 'BMW', 'Mercedes', 'Volkswagen', 'Peugeot', 'Renault', 'Citroën',
    'Ford', 'Toyota', 'Honda', 'Nissan', 'Hyundai', 'Kia', 'Volvo', 'Autre'
  ];

  const colors = [
    'Noir', 'Blanc', 'Gris', 'Argent', 'Bleu', 'Rouge', 'Vert', 'Jaune', 'Orange', 'Violet', 'Autre'
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Car className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {vehicle ? 'Modifier le véhicule' : 'Ajouter un véhicule'}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {vehicle ? 'Modifiez les informations du véhicule' : 'Ajoutez un nouveau véhicule à votre flotte'}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Marque *
                  </label>
                  <select
                    name="make"
                    value={formData.make}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Sélectionner</option>
                    {carMakes.map(make => (
                      <option key={make} value={make}>{make}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Modèle *
                  </label>
                  <input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="A4, X5, C200..."
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Année *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="number"
                      name="year"
                      value={formData.year}
                      onChange={handleInputChange}
                      min="1990"
                      max={new Date().getFullYear() + 1}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Couleur *
                  </label>
                  <div className="relative">
                    <Palette className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <select
                      name="color"
                      value={formData.color}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Sélectionner</option>
                      {colors.map(color => (
                        <option key={color} value={color}>{color}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Plaque d'immatriculation *
                </label>
                <input
                  type="text"
                  name="licensePlate"
                  value={formData.licensePlate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="AB-123-CD"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Numéro VIN (optionnel)
                </label>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    name="vin"
                    value={formData.vin}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="17 caractères"
                    maxLength={17}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kilométrage (optionnel)
                </label>
                <div className="relative">
                  <Gauge className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    name="mileage"
                    value={formData.mileage}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="150000"
                    min="0"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Enregistrement...' : (vehicle ? 'Modifier' : 'Ajouter')}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default VehicleModal;