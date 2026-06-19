import "@/global.css";

import { Platform } from "react-native";

export const Colors = {
  light: {
    primary: "#1f2a30",
    primaryLight: "#32424a",
    background: "#f7f5f1",
    surface: "#ffffff",
    border: "#e7e2da",

    flagBlue: "#5c8fbf",
    flagRed: "#c95b4a",
    flagGold: "#d8a23a",
    flagGreen: "#6f8f7a",
    flagCream: "#f2e7cc",

    text: "#1f2a30",
    textSecondary: "#5e6a70",
    textMuted: "#8b949a",
    textInverse: "#ffffff",

    success: "#6f8f7a",
    warning: "#d8a23a",
    error: "#c95b4a",
    info: "#5c8fbf",
    infoRgba: "rgba(92, 143, 191, 0.2)",

    buttonPrimaryBg: "#1f2a30",
    buttonPrimaryText: "#ffffff",
    buttonPrimaryHover: "#32424a",

    buttonSecondaryBg: "transparent",
    buttonSecondaryBorder: "#5c8fbf",
    buttonSecondaryText: "#5c8fbf",

    cardBg: "#ffffff",
    cardBorder: "#e7e2da",

    quizCorrect: "#dff2e5",
    quizCorrectBorder: "#6f8f7a",
    quizWrong: "#f8e0dc",
    quizWrongBorder: "#c95b4a",

    flashcardBg: "#fffdf8",
    flashcardBorder: "#ece5d8",

    wordCardBg: "#f9f4ea",

    progressBg: "#e8e2d7",
    progressFill: "#6f8f7a",
  },

  dark: {
    primary: "#f7f5f1",
    primaryLight: "#32424a",
    background: "#12181c",
    surface: "#1b2429",
    border: "#2a343a",

    flagBlue: "#5c8fbf",
    flagRed: "#c95b4a",
    flagGold: "#d8a23a",
    flagGreen: "#6f8f7a",
    flagCream: "#f2e7cc",

    text: "#f7f5f1",
    textSecondary: "#c4ccd0",
    textMuted: "#8b949a",
    textInverse: "#ffffff",

    success: "#6f8f7a",
    warning: "#d8a23a",
    error: "#c95b4a",
    info: "#5c8fbf",
    infoRgba: "rgba(92, 143, 191, 0.2)",

    buttonPrimaryBg: "#f7f5f1",
    buttonPrimaryText: "#ffffff",
    buttonPrimaryHover: "#32424a",

    buttonSecondaryBg: "transparent",
    buttonSecondaryBorder: "#5c8fbf",
    buttonSecondaryText: "#5c8fbf",

    cardBg: "#1b2429",
    cardBorder: "#2a343a",

    quizCorrect: "#dff2e5",
    quizCorrectBorder: "#6f8f7a",
    quizWrong: "#f8e0dc",
    quizWrongBorder: "#c95b4a",

    flashcardBg: "#202a2f",
    flashcardBorder: "#ece5d8",

    wordCardBg: "#202a2f",

    progressBg: "#e8e2d7",
    progressFill: "#6f8f7a",
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
    logo: "Cinzel",
    heading: "Fraunces",
    body: "Inter",
    devanagari: "Noto Sans Devanagari",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
    logo: "serif",
    heading: "serif",
    body: "normal",
    devanagari: "normal",
  },
  web: {
    sans: "var(--font-inter)",
    serif: "var(--font-fraunces)",
    rounded: "var(--font-inter)",
    mono: "var(--font-ibm-plex-mono)",
    logo: "var(--font-cinzel)",
    heading: "var(--font-fraunces)",
    body: "var(--font-inter)",
    devanagari: "var(--font-noto-sans-devanagari)",
  },
});

export const FontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  xxxxl: 48,
  xxxxxl: 64,
} as const;

export const FontWeight = {
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
} as const;

export const LetterSpacing = {
  tight: -0.32,
  normal: 0,
  wide: 1.28,
  logo: 2.88,
} as const;

export const Radius = {
  sm: 8,
  md: 14,
  lg: 20,
  xl: 28,
  full: 999,
} as const;

export const Shadows = {
  sm: {
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
  lg: {
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 30,
    elevation: 8,
  },
  soft: {
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 6,
  },
} as const;

export const Spacing = {
  one: 4,
  two: 8,
  three: 12,
  four: 16,
  five: 24,
  six: 32,
  seven: 48,
  eight: 64,
} as const;

export const Transition = {
  fast: 150,
  normal: 250,
  slow: 400,
} as const;

export const ContainerWidth = 1200;
export const NavHeight = 80;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
