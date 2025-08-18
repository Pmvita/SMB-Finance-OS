// SMB Finance OS Shared MockData Service (JavaScript)
// Used by both frontend and mobile-app during development

class MockDataService {
  constructor() {
    this.mockData = null;
    this.isLoaded = false;
  }

  static getInstance() {
    if (!MockDataService.instance) {
      MockDataService.instance = new MockDataService();
    }
    return MockDataService.instance;
  }

  async loadMockData() {
    if (this.isLoaded && this.mockData) {
      return this.mockData;
    }

    try {
      // For frontend (Next.js), we'll use fetch to load the JSON
      // For mobile-app, we'll use the local file
      let data;
      
      if (typeof window !== 'undefined') {
        // Frontend environment - fetch from backend
        const response = await fetch('/api/mockdata');
        if (!response.ok) {
          throw new Error('Failed to fetch mock data');
        }
        data = await response.json();
      } else {
        // Node.js environment - read from file
        const fs = require('fs');
        const path = require('path');
        
        const mockDataPath = path.join(process.cwd(), 'backend', 'mockData', 'api.json');
        const fileData = fs.readFileSync(mockDataPath, 'utf8');
        data = JSON.parse(fileData);
      }

      this.mockData = data;
      this.isLoaded = true;
      return this.mockData;
    } catch (error) {
      console.error('Error loading mock data:', error);
      throw new Error('Failed to load mock data');
    }
  }

  async getDashboard() {
    const data = await this.loadMockData();
    return data.dashboard;
  }

  async getUser() {
    const data = await this.loadMockData();
    return data.user;
  }

  async getInvoices() {
    const data = await this.loadMockData();
    return data.invoices;
  }

  async getExpenses() {
    const data = await this.loadMockData();
    return data.expenses;
  }

  async getWallet() {
    const data = await this.loadMockData();
    return data.wallet;
  }

  async getProfile() {
    const data = await this.loadMockData();
    return data.profile;
  }

  async getAllData() {
    return await this.loadMockData();
  }
}

// Export for different environments
if (typeof module !== 'undefined' && module.exports) {
  // Node.js environment
  module.exports = MockDataService;
} else if (typeof window !== 'undefined') {
  // Browser environment
  window.MockDataService = MockDataService;
}

export default MockDataService; 