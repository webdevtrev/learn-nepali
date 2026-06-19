import { Colors, Radius } from "@/constants/theme";
import { ViewStyle } from "react-native";

export type AudioButtonVariant = "primary" | "secondary" | "ghost" | "speaker";
export type AudioButtonSize = "small" | "medium" | "large";

export function getSizeStyle(size: AudioButtonSize): ViewStyle {
  switch (size) {
    case "small":
      return {
        width: 32,
        height: 32,
      };

    case "large":
      return {
        width: 60,
        height: 60,
      };

    case "medium":
    default:
      return {
        width: 44,
        height: 44,
      };
  }
}

export function getVariantStyle(
  variant: AudioButtonVariant,
  colors: typeof Colors.light | typeof Colors.dark,
): ViewStyle {
  switch (variant) {
    case "secondary":
      return {
        backgroundColor: "transparent",
        borderColor: colors.flagBlue,
      };

    case "ghost":
      return {
        backgroundColor: "rgba(92, 143, 191, 0.08)",
        borderColor: "transparent",
      };

    case "speaker":
      return {
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: "#fff8e6",
        borderColor: "#d6c8a0",
      };

    case "primary":
    default:
      return {
        backgroundColor: colors.flagBlue,
        borderColor: "transparent",
      };
  }
}

export function getIconColor(
  variant: AudioButtonVariant,
  colors: typeof Colors.light | typeof Colors.dark,
  complete?: boolean,
) {
  if (complete) return "#059669";
  if (variant === "primary") return "#ffffff";
  if (variant === "speaker") return "#8a7040";

  return colors.flagBlue;
}

export function getCompleteStyle(): ViewStyle {
  return {
    backgroundColor: "#dcfce7",
    borderColor: "transparent",
  };
}

export const baseStyles = {
  base: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Radius.full,
    borderWidth: 1,
  } satisfies ViewStyle,

  pressed: {
    transform: [{ translateY: 1 }, { scale: 0.98 }],
  } satisfies ViewStyle,

  disabled: {
    opacity: 0.6,
  } satisfies ViewStyle,

  playing: {
    opacity: 0.85,
  } satisfies ViewStyle,

  icon: {
    fontSize: 20,
    fontWeight: "700",
    height: 20,
    lineHeight: 20,
  } as const,
};
