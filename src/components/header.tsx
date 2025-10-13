import { CircuitBoard } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";

export function AppHeader() {
  const navItems = [
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "IoT Demo", href: "#iot-demo" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex items-center">
          <a href="#" className="flex items-center space-x-2">
            <CircuitBoard className="h-6 w-6 text-primary" />
            <span className="font-bold sm:inline-block">
              Kilari Tech Solutions
            </span>
          </a>
        </div>
        <nav className="flex items-center gap-4 text-sm lg:gap-6 flex-1">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="hidden md:block transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
