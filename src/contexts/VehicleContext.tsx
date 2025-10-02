import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Vehicle } from '../types';

interface VehicleContextType {
  vehicles: Vehicle[];
  selectedVehicle: Vehicle | null;
  addVehicle: (vehicle: Omit<Vehicle, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateVehicle: (id: string, updates: Partial<Vehicle>) => void;
  deleteVehicle: (id: string) => void;
  selectVehicle: (vehicle: Vehicle | null) => void;
  getVehicleById: (id: string) => Vehicle | undefined;
}

const VehicleContext = createContext<VehicleContextType | undefined>(undefined);

export const useVehicles = () => {
  const context = useContext(VehicleContext);
  if (context === undefined) {
    throw new Error('useVehicles must be used within a VehicleProvider');
  }
  return context;
};

interface VehicleProviderProps {
  children: ReactNode;
}

export const VehicleProvider: React.FC<VehicleProviderProps> = ({ children }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  // Load vehicles from localStorage on mount
  useEffect(() => {
    const savedVehicles = localStorage.getItem('autoinspect_vehicles');
    if (savedVehicles) {
      try {
        const parsedVehicles = JSON.parse(savedVehicles);
        setVehicles(parsedVehicles);
      } catch (error) {
        console.error('Error loading vehicles:', error);
      }
    } else {
      // Add some demo vehicles
      const demoVehicles: Vehicle[] = [
        {
          id: 'demo-1',
          make: 'BMW',
          model: 'X5',
          year: 2022,
          licensePlate: 'AB123CD',
          vin: 'WBAFR9C50DD123456',
          color: 'Noir',
          mileage: 25000,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z'
        },
        {
          id: 'demo-2',
          make: 'Audi',
          model: 'A4',
          year: 2021,
          licensePlate: 'EF456GH',
          vin: 'WAUZZZ8K2DA123456',
          color: 'Blanc',
          mileage: 18000,
          createdAt: '2024-01-02T00:00:00Z',
          updatedAt: '2024-01-02T00:00:00Z'
        },
        {
          id: 'demo-3',
          make: 'Mercedes',
          model: 'C200',
          year: 2023,
          licensePlate: 'IJ789KL',
          vin: 'WDD2050461A123456',
          color: 'Gris',
          mileage: 12000,
          createdAt: '2024-01-03T00:00:00Z',
          updatedAt: '2024-01-03T00:00:00Z'
        }
      ];
      setVehicles(demoVehicles);
      localStorage.setItem('autoinspect_vehicles', JSON.stringify(demoVehicles));
    }
  }, []);

  // Save vehicles to localStorage whenever vehicles change
  useEffect(() => {
    localStorage.setItem('autoinspect_vehicles', JSON.stringify(vehicles));
  }, [vehicles]);

  const addVehicle = (vehicleData: Omit<Vehicle, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newVehicle: Vehicle = {
      ...vehicleData,
      id: `vehicle-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setVehicles(prev => [...prev, newVehicle]);
  };

  const updateVehicle = (id: string, updates: Partial<Vehicle>) => {
    setVehicles(prev => prev.map(vehicle => 
      vehicle.id === id 
        ? { ...vehicle, ...updates, updatedAt: new Date().toISOString() }
        : vehicle
    ));
  };

  const deleteVehicle = (id: string) => {
    setVehicles(prev => prev.filter(vehicle => vehicle.id !== id));
    if (selectedVehicle?.id === id) {
      setSelectedVehicle(null);
    }
  };

  const selectVehicle = (vehicle: Vehicle | null) => {
    setSelectedVehicle(vehicle);
  };

  const getVehicleById = (id: string) => {
    return vehicles.find(vehicle => vehicle.id === id);
  };

  const value: VehicleContextType = {
    vehicles,
    selectedVehicle,
    addVehicle,
    updateVehicle,
    deleteVehicle,
    selectVehicle,
    getVehicleById
  };

  return (
    <VehicleContext.Provider value={value}>
      {children}
    </VehicleContext.Provider>
  );
};