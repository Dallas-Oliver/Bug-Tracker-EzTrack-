import React, { createContext, useState, useEffect } from "react";
import { AuthService as Auth } from "../auth/AuthService";
import ThemeStorageUtil from "../models/Theme";

export interface IContext {
  theme?: {
    background: string;
    textColor: string;
    linkTextColor: string;
    dashboardTheme: { background: string };
  };
  toggleThemes: () => void;
}

interface IThemeProviderProps {
  children: JSX.Element;
}

export const ThemeContext = createContext<any>({});

export const ThemeProvider = (props: IThemeProviderProps) => {
  const themes = {
    lightTheme: {
      name: "light",
      background: "#F5F5F5",
      textColor: "black",
      linkTextColor: "#0b486b",
      dashboardTheme: {
        background: "#FFFFFF",
      },
    },

    darkTheme: {
      name: "dark",
      background: "#363636",
      textColor: "white",
      linkTextColor: "#19ABFF",
      dashboardTheme: {
        background: "#5C5C5C",
      },
    },
  };
  const [theme, setTheme] = useState(themes.lightTheme);

  const toggleThemes = async () => {
    setTheme(theme.name === "light" ? themes.darkTheme : themes.lightTheme);

    ThemeStorageUtil.setTheme(theme.name);
  };

  const getUserTheme = async () => {
    const theme = ThemeStorageUtil.getTheme();
    setTheme(theme === "light" ? themes.darkTheme : themes.lightTheme);
  };

  useEffect(() => {
    getUserTheme();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleThemes }}>
      {props.children}
    </ThemeContext.Provider>
  );
};
