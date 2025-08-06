# SMB Finance OS Shared Styles

This document describes the shared styles system used by both the frontend (Next.js) and mobile-app (React Native) to maintain consistent UI/UX across platforms.

## 🎨 Color System

### Primary Colors (Green Theme)
- **Primary-500**: `#22c55e` - Main brand green
- **Primary-600**: `#16a34a` - Darker green for hover states
- **Primary-700**: `#15803d` - Even darker for active states

### Success Colors
- **Success-500**: `#22c55e` - Same as primary green
- **Success-600**: `#16a34a` - Darker success green

### Neutral Colors
- **Neutral-800**: `#1e293b` - Dark text
- **Neutral-500**: `#64748b` - Secondary text
- **Neutral-400**: `#94a3b8` - Tertiary text
- **Neutral-200**: `#e2e8f0` - Borders
- **Neutral-100**: `#f1f5f9` - Light backgrounds

## 🔘 Button System

### Base Button Classes
```css
.btn                    /* Base button styles */
.btn-primary           /* Green primary button */
.btn-secondary         /* Outline button */
.btn-success           /* Success button (same as primary) */
.btn-warning           /* Warning button */
.btn-danger            /* Danger button */
```

### Button Sizes
```css
.btn-sm                /* Small button */
.btn-lg                /* Large button */
.btn-xl                /* Extra large button */
```

### Button Variants
```css
.btn-outline           /* Outline variant */
.btn-ghost             /* Ghost variant */
.btn-icon              /* Icon button */
.btn-loading           /* Loading state */
```

### Usage Examples

#### Frontend (Next.js)
```tsx
// Primary green button
<button className="btn btn-primary">
  Get Started
</button>

// Large outline button
<button className="btn btn-secondary btn-lg">
  Learn More
</button>

// Loading button
<button className="btn btn-primary btn-loading" disabled>
  Processing...
</button>
```

#### Mobile App (React Native)
```tsx
// Using shared color constants
import { Colors } from '../../../shared/constants/colors';

const styles = StyleSheet.create({
  primaryButton: {
    backgroundColor: Colors.primary[500],
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
```

## 🎯 Component Styles

### Card Styles
```css
.card-base              /* Base card styles */
.card-hover             /* Hover effects */
```

### Input Styles
```css
.input-base             /* Base input styles */
.input-error            /* Error state */
```

### Navigation Styles
```css
.nav-base               /* Base navigation */
.nav-link               /* Navigation links */
.nav-active             /* Active navigation */
```

## 📁 File Structure

```
shared/
├── constants/
│   └── colors.ts           # Color constants
├── styles/
│   ├── colors.css          # CSS color variables
│   ├── buttons.css         # Button styles
│   └── index.ts            # Style exports
└── docs/
    └── SHARED_STYLES.md    # This documentation
```

## 🔄 Integration

### Frontend Integration
1. Import shared styles in `globals.css`:
```css
@import "../../../shared/styles/colors.css";
@import "../../../shared/styles/buttons.css";
```

2. Use shared constants in components:
```tsx
import { Colors, ButtonStyles } from '../../../shared/constants/colors';
```

### Mobile App Integration
1. Import shared constants:
```tsx
import { Colors } from '../../../shared/constants/colors';
```

2. Use in StyleSheet:
```tsx
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.neutral[50],
  },
  button: {
    backgroundColor: Colors.primary[500],
  },
});
```

## 🎨 Design Tokens

### Spacing
- **xs**: 4px
- **sm**: 8px
- **md**: 16px
- **lg**: 24px
- **xl**: 32px
- **2xl**: 48px

### Border Radius
- **sm**: 8px
- **md**: 12px
- **lg**: 16px
- **xl**: 20px

### Shadows
- **sm**: `0 2px 4px rgba(0, 0, 0, 0.1)`
- **md**: `0 4px 8px rgba(0, 0, 0, 0.15)`
- **lg**: `0 8px 16px rgba(0, 0, 0, 0.2)`

## 🚀 Best Practices

1. **Always use shared colors** - Don't hardcode colors in components
2. **Use semantic color names** - `primary`, `success`, `warning`, `danger`
3. **Maintain consistency** - Use the same button styles across platforms
4. **Test on both platforms** - Ensure styles work on web and mobile
5. **Document changes** - Update this file when adding new styles

## 🔧 Development

### Adding New Styles
1. Add to appropriate shared file (`colors.css`, `buttons.css`, etc.)
2. Export from `shared/styles/index.ts`
3. Update this documentation
4. Test on both frontend and mobile-app

### Updating Colors
1. Update `shared/constants/colors.ts`
2. Update `shared/styles/colors.css`
3. Update frontend `globals.css` if needed
4. Test color consistency across platforms 