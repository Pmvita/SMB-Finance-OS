# SMB Finance OS Shared Color Guide

## 🎨 Overview

This document defines the shared color system for SMB Finance OS, ensuring consistent branding across frontend (Next.js) and mobile app (React Native) platforms.

## 📁 File Structure

```
shared/
├── styles/
│   └── colors.css          # CSS variables and styles
├── constants/
│   └── colors.ts           # TypeScript color constants
└── docs/
    └── COLOR_GUIDE.md      # This guide
```

## 🎯 Brand Color Philosophy

### Core Principles
- **Trust**: Blue dominates to build financial confidence
- **Growth**: Green represents prosperity and success
- **Attention**: Orange for important notices without aggression
- **Caution**: Red used sparingly for critical alerts only

### Target Markets
- **Global SMBs**: Colors work across cultures
- **Emerging Markets**: Accessible and professional
- **Financial Context**: Appropriate for business users

## 🎨 Color Palette

### Primary Colors

#### Blue (`#3b82f6`) - Trust & Professionalism
- **Usage**: Main brand color, primary actions, navigation
- **Meaning**: Trust, reliability, financial stability
- **Shades**: 50-900 for different contexts

#### Green (`#22c55e`) - Growth & Prosperity
- **Usage**: Success states, positive actions, financial growth
- **Meaning**: Growth, prosperity, positive outcomes
- **Shades**: 50-900 for different contexts

#### Orange (`#f59e0b`) - Attention & Alerts
- **Usage**: Warnings, important notices, payment reminders
- **Meaning**: Attention, caution, important information
- **Shades**: 50-900 for different contexts

#### Red (`#ef4444`) - Errors & Critical
- **Usage**: Errors, critical alerts, negative actions
- **Meaning**: Error, danger, critical information
- **Shades**: 50-900 for different contexts

### Neutral Colors
Professional grays for text, backgrounds, and UI elements.

### Accent Colors
Specialized colors for specific features:
- **Purple** (`#8b5cf6`): Premium features
- **Teal** (`#06b6d4`): Professional services
- **Amber** (`#f59e0b`): Payment processing
- **Emerald** (`#10b981`): Success states

## 🔧 Implementation

### Frontend (Next.js)
```css
/* Import shared colors */
@import '../../../../shared/styles/colors.css';

/* Use CSS variables */
.button {
  background-color: var(--primary-600);
  color: white;
}
```

### Mobile App (React Native)
```typescript
// Import color constants
import { Colors, getColor } from '../../../shared/constants/colors';

// Use color constants
const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary[600],
    color: 'white',
  },
});
```

## 📱 Platform-Specific Usage

### Frontend (Web)
- **CSS Variables**: Use `var(--primary-500)` for dynamic theming
- **Tailwind Classes**: Use `bg-primary-600` for utility classes
- **Component Classes**: Use `.btn-primary` for pre-built styles

### Mobile App (React Native)
- **Color Constants**: Use `Colors.primary[600]` for direct values
- **Utility Functions**: Use `getColor('primary', 600)` for dynamic access
- **Feature Colors**: Use `FeatureColors.invoice.paid` for semantic colors

## 🎯 Feature-Specific Colors

### Invoice Status
```typescript
FeatureColors.invoice = {
  draft: Colors.neutral[400],    // Gray
  sent: Colors.warning[500],     // Orange
  paid: Colors.success[500],     // Green
  overdue: Colors.danger[500],   // Red
}
```

### Expense Status
```typescript
FeatureColors.expense = {
  pending: Colors.warning[500],  // Orange
  approved: Colors.success[500],  // Green
  rejected: Colors.danger[500],   // Red
  category: Colors.accent.purple, // Purple
}
```

### Payment Status
```typescript
FeatureColors.payment = {
  processing: Colors.warning[500], // Orange
  completed: Colors.success[500],  // Green
  failed: Colors.danger[500],      // Red
  pending: Colors.neutral[400],    // Gray
}
```

### Wallet Types
```typescript
FeatureColors.wallet = {
  operating: Colors.primary[500],  // Blue
  savings: Colors.success[500],     // Green
  tax: Colors.warning[500],        // Orange
  investment: Colors.accent.teal,  // Teal
}
```

## 🌍 Cultural Considerations

### Global Markets
- **Blue**: Universally trusted in finance
- **Green**: Associated with money globally
- **Orange**: Attention-grabbing without aggression
- **Red**: Used sparingly for critical alerts

### Accessibility
- All combinations meet WCAG AA standards
- Color is never the only information method
- Focus states are clearly visible
- Text remains readable in all contexts

## 📋 Usage Guidelines

### Buttons
```css
/* Primary Action */
.btn-primary { background-color: var(--primary-600); }

/* Secondary Action */
.btn-secondary { background-color: var(--neutral-100); }

/* Success Action */
.btn-success { background-color: var(--success-600); }

/* Warning Action */
.btn-warning { background-color: var(--warning-600); }
```

### Forms
```css
/* Default Input */
.input-brand { border-color: var(--neutral-300); }

/* Success Input */
.input-success { border-color: var(--success-300); }

/* Warning Input */
.input-warning { border-color: var(--warning-300); }

/* Error Input */
.input-danger { border-color: var(--danger-300); }
```

### Status Indicators
```css
/* Success Status */
.status-success { 
  background-color: var(--success-100);
  color: var(--success-800);
}

/* Warning Status */
.status-warning { 
  background-color: var(--warning-100);
  color: var(--warning-800);
}

/* Error Status */
.status-danger { 
  background-color: var(--danger-100);
  color: var(--danger-800);
}
```

## 🔄 Maintenance

### Adding New Colors
1. Add to `shared/styles/colors.css`
2. Add to `shared/constants/colors.ts`
3. Update this guide
4. Test across platforms

### Updating Colors
1. Update both CSS and TypeScript files
2. Test accessibility contrast
3. Verify cross-platform consistency
4. Update documentation

### Version Control
- Colors are versioned with the codebase
- Changes require review across platforms
- Breaking changes need migration plan

## 🚀 Future Considerations

### Dark Mode
- Prepare color variants for dark themes
- Maintain brand recognition
- Preserve accessibility standards

### International Markets
- Consider cultural color associations
- Adapt for regional preferences
- Maintain global brand consistency

### Feature Expansion
- Plan colors for new features
- Maintain palette consistency
- Consider premium vs. standard features

## 📊 Color Checklist

### ✅ Brand Consistency
- [ ] Primary blue used for main actions
- [ ] Green for success states
- [ ] Orange for warnings
- [ ] Red for errors only
- [ ] Neutral grays for text and backgrounds

### ✅ Accessibility
- [ ] Sufficient contrast ratios
- [ ] Color not sole information method
- [ ] Focus states visible
- [ ] Text readable in all contexts

### ✅ Cross-Platform
- [ ] Colors work on web
- [ ] Colors work on mobile
- [ ] Consistent implementation
- [ ] Shared source of truth

---

*This shared color guide ensures consistent, professional, and trustworthy visual identity for SMB Finance OS across all platforms and markets.* 