'use client';

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
import { Loader2, Send, MessageSquare, PhoneCall, Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React, { useEffect, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from 'date-fns';
import { ru as ruLocale } from 'date-fns/locale';
import { useLanguage } from "@/context/LanguageContext";


const TELEGRAM_BOT_TOKEN = '8122606632:AAFXhxCNBDe2JH0vwGEBwEdj1c7mclLKjYw';
const TELEGRAM_CHAT_ID = '-1003780724209';

export function BookingForm({ 
    bookingSubject,
    variant = 'default',
 }: { 
    bookingSubject?: string,
    variant?: 'default' | 'inverted' 
}) {
  const { toast } = useToast();
  const { t } = useTranslation();
  const { locale } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const is_inverted = variant === 'inverted';

  const bookingSchema = z.object({
    name: z.string().min(2, { message: t('booking.form.nameError') }),
    phone: z.string().min(9, { message: t('booking.form.phoneError') }),
    username: z.string().optional(),
    date: z.date().optional(),
    item: z.string({ required_error: t('booking.form.itemError') }),
    contactMethod: z.enum(["telegram", "whatsapp", "call"], {required_error: t('booking.form.contactMethodError')}),
  });
  
  type BookingFormValues = z.infer<typeof bookingSchema>;

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      phone: "",
      username: "",
      date: undefined,
      item: bookingSubject || t('booking.form.subjectConsultation'),
      contactMethod: "telegram",
    },
  });

  useEffect(() => {
    if (bookingSubject) {
        form.setValue('item', bookingSubject);
    }
  }, [bookingSubject, form]);


  async function onSubmit(data: BookingFormValues) {
    if (!TELEGRAM_CHAT_ID || TELEGRAM_CHAT_ID === 'YOUR_TELEGRAM_CHAT_ID') {
        toast({
            variant: "destructive",
            title: "Ошибка конфигурации Telegram",
            description: "Пожалуйста, укажите ID чата.",
        });
        return;
    }
    
    setIsSubmitting(true);

    const dateText = data.date
        ? `*Дата поездки:* ${format(data.date, 'PPP', { locale: locale === 'ru' ? ruLocale : undefined })}`
        : `*Дата поездки:* ${t('booking.form.dateDiscussLater')}`;

    const messageLines = [
        `🔔 *Новая заявка на бронирование!*`,
        `-----------------------------------`,
        `*Имя:* ${data.name}`,
        `*Телефон:* \`${data.phone}\``,
        data.username ? `*Username:* @${data.username.replace('@', '')}` : null,
        dateText,
        `*Услуга/Авто:* ${data.item}`,
        `*Способ связи:* ${data.contactMethod}`,
    ];

    const message = messageLines.filter(Boolean).join('\n');

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
                parse_mode: 'Markdown'
            }),
        });

        const result = await response.json();

        if (result.ok) {
            toast({
                title: t('booking.form.toastSuccessTitle'),
                description: t('booking.form.toastSuccessDescription'),
            });
            form.reset({
              name: "",
              phone: "",
              username: "",
              date: undefined,
              item: bookingSubject || t('booking.form.subjectConsultation'),
              contactMethod: "telegram",
            });
        } else {
            throw new Error(result.description || 'Failed to send message.');
        }
    } catch (error) {
        console.error("Telegram submission error:", error);
        toast({
            variant: "destructive",
            title: "Ошибка отправки",
            description: "Не удалось отправить заявку. Попробуйте снова или свяжитесь с нами напрямую.",
        });
    } finally {
        setIsSubmitting(false);
    }
  }

  const invertedClasses = "bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/60 border-primary-foreground/20 focus-visible:ring-primary-foreground";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('booking.form.nameLabel')}</FormLabel>
              <FormControl>
                <Input placeholder={t('booking.form.namePlaceholder')} {...field} className={cn(is_inverted && invertedClasses)} />
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
                  <Input type="tel" placeholder={t('booking.form.phonePlaceholder')} {...field} className={cn(is_inverted && invertedClasses)} />
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
                  {t('booking.form.usernameLabel')} <span className={cn("text-sm", is_inverted ? "text-primary-foreground/60" : "text-muted-foreground")}>({t('booking.form.usernameOptional')})</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder={t('booking.form.usernamePlaceholder')} {...field} className={cn(is_inverted && invertedClasses)} />
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
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && (is_inverted ? "text-primary-foreground/60" : "text-muted-foreground"),
                                        is_inverted && invertedClasses
                                    )}
                                >
                                    {field.value ? (
                                        format(field.value, 'PPP', { locale: locale === 'ru' ? ruLocale : undefined })
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
                                disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
                                locale={locale === 'ru' ? ruLocale : undefined}
                                initialFocus={false}
                            />
                        </PopoverContent>
                    </Popover>
                    <FormMessage className="text-accent" />
                </FormItem>
            )}
            />
          <FormField
              control={form.control}
              name="item"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>{t('booking.form.itemLabel')}</FormLabel>
                   {bookingSubject ? (
                      <FormControl>
                         <Input {...field} disabled className={cn(is_inverted && invertedClasses, "cursor-default")} />
                      </FormControl>
                   ) : (
                      <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                          <FormControl>
                          <SelectTrigger className={cn(is_inverted && invertedClasses)}>
                              <SelectValue placeholder={t('booking.form.itemPlaceholder')} />
                          </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                              <SelectItem value={t('booking.form.subjectConsultation')}>{t('booking.form.subjectConsultation')}</SelectItem>
                              <SelectItem value={t('booking.form.subjectCar')}>{t('booking.form.subjectCar')}</SelectItem>
                              <SelectItem value={t('booking.form.subjectTransfer')}>{t('booking.form.subjectTransfer')}</SelectItem>
                          </SelectContent>
                      </Select>
                   )}
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
                  <FormItem className={cn("flex items-center space-x-3 space-y-0 rounded-md border p-4 hover:bg-muted transition-colors", is_inverted && "border-primary-foreground/20 hover:bg-primary-foreground/10")}>
                    <FormControl>
                      <RadioGroupItem value="telegram" id="telegram" className={cn(is_inverted && "border-primary-foreground/50 text-primary-foreground")} />
                    </FormControl>
                    <FormLabel htmlFor="telegram" className="font-normal flex items-center gap-2 cursor-pointer">
                      <MessageSquare className="h-5 w-5" /> Telegram
                    </FormLabel>
                  </FormItem>
                  <FormItem className={cn("flex items-center space-x-3 space-y-0 rounded-md border p-4 hover:bg-muted transition-colors", is_inverted && "border-primary-foreground/20 hover:bg-primary-foreground/10")}>
                    <FormControl>
                       <RadioGroupItem value="whatsapp" id="whatsapp" className={cn(is_inverted && "border-primary-foreground/50 text-primary-foreground")} />
                    </FormControl>
                     <FormLabel htmlFor="whatsapp" className="font-normal flex items-center gap-2 cursor-pointer">
                       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.521.074-.792.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                       <span className="ml-1">WhatsApp</span>
                     </FormLabel>
                  </FormItem>
                  <FormItem className={cn("flex items-center space-x-3 space-y-0 rounded-md border p-4 hover:bg-muted transition-colors", is_inverted && "border-primary-foreground/20 hover:bg-primary-foreground/10")}>
                    <FormControl>
                       <RadioGroupItem value="call" id="call" className={cn(is_inverted && "border-primary-foreground/50 text-primary-foreground")}/>
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
        
        <Button 
          type="submit" 
          size="lg" 
          className={cn(
            "w-full font-bold text-base !mt-10",
            is_inverted && "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
          )} 
          disabled={isSubmitting}
        >
           {isSubmitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Send className="mr-2 h-5 w-5" />}
           {isSubmitting ? 'Отправка...' : t('booking.form.submitButton')}
        </Button>
      </form>
    </Form>
  );
}
