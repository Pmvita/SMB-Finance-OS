// Trident Financial OS Color Constants
// Shared between frontend and mobile app

export const Colors = {
  // Primary Brand Colors - Deep Blue (Poseidon-inspired)
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6', // Main brand blue
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },

  // Secondary Colors - Bright Aqua/Turquoise (Ocean-inspired)
  secondary: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#2dd4bf',
    500: '#14b8a6', // Bright aqua/turquoise
    600: '#0d9488',
    700: '#0f766e',
    800: '#115e59',
    900: '#134e4a',
  },

  // Accent Colors - Gold (Treasure-inspired)
  accent: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b', // Gold accent
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },

  // Success Green - Ocean Green
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e', // Success green
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },

  // Warning Orange - Caution Orange
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

  // Danger Red - Storm Red
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

  // Accent Colors - Poseidon-inspired Accents
  accentColors: {
    purple: '#8b5cf6',   // Deep sea purple for premium features
    teal: '#06b6d4',     // Ocean teal for professional services
    amber: '#f59e0b',    // Gold amber for payments
    emerald: '#10b981',  // Sea emerald for success states
    indigo: '#6366f1',   // Deep indigo for tech features
    rose: '#f43f5e',     // Coral rose for special alerts
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
  return Colors.accentColors[accent];
};

export const getSemanticColor = (category: keyof typeof Colors.semantic, type: string): string => {
  return Colors.semantic[category][type as keyof typeof Colors.semantic[typeof category]];
};

// Export default for easy importing
export default Colors;
