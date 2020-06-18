import React, { createContext, useState, useEffect } from "react";
import LocalStorageUtil from "../models/LocalStorage";

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
      buttonBorder: "black",
    },

    darkTheme: {
      name: "dark",
      background: "#0F0F0F",
      textColor: "white",
      linkTextColor: "#19ABFF",
      dashboardTheme: {
        background: "#212121",
      },
      buttonBorder: "white",
    },
  };
  const [theme, setTheme] = useState(themes.lightTheme);

  const toggleThemes = async () => {
    setTheme(theme.name === "light" ? themes.darkTheme : themes.lightTheme);

    LocalStorageUtil.setItem(theme.name, theme.name);
  };

  const getUserTheme = async () => {
    const themeName = LocalStorageUtil.getItemFromStorage(theme.name);
    setTheme(themeName === "light" ? themes.darkTheme : themes.lightTheme);
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
