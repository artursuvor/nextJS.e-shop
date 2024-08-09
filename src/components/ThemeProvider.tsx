"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import React from "react";

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return (
    <NextThemesProvider attribute="class">
      {children}
    </NextThemesProvider>
  );
};

export default ThemeProvider;
