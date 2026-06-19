import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";

import { Radius } from "@/constants/theme";

import { IoMdClose } from "react-icons/io";

type ChipVariant = "new" | "inProgress" | "completed" | "review" | "default";

type ChipProps = ViewProps & {
  children: string;
  variant?: ChipVariant;
  removable?: boolean;
  onRemove?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export default function Chip({
  children,
  variant = "default",
  removable = false,
  onRemove,
  style,
  textStyle,
  ...props
}: ChipProps) {
  return (
    <View
      accessibilityRole="text"
      style={[
        styles.chip,
        variants[variant],
        style,
        removable && { paddingRight: 6 },
      ]}
      {...props}
    >
      <Text
        style={[styles.label, { color: variants[variant].color }, textStyle]}
      >
        {children}
      </Text>

      {removable ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Remove"
          onPress={onRemove}
          hitSlop={8}
          style={styles.remove}
        >
          <Text style={[styles.removeText, { color: variants[variant].color }]}>
            <IoMdClose />
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: Radius.full,
    borderWidth: 1,
    alignSelf: "flex-start",
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 14,
  },

  remove: {
    alignItems: "center",
    justifyContent: "center",
  },

  removeText: {
    fontSize: 16,
    height: 16,
    width: 16,
    fontWeight: "700",
    lineHeight: 16,
  },
});

const variants = StyleSheet.create({
  new: {
    backgroundColor: "rgba(14, 165, 233, 0.12)",
    borderColor: "rgba(14, 165, 233, 0.2)",
    color: "#0369a1",
  },
  inProgress: {
    backgroundColor: "rgba(245, 158, 11, 0.12)",
    borderColor: "rgba(245, 158, 11, 0.18)",
    color: "#92400e",
  },
  completed: {
    backgroundColor: "rgba(110, 231, 183, 0.18)",
    borderColor: "rgba(110, 231, 183, 0.2)",
    color: "#166534",
  },
  review: {
    backgroundColor: "rgba(229, 231, 235, 0.9)",
    borderColor: "rgba(0, 0, 0, 0.04)",
    color: "#374151",
  },
  default: {
    backgroundColor: "rgba(0, 0, 0, 0.04)",
    borderColor: "transparent",
    color: "#111111",
  },
});
