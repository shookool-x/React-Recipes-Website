import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";

export default function useTheme() {
  
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useThem must be used inside ThemeProvider")
  }

  return context;
}