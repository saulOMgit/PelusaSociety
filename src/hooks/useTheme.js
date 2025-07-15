import { useEffect } from "react";
import useLocalStorage from "use-local-storage";

const useTheme = () => {
    const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light')
    
    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
    }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };
  return [theme, toggleTheme];
};

export default useTheme;
