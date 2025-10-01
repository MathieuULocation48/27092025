// Système d'authentification avec compte gratuit prédéfini
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  company: string;
  plan: 'free' | 'premium';
  isOwner: boolean;
  createdAt: string;
}

// Compte gratuit prédéfini - accès exclusif au propriétaire
const OWNER_ACCOUNT: User = {
  id: 'owner-001',
  email: 'c07g09a16@gmail.com',
  firstName: 'Propriétaire',
  lastName: 'AutoInspect',
  company: 'AutoInspect Pro',
  plan: 'free',
  isOwner: true,
  createdAt: '2024-01-01T00:00:00Z'
};

const OWNER_PASSWORD = 'mCCA1979@#';

export class AuthService {
  private static instance: AuthService;
  private currentUser: User | null = null;

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  // Connexion avec vérification du compte propriétaire
  async login(email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      // Vérification du compte propriétaire
      if (email === OWNER_ACCOUNT.email && password === OWNER_PASSWORD) {
        this.currentUser = OWNER_ACCOUNT;
        localStorage.setItem('auth_user', JSON.stringify(OWNER_ACCOUNT));
        localStorage.setItem('auth_token', 'owner-token-' + Date.now());
        
        return {
          success: true,
          user: OWNER_ACCOUNT
        };
      }

      // Aucun autre compte autorisé
      return {
        success: false,
        error: 'Accès non autorisé. Ce compte est réservé au propriétaire.'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erreur de connexion'
      };
    }
  }

  // Inscription - uniquement pour le compte propriétaire
  async register(userData: {
    firstName: string;
    lastName: string;
    company: string;
    email: string;
    password: string;
  }): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      // Seul le propriétaire peut créer un compte avec cette adresse
      if (userData.email === OWNER_ACCOUNT.email && userData.password === OWNER_PASSWORD) {
        const user: User = {
          ...OWNER_ACCOUNT,
          firstName: userData.firstName,
          lastName: userData.lastName,
          company: userData.company
        };

        this.currentUser = user;
        localStorage.setItem('auth_user', JSON.stringify(user));
        localStorage.setItem('auth_token', 'owner-token-' + Date.now());

        return {
          success: true,
          user
        };
      }

      return {
        success: false,
        error: 'Inscription non autorisée. Ce service est réservé au propriétaire.'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erreur lors de l\'inscription'
      };
    }
  }

  // Déconnexion
  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_token');
  }

  // Vérifier si l'utilisateur est connecté
  isAuthenticated(): boolean {
    if (this.currentUser) return true;
    
    const storedUser = localStorage.getItem('auth_user');
    const storedToken = localStorage.getItem('auth_token');
    
    if (storedUser && storedToken) {
      try {
        this.currentUser = JSON.parse(storedUser);
        return true;
      } catch {
        this.logout();
        return false;
      }
    }
    
    return false;
  }

  // Obtenir l'utilisateur actuel
  getCurrentUser(): User | null {
    if (this.currentUser) return this.currentUser;
    
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      try {
        this.currentUser = JSON.parse(storedUser);
        return this.currentUser;
      } catch {
        this.logout();
        return null;
      }
    }
    
    return null;
  }

  // Vérifier si l'utilisateur est le propriétaire
  isOwner(): boolean {
    const user = this.getCurrentUser();
    return user?.isOwner === true && user?.email === OWNER_ACCOUNT.email;
  }
}

export const authService = AuthService.getInstance();