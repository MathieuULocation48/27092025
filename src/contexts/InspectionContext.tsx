import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Inspection, InspectionImage, Anomaly } from '../types';

interface InspectionContextType {
  inspections: Inspection[];
  currentInspection: Inspection | null;
  createInspection: (vehicleId: string) => Inspection;
  updateInspection: (id: string, updates: Partial<Inspection>) => void;
  deleteInspection: (id: string) => void;
  setCurrentInspection: (inspection: Inspection | null) => void;
  addImageToInspection: (inspectionId: string, image: Omit<InspectionImage, 'id' | 'inspectionId' | 'uploadedAt'>) => void;
  addAnomalyToInspection: (inspectionId: string, anomaly: Omit<Anomaly, 'id' | 'inspectionId' | 'detectedAt'>) => void;
  getInspectionById: (id: string) => Inspection | undefined;
  getInspectionsByVehicle: (vehicleId: string) => Inspection[];
}

const InspectionContext = createContext<InspectionContextType | undefined>(undefined);

export const useInspections = () => {
  const context = useContext(InspectionContext);
  if (context === undefined) {
    throw new Error('useInspections must be used within an InspectionProvider');
  }
  return context;
};

interface InspectionProviderProps {
  children: ReactNode;
}

export const InspectionProvider: React.FC<InspectionProviderProps> = ({ children }) => {
  const [inspections, setInspections] = useState<Inspection[]>([]);
  const [currentInspection, setCurrentInspection] = useState<Inspection | null>(null);

  // Load inspections from localStorage on mount
  useEffect(() => {
    const savedInspections = localStorage.getItem('autoinspect_inspections');
    if (savedInspections) {
      try {
        const parsedInspections = JSON.parse(savedInspections);
        setInspections(parsedInspections);
      } catch (error) {
        console.error('Error loading inspections:', error);
      }
    } else {
      // Add demo inspections
      const demoInspections: Inspection[] = [
        {
          id: 'inspection-1',
          vehicleId: 'demo-1',
          date: '2024-01-15',
          status: 'completed',
          images: [],
          anomalies: [
            {
              id: 'anomaly-1',
              inspectionId: 'inspection-1',
              imageId: 'image-1',
              type: 'scratch',
              severity: 'medium',
              confidence: 0.92,
              coordinates: { x: 150, y: 200, width: 50, height: 20 },
              description: 'Rayure sur l\'aile avant droite',
              detectedAt: '2024-01-15T10:30:00Z'
            },
            {
              id: 'anomaly-2',
              inspectionId: 'inspection-1',
              imageId: 'image-2',
              type: 'dent',
              severity: 'low',
              confidence: 0.87,
              coordinates: { x: 300, y: 150, width: 30, height: 25 },
              description: 'Petit enfoncement sur la portière',
              detectedAt: '2024-01-15T10:31:00Z'
            }
          ],
          notes: 'Inspection complète - véhicule en bon état général',
          reportGenerated: true,
          createdAt: '2024-01-15T10:00:00Z',
          updatedAt: '2024-01-15T10:35:00Z'
        },
        {
          id: 'inspection-2',
          vehicleId: 'demo-2',
          date: '2024-01-14',
          status: 'in-progress',
          images: [],
          anomalies: [],
          reportGenerated: false,
          createdAt: '2024-01-14T14:00:00Z',
          updatedAt: '2024-01-14T14:15:00Z'
        },
        {
          id: 'inspection-3',
          vehicleId: 'demo-3',
          date: '2024-01-13',
          status: 'completed',
          images: [],
          anomalies: [
            {
              id: 'anomaly-3',
              inspectionId: 'inspection-3',
              imageId: 'image-3',
              type: 'paint_damage',
              severity: 'high',
              confidence: 0.95,
              coordinates: { x: 200, y: 100, width: 80, height: 40 },
              description: 'Dommage de peinture important sur le capot',
              detectedAt: '2024-01-13T16:20:00Z'
            }
          ],
          reportGenerated: true,
          createdAt: '2024-01-13T16:00:00Z',
          updatedAt: '2024-01-13T16:25:00Z'
        }
      ];
      setInspections(demoInspections);
      localStorage.setItem('autoinspect_inspections', JSON.stringify(demoInspections));
    }
  }, []);

  // Save inspections to localStorage whenever inspections change
  useEffect(() => {
    localStorage.setItem('autoinspect_inspections', JSON.stringify(inspections));
  }, [inspections]);

  const createInspection = (vehicleId: string): Inspection => {
    const newInspection: Inspection = {
      id: `inspection-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      vehicleId,
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
      images: [],
      anomalies: [],
      reportGenerated: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setInspections(prev => [...prev, newInspection]);
    setCurrentInspection(newInspection);
    return newInspection;
  };

  const updateInspection = (id: string, updates: Partial<Inspection>) => {
    setInspections(prev => prev.map(inspection => 
      inspection.id === id 
        ? { ...inspection, ...updates, updatedAt: new Date().toISOString() }
        : inspection
    ));
    
    if (currentInspection?.id === id) {
      setCurrentInspection(prev => prev ? { ...prev, ...updates } : null);
    }
  };

  const deleteInspection = (id: string) => {
    setInspections(prev => prev.filter(inspection => inspection.id !== id));
    if (currentInspection?.id === id) {
      setCurrentInspection(null);
    }
  };

  const addImageToInspection = (inspectionId: string, imageData: Omit<InspectionImage, 'id' | 'inspectionId' | 'uploadedAt'>) => {
    const newImage: InspectionImage = {
      ...imageData,
      id: `image-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      inspectionId,
      uploadedAt: new Date().toISOString()
    };

    setInspections(prev => prev.map(inspection => 
      inspection.id === inspectionId 
        ? { 
            ...inspection, 
            images: [...inspection.images, newImage],
            updatedAt: new Date().toISOString()
          }
        : inspection
    ));
  };

  const addAnomalyToInspection = (inspectionId: string, anomalyData: Omit<Anomaly, 'id' | 'inspectionId' | 'detectedAt'>) => {
    const newAnomaly: Anomaly = {
      ...anomalyData,
      id: `anomaly-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      inspectionId,
      detectedAt: new Date().toISOString()
    };

    setInspections(prev => prev.map(inspection => 
      inspection.id === inspectionId 
        ? { 
            ...inspection, 
            anomalies: [...inspection.anomalies, newAnomaly],
            updatedAt: new Date().toISOString()
          }
        : inspection
    ));
  };

  const getInspectionById = (id: string) => {
    return inspections.find(inspection => inspection.id === id);
  };

  const getInspectionsByVehicle = (vehicleId: string) => {
    return inspections.filter(inspection => inspection.vehicleId === vehicleId);
  };

  const value: InspectionContextType = {
    inspections,
    currentInspection,
    createInspection,
    updateInspection,
    deleteInspection,
    setCurrentInspection,
    addImageToInspection,
    addAnomalyToInspection,
    getInspectionById,
    getInspectionsByVehicle
  };

  return (
    <InspectionContext.Provider value={value}>
      {children}
    </InspectionContext.Provider>
  );
};