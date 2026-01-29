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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const bookingSchema = z.object({
  name: z.string().min(2, { message: "Имя должно содержать не менее 2 символов." }),
  phone: z.string().min(9, { message: "Введите корректный номер телефона." }),
  date: z.date({ required_error: "Выберите дату." }),
  vehicle: z.string({ required_error: "Выберите автомобиль." }),
  contactMethod: z.enum(["telegram", "whatsapp", "call"], {required_error: "Выберите способ связи."}),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

const vehicleOptions = [
  "LiXiang L7",
  "Mercedes-Benz V-Class",
  "Hyundai H1",
  "Toyota Hiace",
  "Не уверен, нужна консультация",
];

export function Booking() {
  const { toast } = useToast();
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      phone: "",
      contactMethod: "telegram",
    },
  });

  function onSubmit(data: BookingFormValues) {
    if (data.contactMethod === 'telegram') {
        const message = `Новая заявка на бронирование!\nИмя: ${data.name}\nТелефон: ${data.phone}\nДата: ${format(data.date, 'PPP')}\nАвто: ${data.vehicle}`;
        const telegramUrl = `https://t.me/toureast_transport?text=${encodeURIComponent(message)}`;
        window.open(telegramUrl, '_blank');
    }
    
    toast({
      title: "Заявка отправлена!",
      description: "Мы скоро свяжемся с вами для подтверждения.",
    });

    form.reset();
    form.clearErrors();
  }

  return (
    <section id="booking" className="py-20 md:py-28 bg-primary text-primary-foreground">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Забронировать поездку</h2>
          <p className="mt-4 text-lg text-primary-foreground/80">
            Заполните форму, и мы свяжемся с вами в ближайшее время для уточнения деталей.
          </p>
        </div>
        <div className="max-w-2xl mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ваше имя</FormLabel>
                      <FormControl>
                        <Input placeholder="Иван" {...field} className="bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/60 border-primary-foreground/20 focus-visible:ring-primary-foreground" />
                      </FormControl>
                      <FormMessage className="text-primary-foreground/80" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Номер телефона</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="+998 XX XXX XX XX" {...field} className="bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/60 border-primary-foreground/20 focus-visible:ring-primary-foreground" />
                      </FormControl>
                      <FormMessage className="text-primary-foreground/80" />
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
                      <FormLabel>Дата поездки</FormLabel>
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
                                format(field.value, "PPP", {})
                              ) : (
                                <span>Выберите дату</span>
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
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage className="text-primary-foreground/80" />
                    </FormItem>
                  )}
                />
                <FormField
                    control={form.control}
                    name="vehicle"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Выберите автомобиль</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 focus-visible:ring-primary-foreground">
                                <SelectValue placeholder="Модель авто" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            {vehicleOptions.map((option) => (
                                <SelectItem key={option} value={option}>{option}</SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                        <FormMessage className="text-primary-foreground/80" />
                        </FormItem>
                    )}
                />
              </div>
              <FormField
                control={form.control}
                name="contactMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Предпочтительный способ связи</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="telegram" id="telegram" className="border-primary-foreground/50 text-primary-foreground" />
                          </FormControl>
                          <FormLabel htmlFor="telegram" className="font-normal flex items-center gap-2">
                            <MessageSquare className="h-5 w-5" /> Telegram
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                             <RadioGroupItem value="whatsapp" id="whatsapp" className="border-primary-foreground/50 text-primary-foreground" />
                          </FormControl>
                           <FormLabel htmlFor="whatsapp" className="font-normal flex items-center gap-2">
                             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.521.074-.792.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                             <span className="ml-1">WhatsApp</span>
                           </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                             <RadioGroupItem value="call" id="call" className="border-primary-foreground/50 text-primary-foreground"/>
                          </FormControl>
                          <FormLabel htmlFor="call" className="font-normal flex items-center gap-2">
                             <PhoneCall className="h-5 w-5" /> Звонок
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage className="text-primary-foreground/80" />
                  </FormItem>
                )}
              />
              
              <Button type="submit" size="lg" className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-bold text-base">
                Отправить заявку <Send className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
