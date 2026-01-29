import Link from "next/link";
import { MessageCircle, Instagram, Youtube } from "lucide-react";

export function Footer() {
  const socialLinks = [
    { name: "Telegram", icon: <MessageCircle />, href: "https://t.me/toureast_transport" },
    { name: "Instagram", icon: <Instagram />, href: "#" },
    { name: "YouTube", icon: <Youtube />, href: "#" },
  ];

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="font-bold text-lg">Silk Road Rides</p>
            <p className="text-muted-foreground text-sm">© {new Date().getFullYear()} Все права защищены.</p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-2">
             <p className="font-semibold text-lg">+998 99 727 80 20</p>
             <p className="text-muted-foreground text-sm">г. Бухара, Узбекистан</p>
          </div>
          <div className="flex gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label={link.name}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
