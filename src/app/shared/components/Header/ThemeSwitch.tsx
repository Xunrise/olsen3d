"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import styles from "./ThemeSwitch.module.css";

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      <button
        className={styles.themeToggle}
        id="theme-toggle"
        aria-label="Toggle theme"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        <i className={theme === "dark" ? "fas fa-sun" : "fas fa-moon"}></i>
      </button>
    </div>
  );
};

export default ThemeSwitch;
