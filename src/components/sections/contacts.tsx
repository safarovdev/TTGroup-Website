import Link from "next/link";
import { MessageCircle, Instagram, Youtube } from "lucide-react";

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.521.074-.792.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
);


export function Contacts() {
  const socialLinks = [
    { name: "Telegram", icon: <MessageCircle className="w-6 h-6"/>, href: "https://t.me/toureast_transport" },
    { name: "WhatsApp", icon: <WhatsAppIcon className="w-6 h-6"/>, href: "#" },
    { name: "Instagram", icon: <Instagram className="w-6 h-6"/>, href: "#" },
    { name: "YouTube", icon: <Youtube className="w-6 h-6"/>, href: "#" },
  ];

  const navLinks = [
    { href: "/", label: "Главная" },
    { href: "#about", label: "О нас" },
    { href: "#fleet-intro", label: "Автопарк" },
    { href: "#testimonials", label: "Отзывы" },
    { href: "#faq", label: "FAQ" },
    { href: "#contacts", label: "Контакты" },
  ];

  const docLinks = [
      { href: "#", label: "Реквизиты компании" },
      { href: "#", label: "Партнерам" },
  ];

  return (
    <section id="contacts" className="relative bg-muted/50 border-t py-20 md:py-28 overflow-hidden animate-in fade-in-0 duration-500">
      <div className="container relative z-10">
        <div className="mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">Контакты</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {/* Contacts Column */}
            <div className="space-y-6 col-span-1 sm:col-span-2 lg:col-span-1">
                <div>
                    <p className="font-semibold text-sm text-muted-foreground mb-1">Менеджер по бронированию</p>
                    <p className="text-xl font-bold">Ильхом Мамурович</p>
                    <a href="tel:+998997278020" className="text-lg text-foreground hover:text-primary transition-colors">+998 99 727 80 20</a>
                    <br/>
                    <a href="mailto:info@ttgroup.uz" className="text-lg text-foreground hover:text-primary transition-colors">info@ttgroup.uz</a>
                </div>
                <div>
                    <p className="font-semibold text-sm text-muted-foreground mb-1">Адрес компании</p>
                    <p className="text-base">Узбекистан, г. Бухара, <br /> ул. Атабая Эшанова, 12</p>
                </div>
            </div>

            {/* Social Media & Docs Column */}
            <div className="col-span-1">
                <p className="font-semibold text-sm text-muted-foreground mb-4">Социальные сети</p>
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

            {/* Navigation Column */}
            <div className="col-span-1">
                 <p className="font-semibold text-sm text-muted-foreground mb-4">Навигация</p>
                 <ul className="space-y-2">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <Link href={link.href} className="text-base hover:text-primary transition-colors">{link.label}</Link>
                        </li>
                    ))}
                 </ul>
            </div>
            
            {/* Documents Column */}
            <div className="col-span-1">
                <p className="font-semibold text-sm text-muted-foreground mb-4">Документы</p>
                <ul className="space-y-2">
                    {docLinks.map((link) => (
                        <li key={link.href}>
                            <Link href={link.href} className="text-base hover:text-primary transition-colors">{link.label}</Link>
                        </li>
                    ))}
                 </ul>
            </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-0 right-0 z-0 text-center select-none pointer-events-none">
        <h1 className="text-[12vw] lg:text-[180px] font-extrabold text-foreground/10 uppercase tracking-wider leading-none break-words">
            TourEast Transport Group
        </h1>
      </div>
    </section>
  );
}
