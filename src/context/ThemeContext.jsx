import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    localStorage.getItem("dark") === "true" || false
  );

  useEffect(() => {
    const getItem = localStorage.getItem("dark");
    setTheme(getItem === "true" || false);
  }, []);

  const changeTheme = () => {
    setTheme((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("dark", theme.toString());
  }, [theme]);

  const values = {
    theme,
    setTheme,
    changeTheme,
  };

  return (
    <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
  );
};
