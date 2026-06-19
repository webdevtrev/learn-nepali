import { Audio } from "expo-av";
import { useEffect, useRef, useState } from "react";

import { useTheme } from "@/providers/theme-provider";
import { AudioButtonSize, AudioButtonVariant } from "./AudioButton.styles";
import { AudioButtonBase, AudioButtonBaseProps } from "./AudioButtonBase";

type AudioButtonProps = Omit<
  AudioButtonBaseProps,
  "isPlaying" | "isLoading" | "colors" | "onPress"
> & {
  variant?: AudioButtonVariant;
  size?: AudioButtonSize;
};

export default function AudioButton({
  src,
  label = "Play audio",
  onPlay,
  onEnd,
  disabled = false,
  variant = "primary",
  size = "medium",
  style,
  ...props
}: AudioButtonProps) {
  const { colors } = useTheme();

  const soundRef = useRef<Audio.Sound | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      timeoutRef.current && clearTimeout(timeoutRef.current);
      soundRef.current?.unloadAsync();
      soundRef.current = null;
    };
  }, []);

  const playAudioFromBeginning = async () => {
    if (!src || disabled || loading) return;

    try {
      setLoading(true);

      if (soundRef.current) {
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }

      const { sound } = await Audio.Sound.createAsync(
        { uri: src },
        { shouldPlay: true },
        (status) => {
          if (!status.isLoaded) {
            setLoading(false);
            setIsPlaying(false);
            return;
          }

          setIsPlaying(status.isPlaying);

          if (status.didJustFinish) {
            setIsPlaying(false);
            onEnd?.();

            timeoutRef.current && clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
              setLoading(false);
            }, 1800);
          }
        },
      );

      soundRef.current = sound;

      setLoading(false);
      setIsPlaying(true);
      onPlay?.();
    } catch (error) {
      console.error("Unable to play audio pronunciation:", error);
      setLoading(false);
      setIsPlaying(false);
    }
  };

  return (
    <AudioButtonBase
      src={src}
      label={label}
      disabled={disabled}
      variant={variant}
      size={size}
      style={style}
      isPlaying={isPlaying}
      isLoading={loading}
      colors={colors}
      onPress={playAudioFromBeginning}
      onPlay={onPlay}
      onEnd={onEnd}
      {...props}
    />
  );
}
