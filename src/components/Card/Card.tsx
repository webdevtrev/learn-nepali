import { router } from "expo-router";
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

import { Radius, Shadows, Spacing } from "@/constants/theme";
import { useTheme } from "@/providers/theme-provider";

export type CardProps = Omit<PressableProps, "children"> & {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  href?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export default function Card({
  title,
  subtitle,
  children,
  href,
  onPress,
  style,
  ...props
}: CardProps) {
  const { colors } = useTheme();
  const isClickable = Boolean(href || onPress);

  const handlePress = () => {
    onPress?.();

    if (href) {
      router.push(href as any);
    }
  };

  const content = (
    <>
      {title || subtitle ? (
        <View style={styles.header}>
          {title ? (
            <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
          ) : null}

          {subtitle ? (
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              {subtitle}
            </Text>
          ) : null}
        </View>
      ) : null}

      <View style={styles.content}>
        {typeof children === "string" ? (
          <Text style={[styles.contentText, { color: colors.textSecondary }]}>
            {children}
          </Text>
        ) : (
          children
        )}
      </View>
    </>
  );

  if (isClickable) {
    return (
      <Pressable
        accessibilityRole="button"
        onPress={handlePress}
        style={({ pressed }) => [
          styles.card,
          {
            backgroundColor: colors.cardBg,
            borderColor: colors.cardBorder,
          },
          pressed && styles.pressed,
          style,
        ]}
        {...props}
      >
        {content}
      </Pressable>
    );
  }

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.cardBg,
          borderColor: colors.cardBorder,
        },
        style,
      ]}
    >
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: "100%",
    borderWidth: 1,
    borderRadius: Radius.sm,
    padding: Spacing.four,
    flexDirection: "column",
    alignItems: "stretch",
    ...Shadows.sm,
  },

  pressed: {
    transform: [{ translateY: -2 }],
    ...Shadows.md,
  },

  header: {
    marginBottom: Spacing.two,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
  },

  subtitle: {
    fontSize: 14,
    marginTop: 2,
  },

  content: {
    flexGrow: 1,
  },

  contentText: {
    fontSize: 15,
    lineHeight: 21,
  },
});
