import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "../hooks/use-theme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={toggleTheme}
      className="text-primary-custom hover:text-accent-custom dark:text-primary-foreground dark:hover:text-accent-custom"
      data-testid="button-theme-toggle"
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </Button>
  );
}