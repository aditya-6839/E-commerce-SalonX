// ThemeProvider.jsx

import { createContext, useContext, useEffect, useState } from "react"

// Initial state for the context
const initialState = {
  theme: "system",
  setTheme: () => null,
}

const ThemeProviderContext = createContext(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
}) {
  // Initialize state from localStorage or use defaultTheme
  const [theme, setTheme] = useState(() => {
    // Check if running in a browser environment
    if (typeof window === 'undefined') return defaultTheme;

    const storedTheme = localStorage.getItem(storageKey);
    return storedTheme || defaultTheme;
  })

  // Effect to apply the theme class to the document root
  useEffect(() => {
    const root = window.document.documentElement

    // Clear existing theme classes
    root.classList.remove("light", "dark")

    if (theme === "system") {
      // Determine system preference
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"

      root.classList.add(systemTheme)
      return
    }

    // Apply the chosen theme
    root.classList.add(theme)
  }, [theme])

  const value = {
    theme,
    // Setter function: saves to localStorage and updates state
    setTheme: (newTheme) => {
      localStorage.setItem(storageKey, newTheme)
      setTheme(newTheme)
    },
  }

  // FIX: Removed the spread of ...props as the Provider only accepts 'value' and 'children'.
  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}