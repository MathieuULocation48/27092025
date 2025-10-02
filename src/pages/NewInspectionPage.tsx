import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Camera, 
  Upload, 
  Car, 
  ArrowRight, 
  CheckCircle,
  AlertTriangle,
  FileText,
  Download
} from 'lucide-react';
import { useVehicles } from '../contexts/VehicleContext';
import { useInspections } from '../contexts/InspectionContext';
import ImageUpload from '../components/ImageUpload';
import AnomalyDetection from '../components/AnomalyDetection';

const NewInspectionPage: React.FC = () => {
  const navigate = useNavigate();
  const { vehicles, selectedVehicle, selectVehicle } = useVehicles();
  const { createInspection, currentInspection, updateInspection } = useInspections();
  
  const [step, setStep] = useState<'vehicle' | 'upload' | 'analysis' | 'results'>('vehicle');
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [analysisResults, setAnalysisResults] = useState<any[]>([]);

  const handleVehicleSelect = (vehicle: any) => {
    selectVehicle(vehicle);
    const inspection = createInspection(vehicle.id);
    setStep('upload');
  };

  const handleImagesUploaded = (images: File[]) => {
    setUploadedImages(images);
    setStep('analysis');
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockResults = images.map((image, index) => ({
        imageId: `image-${index}`,
        filename: image.name,
        anomalies: Math.random() > 0.5 ? [
          {
            type: ['scratch', 'dent', 'paint_damage'][Math.floor(Math.random() * 3)],
            severity: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
            confidence: 0.8 + Math.random() * 0.2,
            coordinates: {
              x: Math.random() * 400,
              y: Math.random() * 300,
              width: 50 + Math.random() * 100,
              height: 30 + Math.random() * 60
            },
            description: 'Anomalie détectée par IA'
          }
        ] : []
      }));
      
      setAnalysisResults(mockResults);
      setStep('results');
      
      if (currentInspection) {
        updateInspection(currentInspection.id, {
          status: 'completed',
          reportGenerated: true
        });
      }
    }, 3000);
  };

  const handleGenerateReport = () => {
    // Simulate report generation
    alert('Rapport PDF généré avec succès !');
  };

  const handleNewInspection = () => {
    setStep('vehicle');
    setUploadedImages([]);
    setAnalysisResults([]);
    selectVehicle(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Progress Steps */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          {[
            { key: 'vehicle', label: 'Véhicule', icon: Car },
            { key: 'upload', label: 'Photos', icon: Upload },
            { key: 'analysis', label: 'Analyse', icon: Camera },
            { key: 'results', label: 'Résultats', icon: FileText }
          ].map((stepItem, index) => {
            const isActive = step === stepItem.key;
            const isCompleted = ['vehicle', 'upload', 'analysis'].indexOf(step) > ['vehicle', 'upload', 'analysis'].indexOf(stepItem.key);
            
            return (
              <div key={stepItem.key} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  isCompleted ? 'bg-green-500 border-green-500 text-white' :
                  isActive ? 'bg-blue-500 border-blue-500 text-white' :
                  'border-gray-300 text-gray-400'
                }`}>
                  {isCompleted ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <stepItem.icon className="w-5 h-5" />
                  )}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                }`}>
                  {stepItem.label}
                </span>
                {index < 3 && (
                  <ArrowRight className="w-4 h-4 text-gray-400 mx-4" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {step === 'vehicle' && (
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Sélectionner un véhicule</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {vehicles.map((vehicle) => (
                <motion.div
                  key={vehicle.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleVehicleSelect(vehicle)}
                  className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Car className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {vehicle.make} {vehicle.model}
                      </h3>
                      <p className="text-sm text-gray-600">{vehicle.licensePlate}</p>
                      <p className="text-xs text-gray-500">{vehicle.year} • {vehicle.color}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {step === 'upload' && (
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Télécharger les photos</h2>
            <p className="text-gray-600 mb-6">
              Téléchargez des photos de votre véhicule pour l'analyse IA
            </p>
            <ImageUpload onImagesUploaded={handleImagesUploaded} />
          </div>
        )}

        {step === 'analysis' && (
          <div className="p-6">
            <AnomalyDetection images={uploadedImages} />
          </div>
        )}

        {step === 'results' && (
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Résultats de l'inspection</h2>
            
            {/* Summary */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{uploadedImages.length}</p>
                  <p className="text-sm text-gray-600">Photos analysées</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-600">
                    {analysisResults.reduce((acc, result) => acc + result.anomalies.length, 0)}
                  </p>
                  <p className="text-sm text-gray-600">Anomalies détectées</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    {Math.round(analysisResults.reduce((acc, result) => 
                      acc + (result.anomalies.length > 0 ? result.anomalies[0].confidence * 100 : 100), 0
                    ) / analysisResults.length)}%
                  </p>
                  <p className="text-sm text-gray-600">Confiance moyenne</p>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-4 mb-6">
              {analysisResults.map((result, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{result.filename}</h3>
                    {result.anomalies.length > 0 ? (
                      <span className="flex items-center space-x-1 text-red-600">
                        <AlertTriangle className="w-4 h-4" />
                        <span className="text-sm">{result.anomalies.length} anomalie(s)</span>
                      </span>
                    ) : (
                      <span className="flex items-center space-x-1 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm">Aucune anomalie</span>
                      </span>
                    )}
                  </div>
                  
                  {result.anomalies.map((anomaly: any, anomalyIndex: number) => (
                    <div key={anomalyIndex} className="bg-red-50 p-3 rounded-lg mt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-red-800">
                          {anomaly.type === 'scratch' ? 'Rayure' :
                           anomaly.type === 'dent' ? 'Enfoncement' :
                           anomaly.type === 'paint_damage' ? 'Dommage peinture' : 'Anomalie'}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          anomaly.severity === 'high' ? 'bg-red-200 text-red-800' :
                          anomaly.severity === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                          'bg-green-200 text-green-800'
                        }`}>
                          {anomaly.severity === 'high' ? 'Élevé' :
                           anomaly.severity === 'medium' ? 'Moyen' : 'Faible'}
                        </span>
                      </div>
                      <p className="text-sm text-red-700 mt-1">{anomaly.description}</p>
                      <p className="text-xs text-red-600 mt-1">
                        Confiance: {Math.round(anomaly.confidence * 100)}%
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex space-x-4">
              <button
                onClick={handleGenerateReport}
                className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-500 transition-colors flex items-center justify-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Générer le rapport PDF</span>
              </button>
              <button
                onClick={handleNewInspection}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Nouvelle inspection
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewInspectionPage;