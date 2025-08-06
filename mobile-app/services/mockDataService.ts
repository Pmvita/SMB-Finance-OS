import mockData from '../mockData/api.json';

export interface MockData {
  user: any;
  dashboard: any;
  invoices: any;
  expenses: any;
  wallet: any;
  profile: any;
}

class MockDataService {
  private static instance: MockDataService;
  private data: MockData = mockData;

  private constructor() {}

  public static getInstance(): MockDataService {
    if (!MockDataService.instance) {
      MockDataService.instance = new MockDataService();
    }
    return MockDataService.instance;
  }

  public getData(): MockData {
    return this.data;
  }

  public getUser() {
    return this.data.user;
  }

  public getDashboard() {
    return this.data.dashboard;
  }

  public getInvoices() {
    return this.data.invoices;
  }

  public getExpenses() {
    return this.data.expenses;
  }

  public getWallet() {
    return this.data.wallet;
  }

  public getProfile() {
    return this.data.profile;
  }

  // Simulate API delays
  public async fetchData(): Promise<MockData> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.data);
      }, 1000);
    });
  }

  public async fetchUser(): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.data.user);
      }, 500);
    });
  }

  public async fetchDashboard(): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.data.dashboard);
      }, 800);
    });
  }

  public async fetchInvoices(): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.data.invoices);
      }, 600);
    });
  }

  public async fetchExpenses(): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.data.expenses);
      }, 600);
    });
  }

  public async fetchWallet(): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.data.wallet);
      }, 700);
    });
  }

  public async fetchProfile(): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.data.profile);
      }, 400);
    });
  }
}

export default MockDataService; 