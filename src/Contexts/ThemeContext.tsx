import React, { createContext, useState, useEffect } from "react";
import { AuthService as Auth } from "../auth/AuthService";

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
      background: "#F5F5F5",
      textColor: "black",
      linkTextColor: "#0b486b",
      dashboardTheme: {
        background: "#FFFFFF",
      },
    },

    darkTheme: {
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
    setTheme(theme.textColor === "black" ? themes.darkTheme : themes.lightTheme);

    const userId: string = await Auth.getUserId();
    const response = await Auth.fetch(`users/${userId}/setUserTheme/${theme}`);
    const themeJson = await response.json();
  };

  const getUserTheme = async () => {
    const user = await Auth.getUserData();

    if (user.theme) {
      setTheme(user.theme);
    }
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
