# API Documentation

Welcome to the Trident Financial OS API documentation. This API provides comprehensive financial management capabilities for small and medium businesses.

## 🔗 Quick Links

- **[Authentication](/docs/api/authentication.md)** - JWT-based authentication
- **[Invoices](/docs/api/invoices.md)** - Invoice management endpoints
- **[Expenses](/docs/api/expenses.md)** - Expense tracking endpoints
- **[Wallet](/docs/api/wallet.md)** - Digital wallet operations
- **[Payments](/docs/api/payments.md)** - Payment processing
- **[Tax](/docs/api/tax.md)** - Tax reporting and calculations
- **[Credit](/docs/api/credit.md)** - Credit scoring and assessment
- **[Payroll](/docs/api/payroll.md)** - Payroll management

## 🌐 Base URL

- **Development**: `http://localhost:5000/api/v1`
- **Staging**: `https://api-staging.tridentfinancialos.com/api/v1`
- **Production**: `https://api.tridentfinancialos.com/api/v1`

## 🔐 Authentication

All API endpoints require authentication using JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## 📊 Response Format

All API responses follow a consistent format:

```json
{
  "success": true,
  "data": {
    // Response data
  },
  "message": "Operation successful",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## 🚨 Error Handling

Errors are returned with appropriate HTTP status codes:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "field": "email",
      "issue": "Invalid email format"
    }
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## 📝 Rate Limiting

- **Free Tier**: 100 requests/hour
- **Pro Tier**: 1000 requests/hour
- **Enterprise**: Custom limits

## 🔧 SDKs & Libraries

- **[JavaScript/TypeScript SDK](/docs/api/sdks/javascript.md)**
- **[Python SDK](/docs/api/sdks/python.md)**
- **[React Native SDK](/docs/api/sdks/react-native.md)**

## 📚 OpenAPI Specification

Download the complete OpenAPI specification:
- [OpenAPI 3.0 JSON](/docs/api/openapi.json)
- [Postman Collection](/docs/api/postman-collection.json)

## 🆘 Support

- **API Status**: [status.tridentfinancialos.com](https://status.tridentfinancialos.com)
- **Developer Support**: [support@tridentfinancialos.com](mailto:support@tridentfinancialos.com)
- **Discord Community**: [Join our Discord](https://discord.gg/tridentfinancialos) 