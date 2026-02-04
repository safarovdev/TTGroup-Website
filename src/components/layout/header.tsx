"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Menu, User, LogOut, Shield } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";
import { useUser, signOutUser } from "@/firebase";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { locale, setLocale } = useLanguage();
  const { t } = useTranslation();
  const { user } = useUser();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const navLinks = [
    { href: "/#about", label: t('header.about') },
    { href: "/fleet", label: t('header.fleet') },
    { href: "/#testimonials", label: t('header.testimonials') },
    { href: "/#gallery", label: t('header.gallery') },
    { href: "/#faq", label: t('header.faq') },
    { href: "/#contacts", label: t('header.contacts') },
  ];

  const handleLogout = async () => {
    await signOutUser();
  };

  const UserMenu = () => {
    if (!user) {
      return (
        <Button variant="ghost" asChild>
          <Link href="/login" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Войти</span>
          </Link>
        </Button>
      );
    }
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <User className="h-5 w-5" />
            <span className="hidden md:inline">{user.email}</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {user.isAdmin && (
            <DropdownMenuItem asChild>
              <Link href="/admin">
                <Shield className="mr-2 h-4 w-4" />
                <span>Админ-панель</span>
              </Link>
            </DropdownMenuItem>
          )}
          {user.isAdmin && <DropdownMenuSeparator />}
          <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:text-red-500">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Выйти</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };
  
  return (
    <header className="w-full border-b bg-background/95 backdrop-blur-sm animate-in fade-in-0 duration-500 sticky top-0 z-50">
      <div className="container relative flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="hidden font-extrabold text-xl uppercase tracking-wider md:inline">TourEast Transport Group</span>
          <span className="font-extrabold text-xl uppercase tracking-wider md:hidden">TTGROUP</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold absolute left-1/2 -translate-x-1/2">
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
        <div className="flex items-center justify-end gap-4">
          {isMounted && <UserMenu />}

          {isMounted ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-1 text-sm">
                  {locale.toUpperCase()} <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setLocale('ru')}>RU</DropdownMenuItem>
                <DropdownMenuItem disabled>UZ</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLocale('en')}>EN</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="h-10 w-[58px]" /> // Placeholder to prevent layout shift
          )}

          <Button asChild className="hidden sm:inline-flex">
            <Link href="/#booking">{t('header.book')}</Link>
          </Button>

          {isMounted ? (
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <Link href="/" className="mr-6 flex items-center gap-2 mb-8">
                   <span className="font-extrabold text-xl uppercase tracking-wider">TTGROUP</span>
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
                  <Link href="/#booking" onClick={() => setIsMobileMenuOpen(false)}>{t('header.book')}</Link>
                </Button>
              </SheetContent>
            </Sheet>
          ) : (
            <div className="h-10 w-10 md:hidden" /> // Placeholder to prevent layout shift
          )}

        </div>
      </div>
    </header>
  );
}
