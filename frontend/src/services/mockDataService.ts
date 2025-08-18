// Frontend MockData Service
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
      const response = await fetch('http://localhost:5001/api/mockdata');
      if (response.ok) {
        const data = await response.json();
        this.mockData = data as MockData;
        this.isLoaded = true;
        return this.mockData;
      }

      throw new Error('Failed to load mock data from backend');
    } catch (error) {
      console.error('Error loading mock data:', error);
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
  public async fetchUser() {
    const response = await fetch('http://localhost:5001/api/mockdata/user');
    if (response.ok) {
      return await response.json();
    }
    throw new Error('Failed to fetch user data');
  }

  public async fetchDashboard() {
    const response = await fetch('http://localhost:5001/api/mockdata/dashboard');
    if (response.ok) {
      return await response.json();
    }
    throw new Error('Failed to fetch dashboard data');
  }

  public async fetchInvoices() {
    const response = await fetch('http://localhost:5001/api/mockdata/invoices');
    if (response.ok) {
      return await response.json();
    }
    throw new Error('Failed to fetch invoices data');
  }

  public async fetchExpenses() {
    const response = await fetch('http://localhost:5001/api/mockdata/expenses');
    if (response.ok) {
      return await response.json();
    }
    throw new Error('Failed to fetch expenses data');
  }

  public async fetchWallet() {
    const response = await fetch('http://localhost:5001/api/mockdata/wallet');
    if (response.ok) {
      return await response.json();
    }
    throw new Error('Failed to fetch wallet data');
  }

  public async fetchProfile() {
    const response = await fetch('http://localhost:5001/api/mockdata/profile');
    if (response.ok) {
      return await response.json();
    }
    throw new Error('Failed to fetch profile data');
  }
}

export default MockDataService; 