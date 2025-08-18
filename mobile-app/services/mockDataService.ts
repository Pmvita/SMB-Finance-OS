// Mobile App MockData Service
// Uses shared mockData from backend/mockData/ (split into individual JSON files)

export interface MockData {
  user: {
    id: string;
    name: string;
    email: string;
    businessName: string;
    businessType: string;
    createdAt: string;
    lastLogin: string;
  };
  dashboard: {
    metrics: {
      totalRevenue: number;
      outstandingInvoices: number;
      monthlyExpenses: number;
      cashFlow: number;
      revenueChange: number;
      expenseChange: number;
      cashFlowChange: number;
    };
    quickActions: Array<{
      id: string;
      title: string;
      icon: string;
      color: string;
    }>;
    recentActivity: Array<{
      id: string;
      type: string;
      title: string;
      subtitle: string;
      icon: string;
      color: string;
    }>;
  };
  invoices: {
    summary: {
      totalInvoices: number;
      outstandingAmount: number;
      paidThisMonth: number;
      overdueAmount: number;
    };
    recent: Array<{
      id: string;
      client: string;
      amount: number;
      status: string;
      date: string;
      dueDate: string;
      items: Array<{
        description: string;
        quantity: number;
        rate: number;
        amount: number;
      }>;
    }>;
  };
  expenses: {
    summary: {
      totalExpenses: number;
      thisMonth: number;
      lastMonth: number;
      changePercent: number;
    };
    categories: Array<{
      name: string;
      icon: string;
      color: string;
      amount: number;
      count: number;
    }>;
    recent: Array<{
      id: string;
      category: string;
      amount: number;
      date: string;
      status: string;
      description: string;
    }>;
  };
  wallet: {
    totalBalance: number;
    balanceChange: number;
    changePercent: number;
    accounts: Array<{
      id: string;
      name: string;
      balance: number;
      currency: string;
      type: string;
      accountNumber: string;
    }>;
    recentTransactions: Array<{
      id: string;
      type: string;
      amount: number;
      description: string;
      date: string;
      account: string;
    }>;
  };
  profile: {
    stats: {
      invoices: number;
      balance: number;
      expenses: number;
    };
    settings: Array<{
      title: string;
      icon: string;
      color: string;
      action: string;
      value?: boolean;
    }>;
  };
}

class MockDataService {
  private static instance: MockDataService;
  private mockData: MockData | null = null;
  private isLoaded = false;

  private constructor() {}

  public static getInstance(): MockDataService {
    if (!MockDataService.instance) {
      MockDataService.instance = new MockDataService();
    }
    return MockDataService.instance;
  }

  // Add method to clear cache and force refresh
  public clearCache(): void {
    this.mockData = null;
    this.isLoaded = false;
  }

  private async loadMockData(): Promise<MockData> {
    if (this.isLoaded && this.mockData) {
      return this.mockData;
    }

    try {
      // Fetch from backend API (shared mockData - now split into individual files)
      const backendUrl = 'http://localhost:5001/api/mockdata';
      const response = await fetch(backendUrl);
      if (response.ok) {
        const data = await response.json();
        this.mockData = data as MockData;
        this.isLoaded = true;
        return this.mockData;
      }

      throw new Error('Backend mockData not available');
    } catch (error) {
      console.error('Error loading mock data from backend:', error);
      throw new Error('Failed to load mock data from backend. Please ensure the backend is running.');
    }
  }

  // Individual data getters for specific sections
  public async getUser() {
    const data = await this.loadMockData();
    return data.user;
  }

  public async getDashboard() {
    const data = await this.loadMockData();
    return data.dashboard;
  }

  public async getInvoices() {
    const data = await this.loadMockData();
    return data.invoices;
  }

  public async getExpenses() {
    const data = await this.loadMockData();
    return data.expenses;
  }

  public async getWallet() {
    const data = await this.loadMockData();
    return data.wallet;
  }

  public async getProfile() {
    const data = await this.loadMockData();
    return data.profile;
  }

  public async getAllData(): Promise<MockData> {
    return await this.loadMockData();
  }

  // Direct API calls for individual sections (if needed)
  public async fetchUser(): Promise<any> {
    return new Promise(async (resolve) => {
      setTimeout(async () => {
        try {
          console.log('Mobile App: Attempting to fetch user data from backend...');
          const response = await fetch('http://localhost:5001/api/mockdata/user');
          console.log('Mobile App: User API response status:', response.status);
          if (response.ok) {
            const data = await response.json();
            console.log('Mobile App: Successfully fetched user data:', data);
            resolve(data);
          } else {
            console.log('Mobile App: User API failed, falling back to cached data');
            const data = await this.loadMockData();
            resolve(data.user);
          }
        } catch (error) {
          console.log('Mobile App: User API error, falling back to cached data:', error);
          const data = await this.loadMockData();
          resolve(data.user);
        }
      }, 500);
    });
  }

  public async fetchDashboard(): Promise<any> {
    return new Promise(async (resolve) => {
      setTimeout(async () => {
        try {
          const response = await fetch('http://localhost:5001/api/mockdata/dashboard');
          if (response.ok) {
            const data = await response.json();
            resolve(data);
          } else {
            const data = await this.loadMockData();
            resolve(data.dashboard);
          }
        } catch (error) {
          const data = await this.loadMockData();
          resolve(data.dashboard);
        }
      }, 800);
    });
  }

  public async fetchInvoices(): Promise<any> {
    return new Promise(async (resolve) => {
      setTimeout(async () => {
        try {
          const response = await fetch('http://localhost:5001/api/mockdata/invoices');
          if (response.ok) {
            const data = await response.json();
            resolve(data);
          } else {
            const data = await this.loadMockData();
            resolve(data.invoices);
          }
        } catch (error) {
          const data = await this.loadMockData();
          resolve(data.invoices);
        }
      }, 600);
    });
  }

  public async fetchExpenses(): Promise<any> {
    return new Promise(async (resolve) => {
      setTimeout(async () => {
        try {
          const response = await fetch('http://localhost:5001/api/mockdata/expenses');
          if (response.ok) {
            const data = await response.json();
            resolve(data);
          } else {
            const data = await this.loadMockData();
            resolve(data.expenses);
          }
        } catch (error) {
          const data = await this.loadMockData();
          resolve(data.expenses);
        }
      }, 600);
    });
  }

  public async fetchWallet(): Promise<any> {
    return new Promise(async (resolve) => {
      setTimeout(async () => {
        try {
          const response = await fetch('http://localhost:5001/api/mockdata/wallet');
          if (response.ok) {
            const data = await response.json();
            resolve(data);
          } else {
            const data = await this.loadMockData();
            resolve(data.wallet);
          }
        } catch (error) {
          const data = await this.loadMockData();
          resolve(data.wallet);
        }
      }, 700);
    });
  }

  public async fetchProfile(): Promise<any> {
    return new Promise(async (resolve) => {
      setTimeout(async () => {
        try {
          const response = await fetch('http://localhost:5001/api/mockdata/profile');
          if (response.ok) {
            const data = await response.json();
            resolve(data);
          } else {
            const data = await this.loadMockData();
            resolve(data.profile);
          }
        } catch (error) {
          const data = await this.loadMockData();
          resolve(data.profile);
        }
      }, 500);
    });
  }
}

export default MockDataService; 