'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { addVehicle, useFirestore } from "@/firebase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { vehicleCategoryMap } from "@/lib/vehicles";

const vehicleSchema = z.object({
  name: z.string().min(3, "Название должно быть длиннее 3 символов"),
  category: z.enum(["premium", "comfort", "minivan", "bus"], {
    required_error: "Выберите категорию",
  }),
  imageUrl: z.string().url("Введите корректный URL изображения"),
  imageHint: z.string().optional(),
  featureKeys: z.string().min(1, "Добавьте хотя бы одну характеристику"),
  priceKey: z.string().min(3, "Введите ключ для цены (например, from_120_day)"),
  descriptionKey: z.string().optional(),
});

type VehicleFormValues = z.infer<typeof vehicleSchema>;

export default function AdminPage() {
  const firestore = useFirestore();
  const { toast } = useToast();
  
  const form = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
      imageHint: "",
      featureKeys: "",
      priceKey: "",
      descriptionKey: "",
    },
  });

  const onSubmit = (data: VehicleFormValues) => {
    const vehicleData = {
        ...data,
        featureKeys: data.featureKeys.split(',').map(s => s.trim()).filter(Boolean),
        descriptionKey: data.descriptionKey || `desc_${data.name.toLowerCase().replace(/ /g, '_')}`
    };

    try {
      const newId = addVehicle(firestore, vehicleData);
      toast({
        title: "✅ Автомобиль добавлен!",
        description: `Модель "${data.name}" с ID: ${newId} была успешно добавлена в базу.`,
      });
      form.reset();
    } catch (error: any) {
        toast({
            variant: "destructive",
            title: "❌ Ошибка!",
            description: error.message || "Не удалось добавить автомобиль.",
        });
    }
  };

  return (
    <div className="container py-12">
        <Card className="max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle>Добавить новый автомобиль</CardTitle>
                <CardDescription>Заполните форму, чтобы добавить новую машину в автопарк.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Название модели</FormLabel>
                        <FormControl>
                          <Input placeholder="Например, LiXiang L7" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Категория</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Выберите категорию" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.entries(vehicleCategoryMap).map(([key, value]) => (
                                <SelectItem key={key} value={key}>{value}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                        control={form.control}
                        name="priceKey"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Ключ цены</FormLabel>
                            <FormControl>
                                <Input placeholder="from_120_day" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                  </div>

                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL изображения</FormLabel>
                        <FormControl>
                          <Input placeholder="https://..." {...field} />
                        </FormControl>
                        <FormDescription>Вставьте прямую ссылку на изображение.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="featureKeys"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ключи характеристик</FormLabel>
                        <FormControl>
                          <Textarea placeholder="vip, panorama, up_to_4_seats" {...field} />
                        </FormControl>
                        <FormDescription>Введите ключи из locale-файлов через запятую.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Добавление..." : "Добавить автомобиль"}
                  </Button>
                </form>
              </Form>
            </CardContent>
        </Card>
    </div>
  );
}
