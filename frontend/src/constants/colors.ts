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

  // Semantic Colors for UI Components
  semantic: {
    background: {
      primary: '#ffffff',
      secondary: '#f8fafc',
      tertiary: '#f1f5f9',
      inverse: '#0f172a',
    },
    text: {
      primary: '#0f172a',
      secondary: '#475569',
      tertiary: '#64748b',
      inverse: '#ffffff',
      muted: '#94a3b8',
    },
    border: {
      primary: '#e2e8f0',
      secondary: '#cbd5e1',
      focus: '#3b82f6',
      error: '#ef4444',
    },
    focus: {
      ring: '#3b82f6',
      ringOffset: '#ffffff',
    },
    button: {
      primary: {
        background: '#3b82f6',
        text: '#ffffff',
        hover: '#2563eb',
        focus: '#1d4ed8',
      },
      secondary: {
        background: '#f1f5f9',
        text: '#475569',
        hover: '#e2e8f0',
        focus: '#cbd5e1',
      },
      accent: {
        background: '#f59e0b',
        text: '#ffffff',
        hover: '#d97706',
        focus: '#b45309',
      },
    },
    card: {
      background: '#ffffff',
      border: '#e2e8f0',
      shadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    },
    input: {
      background: '#ffffff',
      border: '#e2e8f0',
      focus: '#3b82f6',
      placeholder: '#94a3b8',
    },
  },

  // Gradients
  gradients: {
    primary: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    secondary: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
    accent: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)',
    card: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
  },

  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    primary: '0 4px 14px 0 rgba(59, 130, 246, 0.25)',
    secondary: '0 4px 14px 0 rgba(20, 184, 166, 0.25)',
    accent: '0 4px 14px 0 rgba(245, 158, 11, 0.25)',
  },
} as const;
