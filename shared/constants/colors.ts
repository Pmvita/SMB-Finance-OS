// SMB Finance OS Color Constants
// Shared between frontend and mobile app

export const Colors = {
  // Primary Brand Colors - Modern Green (Updated from blue)
  primary: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e', // Main brand green
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },

  // Success Green - Modern Growth Green (Same as primary now)
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e', // Growth green
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },

  // Warning Orange - Modern Attention Orange
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b', // Alert orange
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },

  // Danger Red - Modern Error Red
  danger: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444', // Error red
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },

  // Neutral Grays - Modern Clean Grays
  neutral: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },

  // Accent Colors - Modern Vibrant Accents
  accent: {
    purple: '#8b5cf6',   // Modern purple for premium features
    teal: '#06b6d4',     // Modern teal for professional services
    amber: '#f59e0b',    // Modern amber for payments
    emerald: '#10b981',  // Modern emerald for success states
    indigo: '#6366f1',   // Modern indigo for tech features
    rose: '#f43f5e',     // Modern rose for special alerts
  },

  // Semantic Colors
  semantic: {
    // Text Colors
    text: {
      primary: '#1e293b',    // neutral-800
      secondary: '#64748b',  // neutral-500
      tertiary: '#94a3b8',   // neutral-400
      inverse: '#ffffff',
      brand: '#2563eb',      // primary-600
      success: '#16a34a',    // success-600
      warning: '#d97706',    // warning-600
      danger: '#dc2626',     // danger-600
    },

    // Background Colors
    background: {
      primary: '#ffffff',
      secondary: '#f8fafc',  // neutral-50
      tertiary: '#f1f5f9',   // neutral-100
      brand: '#eff6ff',      // primary-50
      success: '#f0fdf4',    // success-50
      warning: '#fffbeb',    // warning-50
      danger: '#fef2f2',     // danger-50
    },

    // Border Colors
    border: {
      primary: '#e2e8f0',    // neutral-200
      secondary: '#cbd5e1',  // neutral-300
      brand: '#93c5fd',      // primary-300
      success: '#86efac',    // success-300
      warning: '#fcd34d',    // warning-300
      danger: '#fca5a5',     // danger-300
    },

    // Status Colors
    status: {
      active: '#22c55e',     // success-500
      pending: '#f59e0b',    // warning-500
      inactive: '#94a3b8',   // neutral-400
      error: '#ef4444',      // danger-500
    },
  },
} as const;

// Color Type Definitions
export type ColorShade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
export type ColorPalette = 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
export type AccentColor = 'purple' | 'teal' | 'amber' | 'emerald' | 'indigo' | 'rose';

// Utility Functions
export const getColor = (palette: ColorPalette, shade: ColorShade): string => {
  return Colors[palette][shade];
};

export const getAccentColor = (accent: AccentColor): string => {
  return Colors.accent[accent];
};

export const getSemanticColor = (category: keyof typeof Colors.semantic, type: string): string => {
  return Colors.semantic[category][type as keyof typeof Colors.semantic[typeof category]];
};

// Gradient Functions
export const getBrandGradient = (): string => {
  return `linear-gradient(135deg, ${Colors.primary[500]} 0%, ${Colors.primary[700]} 100%)`;
};

export const getSuccessGradient = (): string => {
  return `linear-gradient(135deg, ${Colors.success[500]} 0%, ${Colors.success[700]} 100%)`;
};

export const getWarningGradient = (): string => {
  return `linear-gradient(135deg, ${Colors.warning[500]} 0%, ${Colors.warning[700]} 100%)`;
};

// Feature-Specific Color Mappings
export const FeatureColors = {
  // Invoice-related colors
  invoice: {
    draft: Colors.neutral[400],
    sent: Colors.warning[500],
    paid: Colors.success[500],
    overdue: Colors.danger[500],
  },

  // Expense-related colors
  expense: {
    pending: Colors.warning[500],
    approved: Colors.success[500],
    rejected: Colors.danger[500],
    category: Colors.accent.purple,
  },

  // Payment-related colors
  payment: {
    processing: Colors.warning[500],
    completed: Colors.success[500],
    failed: Colors.danger[500],
    pending: Colors.neutral[400],
  },

  // Wallet-related colors
  wallet: {
    operating: Colors.primary[500],
    savings: Colors.success[500],
    tax: Colors.warning[500],
    investment: Colors.accent.teal,
  },

  // Credit-related colors
  credit: {
    excellent: Colors.success[500],
    good: Colors.accent.emerald,
    fair: Colors.warning[500],
    poor: Colors.danger[500],
  },

  // Tax-related colors
  tax: {
    filed: Colors.success[500],
    pending: Colors.warning[500],
    overdue: Colors.danger[500],
    refund: Colors.accent.emerald,
  },

  // Payroll-related colors
  payroll: {
    processed: Colors.success[500],
    pending: Colors.warning[500],
    paid: Colors.primary[500],
    error: Colors.danger[500],
  },
} as const;

// Accessibility helpers
export const getContrastColor = (backgroundColor: string): string => {
  // Simple contrast calculation - in production, use a proper color contrast library
  const isLight = backgroundColor.toLowerCase().includes('f') || 
                  backgroundColor.toLowerCase().includes('e') ||
                  backgroundColor.toLowerCase().includes('d');
  return isLight ? Colors.neutral[900] : Colors.neutral[50];
};

// Export default for easy importing
export default Colors; 