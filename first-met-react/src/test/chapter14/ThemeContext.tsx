import React from "react";

const ThemeContext = React.createContext<ContextProps>({});
ThemeContext.displayName = "ThemeContext";

export type ContextProps = {
  theme?: string;
  toggleTheme?(): void;
};

export default ThemeContext;
