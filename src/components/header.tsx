'use client';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { ThemeToggle } from './theme-toggle';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-auto flex items-center">
          <a className="flex items-center space-x-2" href="/">
            <span className="font-bold">Mohan Kilari</span>
          </a>
        </div>

        <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="transition-colors hover:text-accent">
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-2 md:ml-6">
          <ThemeToggle />
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex h-full flex-col p-6">
                   <a className="mb-8 flex items-center space-x-2" href="/" onClick={() => setIsMobileMenuOpen(false)}>
                      <span className="font-bold">Mohan Kilari</span>
                    </a>
                  <nav className="flex flex-col items-start space-y-6 text-lg font-medium">
                    {navLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        className="transition-colors hover:text-accent"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.name}
                      </a>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
