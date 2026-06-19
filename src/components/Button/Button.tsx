import React from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleProp,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";

import {
  Colors,
  FontSize,
  FontWeight,
  Radius,
  Shadows,
  Spacing,
} from "@/constants/theme";
import { useTheme } from "@/providers/theme-provider";

type ButtonVariant = "primary" | "secondary" | "outline";
type ButtonSize = "sm" | "md" | "lg";
type ButtonState = "correct" | "incorrect";

type ButtonProps = PressableProps & {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  full?: boolean;
  icon?: boolean;
  loading?: boolean;
  state?: ButtonState;
  textStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  full = false,
  icon = false,
  loading = false,
  state,
  disabled,
  textStyle,
  style,
  ...props
}: ButtonProps) {
  const { colors } = useTheme();

  const isDisabled = disabled || loading;

  return (
    <Pressable
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        styles[size],
        icon && styles.icon,
        icon && size === "lg" && styles.iconLg,
        full && styles.full,
        getVariantStyle(variant, colors),
        state && getStateStyle(state, colors),
        pressed && !isDisabled && styles.pressed,
        isDisabled && styles.disabled,
        style,
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor(variant, colors, state)} />
      ) : typeof children === "string" ? (
        <Text
          style={[
            styles.text,
            getTextStyle(variant, colors),
            state && getStateTextStyle(state, colors),
            size === "sm" && styles.textSm,
            textStyle,
          ]}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

function getVariantStyle(
  variant: ButtonVariant,
  colors: typeof Colors.light | typeof Colors.dark,
): ViewStyle {
  switch (variant) {
    case "secondary":
      return {
        backgroundColor: colors.flagBlue,
        borderColor: "transparent",
      };

    case "outline":
      return {
        backgroundColor: "transparent",
        borderColor: colors.flagBlue,
      };

    case "primary":
    default:
      return {
        backgroundColor: colors.buttonPrimaryBg,
        borderColor: "transparent",
      };
  }
}

function getTextStyle(
  variant: ButtonVariant,
  colors: typeof Colors.light | typeof Colors.dark,
): TextStyle {
  return {
    color: getTextColor(variant, colors),
  };
}

function getTextColor(
  variant: ButtonVariant,
  colors: typeof Colors.light | typeof Colors.dark,
  state?: ButtonState,
) {
  if (state === "correct") return colors.quizCorrectBorder;
  if (state === "incorrect") return colors.quizWrongBorder;

  if (variant === "outline") return colors.flagBlue;

  return colors.textInverse;
}

function getStateStyle(
  state: ButtonState,
  colors: typeof Colors.light | typeof Colors.dark,
): ViewStyle {
  if (state === "correct") {
    return {
      backgroundColor: colors.quizCorrect,
      borderColor: colors.quizCorrectBorder,
    };
  }

  return {
    backgroundColor: colors.quizWrong,
    borderColor: colors.quizWrongBorder,
  };
}

function getStateTextStyle(
  state: ButtonState,
  colors: typeof Colors.light | typeof Colors.dark,
): TextStyle {
  return {
    color:
      state === "correct" ? colors.quizCorrectBorder : colors.quizWrongBorder,
  };
}

const styles = {
  base: {
    minHeight: 44,
    minWidth: 44,
    paddingHorizontal: Spacing.five,
    borderRadius: Radius.md,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: Spacing.two,
    ...Shadows.sm,
  } satisfies ViewStyle,

  sm: {
    height: 36,
    paddingHorizontal: Spacing.four,
  } satisfies ViewStyle,

  md: {
    height: 44,
    paddingHorizontal: Spacing.five,
  } satisfies ViewStyle,

  lg: {
    height: 52,
    paddingHorizontal: Spacing.six,
    borderRadius: Radius.lg,
  } satisfies ViewStyle,

  full: {
    width: "100%",
  } satisfies ViewStyle,

  icon: {
    width: 44,
    height: 44,
    paddingHorizontal: 0,
  } satisfies ViewStyle,

  iconLg: {
    width: 52,
    height: 52,
  } satisfies ViewStyle,

  pressed: {
    transform: [{ scale: 0.98 }],
    ...Shadows.md,
  } satisfies ViewStyle,

  disabled: {
    opacity: 0.45,
  } satisfies ViewStyle,

  text: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.semibold,
  } satisfies TextStyle,

  textSm: {
    fontSize: FontSize.sm,
  } satisfies TextStyle,
};
