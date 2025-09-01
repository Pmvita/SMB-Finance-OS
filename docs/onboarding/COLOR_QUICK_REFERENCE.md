# Trident Financial OS Color Quick Reference

## 🎨 Brand Colors - Poseidon-inspired

### Primary Colors
```css
/* Deep Blue - Poseidon-inspired */
--primary-500: #3b82f6;  /* Deep blue - main brand color */
--primary-600: #2563eb;  /* Hover states */
--primary-700: #1d4ed8;  /* Active states */

/* Bright Aqua/Turquoise - Ocean-inspired */
--secondary-500: #14b8a6;  /* Bright aqua/turquoise */
--secondary-600: #0d9488;  /* Secondary hover states */

/* Gold - Treasure-inspired */
--accent-500: #f59e0b;   /* Gold accent */
--accent-600: #d97706;   /* Accent hover states */

/* Ocean Green - Success */
--success-500: #22c55e;  /* Success states */
--success-600: #16a34a;  /* Success text */

/* Caution Orange - Warnings */
--warning-500: #f59e0b;  /* Warning states */
--warning-600: #d97706;  /* Warning text */

/* Storm Red - Errors & Critical */
--danger-500: #ef4444;   /* Error states */
--danger-600: #dc2626;   /* Error text */
```

### Neutral Colors
```css
/* Text Colors */
--neutral-800: #1e293b;  /* Primary text */
--neutral-600: #475569;  /* Secondary text */
--neutral-400: #94a3b8;  /* Tertiary text */

/* Background Colors */
--neutral-50: #f8fafc;   /* Light background */
--neutral-100: #f1f5f9;  /* Secondary background */
--neutral-200: #e2e8f0;  /* Border color */
```

## 📱 Usage by Platform

### Frontend (Next.js)
```css
/* CSS Variables */
.button { background-color: var(--primary-600); }

/* Tailwind Classes */
.button { @apply bg-primary-600 text-white; }

/* Component Classes */
.button { @apply btn-primary; }
```

### Mobile App (React Native)
```typescript
// TypeScript Constants
import { Colors } from '../../../shared/constants/colors';

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary[600],
    color: 'white',
  },
});
```

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
  operating: Colors.primary[500],  // Deep Blue
  savings: Colors.success[500],     // Green
  tax: Colors.warning[500],        // Orange
  investment: Colors.accent.teal,  // Teal
}
```

## 🎨 Component Colors

### Buttons
```css
/* Primary Button */
.btn-primary { background-color: var(--primary-600); }

/* Secondary Button */
.btn-secondary { background-color: var(--neutral-100); }

/* Success Button */
.btn-success { background-color: var(--success-600); }

/* Warning Button */
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

## 🌈 Gradients

### Brand Gradient
```css
.bg-brand-gradient {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
}
```

### Success Gradient
```css
.bg-success-gradient {
  background: linear-gradient(135deg, #22c55e 0%, #15803d 100%);
}
```

### Warning Gradient
```css
.bg-warning-gradient {
  background: linear-gradient(135deg, #f59e0b 0%, #b45309 100%);
}
```

## 📋 Color Checklist

### ✅ Brand Consistency
- [ ] Primary blue for main actions
- [ ] Green for success states
- [ ] Orange for warnings
- [ ] Red for errors only
- [ ] Neutral grays for text/backgrounds

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

## 🚨 Common Mistakes

### ❌ Don't Do This
```css
/* Don't use hardcoded colors */
.button { background-color: #3b82f6; }

/* Don't use inconsistent naming */
.button { background-color: var(--blue-600); }

/* Don't ignore accessibility */
.text { color: #666; } /* Low contrast */
```

### ✅ Do This Instead
```css
/* Use CSS variables */
.button { background-color: var(--primary-600); }

/* Use consistent naming */
.button { background-color: var(--primary-600); }

/* Ensure accessibility */
.text { color: var(--neutral-600); } /* Good contrast */
```

## 🔧 Quick Commands

### Check Current Colors
```bash
# View color constants
cat shared/constants/colors.ts

# View CSS variables
cat shared/styles/colors.css
```

### Update Colors
1. Edit `shared/styles/colors.css`
2. Edit `shared/constants/colors.ts`
3. Test on both platforms
4. Update documentation

---

*This quick reference ensures consistent color usage across the SMB Finance OS project.* 