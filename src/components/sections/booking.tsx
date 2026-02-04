"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Send, MessageSquare, PhoneCall } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useOnScreen } from "@/hooks/use-on-screen";
import React, { useMemo, useEffect } from "react";
import { vehicleCategoryMap, type Vehicle } from "@/lib/vehicles";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageContext";
import { ru, enUS } from 'date-fns/locale';
import { useVehicles } from "@/hooks/useVehicles";
import { useSearchParams } from "next/navigation";

const dateLocales = {
  ru: ru,
  en: enUS
}

export function Booking() {
  const [ref, isVisible] = useOnScreen<HTMLElement>({ threshold: 0.2 });
  const { toast } = useToast();
  const { t } = useTranslation();
  const { locale } = useLanguage();
  const { data: vehicles } = useVehicles();
  const searchParams = useSearchParams();

  const bookingSchema = z.object({
    name: z.string().min(2, { message: t('booking.form.nameError') }),
    phone: z.string().min(9, { message: t('booking.form.phoneError') }),
    username: z.string().optional(),
    date: z.date({ required_error: t('booking.form.dateError') }),
    vehicle: z.string({ required_error: t('booking.form.vehicleError') }),
    contactMethod: z.enum(["telegram", "whatsapp", "call"], {required_error: t('booking.form.contactMethodError')}),
  });
  
  type BookingFormValues = z.infer<typeof bookingSchema>;

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      phone: "",
      username: "",
      vehicle: t('booking.form.vehicleConsultation'),
      contactMethod: "telegram",
    },
  });

  const groupedVehicles = useMemo(() => {
    if (!vehicles) return {};
    return (Object.keys(vehicleCategoryMap) as Array<keyof typeof vehicleCategoryMap>).reduce((acc, category) => {
        const categoryVehicles = vehicles.filter(v => v.category === category);
        if (categoryVehicles.length > 0) {
            acc[category] = categoryVehicles;
        }
        return acc;
    }, {} as Record<keyof typeof vehicleCategoryMap, Vehicle[]>);
  }, [vehicles]);


  useEffect(() => {
    // If the 'vehicle' param exists, it means we likely navigated from the detail page.
    // The browser's native hash scrolling can fail with Suspense.
    // This ensures we scroll to the booking form.
    if (searchParams.has('vehicle')) {
      document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [searchParams]);
  
  useEffect(() => {
    const vehicleId = searchParams.get('vehicle');
    if (vehicleId && vehicles) {
        const vehicle = vehicles.find(v => v.id === vehicleId);
        if (vehicle) {
            const vehicleValue = `${vehicle.name} ${vehicle.featureKeys && vehicle.featureKeys.length > 0 ? `(${vehicle.featureKeys.map(f => t(`vehicleFeatures.${f}`)).join(', ')})` : ''}`.trim();
            form.setValue('vehicle', vehicleValue);
        }
    }
  }, [searchParams, vehicles, form, t]);


  function onSubmit(data: BookingFormValues) {
    const message = `New booking request!\nName: ${data.name}\nPhone: ${data.phone}${data.username ? `\nUsername: ${data.username}`: ''}\nDate: ${format(data.date, 'PPP')}\nVehicle: ${data.vehicle}`;
    if (data.contactMethod === 'telegram') {
        const telegramUrl = `https://t.me/toureast_transport?text=${encodeURIComponent(message)}`;
        window.open(telegramUrl, '_blank');
    }
    
    toast({
      title: t('booking.form.toastSuccessTitle'),
      description: t('booking.form.toastSuccessDescription'),
    });

    form.reset();
  }

  return (
    <section ref={ref} id="booking" className="py-20 md:py-28 bg-primary text-primary-foreground">
      <div className="container">
        <div className={cn("text-center max-w-3xl mx-auto mb-12", isVisible ? "animate-in fade-in-0 slide-in-from-top-8 duration-700" : "opacity-0")}>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{t('booking.title')}</h2>
          <p className="mt-4 text-lg text-primary-foreground/80">
            {t('booking.description')}
          </p>
        </div>
        <div className={cn("max-w-3xl mx-auto", isVisible ? "animate-in fade-in-0 slide-in-from-bottom-8 duration-700 delay-200" : "opacity-0")}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('booking.form.nameLabel')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('booking.form.namePlaceholder')} {...field} className="bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/60 border-primary-foreground/20 focus-visible:ring-primary-foreground" />
                    </FormControl>
                    <FormMessage className="text-accent" />
                  </FormItem>
                )}
              />
              <div className="grid sm:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('booking.form.phoneLabel')}</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder={t('booking.form.phonePlaceholder')} {...field} className="bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/60 border-primary-foreground/20 focus-visible:ring-primary-foreground" />
                      </FormControl>
                      <FormMessage className="text-accent" />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t('booking.form.usernameLabel')} <span className="text-primary-foreground/60">({t('booking.form.usernameOptional')})</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder={t('booking.form.usernamePlaceholder')} {...field} className="bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/60 border-primary-foreground/20 focus-visible:ring-primary-foreground" />
                      </FormControl>
                      <FormMessage className="text-accent" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>{t('booking.form.dateLabel')}</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground border-primary-foreground/20",
                                !field.value && "text-primary-foreground/60"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP", { locale: dateLocales[locale] })
                              ) : (
                                <span>{t('booking.form.datePlaceholder')}</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date(new Date().setHours(0, 0, 0, 0))
                            }
                            initialFocus
                            locale={dateLocales[locale]}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage className="text-accent" />
                    </FormItem>
                  )}
                />
                <FormField
                    control={form.control}
                    name="vehicle"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>{t('booking.form.vehicleLabel')}</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                            <FormControl>
                            <SelectTrigger className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 focus-visible:ring-primary-foreground">
                                <SelectValue placeholder={t('booking.form.vehiclePlaceholder')} />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value={t('booking.form.vehicleConsultation')}>{t('booking.form.vehicleConsultation')}</SelectItem>
                                {Object.entries(groupedVehicles).map(([category, vehicles]) => (
                                    <SelectGroup key={category}>
                                        <SelectLabel>{t(`vehicleCategories.${category}`)}</SelectLabel>
                                        {vehicles.map((vehicle) => (
                                            <SelectItem key={vehicle.id} value={`${vehicle.name} ${vehicle.featureKeys && vehicle.featureKeys.length > 0 ? `(${vehicle.featureKeys.map(f => t(`vehicleFeatures.${f}`)).join(', ')})` : ''}`.trim()}>
                                                {vehicle.name} 
                                                {vehicle.featureKeys && vehicle.featureKeys.length > 0 && <span className="text-muted-foreground ml-2 text-xs">({vehicle.featureKeys.map(f => t(`vehicleFeatures.${f}`)).join(', ')})</span>}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage className="text-accent" />
                        </FormItem>
                    )}
                />
              </div>
              <FormField
                control={form.control}
                name="contactMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('booking.form.contactMethodLabel')}</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border border-primary-foreground/20 p-4 hover:bg-primary-foreground/10 transition-colors">
                          <FormControl>
                            <RadioGroupItem value="telegram" id="telegram" className="border-primary-foreground/50 text-primary-foreground" />
                          </FormControl>
                          <FormLabel htmlFor="telegram" className="font-normal flex items-center gap-2 cursor-pointer">
                            <MessageSquare className="h-5 w-5" /> Telegram
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border border-primary-foreground/20 p-4 hover:bg-primary-foreground/10 transition-colors">
                          <FormControl>
                             <RadioGroupItem value="whatsapp" id="whatsapp" className="border-primary-foreground/50 text-primary-foreground" />
                          </FormControl>
                           <FormLabel htmlFor="whatsapp" className="font-normal flex items-center gap-2 cursor-pointer">
                             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.521.074-.792.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                             <span className="ml-1">WhatsApp</span>
                           </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border border-primary-foreground/20 p-4 hover:bg-primary-foreground/10 transition-colors">
                          <FormControl>
                             <RadioGroupItem value="call" id="call" className="border-primary-foreground/50 text-primary-foreground"/>
                          </FormControl>
                          <FormLabel htmlFor="call" className="font-normal flex items-center gap-2 cursor-pointer">
                             <PhoneCall className="h-5 w-5" /> {t('booking.form.call')}
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage className="text-accent" />
                  </FormItem>
                )}
              />
              
              <Button type="submit" size="lg" className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-bold text-base !mt-10">
                {t('booking.form.submitButton')} <Send className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
