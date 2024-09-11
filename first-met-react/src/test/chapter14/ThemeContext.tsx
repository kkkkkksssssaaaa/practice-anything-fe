import React from "react";

const ThemeContext = React.createContext<ContextProps>({
  theme: "light",
});
ThemeContext.displayName = "ThemeContext";

export type ContextProps = {
  theme: string;
  toggleTheme?(): void;
};

export default ThemeContext;
