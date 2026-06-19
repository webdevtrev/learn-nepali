import { useRef, useState } from "react";
import { AudioButtonBase, AudioButtonBaseProps } from "./AudioButtonBase";

type Props = Omit<AudioButtonBaseProps, "isPlaying" | "colors" | "onPress"> & {
  variant?: "primary" | "secondary" | "ghost" | "speaker";
  size?: "small" | "medium" | "large";
};

export default function AudioButton({
  src,
  label = "Play audio",
  disabled,
  onPlay,
  onEnd,
  variant = "primary",
  size = "medium",
  ...props
}: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [complete, setComplete] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleComplete = (isComplete: boolean) => {
    setComplete(isComplete);
    if (isComplete) {
      onEnd?.();
      setTimeout(() => setComplete(false), 900);
    }
  };

  const play = async () => {
    if (!src || disabled) return;
    setIsPlaying(true);
    audioRef.current?.pause();

    const audio = new Audio(src);
    audioRef.current = audio;

    audio.onended = () => {
      handleComplete(true);
      setIsPlaying(false);
    };

    await audio.play();
  };

  return (
    <AudioButtonBase
      src={src}
      label={label}
      disabled={disabled}
      variant={variant}
      size={size}
      isPlaying={isPlaying}
      isLoading={false}
      onPress={play}
      onPlay={onPlay}
      onEnd={onEnd}
      onComplete={handleComplete}
      complete={complete}
      {...props}
    />
  );
}
