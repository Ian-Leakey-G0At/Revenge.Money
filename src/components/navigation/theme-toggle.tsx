/**
 * @file Defines a theme toggle button that allows the user to switch between
 * light and dark modes.
 *
 * This component uses the `next-themes` library to manage the theme state and
 * provides a simple UI to toggle between the available themes.
 */

"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

/**
 * A button component for toggling between light and dark themes.
 *
 * It uses the `useTheme` hook from `next-themes` to determine the current
 * theme and to set the new theme. The button displays a sun icon for the light
 * theme and a moon icon for the dark theme.
 *
 * @returns {JSX.Element} The rendered theme toggle button.
 */
export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
