import { FC } from "react";
import { Provider as PaperProvider, MD3DarkTheme } from "react-native-paper";
import { DarkTheme as NavigationDarkTheme } from "@react-navigation/native";

interface Props {
  children: React.ReactNode;
}

const colors = {
  primary: "#2196f3",
  background: "#111936",
  disabled: "#41516ca3",
  outline: "#2195f344",
  text: "#fff",
  secondary: "#7c4dff",
  tertiary: "#0b111e",
  error: "#f13a59",
  success: "#51a951",
  backdrop: "#080c1dc8",
};

const PaperDarkTheme = {
  ...MD3DarkTheme,
  roundness: 8,
  dark: true,
  colors: {
    ...MD3DarkTheme.colors,
    background: colors.background,
    primary: colors.primary,
    disabled: colors.disabled,
    outline: colors.outline,
    accent: colors.secondary,
    secondary: colors.secondary,
    tertiary: colors.tertiary,
    text: colors.text,
    placeholder: colors.disabled,
    surface: colors.tertiary,
    error: colors.error,
    success: colors.success,
    backdrop: colors.backdrop,
  },
};

export const dark = {
  ...NavigationDarkTheme,
  ...PaperDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    ...PaperDarkTheme.colors,
  },
};

export const CustomThemeProvider: FC<Props> = ({ children }) => {
  return <PaperProvider theme={dark}>{children}</PaperProvider>;
};
