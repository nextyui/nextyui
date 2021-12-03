import { createContext, useContext, useEffect, useReducer } from "react";
import { THEME_KEY } from "../constants";

export type ThemeContextType = {
  darkMode: boolean;
};

export const ThemeContext = createContext<{
  state: ThemeContextType;
  dispatch: React.Dispatch<DashboardContextActionType>;
} | null>(null);

type DarkModeToggleActionType = {
  type: "ToggleDarkMode";
  value?: boolean;
};

type DashboardContextActionType = DarkModeToggleActionType;

export const reducer = (
  state: ThemeContextType,
  action: DashboardContextActionType
): ThemeContextType => {
  switch (action.type) {
    case "ToggleDarkMode":
      return {
        ...state,
        darkMode: action.value != undefined ? action.value : !state.darkMode,
      };
    default:
      return state;
  }
};
export const ThemeProvider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(reducer, {
    darkMode: false,
  } as ThemeContextType);

  useEffect(() => {
    console.log(localStorage.getItem(THEME_KEY));
    if (localStorage.getItem(THEME_KEY)) {
      dispatch({ type: "ToggleDarkMode", value: true });
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove("dark");
    localStorage.removeItem(THEME_KEY);
    if (state.darkMode) {
      localStorage.setItem(THEME_KEY, "dark");
      document.documentElement.classList.add("dark");
    }
  }, [state.darkMode]);

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("Context not working!");
  }
  return context;
};
