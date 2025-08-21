"use client";

import { Moon, Sun, Monitor, Gift, SunDim, SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) {
    // Accessibility: render a predictable placeholder for screen readers
    return <Button variant="outline" size="icon" aria-label="Theme loading" />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-5 w-5 dark:hidden" />
          <Moon className="h-5 w-5 hidden dark:block" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className={theme === "light" ? "bg-accent" : ""}
        >
          <Sun className="mr-2 h-4 w-4" /> Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className={theme === "dark" ? "bg-accent" : ""}
        >
          <Moon className="mr-2 h-4 w-4" /> Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className={theme === "system" ? "bg-accent" : ""}
        >
          <Monitor className="mr-2 h-4 w-4" /> System
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("xmas")}
          className={theme === "xmas" ? "bg-accent" : ""}
        >
          <Gift className="mr-2 h-4 w-4" /> Xmas
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("xmasDark")}
          className={theme === "xmasDark" ? "bg-accent" : ""}
        >
          <Monitor className="mr-2 h-4 w-4" /> Xmas Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("season")}
          className={theme === "season" ? "bg-accent" : ""}
        >
          <SunDim className="mr-2 h-4 w-4" /> Season
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("sDark")}
          className={theme === "sDark" ? "bg-accent" : ""}
        >
          <SunMoon className="mr-2 h-4 w-4" /> Season Dark
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
