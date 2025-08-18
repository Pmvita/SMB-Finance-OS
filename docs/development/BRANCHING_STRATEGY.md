# Branching Strategy

This document outlines the Git branching strategy for the SMB Finance OS project.

## 🌿 Branch Structure

```
main (production)
├── develop (integration)
├── feature/backend-api (Harry's main branch)
├── feature/frontend-landing (Frontend development)
├── feature/mobile-app (Mobile app development)
├── feature/shared-types (Shared TypeScript interfaces)
├── feature/testing (Test infrastructure)
└── feature/deployment (Deployment configuration)
```

## 📋 Branch Descriptions

### Main Branches

- **`main`**: Production-ready code. Only accepts merges from `develop`.
- **`develop`**: Integration branch. All feature branches merge here before going to main.

### Feature Branches

- **`feature/backend-api`**: Harry's primary branch for backend development
  - Flask API endpoints
  - Database models and migrations
  - Business logic implementation
  - API documentation
  - Backend testing

- **`feature/frontend-landing`**: Frontend development
  - Next.js landing page
  - User authentication flows
  - Dashboard components
  - API integration

- **`feature/mobile-app`**: Mobile app development
  - React Native screens
  - Mobile-specific features
  - API integration for mobile

- **`feature/shared-types`**: Shared TypeScript interfaces
  - Common interfaces between frontend/mobile
  - API response types
  - Business logic types

- **`feature/testing`**: Testing infrastructure
  - Unit tests
  - Integration tests
  - E2E tests
  - CI/CD test pipelines

- **`feature/deployment`**: Deployment configuration
  - Docker configurations
  - Vercel deployment
  - Production environment setup

## 🔄 Workflow

### For Harry (Backend Development)

1. **Start work on backend features**:
   ```bash
   git checkout feature/backend-api
   git pull origin feature/backend-api
   ```

2. **Create feature-specific branches**:
   ```bash
   git checkout -b feature/backend-api/auth-endpoints
   git checkout -b feature/backend-api/invoice-crud
   git checkout -b feature/backend-api/payment-integration
   ```

3. **Complete feature and merge back**:
   ```bash
   git checkout feature/backend-api
   git merge feature/backend-api/auth-endpoints
   git push origin feature/backend-api
   ```

4. **Merge to develop when ready**:
   ```bash
   git checkout develop
   git merge feature/backend-api
   git push origin develop
   ```

### For Frontend/Mobile Development

1. **Start work on frontend features**:
   ```bash
   git checkout feature/frontend-landing
   git pull origin feature/frontend-landing
   ```

2. **Create feature-specific branches**:
   ```bash
   git checkout -b feature/frontend-landing/signup-flow
   git checkout -b feature/frontend-landing/dashboard
   ```

3. **Complete feature and merge back**:
   ```bash
   git checkout feature/frontend-landing
   git merge feature/frontend-landing/signup-flow
   git push origin feature/frontend-landing
   ```

## 📝 Commit Message Convention

Use conventional commits format:

```
type(scope): description

feat(auth): add JWT authentication endpoints
fix(invoice): resolve invoice calculation bug
docs(api): update API documentation
test(backend): add unit tests for user model
```

### Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

## 🔀 Merge Strategy

### Feature → Feature Branch
- Use `git merge` for simple merges
- Use `git rebase` to keep history clean

### Feature → Develop
- Create Pull Request
- Require code review
- Run automated tests
- Merge only after approval

### Develop → Main
- Create Release Pull Request
- Run full test suite
- Deploy to staging environment
- Merge only after successful staging deployment

## 🚀 Release Process

1. **Prepare release**:
   ```bash
   git checkout develop
   git pull origin develop
   # Update version numbers
   git commit -m "chore: bump version to 1.0.0"
   ```

2. **Create release branch**:
   ```bash
   git checkout -b release/1.0.0
   git push origin release/1.0.0
   ```

3. **Merge to main**:
   ```bash
   git checkout main
   git merge release/1.0.0
   git tag -a v1.0.0 -m "Release version 1.0.0"
   git push origin main --tags
   ```

4. **Merge back to develop**:
   ```bash
   git checkout develop
   git merge release/1.0.0
   git push origin develop
   ```

## 👥 Team Responsibilities

### Harry (Backend Developer)
- **Primary branch**: `feature/backend-api`
- **Responsibilities**:
  - Flask API development
  - Database design and migrations
  - Business logic implementation
  - API documentation
  - Backend testing
  - Performance optimization

### Frontend Developer
- **Primary branch**: `feature/frontend-landing`
- **Responsibilities**:
  - Next.js development
  - User interface design
  - API integration
  - Frontend testing

### Mobile Developer
- **Primary branch**: `feature/mobile-app`
- **Responsibilities**:
  - React Native development
  - Mobile-specific features
  - API integration for mobile

## 🔧 Development Setup

### For Harry (Backend)

1. **Clone and setup**:
   ```bash
   git clone <repository-url>
   cd SMB-Finance-OS
   git checkout feature/backend-api
   ```

2. **Setup Python environment**:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Setup database**:
   ```bash
   cp env.example .env
   # Edit .env with your database credentials
   python run.py init-db
   ```

4. **Start development**:
   ```bash
   python run.py
   ```

### For Frontend Developer

1. **Setup frontend**:
   ```bash
   git checkout feature/frontend-landing
   cd frontend
   npm install
   cp .env.example .env.local
   # Edit .env.local with API endpoint
   npm run dev
   ```

## 📋 Best Practices

1. **Always pull before starting work**:
   ```bash
   git pull origin <your-branch>
   ```

2. **Create small, focused commits**:
   ```bash
   git commit -m "feat(auth): add user registration endpoint"
   ```

3. **Use descriptive branch names**:
   ```bash
   git checkout -b feature/backend-api/payment-gateway-integration
   ```

4. **Keep branches up to date**:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout feature/backend-api
   git merge develop
   ```

5. **Test before merging**:
   ```bash
   # Run tests
   python -m pytest
   # Run linting
   flake8
   ```

## 🚨 Conflict Resolution

1. **Identify conflicts**:
   ```bash
   git status
   ```

2. **Resolve conflicts**:
   - Edit conflicted files
   - Remove conflict markers
   - Add resolved files

3. **Complete merge**:
   ```bash
   git add .
   git commit -m "resolve: merge conflicts in auth endpoints"
   ```

## 📞 Communication

- Use Pull Request descriptions to explain changes
- Tag team members for reviews
- Use commit messages to track changes
- Regular sync meetings to discuss integration points

## 🔄 Daily Workflow for Harry

1. **Start of day**:
   ```bash
   git checkout feature/backend-api
   git pull origin feature/backend-api
   ```

2. **Create feature branch**:
   ```bash
   git checkout -b feature/backend-api/new-feature
   ```

3. **Work on feature**:
   - Write code
   - Write tests
   - Update documentation

4. **Commit changes**:
   ```bash
   git add .
   git commit -m "feat(backend): add new feature"
   ```

5. **Push and create PR**:
   ```bash
   git push origin feature/backend-api/new-feature
   # Create PR to feature/backend-api
   ```

6. **Merge and continue**:
   ```bash
   git checkout feature/backend-api
   git merge feature/backend-api/new-feature
   git push origin feature/backend-api
   ``` 