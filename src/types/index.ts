export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  vin?: string;
  color: string;
  mileage?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Inspection {
  id: string;
  vehicleId: string;
  vehicle?: Vehicle;
  date: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  images: InspectionImage[];
  anomalies: Anomaly[];
  notes?: string;
  reportGenerated: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface InspectionImage {
  id: string;
  inspectionId: string;
  url: string;
  position: 'front' | 'back' | 'left' | 'right' | 'interior' | 'other';
  filename: string;
  size: number;
  uploadedAt: string;
}

export interface Anomaly {
  id: string;
  inspectionId: string;
  imageId: string;
  type: 'scratch' | 'dent' | 'crack' | 'rust' | 'paint_damage' | 'other';
  severity: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  coordinates: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  description: string;
  detectedAt: string;
}

export interface Report {
  id: string;
  inspectionId: string;
  inspection?: Inspection;
  generatedAt: string;
  pdfUrl?: string;
  summary: {
    totalAnomalies: number;
    severityBreakdown: Record<string, number>;
    recommendations: string[];
  };
}