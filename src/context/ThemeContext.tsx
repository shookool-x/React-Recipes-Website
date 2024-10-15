import { createContext, ReactNode, useReducer } from "react";

interface ContextInterface {
  position: string;
  setPosition(x: string): void;
  theme: string;
  setTheme(x: string): void;
}

interface ActionReducer {
  type: string;
  payload: string;
}

export const ThemeContext = createContext<ContextInterface>({
  position: '',
  setPosition: (x: string) => { },
  theme: '',
  setTheme: (x: string) => { }
});

function ThemeReducer(state: Omit<ContextInterface, "setPosition" | "setTheme">, action: ActionReducer) {
  switch (action.type) {
    case "POSITION":
      return { ...state, position: action.payload };
    case "THEME":
      return { ...state, theme: action.payload };
    default:
      return state
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {

  const [state, dispatch] = useReducer(ThemeReducer, {
    position: "0% 0%",
    theme: 'light',
  });

  function setPosition(position: string) {
    dispatch({ type: "POSITION", payload: position })
  }

  function setTheme(theme: string) {
    dispatch({ type: "THEME", payload: theme })
  }

  return (
    < ThemeContext.Provider value={{ ...state, setPosition, setTheme }}>
      {children}
    </ ThemeContext.Provider>)

}