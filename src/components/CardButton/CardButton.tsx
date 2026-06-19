import React from "react";
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

import { Radius } from "@/constants/theme";

type CardButtonProps = PressableProps & {
  title?: string;
  icon?: React.ReactNode;
  color?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export default function CardButton({
  title,
  icon,
  color = "#007bff",
  disabled = false,
  onPress,
  style,
  ...props
}: CardButtonProps) {
  const resolvedColor = disabled ? "gray" : color;
  const rgb = disabled ? "0,0,0" : hexToRgb(color);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          borderColor: resolvedColor,
          backgroundColor: `rgba(${rgb}, 0.15)`,
          opacity: disabled ? 0.6 : 1,
          transform: pressed && !disabled ? [{ scale: 0.98 }] : undefined,
        },
        style,
      ]}
      {...props}
    >
      {icon ? (
        <View style={styles.icon}>
          {React.cloneElement(
            icon as React.ReactElement,
            { color: resolvedColor } as any,
          )}
        </View>
      ) : null}

      {title ? (
        <Text style={[styles.title, { color: resolvedColor }]}>{title}</Text>
      ) : null}
    </Pressable>
  );
}

function hexToRgb(hex?: string): string {
  if (!hex) return "0,0,0";

  const normalized = hex.trim().replace(/^#/, "");

  if (/^[0-9a-fA-F]{3}$/.test(normalized)) {
    const r = parseInt(normalized[0] + normalized[0], 16);
    const g = parseInt(normalized[1] + normalized[1], 16);
    const b = parseInt(normalized[2] + normalized[2], 16);
    return `${r},${g},${b}`;
  }

  if (/^[0-9a-fA-F]{6}$/.test(normalized)) {
    const r = parseInt(normalized.slice(0, 2), 16);
    const g = parseInt(normalized.slice(2, 4), 16);
    const b = parseInt(normalized.slice(4, 6), 16);
    return `${r},${g},${b}`;
  }

  return "0,0,0";
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: Radius.sm,
    gap: 4,
  },

  icon: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
  },

  title: {
    fontSize: 14,
    fontWeight: "600",
  },
});
