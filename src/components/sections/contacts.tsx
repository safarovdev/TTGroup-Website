"use client";

import Link from "next/link";
import { MessageCircle, Instagram } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export function Contacts() {
  const { t } = useTranslation();

  const socialLinks = [
    { name: "Telegram", icon: <MessageCircle className="w-6 h-6"/>, href: "https://t.me/toureast_transport" },
    { name: "Instagram", icon: <Instagram className="w-6 h-6"/>, href: "https://www.instagram.com/toureast.uzbekistan" },
  ];

  const navLinks = [
    { href: "/", label: t('contacts.nav.home') },
    { href: "/#about", label: t('contacts.nav.about') },
    { href: "/fleet", label: t('contacts.nav.fleet') },
    { href: "/#testimonials", label: t('contacts.nav.testimonials') },
    { href: "/#faq", label: t('contacts.nav.faq') },
    { href: "/#contacts", label: t('contacts.nav.contacts') },
  ];

  return (
    <section id="contacts" className="bg-muted/50 border-t py-20 md:py-28 animate-in fade-in-0 duration-500">
      <div className="container">
        <div className="mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">{t('contacts.title')}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
            {/* Contacts Column */}
            <div className="space-y-6">
                <div>
                    <p className="font-semibold text-sm text-muted-foreground mb-1">{t('contacts.generalContactTitle')}</p>
                    <a href="tel:+998997278020" className="text-lg text-foreground hover:text-primary transition-colors">+998 99 727 80 20</a>
                    <br/>
                    <a href="tel:+998997778020" className="text-lg text-foreground hover:text-primary transition-colors">+998 99 777 80 20</a>
                    <br/>
                    <a href="mailto:info@ttgroup.uz" className="text-lg text-foreground hover:text-primary transition-colors">info@ttgroup.uz</a>
                </div>
                <div>
                    <p className="font-semibold text-sm text-muted-foreground mb-1">{t('contacts.addressTitle')}</p>
                    <p className="text-base">{t('contacts.addressFull')}</p>
                </div>
            </div>

            {/* Navigation Column */}
            <div className="">
                 <p className="font-semibold text-sm text-muted-foreground mb-4">{t('contacts.navTitle')}</p>
                 <ul className="space-y-2">
                    {navLinks.map((link) => (
                        <li key={link.label}>
                            <Link href={link.href} className="text-base hover:text-primary transition-colors">{link.label}</Link>
                        </li>
                    ))}
                 </ul>
            </div>
            
            {/* Social Media Column */}
            <div className="">
                <p className="font-semibold text-sm text-muted-foreground mb-4">{t('contacts.socialTitle')}</p>
                <div className="flex gap-3">
                    {socialLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 transition-colors h-11 w-11 bg-primary/10 hover:bg-primary/20 rounded-full flex items-center justify-center"
                        aria-label={link.name}
                      >
                        {link.icon}
                      </a>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
