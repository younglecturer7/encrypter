"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import React, { useEffect, useState } from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Optional: return fallback to avoid flicker
    return <>{children}</>;
  }

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      storageKey="theme"
      enableColorScheme
      themes={[
        "system",
        "light",
        "dark",
        "xmas",
        "xmasDark",
        "season",
        "sDark",
      ]} // extend for custom
    >
      {children}
    </NextThemesProvider>
  );
}
