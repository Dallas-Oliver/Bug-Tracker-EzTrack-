import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = (props) => {
  const themes = {
    lightTheme: {
      background: "#F5F5F5",
      textColor: "black",
      dashboardTheme: {
        background: "#FFFFFF",
      },
    },

    darkTheme: {
      background: "#363636",
      textColor: "white",
      dashboardTheme: {
        background: "#5C5C5C",
      },
    },
  };
  const [theme, setTheme] = useState(themes.lightTheme);

  const toggleThemes = () => {
    setTheme(
      theme.textColor === "black" ? themes.darkTheme : themes.lightTheme
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleThemes }}>
      {props.children}
    </ThemeContext.Provider>
  );
};
