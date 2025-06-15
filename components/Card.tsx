import React, { PropsWithChildren } from 'react';
import { View, StyleSheet } from 'react-native';
import { useThemeColors, spacing, radii } from '../constants/theme';

export const Card: React.FC<PropsWithChildren<{ style?: object }>> = ({ children, style }) => {
  const colors = useThemeColors();
  return <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    padding: spacing.md,
    borderRadius: radii.md,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});
