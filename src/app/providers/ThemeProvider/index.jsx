import React from "react";
import { ThemeProvider } from "./ThemeProvider";

export const withProviders = (component) => (
  <ThemeProvider>
    {component}
  </ThemeProvider>
);