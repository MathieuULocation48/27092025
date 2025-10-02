import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Car, 
  AlertTriangle,
  CheckCircle,
  Calendar,
  Target,
  Activity
} from 'lucide-react';
import { useInspections } from '../contexts/InspectionContext';
import { useVehicles } from '../contexts/VehicleContext';

const AnalyticsPage: React.FC = () => {
  const { inspections } = useInspections();
  const { vehicles } = useVehicles();

  const totalInspections = inspections.length;
  const completedInspections = inspections.filter(i => i.status === 'completed').length;
  const totalAnomalies = inspections.reduce((acc, i) => acc + i.anomalies.length, 0);
  const averageAnomaliesPerInspection = totalInspections > 0 ? (totalAnomalies / totalInspections).toFixed(1) : '0';

  const anomaliesByType = inspections.reduce((acc, inspection) => {
    inspection.anomalies.forEach(anomaly => {
      acc[anomaly.type] = (acc[anomaly.type] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const anomaliesBySeverity = inspections.reduce((acc, inspection) => {
    inspection.anomalies.forEach(anomaly => {
      acc[anomaly.severity] = (acc[anomaly.severity] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const monthlyInspections = inspections.reduce((acc, inspection) => {
    const month = new Date(inspection.date).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      scratch: 'Rayures',
      dent: 'Enfoncements',
      paint_damage: 'Dommages peinture',
      crack: 'Fissures',
      rust: 'Rouille',
      other: 'Autres'
    };
    return labels[type] || type;
  };

  const getSeverityLabel = (severity: string) => {
    const labels: Record<string, string> = {
      low: 'Faible',
      medium: 'Moyen',
      high: 'Élevé',
      critical: 'Critique'
    };
    return labels[severity] || severity;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Statistiques et analyses</h1>
        <p className="text-gray-600">Analysez les performances de vos inspections</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: 'Total inspections',
            value: totalInspections,
            icon: BarChart3,
            color: 'blue',
            change: '+12%'
          },
          {
            label: 'Taux de réussite',
            value: `${totalInspections > 0 ? Math.round((completedInspections / totalInspections) * 100) : 0}%`,
            icon: CheckCircle,
            color: 'green',
            change: '+5%'
          },
          {
            label: 'Anomalies détectées',
            value: totalAnomalies,
            icon: AlertTriangle,
            color: 'red',
            change: '-8%'
          },
          {
            label: 'Véhicules actifs',
            value: vehicles.length,
            icon: Car,
            color: 'purple',
            change: '+3%'
          }
        ].map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                <p className={`text-sm ${metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.change} vs mois dernier
                </p>
              </div>
              <div className={`w-12 h-12 bg-${metric.color}-100 rounded-lg flex items-center justify-center`}>
                <metric.icon className={`w-6 h-6 text-${metric.color}-600`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Anomalies by Type */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Anomalies par type</h3>
          <div className="space-y-3">
            {Object.entries(anomaliesByType).map(([type, count]) => {
              const percentage = totalAnomalies > 0 ? (count / totalAnomalies) * 100 : 0;
              return (
                <div key={type} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">{getTypeLabel(type)}</span>
                    <span className="text-gray-900 font-medium">{count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Anomalies by Severity */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Anomalies par sévérité</h3>
          <div className="space-y-3">
            {Object.entries(anomaliesBySeverity).map(([severity, count]) => {
              const percentage = totalAnomalies > 0 ? (count / totalAnomalies) * 100 : 0;
              const color = severity === 'high' || severity === 'critical' ? 'red' :
                          severity === 'medium' ? 'yellow' : 'green';
              return (
                <div key={severity} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">{getSeverityLabel(severity)}</span>
                    <span className="text-gray-900 font-medium">{count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`bg-${color}-500 h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Monthly Trend */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Évolution mensuelle des inspections</h3>
        <div className="space-y-4">
          {Object.entries(monthlyInspections).map(([month, count]) => (
            <div key={month} className="flex items-center justify-between">
              <span className="text-gray-700">{month}</span>
              <div className="flex items-center space-x-3">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(count / Math.max(...Object.values(monthlyInspections))) * 100}%` }}
                  />
                </div>
                <span className="text-gray-900 font-medium w-8 text-right">{count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Insights */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Insights de performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Efficacité de détection</h4>
                <p className="text-sm text-gray-600">95.2% de précision moyenne</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Temps d'analyse moyen</h4>
                <p className="text-sm text-gray-600">8.3 secondes par image</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Tendance qualité</h4>
                <p className="text-sm text-gray-600">Amélioration de 15% ce mois</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Fréquence d'inspection</h4>
                <p className="text-sm text-gray-600">{averageAnomaliesPerInspection} anomalies par inspection</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;