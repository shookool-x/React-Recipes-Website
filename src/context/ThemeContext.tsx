import { createContext, ReactNode, useReducer } from "react";

interface ContextInterface {
  bgColor: string;
  changBgNav(color: string): void;
}

interface ContextAction {
  type: string;
  payload: string;
}


export const ThemeContext = createContext<ContextInterface>({
  bgColor: '',
  changBgNav: (color: string) => { }
});

function ThemeReducer(state: Omit<ContextInterface, "changBgNav">, action: ContextAction) {
  switch (action.type) {
    case "CHNG_BG_NAV":
      return { ...state, bgColor: action.payload }
    default:
      return state
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {

  const [state, dispatch] = useReducer(ThemeReducer, {
    bgColor: '#005670',
  })

  function changBgNav(color: string) {
    dispatch({ type: "CHNG_BG_NAV", payload: color });
  }

  return (
    <ThemeContext.Provider
      value={{ ...state, changBgNav }}
    >
      {children}
    </ThemeContext.Provider>
  )

}