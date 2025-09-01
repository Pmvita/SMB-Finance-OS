# Contributing Guide

Thank you for your interest in contributing to Trident Financial OS! This guide will help you understand our development workflow and contribution process.

## 🚀 Quick Start

### Prerequisites
- Git installed on your machine
- Node.js (for frontend development)
- Python 3.8+ (for backend development)
- Docker (optional, for local development)

### Getting Started
1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Trident-Financial-OS.git
   cd Trident-Financial-OS
   ```
3. **Add the original repository as upstream**:
   ```bash
   git remote add upstream https://github.com/Pmvita/Trident-Financial-OS.git
   ```

## 🔄 Development Workflow

### For Collaborators (Direct Access)
If you have been added as a collaborator to the repository:

1. **Create a feature branch** from main:
   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** and commit them:
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

3. **Push to your feature branch**:
   ```bash
   git push origin feature/your-feature-name
   ```

4. **Create a Pull Request** on GitHub:
   - Go to https://github.com/Pmvita/Trident-Financial-OS
   - Click "Compare & pull request"
   - Fill in the PR template
   - Request review from @Pmvita

### For External Contributors (Fork Workflow)
If you don't have direct access to the repository:

1. **Fork the repository** on GitHub
2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Trident-Financial-OS.git
   cd Trident-Financial-OS
   ```

3. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make your changes** and commit them:
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**:
   - Go to your fork on GitHub
   - Click "Compare & pull request"
   - Select the main repository as the base
   - Fill in the PR template

## 📋 Branch Protection Rules

Our main branch is protected with the following rules:

- ✅ **Pull Request Required**: All changes must go through a pull request
- ✅ **Code Review Required**: At least 1 approval needed before merging
- ✅ **Code Owner Review**: @Pmvita must approve all changes
- ✅ **Linear History**: No merge commits allowed
- ❌ **No Direct Pushes**: Cannot push directly to main
- ❌ **No Force Pushes**: Cannot force push to main

## 📝 Commit Message Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

[optional body]

[optional footer]
```

### Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples:
```
feat(auth): add OAuth2 login support
fix(api): resolve user data validation issue
docs(readme): update installation instructions
```

## 🧪 Testing

### Backend Testing
```bash
cd backend
python -m pytest tests/
```

### Frontend Testing
```bash
cd frontend
npm test
```

### Mobile App Testing
```bash
cd mobile-app
npm test
```

## 📚 Documentation

- **API Documentation**: `/docs/api/`
- **Architecture Guide**: `/docs/architecture/`
- **Development Setup**: See README.md

## 🐛 Reporting Issues

When reporting issues, please include:

1. **Environment details** (OS, Node.js version, etc.)
2. **Steps to reproduce**
3. **Expected vs actual behavior**
4. **Screenshots** (if applicable)
5. **Error logs** (if applicable)

## 🔧 Development Setup

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python run.py
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Mobile App Setup
```bash
cd mobile-app
npm install
npx expo start
```

## 🤝 Code Review Process

1. **Create a Pull Request** with a clear description
2. **Ensure all tests pass** locally
3. **Request review** from @Pmvita
4. **Address feedback** and make necessary changes
5. **Wait for approval** before merging

## 📄 License

By contributing to Trident Financial OS, you agree that your contributions will be licensed under the same license as the project.

## 🆘 Need Help?

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and general discussion
- **Email**: Contact @Pmvita directly for urgent matters

Thank you for contributing to Trident Financial OS! 🎉 