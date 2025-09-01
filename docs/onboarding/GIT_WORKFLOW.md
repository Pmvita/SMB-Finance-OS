# Git & GitHub Workflow Guide

## 🎯 Overview

This guide covers the Git workflow and GitHub practices for the Trident Financial OS project, ensuring consistent collaboration between team members.

## 📋 Prerequisites

- Git installed on your machine
- GitHub account with access to the repository
- Basic understanding of Git commands

## 🌿 Branching Strategy

### Main Branches

#### `main` Branch
- **Purpose**: Production-ready code
- **Protection**: Direct commits disabled
- **Updates**: Only via Pull Requests from `develop`
- **Deployment**: Automatically deploys to production

#### `develop` Branch
- **Purpose**: Integration branch for all features
- **Protection**: Direct commits disabled
- **Updates**: Only via Pull Requests from feature branches
- **Deployment**: Staging environment

### Feature Branches

#### Naming Convention
```
feature/[component]-[description]
```

#### Current Feature Branches
- `feature/backend-api` - Backend API development (Harry's branch)
- `feature/frontend-landing` - Frontend landing page
- `feature/mobile-app` - Mobile app development
- `feature/shared-types` - Shared TypeScript interfaces
- `feature/testing` - Testing infrastructure
- `feature/deployment` - Deployment configuration

## 🔄 Workflow Steps

### 1. Starting Work

#### Check Current Branch
```bash
git branch
# Should show current branch with *
```

#### Switch to Your Feature Branch
```bash
git checkout feature/your-branch-name
# or
git switch feature/your-branch-name
```

#### Pull Latest Changes
```bash
git pull origin feature/your-branch-name
```

### 2. Making Changes

#### Create/Edit Files
- Make your changes
- Follow coding standards
- Test your changes

#### Check Status
```bash
git status
# Shows modified, added, deleted files
```

#### Stage Changes
```bash
# Stage specific files
git add filename.ts

# Stage all changes
git add .

# Stage with pattern
git add *.ts
```

#### Commit Changes
```bash
# Follow conventional commits
git commit -m "feat: add user authentication"

# Commit types:
# feat: new feature
# fix: bug fix
# docs: documentation
# style: formatting
# refactor: code restructuring
# test: adding tests
# chore: maintenance
```

### 3. Pushing Changes

#### Push to Remote
```bash
git push origin feature/your-branch-name
```

#### First Time Push (Set Upstream)
```bash
git push -u origin feature/your-branch-name
```

### 4. Creating Pull Requests

#### Via GitHub CLI
```bash
gh pr create --base develop --head feature/your-branch-name --title "feat: add user authentication" --body "Adds JWT-based user authentication with login/logout functionality"
```

#### Via GitHub Website
1. Go to repository on GitHub
2. Click "Compare & pull request"
3. Select base: `develop`, compare: `feature/your-branch-name`
4. Add title and description
5. Request review from team members

### 5. Code Review Process

#### Review Checklist
- [ ] Code follows project standards
- [ ] Tests are included
- [ ] Documentation is updated
- [ ] No breaking changes
- [ ] Performance considerations
- [ ] Security considerations

#### Review Commands
```bash
# View PR details
gh pr view [PR_NUMBER]

# List PRs
gh pr list

# Checkout PR locally
gh pr checkout [PR_NUMBER]
```

### 6. Merging

#### After Approval
1. Merge via GitHub (preferred)
2. Delete feature branch
3. Update local repository

```bash
# Switch to develop
git checkout develop

# Pull latest changes
git pull origin develop

# Delete local feature branch
git branch -d feature/your-branch-name
```

## 🚨 Common Scenarios

### Scenario 1: Working on Wrong Branch
```bash
# Check current branch
git branch

# Switch to correct branch
git checkout feature/correct-branch

# If you made changes, stash them
git stash

# Switch branch
git checkout feature/correct-branch

# Apply stashed changes
git stash pop
```

### Scenario 2: Conflicts
```bash
# Pull latest changes
git pull origin feature/your-branch-name

# If conflicts occur
# 1. Open conflicted files
# 2. Resolve conflicts manually
# 3. Stage resolved files
git add resolved-file.ts

# 4. Commit resolution
git commit -m "fix: resolve merge conflicts"
```

### Scenario 3: Undo Last Commit
```bash
# Soft reset (keep changes staged)
git reset --soft HEAD~1

# Hard reset (discard changes)
git reset --hard HEAD~1
```

### Scenario 4: Update Feature Branch with Develop
```bash
# Switch to develop
git checkout develop

# Pull latest changes
git pull origin develop

# Switch back to feature branch
git checkout feature/your-branch-name

# Merge develop into feature branch
git merge develop

# Resolve conflicts if any
# Then push updated feature branch
git push origin feature/your-branch-name
```

## 📝 Commit Message Guidelines

### Conventional Commits Format
```
type(scope): description

[optional body]

[optional footer]
```

### Examples
```bash
git commit -m "feat(auth): add JWT authentication"
git commit -m "fix(invoice): resolve payment calculation bug"
git commit -m "docs(api): update authentication endpoints"
git commit -m "style(frontend): format landing page components"
git commit -m "refactor(backend): restructure user model"
git commit -m "test(expenses): add expense validation tests"
git commit -m "chore(deps): update dependencies"
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

## 🔧 Git Configuration

### Set Up User
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Set Up GitHub CLI
```bash
# Install GitHub CLI
brew install gh

# Authenticate
gh auth login
```

### Useful Aliases
```bash
# Add to ~/.gitconfig
[alias]
    st = status
    co = checkout
    br = branch
    ci = commit
    unstage = reset HEAD --
    last = log -1 HEAD
    visual = !gitk
```

## 🚀 Best Practices

### Do's
- ✅ Always work on feature branches
- ✅ Pull latest changes before starting work
- ✅ Write clear commit messages
- ✅ Test your changes before committing
- ✅ Keep commits small and focused
- ✅ Update documentation when needed
- ✅ Request code reviews

### Don'ts
- ❌ Never commit directly to `main` or `develop`
- ❌ Don't commit broken code
- ❌ Don't commit large files
- ❌ Don't commit sensitive information
- ❌ Don't force push to shared branches
- ❌ Don't ignore code review feedback

## 🆘 Troubleshooting

### Reset to Remote
```bash
git fetch origin
git reset --hard origin/feature/your-branch-name
```

### Clean Working Directory
```bash
git clean -fd
git reset --hard HEAD
```

### View Git History
```bash
# View commit history
git log --oneline

# View file history
git log --follow filename.ts

# View branch graph
git log --graph --oneline --all
```

### Stash Management
```bash
# Stash changes
git stash

# List stashes
git stash list

# Apply specific stash
git stash apply stash@{0}

# Drop stash
git stash drop stash@{0}
```

## 📚 Additional Resources

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub CLI Documentation](https://cli.github.com/)

## 🤝 Team Collaboration

### For Harry (Backend)
- Primary branch: `feature/backend-api`
- Focus: API development, database models, authentication
- Review: Frontend and mobile app PRs

### For Peter (Frontend)
- Primary branch: `feature/frontend-landing`
- Focus: Landing page, dashboard, user interface
- Review: Backend API PRs

### For Mobile Developer
- Primary branch: `feature/mobile-app`
- Focus: React Native app development
- Review: Backend API and shared types PRs

---

*This workflow ensures consistent, professional development practices for the Trident Financial OS project.* 