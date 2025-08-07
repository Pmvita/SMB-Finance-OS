// SMB Finance OS Shared MockData Service
// Used by both frontend and mobile-app during development

import fs from 'fs';
import path from 'path';

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

  private constructor() {}

  public static getInstance(): MockDataService {
    if (!MockDataService.instance) {
      MockDataService.instance = new MockDataService();
    }
    return MockDataService.instance;
  }

  private getMockDataPath(): string {
    // Try to find the mockData file relative to the current working directory
    const possiblePaths = [
      path.join(process.cwd(), 'backend', 'mockData', 'api.json'),
      path.join(process.cwd(), '..', 'backend', 'mockData', 'api.json'),
      path.join(__dirname, 'api.json'),
      path.join(__dirname, '..', 'mockData', 'api.json'),
    ];

    for (const mockPath of possiblePaths) {
      if (fs.existsSync(mockPath)) {
        return mockPath;
      }
    }

    throw new Error('MockData file not found. Please ensure backend/mockData/api.json exists.');
  }

  public async loadMockData(): Promise<MockData> {
    if (this.mockData) {
      return this.mockData;
    }

    try {
      const mockDataPath = this.getMockDataPath();
      const data = fs.readFileSync(mockDataPath, 'utf8');
      this.mockData = JSON.parse(data) as MockData;
      return this.mockData;
    } catch (error) {
      console.error('Error loading mock data:', error);
      throw new Error('Failed to load mock data');
    }
  }

  public async getDashboard() {
    const data = await this.loadMockData();
    return data.dashboard;
  }

  public async getUser() {
    const data = await this.loadMockData();
    return data.user;
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
}

export default MockDataService; 