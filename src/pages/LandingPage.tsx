import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Camera, 
  Zap, 
  FileText, 
  Shield, 
  CheckCircle, 
  ArrowRight,
  Car,
  Clock,
  BarChart3,
  Users
} from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-100 to-indigo-100">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AutoInspect</h1>
                <p className="text-sm text-gray-600">Pro</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
              >
                Se connecter
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-500 transition-colors"
              >
                Essai gratuit
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                <span className="text-blue-600">Détection IA d'anomalies</span>
                <span className="block text-gray-900">carrosserie</span>
              </h1>
              <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
                Automatisez l'inspection de vos véhicules avec notre intelligence artificielle avancée. 
                Détectez rayures et enfoncements en quelques secondes et générez des rapports professionnels.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-500 transition-colors flex items-center space-x-2"
                >
                  <span>Commencer l'essai gratuit</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/login"
                  className="border-2 border-gray-400 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:border-gray-500 hover:text-gray-900 transition-colors"
                >
                  Voir la démo
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pourquoi choisir AutoInspect Pro ?
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Notre plateforme combine intelligence artificielle et expertise métier pour révolutionner l'inspection automobile
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Zap,
                title: 'Analyse rapide',
                description: 'Détection en moins de 10 secondes pour jusqu\'à 5 photos'
              },
              {
                icon: Shield,
                title: 'Précision IA',
                description: 'Taux de détection supérieur à 95% avec réduction des faux positifs'
              },
              {
                icon: FileText,
                title: 'Rapports pro',
                description: 'Génération automatique de rapports PDF annotés et personnalisés'
              },
              {
                icon: Car,
                title: 'Gestion complète',
                description: 'Suivi jusqu\'à 150 véhicules avec historique détaillé'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Users, value: '500+', label: 'Entreprises clientes' },
              { icon: Car, value: '25k+', label: 'Véhicules inspectés' },
              { icon: Clock, value: '< 10s', label: 'Temps d\'analyse' },
              { icon: BarChart3, value: '95%+', label: 'Précision détection' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-gray-900"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-blue-600" />
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-gray-700">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tarification simple et transparente
            </h2>
            <p className="text-xl text-gray-700">
              Commencez gratuitement, évoluez selon vos besoins
            </p>
          </div>

          <div className="max-w-lg mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-blue-200">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Professional</h3>
                <div className="text-5xl font-bold text-blue-600 mb-2">20€</div>
                <p className="text-gray-700">par mois</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                {[
                  'Jusqu\'à 150 véhicules',
                  'Analyse IA illimitée',
                  'Rapports PDF personnalisés',
                  'Historique complet',
                  'Support technique',
                  'Conformité RGPD'
                ].map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-success-500" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/register"
                className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-500 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Commencer l'essai gratuit</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">AutoInspect Pro</h3>
                </div>
              </div>
              <p className="text-gray-600">
                Solution IA pour l'inspection automobile professionnelle
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-gray-900">Produit</h4>
              <ul className="space-y-2 text-gray-600">
                <li>Fonctionnalités</li>
                <li>Tarification</li>
                <li>API</li>
                <li>Documentation</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-gray-900">Support</h4>
              <ul className="space-y-2 text-gray-600">
                <li>Centre d'aide</li>
                <li>Contact</li>
                <li>Formation</li>
                <li><a href="https://dcia.pro" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">Site Principal</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-gray-900">Légal</h4>
              <ul className="space-y-2 text-gray-600">
                <li>Confidentialité</li>
                <li>Conditions</li>
                <li>RGPD</li>
                <li>Sécurité</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
            <p>&copy; 2024 AutoInspect Pro. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;