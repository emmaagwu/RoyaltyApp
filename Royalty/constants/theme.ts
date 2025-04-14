import { MD3LightTheme } from 'react-native-paper';

export const COLORS = {
  primary: '#1E40AF', // Deep blue - adjust to match church branding
  secondary: '#60A5FA',
  background: '#FFFFFF',
  surface: '#F3F4F6',
  text: '#1F2937',
  error: '#DC2626',
  success: '#059669',
  border: '#E5E7EB',
  card: {
    background: 'rgba(30, 64, 175, 0.9)', // Semi-transparent primary color
    text: '#FFFFFF',
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

export const TYPOGRAPHY = {
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
  },
  caption: {
    fontSize: 14,
    fontWeight: '400',
  },
};

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: COLORS.primary,
    secondary: COLORS.secondary,
    background: COLORS.background,
    surface: COLORS.surface,
    error: COLORS.error,
    text: COLORS.text,
  },
};