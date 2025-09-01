# Trident Financial OS Shared MockData System

This directory contains the shared mockData that both frontend and mobile-app use during development. The data is now split into individual JSON files for better maintainability and readability.

## 📁 Structure

```
backend/mockData/
├── api.json              # Main structure file (references individual files)
├── user.json             # User profile and business information
├── dashboard.json        # Dashboard metrics, quick actions, recent activity
├── invoices.json         # Invoice summary and recent invoices
├── expenses.json         # Expense summary, categories, recent expenses
├── wallet.json           # Account balances and recent transactions
├── profile.json          # User stats and settings
├── index.ts              # TypeScript service (Node.js)
├── mockDataService.js    # JavaScript service (Universal)
└── README.md            # This documentation
```

## 🎯 Purpose

The shared mockData system allows you to:

1. **Maintain consistency** - Same data across frontend and mobile-app
2. **Single source of truth** - Edit one file, updates everywhere
3. **Easy development** - No need to sync data between platforms
4. **Future-proof** - Easy to replace with real API when ready
5. **Better organization** - Split into logical sections for easier maintenance

## 🔄 How It Works

### Frontend (Next.js)
- Fetches data from `/api/mockdata` endpoint (combines all files)
- Can also fetch individual sections: `/api/mockdata/dashboard`, `/api/mockdata/invoices`, etc.
- Falls back to local file if backend unavailable
- Uses TypeScript interfaces for type safety

### Mobile App (React Native)
- Fetches data from `http://localhost:5000/api/mockdata` (combines all files)
- Can also fetch individual sections: `/api/mockdata/dashboard`, `/api/mockdata/invoices`, etc.
- Falls back to local `mockData/api.json` if backend unavailable
- Maintains offline capability

### Backend (Flask)
- Serves mockData via REST API endpoints
- Combines individual JSON files on demand
- Located at `/api/mockdata` (all data) or individual endpoints
- Supports individual endpoints for specific data sections

## 📊 Data Structure

The mockData is split into logical sections:

- **user.json** - User profile and business information
- **dashboard.json** - Metrics, quick actions, recent activity
- **invoices.json** - Invoice summary and recent invoices
- **expenses.json** - Expense summary, categories, recent expenses
- **wallet.json** - Account balances and recent transactions
- **profile.json** - User stats and settings

## 🚀 Usage

### Frontend Usage

```typescript
import MockDataService from '../services/mockDataService';

const mockService = MockDataService.getInstance();

// Get all data (combines all files)
const allData = await mockService.getAllData();

// Get specific data sections
const dashboard = await mockService.getDashboard();
const invoices = await mockService.getInvoices();
const expenses = await mockService.getExpenses();

// Direct API calls for individual sections
const userData = await mockService.fetchUser();
const dashboardData = await mockService.fetchDashboard();
```

### Mobile App Usage

```typescript
import MockDataService from '../services/mockDataService';

const mockService = MockDataService.getInstance();

// Get dashboard data (combines all files)
const dashboard = await mockService.fetchDashboard();

// Get user data
const user = await mockService.fetchUser();

// Get specific data sections
const invoices = await mockService.getInvoices();
const expenses = await mockService.getExpenses();
```

### Backend API Endpoints

- `GET /api/mockdata` - All mock data (combines all files)
- `GET /api/mockdata/user` - User data only
- `GET /api/mockdata/dashboard` - Dashboard data only
- `GET /api/mockdata/invoices` - Invoices data only
- `GET /api/mockdata/expenses` - Expenses data only
- `GET /api/mockdata/wallet` - Wallet data only
- `GET /api/mockdata/profile` - Profile data only

## 🔧 Development

### Adding New Data

1. **Create new JSON file** - Add new data file (e.g., `payments.json`)
2. **Update api.json** - Add reference to new file
3. **Update interfaces** - Add TypeScript interfaces in services
4. **Add backend route** - Create new endpoint in `mockdata.py`
5. **Test both platforms** - Ensure data loads correctly
6. **Update documentation** - Document new data structure

### Example: Adding New Data

```json
// backend/mockData/payments.json
{
  "summary": {
    "totalPayments": 15000,
    "pendingPayments": 2500
  },
  "recent": [
    {
      "id": "PAY-001",
      "amount": 2500,
      "status": "completed",
      "date": "2024-01-15"
    }
  ]
}
```

```json
// backend/mockData/api.json
{
  "user": "user.json",
  "dashboard": "dashboard.json",
  "invoices": "invoices.json",
  "expenses": "expenses.json",
  "wallet": "wallet.json",
  "profile": "profile.json",
  "payments": "payments.json"
}
```

### Updating Existing Data

1. **Edit specific JSON file** - Update `backend/mockData/dashboard.json`, `backend/mockData/invoices.json`, etc.
2. **Test frontend** - Verify data loads correctly
3. **Test mobile-app** - Verify data loads correctly
4. **Commit changes** - All platforms will use updated data

## 🎨 Data Format

### Consistent Structure
- Use camelCase for property names
- Include IDs for all items
- Use ISO date strings for dates
- Include status fields where applicable
- Each file should be self-contained and focused

### Example Structure
```json
{
  "id": "unique-id",
  "title": "Item Title",
  "amount": 1000,
  "status": "active",
  "date": "2024-01-15T10:30:00Z",
  "metadata": {
    "category": "business",
    "priority": "high"
  }
}
```

## 🔄 Migration to Real API

When ready to switch to real API:

1. **Update services** - Change fetch URLs to real API endpoints
2. **Maintain interfaces** - Keep same data structure
3. **Test thoroughly** - Ensure all data loads correctly
4. **Remove mockData** - Clean up mockData references

## 🚨 Troubleshooting

### Common Issues

1. **Data not loading** - Check if backend is running
2. **Type errors** - Update TypeScript interfaces
3. **CORS issues** - Ensure backend CORS is configured
4. **Network errors** - Check if localhost:5000 is accessible
5. **File not found** - Ensure all JSON files exist in mockData directory

### Debug Steps

1. Check browser console for errors
2. Verify backend is running on port 5000
3. Test API endpoints directly
4. Check network tab for failed requests
5. Verify all JSON files exist and are valid

## 📝 Notes

- MockData is for development only
- Don't commit sensitive data to mockData
- Keep data realistic but not production-like
- Update data regularly to reflect new features
- Each JSON file should be focused on a specific domain
- The `api.json` file serves as an index to all other files 