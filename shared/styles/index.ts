// SMB Finance OS Shared Styles
// Used by both frontend and mobile-app

export * from '../constants/colors';

// Re-export color constants for easy access
export { Colors, getColor, getAccentColor, getSemanticColor } from '../constants/colors';

// Shared button styles
export const ButtonStyles = {
  // Base button classes
  base: 'btn',
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  success: 'btn-success',
  warning: 'btn-warning',
  danger: 'btn-danger',
  
  // Button sizes
  small: 'btn-sm',
  large: 'btn-lg',
  xlarge: 'btn-xl',
  
  // Button variants
  outline: 'btn-outline',
  ghost: 'btn-ghost',
  icon: 'btn-icon',
  loading: 'btn-loading',
} as const;

// Shared color classes
export const ColorClasses = {
  // Primary colors
  primary: {
    50: 'bg-green-50',
    100: 'bg-green-100',
    200: 'bg-green-200',
    300: 'bg-green-300',
    400: 'bg-green-400',
    500: 'bg-green-500',
    600: 'bg-green-600',
    700: 'bg-green-700',
    800: 'bg-green-800',
    900: 'bg-green-900',
  },
  
  // Text colors
  text: {
    primary: 'text-green-600',
    secondary: 'text-gray-600',
    tertiary: 'text-gray-400',
    inverse: 'text-white',
  },
  
  // Border colors
  border: {
    primary: 'border-green-600',
    secondary: 'border-gray-300',
  },
} as const;

// Shared component styles
export const ComponentStyles = {
  // Card styles
  card: {
    base: 'bg-white rounded-xl shadow-lg border border-gray-200 p-6',
    hover: 'hover:shadow-xl hover:border-gray-300 transition-all duration-200',
  },
  
  // Input styles
  input: {
    base: 'w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all duration-200',
    error: 'border-red-500 focus:ring-red-500',
  },
  
  // Navigation styles
  nav: {
    base: 'bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg',
    link: 'text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors',
    active: 'text-green-600 font-medium',
  },
} as const;

// Utility functions for generating styles
export const StyleUtils = {
  // Generate button class
  button: (variant: keyof typeof ButtonStyles = 'primary', size?: keyof typeof ButtonStyles) => {
    const classes = [ButtonStyles.base, ButtonStyles[variant]];
    if (size && ButtonStyles[size]) {
      classes.push(ButtonStyles[size]);
    }
    return classes.join(' ');
  },
  
  // Generate color class
  color: (type: 'bg' | 'text' | 'border', color: string, shade?: number) => {
    if (shade) {
      return `${type}-${color}-${shade}`;
    }
    return `${type}-${color}`;
  },
} as const; 