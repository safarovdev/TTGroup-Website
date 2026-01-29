"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

const navLinks = [
  { href: "#fleet", label: "Автопарк" },
  { href: "#services", label: "Наши принципы" },
  { href: "#booking", label: "Контакты" },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full border-b bg-background">
      <div className="container flex h-20 items-center">
        <Link href="/" className="mr-6 flex items-center gap-2">
          <span className="font-extrabold text-xl uppercase tracking-wider">Silk Road Rides</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-primary text-foreground/80"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-1 text-sm">
                RU <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>RU</DropdownMenuItem>
              <DropdownMenuItem>UZ</DropdownMenuItem>
              <DropdownMenuItem>EN</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button asChild className="hidden sm:inline-flex">
            <Link href="#booking">Забронировать</Link>
          </Button>

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <Link href="/" className="mr-6 flex items-center gap-2 mb-8">
                 <span className="font-extrabold text-xl uppercase tracking-wider">Silk Road Rides</span>
              </Link>
              <nav className="flex flex-col gap-6 text-lg font-medium">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="transition-colors hover:text-foreground"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
               <Button asChild className="mt-8 w-full">
                <Link href="#booking" onClick={() => setIsMobileMenuOpen(false)}>Забронировать</Link>
              </Button>
            </SheetContent>
          </Sheet>

        </div>
      </div>
    </header>
  );
}
