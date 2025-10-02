import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Bell, 
  Shield, 
  Database, 
  Download,
  Upload,
  Trash2,
  Save,
  Camera,
  FileText
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [notifications, setNotifications] = useState({
    inspectionComplete: true,
    anomalyDetected: true,
    reportGenerated: false,
    weeklyReport: true
  });

  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Sécurité', icon: Shield },
    { id: 'data', label: 'Données', icon: Database }
  ];

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const handleExportData = () => {
    alert('Export des données en cours...');
  };

  const handleImportData = () => {
    alert('Import des données...');
  };

  const handleDeleteAllData = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer toutes vos données ? Cette action est irréversible.')) {
      localStorage.clear();
      alert('Toutes les données ont été supprimées.');
      window.location.reload();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
        <p className="text-gray-600">Gérez vos préférences et paramètres de compte</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </div>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'profile' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-semibold text-gray-900">Informations du profil</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prénom
                  </label>
                  <input
                    type="text"
                    value={user?.firstName || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom
                  </label>
                  <input
                    type="text"
                    value={user?.lastName || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Entreprise
                  </label>
                  <input
                    type="text"
                    value={user?.company || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    readOnly
                  />
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <div>
                    <h4 className="font-medium text-blue-900">Compte Propriétaire</h4>
                    <p className="text-sm text-blue-700">
                      Vous avez accès à toutes les fonctionnalités premium gratuitement.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'notifications' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-semibold text-gray-900">Préférences de notification</h3>
              
              <div className="space-y-4">
                {[
                  {
                    key: 'inspectionComplete',
                    label: 'Inspection terminée',
                    description: 'Recevoir une notification quand une inspection est terminée',
                    icon: CheckCircle
                  },
                  {
                    key: 'anomalyDetected',
                    label: 'Anomalie détectée',
                    description: 'Être alerté quand une anomalie est détectée',
                    icon: AlertTriangle
                  },
                  {
                    key: 'reportGenerated',
                    label: 'Rapport généré',
                    description: 'Notification lors de la génération d\'un rapport PDF',
                    icon: FileText
                  },
                  {
                    key: 'weeklyReport',
                    label: 'Rapport hebdomadaire',
                    description: 'Recevoir un résumé hebdomadaire par email',
                    icon: Calendar
                  }
                ].map((notification) => (
                  <div key={notification.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <notification.icon className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{notification.label}</h4>
                        <p className="text-sm text-gray-600">{notification.description}</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications[notification.key as keyof typeof notifications]}
                        onChange={(e) => handleNotificationChange(notification.key, e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-500 transition-colors flex items-center space-x-2">
                  <Save className="w-4 h-4" />
                  <span>Sauvegarder</span>
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'security' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-semibold text-gray-900">Sécurité du compte</h3>
              
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-green-600" />
                    <div>
                      <h4 className="font-medium text-green-900">Compte sécurisé</h4>
                      <p className="text-sm text-green-700">
                        Votre compte propriétaire bénéficie du plus haut niveau de sécurité.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Informations de sécurité</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <h5 className="font-medium text-gray-900 mb-1">Dernière connexion</h5>
                      <p className="text-sm text-gray-600">Aujourd'hui à 08:30</p>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <h5 className="font-medium text-gray-900 mb-1">Adresse IP</h5>
                      <p className="text-sm text-gray-600">192.168.1.100</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'data' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-semibold text-gray-900">Gestion des données</h3>
              
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Exporter les données</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Téléchargez toutes vos données (véhicules, inspections, rapports) au format JSON.
                  </p>
                  <button
                    onClick={handleExportData}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-500 transition-colors flex items-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Exporter</span>
                  </button>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Importer les données</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Importez des données depuis un fichier JSON d'export précédent.
                  </p>
                  <button
                    onClick={handleImportData}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-500 transition-colors flex items-center space-x-2"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Importer</span>
                  </button>
                </div>

                <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                  <h4 className="font-medium text-red-900 mb-2">Zone de danger</h4>
                  <p className="text-sm text-red-700 mb-4">
                    Supprimer définitivement toutes vos données. Cette action est irréversible.
                  </p>
                  <button
                    onClick={handleDeleteAllData}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-500 transition-colors flex items-center space-x-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Supprimer toutes les données</span>
                  </button>
                </div>
              </div>

              {/* Storage Info */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">Utilisation du stockage</h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Véhicules</span>
                    <span className="text-gray-900">{vehicles.length} entrées</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Inspections</span>
                    <span className="text-gray-900">{inspections.length} entrées</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Stockage local utilisé</span>
                    <span className="text-gray-900">~{Math.round((JSON.stringify(localStorage).length / 1024))} KB</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;