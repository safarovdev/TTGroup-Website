'use client';

import { useUser, signInWithEmail, addVehicle, useFirestore, signOutUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loader2, LogOut } from 'lucide-react';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { vehicleCategoryMap } from "@/lib/vehicles";

// Login Form Component
const loginSchema = z.object({
  email: z.string().email("Введите корректный email"),
  password: z.string().min(6, "Пароль должен быть не менее 6 символов"),
});
type LoginFormValues = z.infer<typeof loginSchema>;

function AdminLogin() {
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setError(null);
    try {
      await signInWithEmail(data.email, data.password);
      toast({
        title: "✅ Вход выполнен",
        description: "Вы успешно вошли в систему.",
      });
    } catch (e: any) {
      let errorMessage = "Произошла неизвестная ошибка.";
      if (e.code === 'auth/invalid-credential' || e.code === 'auth/user-not-found' || e.code === 'auth/wrong-password') {
          errorMessage = "Неверный email или пароль. Попробуйте снова.";
      }
      setError(errorMessage);
      toast({
          variant: "destructive",
          title: "❌ Ошибка входа",
          description: errorMessage,
      });
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-16rem)] items-center justify-center px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle>Вход в панель управления</CardTitle>
          <CardDescription>Введите свои данные для доступа</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl><Input type="email" placeholder="admin@example.com" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="password" render={({ field }) => (
                <FormItem>
                  <FormLabel>Пароль</FormLabel>
                  <FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              {error && (<p className="text-sm font-medium text-destructive">{error}</p>)}
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Войти
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

// Admin Dashboard Component
const vehicleSchema = z.object({
  name: z.string().min(3, "Название должно быть длиннее 3 символов"),
  category: z.enum(["premium", "comfort", "minivan", "bus"], { required_error: "Выберите категорию" }),
  imageUrl: z.string().url("Введите корректный URL изображения"),
  imageHint: z.string().optional(),
  featureKeys: z.string().min(1, "Добавьте хотя бы одну характеристику"),
  priceKey: z.string().min(3, "Введите ключ для цены (например, from_120_day)"),
  descriptionKey: z.string().optional(),
});
type VehicleFormValues = z.infer<typeof vehicleSchema>;

function AdminDashboard() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const form = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: { name: "", imageUrl: "", imageHint: "", featureKeys: "", priceKey: "", descriptionKey: "" },
  });

  const onSubmit = (data: VehicleFormValues) => {
    const vehicleData = {
        ...data,
        featureKeys: data.featureKeys.split(',').map(s => s.trim()).filter(Boolean),
        descriptionKey: data.descriptionKey || `desc_${data.name.toLowerCase().replace(/ /g, '_')}`
    };
    addVehicle(firestore, vehicleData);
    toast({
      title: "✅ Запрос на добавление отправлен!",
      description: `Модель "${data.name}" будет добавлена в базу данных.`,
    });
    form.reset();
  };

  const handleLogout = async () => {
    await signOutUser();
    toast({
        title: "Вы вышли из системы.",
    });
  };

  return (
    <div className="container py-12">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Добавить новый автомобиль</CardTitle>
              <CardDescription>Заполните форму, чтобы добавить новую машину в автопарк.</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Выйти
              <LogOut className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel>Название модели</FormLabel>
                  <FormControl><Input placeholder="Например, LiXiang L7" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <div className="grid md:grid-cols-2 gap-6">
                <FormField control={form.control} name="category" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Категория</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Выберите категорию" /></SelectTrigger></FormControl>
                      <SelectContent>
                        {Object.entries(vehicleCategoryMap).map(([key, value]) => (
                          <SelectItem key={key} value={key}>{value}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="priceKey" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ключ цены</FormLabel>
                    <FormControl><Input placeholder="from_120_day" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              <FormField control={form.control} name="imageUrl" render={({ field }) => (
                <FormItem>
                  <FormLabel>URL изображения</FormLabel>
                  <FormControl><Input placeholder="https://..." {...field} /></FormControl>
                  <FormDescription>Вставьте прямую ссылку на изображение.</FormDescription>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="featureKeys" render={({ field }) => (
                <FormItem>
                  <FormLabel>Ключи характеристик</FormLabel>
                  <FormControl><Textarea placeholder="vip, panorama, up_to_4_seats" {...field} /></FormControl>
                  <FormDescription>Введите ключи из locale-файлов через запятую.</FormDescription>
                  <FormMessage />
                </FormItem>
              )} />
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

// Main Page Component
export default function AdminPage() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    // If the user is loaded, and they are logged in but NOT an admin, redirect them.
    if (!loading && user && !user.isAdmin) {
      router.replace('/');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-16rem)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // If user is logged in and is an admin, show the dashboard.
  if (user && user.isAdmin) {
    return <AdminDashboard />;
  }
  
  // If user is not logged in, show login form.
  if (!user) {
    return <AdminLogin />;
  }

  // Fallback for non-admin user while redirecting.
  return (
    <div className="flex min-h-[calc(100vh-16rem)] items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}
