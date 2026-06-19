import { useEffect, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { HiSpeakerWave } from "react-icons/hi2";
import {
  ActivityIndicator,
  Animated,
  Easing,
  Pressable,
  PressableProps,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from "react-native";

import {
  AudioButtonSize,
  AudioButtonVariant,
  baseStyles,
  getCompleteStyle,
  getIconColor,
  getSizeStyle,
  getVariantStyle,
} from "./AudioButton.styles";

export type AudioButtonBaseProps = PressableProps & {
  src?: string;
  label?: string;
  onPlay?: () => void;
  onEnd?: () => void;
  disabled?: boolean;
  variant?: AudioButtonVariant;
  size?: AudioButtonSize;
  style?: StyleProp<ViewStyle>;
  isPlaying?: boolean;
  isLoading?: boolean;
  colors?: { flagBlue: string };
  onPress?: () => void | Promise<void>;
  onComplete?: (complete: boolean) => void;
  complete?: boolean;
};

export function AudioButtonBase({
  src,
  label = "Play audio",
  onPlay,
  onEnd,
  disabled = false,
  variant = "primary",
  size = "medium",
  style,
  isPlaying = false,
  isLoading = false,
  colors = { flagBlue: "#5c8fbf" },
  onPress,
  onComplete,
  complete: completeProp = false,
  ...props
}: AudioButtonBaseProps) {
  const [complete, setComplete] = useState(false);
  const completedState = completeProp ?? complete;
  const rippleProgress = useRef(new Animated.Value(0)).current;

  const buttonSize = size === "small" ? 32 : size === "large" ? 60 : 44;
  const midSpread = Math.round(buttonSize * 0.41);
  const endSpread = Math.round(buttonSize * 0.55);

  const rippleScale = rippleProgress.interpolate({
    inputRange: [0, 0.7, 1],
    outputRange: [
      1,
      (buttonSize + midSpread * 2) / buttonSize,
      (buttonSize + endSpread * 2) / buttonSize,
    ],
  });

  const rippleOpacity = rippleProgress.interpolate({
    inputRange: [0, 0.7, 1],
    outputRange: [0.18, 0.02, 0],
  });

  useEffect(() => {
    if (!isPlaying) {
      rippleProgress.stopAnimation();
      rippleProgress.setValue(0);
      return;
    }

    const animation = Animated.loop(
      Animated.timing(rippleProgress, {
        toValue: 1,
        duration: 1300,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );

    animation.start();

    return () => {
      animation.stop();
      rippleProgress.stopAnimation();
      rippleProgress.setValue(0);
    };
  }, [isPlaying, rippleProgress]);

  const handlePress = async () => {
    if (!src || disabled || isLoading) return;

    try {
      setComplete(false);
      await onPress?.();
      onPlay?.();
    } catch (error) {
      console.error("Unable to play audio:", error);
    }
  };

  const isDisabled = disabled || !src || isLoading;

  return (
    <View style={rippleStyles.wrapper}>
      {isPlaying && (
        <Animated.View
          pointerEvents="none"
          style={[
            rippleStyles.ripple,
            {
              width: buttonSize,
              height: buttonSize,
              borderRadius: buttonSize / 2,
              opacity: rippleOpacity,
              transform: [{ scale: rippleScale }],
            },
          ]}
        />
      )}

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityState={{
          disabled: isDisabled,
          selected: isPlaying,
        }}
        disabled={isDisabled}
        onPress={handlePress}
        style={({ pressed }) => [
          baseStyles.base,
          getSizeStyle(size),
          getVariantStyle(variant, colors as any),
          isPlaying && baseStyles.playing,
          completedState && getCompleteStyle(),
          pressed && !isDisabled && baseStyles.pressed,
          isDisabled && baseStyles.disabled,
          style,
        ]}
        {...props}
      >
        {isLoading ? (
          <ActivityIndicator
            size="small"
            color={getIconColor(variant, colors as any, completedState)}
          />
        ) : (
          <Text
            style={[
              baseStyles.icon,
              { color: getIconColor(variant, colors as any, completedState) },
            ]}
          >
            {completedState ? <FaCheck /> : <HiSpeakerWave />}
          </Text>
        )}
      </Pressable>
    </View>
  );
}

const rippleStyles = {
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
  } satisfies ViewStyle,

  ripple: {
    position: "absolute",
    backgroundColor: "rgba(37, 99, 235, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(37, 99, 235, 0.3)",
    shadowColor: "#2563eb",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
  } satisfies ViewStyle,
};
