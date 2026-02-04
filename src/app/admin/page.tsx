'use client';

import { useUser, signInWithEmail, addVehicle, useFirestore, signOutUser, deleteVehicle, updateVehicle } from '@/firebase';
import { useVehicles } from '@/hooks/useVehicles';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loader2, LogOut, Upload, X, Trash2, FilePenLine, Ban, CheckCircle, PlusCircle, Star } from 'lucide-react';
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { vehicleCategoryMap, type Vehicle } from "@/lib/vehicles";
import { useTranslation } from '@/hooks/useTranslation';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import Image from 'next/image';
import { Dialog, DialogContent, DialogDescription as DialogDescriptionComponent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';


const IMG_BB_API_KEY = "b451ce82e7b70dcf36531062261b837f";

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

// Admin Dashboard Components
const FEATURES = ["meet_and_greet", "air_conditioner", "panoramic_view", "ottoman", "tinted_windows", "city_tours"];

const vehicleSchema = z.object({
  name: z.string().min(3, "Название должно быть длиннее 3 символов"),
  category: z.enum(["premium", "comfort", "minivan", "bus"], { required_error: "Выберите категорию" }),
  price: z.preprocess(
    (val) => {
      const sVal = String(val).trim();
      if (sVal === "") return 0;
      const num = parseFloat(sVal);
      return isNaN(num) ? val : num; // Let non-numbers fail validation
    },
    z.number({
      invalid_type_error: "Цена должна быть числом",
    }).min(0, "Цена не может быть отрицательной").default(0)
  ),
  capacity: z.preprocess(
    (a) => parseInt(String(a), 10),
    z.number().int().positive("Вместимость должна быть целым положительным числом")
  ),
  imageUrls: z.string().url().array().min(1, "Загрузите хотя бы одно изображение"),
  featureKeys: z.string().array().optional().default([]),
  isFeatured: z.boolean().optional().default(false),
});
type VehicleFormValues = z.infer<typeof vehicleSchema>;

// ImageUploader Component
const ImageUploader = ({ field }: { field: any }) => {
    const { t } = useTranslation();
    const [isUploading, setIsUploading] = useState(false);
    const { toast } = useToast();

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files) return;

        setIsUploading(true);
        const uploadedUrls: string[] = [];

        for (const file of Array.from(files)) {
            const formData = new FormData();
            formData.append("image", file);

            try {
                const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMG_BB_API_KEY}`, {
                    method: "POST",
                    body: formData,
                });
                const result = await response.json();
                if (result.success) {
                    uploadedUrls.push(result.data.url);
                } else {
                    throw new Error(result.error?.message || "Image upload failed");
                }
            } catch (error: any) {
                toast({
                    variant: "destructive",
                    title: "Ошибка загрузки изображения",
                    description: error.message,
                });
            }
        }

        field.onChange([...(field.value || []), ...uploadedUrls]);
        setIsUploading(false);
    };

    const handleRemoveImage = (urlToRemove: string) => {
        field.onChange(field.value.filter((url: string) => url !== urlToRemove));
    };

    return (
        <FormItem>
            <FormLabel>{t('admin.imagesLabel')}</FormLabel>
            <FormControl>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                    {field.value?.map((url: string) => (
                        <div key={url} className="relative group aspect-square">
                            <Image src={url} alt="Uploaded vehicle" fill className="object-cover rounded-md" />
                            <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => handleRemoveImage(url)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                    <label className="aspect-square flex flex-col items-center justify-center rounded-md border-2 border-dashed border-muted-foreground/50 cursor-pointer hover:bg-muted transition-colors">
                        {isUploading ? (
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        ) : (
                            <>
                                <Upload className="h-8 w-8 text-muted-foreground" />
                                <span className="mt-2 text-xs text-center text-muted-foreground">{t('admin.imagesButton')}</span>
                            </>
                        )}
                        <input type="file" multiple accept="image/*" className="sr-only" onChange={handleFileUpload} disabled={isUploading} />
                    </label>
                </div>
            </FormControl>
            <FormMessage />
        </FormItem>
    );
};

// Admin Dashboard Component
function AdminDashboard() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const { t } = useTranslation();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  const form = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: { name: "", price: 0, capacity: 1, imageUrls: [], featureKeys: [], isFeatured: false },
  });

  const {data: vehicles, loading: vehiclesLoading} = useVehicles();

  useEffect(() => {
    if (editingId && vehicles) {
      const vehicleToEdit = vehicles.find(v => v.id === editingId);
      if (vehicleToEdit) {
        form.reset({
            name: vehicleToEdit.name,
            category: vehicleToEdit.category,
            price: vehicleToEdit.price,
            capacity: vehicleToEdit.capacity,
            imageUrls: vehicleToEdit.imageUrls,
            featureKeys: vehicleToEdit.featureKeys,
            isFeatured: vehicleToEdit.isFeatured || false,
        });
      }
    } else {
        form.reset({ name: "", price: 0, capacity: 1, imageUrls: [], featureKeys: [], isFeatured: false });
    }
  }, [editingId, vehicles, form]);

  const onSubmit = (data: VehicleFormValues) => {
    if (editingId) {
        // Update existing vehicle
        updateVehicle(firestore, editingId, data);
        toast({ title: "✅ Автомобиль обновлен", description: `Данные для "${data.name}" сохранены.` });
    } else {
        // Add new vehicle
        addVehicle(firestore, data);
        toast({ title: "✅ Автомобиль добавлен", description: `Модель "${data.name}" добавлена в автопарк.` });
    }
    setIsFormOpen(false);
    setEditingId(null);
  };

  const handleLogout = async () => {
    await signOutUser();
    toast({ title: "Вы вышли из системы." });
  };
  
  const handleEdit = (vehicle: Vehicle) => {
    setEditingId(vehicle.id);
    setIsFormOpen(true);
  };

  const handleAddNew = () => {
    setEditingId(null);
    setIsFormOpen(true);
  };

  const handleDelete = (vehicleId: string) => {
    deleteVehicle(firestore, vehicleId);
    toast({ variant: 'destructive', title: "🗑️ Автомобиль удален", description: "Запись была удалена из базы данных."});
  };

  const onFormOpenChange = (open: boolean) => {
    setIsFormOpen(open);
    if (!open) {
        setEditingId(null);
    }
  };

  return (
    <div className="container py-12">
        <Dialog open={isFormOpen} onOpenChange={onFormOpenChange}>
            <DialogContent className="max-w-4xl">
                <DialogHeader>
                    <DialogTitle>{editingId ? t('admin.editTitle') : t('admin.addTitle')}</DialogTitle>
                    <DialogDescriptionComponent>{editingId ? t('admin.editDescription') : t('admin.addDescription')}</DialogDescriptionComponent>
                </DialogHeader>
                <div className="py-4 max-h-[80vh] overflow-y-auto px-1">
                 <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem>
                            <FormLabel>{t('admin.nameLabel')}</FormLabel>
                            <FormControl><Input placeholder={t('admin.namePlaceholder')} {...field} /></FormControl>
                            <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="category" render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('admin.categoryLabel')}</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl><SelectTrigger><SelectValue placeholder={t('admin.categoryPlaceholder')} /></SelectTrigger></FormControl>
                            <SelectContent>
                                {Object.entries(vehicleCategoryMap).map(([key, value]) => (
                                <SelectItem key={key} value={key}>{value}</SelectItem>
                                ))}
                            </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                        )} />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <FormField control={form.control} name="price" render={({ field }) => (
                            <FormItem>
                            <FormLabel>{t('admin.priceLabel')}</FormLabel>
                            <FormControl>
                                <Input 
                                    type="number" 
                                    placeholder={t('admin.pricePlaceholder')} 
                                    {...field}
                                    value={field.value > 0 ? field.value : ''}
                                    onChange={e => field.onChange(e.target.value)}
                                />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="capacity" render={({ field }) => (
                            <FormItem>
                            <FormLabel>{t('admin.capacityLabel')}</FormLabel>
                            <FormControl><Input type="number" placeholder={t('admin.capacityPlaceholder')} {...field} /></FormControl>
                            <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                    
                    <Controller
                        control={form.control}
                        name="imageUrls"
                        render={({ field }) => <ImageUploader field={field} />}
                    />
                    
                    <FormField
                        name="featureKeys"
                        control={form.control}
                        render={() => (
                        <FormItem>
                            <FormLabel>{t('admin.featuresLabel')}</FormLabel>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {FEATURES.map((featureId) => (
                                <FormField
                                key={featureId}
                                control={form.control}
                                name="featureKeys"
                                render={({ field }) => {
                                    return (
                                    <FormItem key={featureId} className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                        <FormControl>
                                        <Checkbox
                                            checked={field.value?.includes(featureId)}
                                            onCheckedChange={(checked) => {
                                            return checked
                                                ? field.onChange([...(field.value || []), featureId])
                                                : field.onChange(
                                                    field.value?.filter(
                                                    (value) => value !== featureId
                                                    )
                                                )
                                            }}
                                        />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                        {t(`vehicleFeatures.${featureId}`)}
                                        </FormLabel>
                                    </FormItem>
                                    )
                                }}
                                />
                            ))}
                            </div>
                        </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="isFeatured"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <FormLabel className="text-base">
                                        {t('admin.isFeaturedLabel')}
                                    </FormLabel>
                                    <FormDescription>
                                        {t('admin.isFeaturedDescription')}
                                    </FormDescription>
                                </div>
                                <FormControl>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />


                    <div className="flex gap-4 pt-4">
                        <Button type="submit" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : (editingId ? <CheckCircle className="mr-2 h-4 w-4" /> : null)}
                            {editingId ? t('admin.updateButton') : t('admin.addButton')}
                        </Button>
                        <Button type="button" variant="ghost" onClick={() => onFormOpenChange(false)}>
                            <Ban className="mr-2 h-4 w-4" /> {t('admin.deleteConfirmCancel')}
                        </Button>
                    </div>
                    </form>
                </Form>
                </div>
            </DialogContent>
        </Dialog>
      
      <Card className="max-w-7xl mx-auto">
        <CardHeader>
            <div className="flex justify-between items-start">
                <div>
                    <CardTitle>{t('admin.vehicleListTitle')}</CardTitle>
                    <CardDescription>{t('admin.vehicleListDescription')}</CardDescription>
                </div>
                <div className='flex items-center gap-4'>
                    <Button onClick={handleAddNew}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        {t('admin.addButton')}
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleLogout}>
                        {t('header.logout')} <LogOut className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </div>
        </CardHeader>
        <CardContent>
            {vehiclesLoading ? (
                 <div className="flex items-center justify-center p-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                 </div>
            ) : (
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className='w-[80px]'>{t('admin.table.isFeatured')}</TableHead>
                        <TableHead>{t('admin.table.name')}</TableHead>
                        <TableHead>{t('admin.table.category')}</TableHead>
                        <TableHead className="text-right">{t('admin.table.price')}</TableHead>
                        <TableHead className="text-right">{t('admin.table.capacity')}</TableHead>
                        <TableHead className="text-right">{t('admin.table.actions')}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                   {vehicles?.map(vehicle => (
                     <TableRow key={vehicle.id}>
                        <TableCell>
                            {vehicle.isFeatured && <Star className="h-5 w-5 text-amber-500 fill-amber-500" />}
                        </TableCell>
                        <TableCell className="font-medium">{vehicle.name}</TableCell>
                        <TableCell>{t(`vehicleCategories.${vehicle.category}`)}</TableCell>
                        <TableCell className="text-right">
                          {vehicle.price > 0 ? `$${vehicle.price}`: t('vehicleDetail.negotiablePrice')}
                        </TableCell>
                        <TableCell className="text-right">{vehicle.capacity}</TableCell>
                        <TableCell className="text-right">
                           <div className="flex gap-2 justify-end">
                             <Button variant="outline" size="icon" onClick={() => handleEdit(vehicle)}>
                                <FilePenLine className="h-4 w-4" />
                             </Button>
                             <AlertDialog>
                               <AlertDialogTrigger asChild>
                                <Button variant="destructive" size="icon"><Trash2 className="h-4 w-4" /></Button>
                               </AlertDialogTrigger>
                               <AlertDialogContent>
                                 <AlertDialogHeader>
                                   <AlertDialogTitle>{t('admin.deleteConfirmTitle')}</AlertDialogTitle>
                                   <AlertDialogDescription>
                                     {t('admin.deleteConfirmDescription', { name: vehicle.name })}
                                   </AlertDialogDescription>
                                 </AlertDialogHeader>
                                 <AlertDialogFooter>
                                   <AlertDialogCancel>{t('admin.deleteConfirmCancel')}</AlertDialogCancel>
                                   <AlertDialogAction onClick={() => handleDelete(vehicle.id)}>{t('admin.deleteConfirmAction')}</AlertDialogAction>
                                 </AlertDialogFooter>
                               </AlertDialogContent>
                             </AlertDialog>
                           </div>
                        </TableCell>
                     </TableRow>
                   ))}
                </TableBody>
            </Table>
            )}
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

  if (user && user.isAdmin) {
    return <AdminDashboard />;
  }
  
  if (!user) {
    return <AdminLogin />;
  }

  return (
    <div className="flex min-h-[calc(100vh-16rem)] items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}
