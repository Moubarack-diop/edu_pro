// Theme definitions (palette, spacing, sizes) and helper hook to access
// colors that respect the current color scheme (light / dark)

import { useColorScheme } from 'react-native';

type Palette = {
  primary: string;
  primaryDark: string;
  secondary: string;
  background: string;
  card: string;
  text: string;
  textSecondary: string;
  border: string;
};

export const palette: Record<'light' | 'dark', Palette> = {
  light: {
    primary: '#6366F1', // indigo-500
    primaryDark: '#4F46E5',
    secondary: '#10B981', // emerald-500
    background: '#F8FAFC', // slate-50
    card: '#FFFFFF',
    text: '#0F172A', // slate-900
    textSecondary: '#475569', // slate-600
    border: '#E2E8F0', // slate-200
  },
  dark: {
    primary: '#8B5CF6',
    primaryDark: '#7C3AED',
    secondary: '#34D399',
    background: '#0F172A', // slate-900
    card: '#1E293B', // slate-800
    text: '#F8FAFC', // slate-50
    textSecondary: '#CBD5E1', // slate-300
    border: '#334155', // slate-700
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const radii = {
  sm: 6,
  md: 12,
  lg: 20,
} as const;

export const textSizes = {
  sm: 12,
  md: 14,
  lg: 18,
  xl: 24,
} as const;

export const useThemeColors = () => {
  const scheme = (useColorScheme() ?? 'light') as 'light' | 'dark';
  return palette[scheme];
};
