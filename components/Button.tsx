import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent, ActivityIndicator } from 'react-native';
import { useThemeColors, spacing, radii } from '../constants/theme';

type Props = {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  loading?: boolean;
  style?: object;
};

export const Button: React.FC<Props> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
}) => {
  const colors = useThemeColors();
  const backgroundColor =
    variant === 'primary'
      ? colors.primary
      : variant === 'secondary'
      ? colors.secondary
      : 'transparent';
  const borderColor = variant === 'outline' ? colors.primary : 'transparent';
  const textColor = variant === 'outline' ? colors.primary : '#FFFFFF';

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        {
          backgroundColor,
          borderColor,
          opacity: disabled ? 0.6 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text style={[styles.text, { color: textColor }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  text: {
    fontWeight: '600',
  },
});
