import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Upload, Camera, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  onImagesUploaded: (images: File[]) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImagesUploaded }) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = [...uploadedFiles, ...acceptedFiles];
    setUploadedFiles(newFiles);

    // Create previews
    const newPreviews = acceptedFiles.map(file => URL.createObjectURL(file));
    setPreviews(prev => [...prev, ...newPreviews]);
  }, [uploadedFiles]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.heic', '.heif', '.tiff', '.bmp', '.gif']
    },
    multiple: true,
    maxFiles: 10
  });

  const removeImage = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    
    // Revoke URL to prevent memory leaks
    URL.revokeObjectURL(previews[index]);
    
    setUploadedFiles(newFiles);
    setPreviews(newPreviews);
  };

  const handleContinue = () => {
    if (uploadedFiles.length > 0) {
      onImagesUploaded(uploadedFiles);
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive 
            ? 'border-blue-400 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <input {...getInputProps()} />
        <div className="space-y-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
            {isDragActive ? (
              <Upload className="w-8 h-8 text-blue-600" />
            ) : (
              <Camera className="w-8 h-8 text-gray-600" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {isDragActive ? 'Déposez vos images ici' : 'Téléchargez vos photos'}
            </h3>
            <p className="text-gray-600">
              Glissez-déposez vos images ou cliquez pour sélectionner
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Formats supportés: JPEG, PNG, HEIC, TIFF, BMP, GIF (max 10 images)
            </p>
          </div>
        </div>
      </div>

      {/* Uploaded Images Preview */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">
            Images téléchargées ({uploadedFiles.length})
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {uploadedFiles.map((file, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="relative group"
              >
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  {previews[index] ? (
                    <img
                      src={previews[index]}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                </div>
                
                {/* Remove button */}
                <button
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
                
                {/* File info */}
                <div className="mt-2">
                  <p className="text-xs text-gray-600 truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(1)} MB
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Continue button */}
          <div className="flex justify-end">
            <button
              onClick={handleContinue}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-500 transition-colors flex items-center space-x-2"
            >
              <span>Analyser les images</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;