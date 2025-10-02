import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Zap, 
  CheckCircle, 
  AlertTriangle,
  Loader
} from 'lucide-react';

interface AnomalyDetectionProps {
  images: File[];
}

const AnomalyDetection: React.FC<AnomalyDetectionProps> = ({ images }) => {
  const [progress, setProgress] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  useEffect(() => {
    // Simulate AI analysis progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setIsAnalyzing(false);
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    // Simulate current image processing
    const imageInterval = setInterval(() => {
      setCurrentImage(prev => {
        if (prev >= images.length - 1) {
          clearInterval(imageInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 500);

    return () => {
      clearInterval(interval);
      clearInterval(imageInterval);
    };
  }, [images.length]);

  return (
    <div className="text-center space-y-6">
      <div className="space-y-4">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
          {isAnalyzing ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <Brain className="w-10 h-10 text-blue-600" />
            </motion.div>
          ) : (
            <CheckCircle className="w-10 h-10 text-green-600" />
          )}
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {isAnalyzing ? 'Analyse IA en cours...' : 'Analyse terminée !'}
          </h2>
          <p className="text-gray-600">
            {isAnalyzing 
              ? 'Notre intelligence artificielle analyse vos images pour détecter les anomalies'
              : 'L\'analyse de vos images est maintenant terminée'
            }
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Progression</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-blue-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Current Processing */}
      {isAnalyzing && (
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center justify-center space-x-3">
            <Loader className="w-5 h-5 text-blue-600 animate-spin" />
            <span className="text-blue-800">
              Analyse de l'image {currentImage + 1} sur {images.length}
            </span>
          </div>
          {images[currentImage] && (
            <p className="text-sm text-blue-700 mt-2">
              {images[currentImage].name}
            </p>
          )}
        </div>
      )}

      {/* AI Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="text-center p-4">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Zap className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Détection rapide</h3>
          <p className="text-sm text-gray-600">Analyse en moins de 10 secondes</p>
        </div>

        <div className="text-center p-4">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Brain className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">IA avancée</h3>
          <p className="text-sm text-gray-600">Précision supérieure à 95%</p>
        </div>

        <div className="text-center p-4">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <AlertTriangle className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Détection complète</h3>
          <p className="text-sm text-gray-600">Rayures, enfoncements, dommages</p>
        </div>
      </div>
    </div>
  );
};

export default AnomalyDetection;