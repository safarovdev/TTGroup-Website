'use client';

import { useUser, signInWithEmail, addVehicle, useFirestore, signOutUser, deleteVehicle, updateVehicle, addTransfer, useMemoFirebase, updateTransfer, deleteTransfer } from '@/firebase';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTransfers } from '@/hooks/useTransfers';
import { type Transfer, type TransferPriceInfo } from '@/lib/transfers';


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

const transferPriceSchema = z.object({
  vehicleId: z.string(),
  price: z.preprocess(
    (val) => {
      const sVal = String(val).trim();
      if (sVal === "") return 0;
      const num = parseFloat(sVal);
      return isNaN(num) ? val : num;
    },
    z.number().min(1, "Цена должна быть больше 0")
  ),
});

const transferSchema = z.object({
  title: z.string().min(3, "Название должно быть длиннее 3 символов"),
  from: z.string().min(2, "Место отправления обязательно"),
  to: z.string().min(2, "Место назначения обязательно"),
  drivingTime: z.string().min(1, "Время в пути обязательно"),
  drivingDistance: z.string().min(1, "Расстояние обязательно"),
  prices: z.array(transferPriceSchema).min(1, "Нужно указать хотя бы одну цену"),
  isFeatured: z.boolean().optional().default(false),
});
type TransferFormValues = z.infer<typeof transferSchema>;


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

  // State for vehicles
  const [editingVehicleId, setEditingVehicleId] = useState<string | null>(null);
  const [isVehicleFormOpen, setIsVehicleFormOpen] = useState(false);
  const {data: vehicles, loading: vehiclesLoading} = useVehicles();

  // State for transfers
  const [editingTransferId, setEditingTransferId] = useState<string | null>(null);
  const [isTransferFormOpen, setIsTransferFormOpen] = useState(false);
  const {data: transfers, loading: transfersLoading} = useTransfers();
  
  const vehicleForm = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: { name: "", price: 0, capacity: 1, imageUrls: [], featureKeys: [], isFeatured: false },
  });

  const transferForm = useForm<TransferFormValues>({
    resolver: zodResolver(transferSchema),
    defaultValues: { title: "", from: "", to: "", drivingTime: "", drivingDistance: "", prices: [], isFeatured: false },
  });


  // Effects for forms
  useEffect(() => {
    if (editingVehicleId && vehicles) {
      const vehicleToEdit = vehicles.find(v => v.id === editingVehicleId);
      if (vehicleToEdit) {
        vehicleForm.reset({
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
        vehicleForm.reset({ name: "", price: 0, capacity: 1, imageUrls: [], featureKeys: [], isFeatured: false });
    }
  }, [editingVehicleId, vehicles, vehicleForm]);

  useEffect(() => {
    if (editingTransferId && transfers) {
        const transferToEdit = transfers.find(t => t.id === editingTransferId);
        if (transferToEdit) {
            transferForm.reset({
                title: transferToEdit.title,
                from: transferToEdit.from,
                to: transferToEdit.to,
                drivingTime: transferToEdit.drivingTime,
                drivingDistance: transferToEdit.drivingDistance,
                prices: transferToEdit.prices,
                isFeatured: transferToEdit.isFeatured || false,
            });
        }
    } else {
        transferForm.reset({ title: "", from: "", to: "", drivingTime: "", drivingDistance: "", prices: [], isFeatured: false });
    }
  }, [editingTransferId, transfers, transferForm]);


  // Submit handlers
  const onVehicleSubmit = (data: VehicleFormValues) => {
    if (!firestore) return;
    if (editingVehicleId) {
        updateVehicle(firestore, editingVehicleId, data);
        toast({ title: "✅ Автомобиль обновлен", description: `Данные для "${data.name}" сохранены.` });
    } else {
        addVehicle(firestore, data);
        toast({ title: "✅ Автомобиль добавлен", description: `Модель "${data.name}" добавлена в автопарк.` });
    }
    setIsVehicleFormOpen(false);
    setEditingVehicleId(null);
  };
  
  const onTransferSubmit = (data: TransferFormValues) => {
    if (!firestore) return;
    if (editingTransferId) {
        updateTransfer(firestore, editingTransferId, data);
        toast({ title: "✅ Трансфер обновлен", description: `Данные для "${data.title}" сохранены.` });
    } else {
        addTransfer(firestore, data);
        toast({ title: "✅ Трансфер добавлен", description: `Маршрут "${data.title}" добавлен.` });
    }
    setIsTransferFormOpen(false);
    setEditingTransferId(null);
  };


  const handleLogout = async () => {
    await signOutUser();
    toast({ title: "Вы вышли из системы." });
  };
  
  // Handlers for Vehicles
  const handleEditVehicle = (vehicle: Vehicle) => {
    setEditingVehicleId(vehicle.id);
    setIsVehicleFormOpen(true);
  };
  const handleAddNewVehicle = () => {
    setEditingVehicleId(null);
    setIsVehicleFormOpen(true);
  };
  const handleDeleteVehicle = (vehicleId: string) => {
    if (!firestore) return;
    deleteVehicle(firestore, vehicleId);
    toast({ variant: 'destructive', title: "🗑️ Автомобиль удален", description: "Запись была удалена из базы данных."});
  };
  const onVehicleFormOpenChange = (open: boolean) => {
    setIsVehicleFormOpen(open);
    if (!open) {
        setEditingVehicleId(null);
    }
  };

  // Handlers for Transfers
  const handleEditTransfer = (transfer: Transfer) => {
    setEditingTransferId(transfer.id);
    setIsTransferFormOpen(true);
  };
  const handleAddNewTransfer = () => {
    setEditingTransferId(null);
    setIsTransferFormOpen(true);
  };
  const handleDeleteTransfer = (transferId: string, transferTitle: string) => {
    if (!firestore) return;
    deleteTransfer(firestore, transferId);
    toast({ variant: 'destructive', title: "🗑️ Трансфер удален", description: `Маршрут "${transferTitle}" удален.`});
  };
  const onTransferFormOpenChange = (open: boolean) => {
    setIsTransferFormOpen(open);
    if (!open) {
        setEditingTransferId(null);
    }
  };
  
  const watchedPrices = transferForm.watch('prices');

  return (
    <div className="container py-12">
        {/* Vehicle Form Dialog */}
        <Dialog open={isVehicleFormOpen} onOpenChange={onVehicleFormOpenChange}>
            <DialogContent className="max-w-4xl">
                <DialogHeader>
                    <DialogTitle>{editingVehicleId ? t('admin.editTitle') : t('admin.addTitle')}</DialogTitle>
                    <DialogDescriptionComponent>{editingVehicleId ? t('admin.editDescription') : t('admin.addDescription')}</DialogDescriptionComponent>
                </DialogHeader>
                <div className="py-4 max-h-[80vh] overflow-y-auto px-1">
                 <Form {...vehicleForm}>
                    <form onSubmit={vehicleForm.handleSubmit(onVehicleSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <FormField control={vehicleForm.control} name="name" render={({ field }) => (
                            <FormItem>
                            <FormLabel>{t('admin.nameLabel')}</FormLabel>
                            <FormControl><Input placeholder={t('admin.namePlaceholder')} {...field} /></FormControl>
                            <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={vehicleForm.control} name="category" render={({ field }) => (
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
                        <FormField control={vehicleForm.control} name="price" render={({ field }) => (
                            <FormItem>
                            <FormLabel>{t('admin.priceLabel')}</FormLabel>
                            <FormControl>
                                <Input 
                                    type="number" 
                                    placeholder={t('admin.pricePlaceholder')} 
                                    {...field}
                                    onChange={e => vehicleForm.setValue('price', e.target.value === '' ? 0 : parseFloat(e.target.value))}
                                />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={vehicleForm.control} name="capacity" render={({ field }) => (
                            <FormItem>
                            <FormLabel>{t('admin.capacityLabel')}</FormLabel>
                            <FormControl><Input type="number" placeholder={t('admin.capacityPlaceholder')} {...field} onChange={e => field.onChange(parseInt(e.target.value, 10))} /></FormControl>
                            <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                    <Controller control={vehicleForm.control} name="imageUrls" render={({ field }) => <ImageUploader field={field} />} />
                    <FormField name="featureKeys" control={vehicleForm.control} render={() => (
                        <FormItem>
                            <FormLabel>{t('admin.featuresLabel')}</FormLabel>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {FEATURES.map((featureId) => (
                                <FormField key={featureId} control={vehicleForm.control} name="featureKeys" render={({ field }) => (
                                    <FormItem key={featureId} className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                        <FormControl>
                                        <Checkbox
                                            checked={field.value?.includes(featureId)}
                                            onCheckedChange={(checked) => {
                                            return checked
                                                ? field.onChange([...(field.value || []), featureId])
                                                : field.onChange(field.value?.filter((value) => value !== featureId))
                                            }}
                                        />
                                        </FormControl>
                                        <FormLabel className="font-normal">{t(`vehicleFeatures.${featureId}`)}</FormLabel>
                                    </FormItem>
                                )}/>
                            ))}
                            </div>
                        </FormItem>
                    )}/>
                    <FormField control={vehicleForm.control} name="isFeatured" render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <FormLabel className="text-base">{t('admin.isFeaturedLabel')}</FormLabel>
                                    <FormDescription>{t('admin.isFeaturedDescription')}</FormDescription>
                                </div>
                                <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                            </FormItem>
                        )}
                    />
                    <div className="flex gap-4 pt-4">
                        <Button type="submit" disabled={vehicleForm.formState.isSubmitting}>
                            {vehicleForm.formState.isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : (editingVehicleId ? <CheckCircle className="mr-2 h-4 w-4" /> : null)}
                            {editingVehicleId ? t('admin.updateButton') : t('admin.addButton')}
                        </Button>
                        <Button type="button" variant="ghost" onClick={() => onVehicleFormOpenChange(false)}>
                            <Ban className="mr-2 h-4 w-4" /> {t('admin.deleteConfirmCancel')}
                        </Button>
                    </div>
                    </form>
                </Form>
                </div>
            </DialogContent>
        </Dialog>
        
        {/* Transfer Form Dialog */}
        <Dialog open={isTransferFormOpen} onOpenChange={onTransferFormOpenChange}>
            <DialogContent className="max-w-4xl">
                <DialogHeader>
                    <DialogTitle>{editingTransferId ? t('admin.transferEditTitle') : t('admin.transferAddTitle')}</DialogTitle>
                    <DialogDescriptionComponent>{editingTransferId ? t('admin.transferEditDescription') : t('admin.transferAddDescription')}</DialogDescriptionComponent>
                </DialogHeader>
                <div className="py-4 max-h-[80vh] overflow-y-auto px-1">
                    <Form {...transferForm}>
                        <form onSubmit={transferForm.handleSubmit(onTransferSubmit)} className="space-y-6">
                            <FormField control={transferForm.control} name="title" render={({ field }) => (
                                <FormItem><FormLabel>{t('admin.titleLabel')}</FormLabel><FormControl><Input placeholder={t('admin.titlePlaceholder')} {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                             <div className="grid md:grid-cols-2 gap-6">
                                <FormField control={transferForm.control} name="from" render={({ field }) => (
                                    <FormItem><FormLabel>{t('admin.fromLabel')}</FormLabel><FormControl><Input placeholder={t('admin.fromPlaceholder')} {...field} /></FormControl><FormMessage /></FormItem>
                                )} />
                                <FormField control={transferForm.control} name="to" render={({ field }) => (
                                    <FormItem><FormLabel>{t('admin.toLabel')}</FormLabel><FormControl><Input placeholder={t('admin.toPlaceholder')} {...field} /></FormControl><FormMessage /></FormItem>
                                )} />
                             </div>
                             <div className="grid md:grid-cols-2 gap-6">
                                <FormField control={transferForm.control} name="drivingTime" render={({ field }) => (
                                    <FormItem><FormLabel>{t('admin.timeLabel')}</FormLabel><FormControl><Input placeholder={t('admin.timePlaceholder')} {...field} /></FormControl><FormMessage /></FormItem>
                                )} />
                                <FormField control={transferForm.control} name="drivingDistance" render={({ field }) => (
                                    <FormItem><FormLabel>{t('admin.distanceLabel')}</FormLabel><FormControl><Input placeholder={t('admin.distancePlaceholder')} {...field} /></FormControl><FormMessage /></FormItem>
                                )} />
                            </div>
                            <FormItem>
                                <FormLabel>{t('admin.pricesLabel')}</FormLabel>
                                <div className='space-y-4 rounded-lg border p-4 max-h-60 overflow-y-auto'>
                                    {vehiclesLoading ? (
                                        <div className="flex items-center justify-center p-4"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
                                    ) : vehicles?.map(vehicle => {
                                        const currentPrice = watchedPrices.find(p => p.vehicleId === vehicle.id);
                                        return (
                                            <div key={vehicle.id} className='flex items-center gap-4'>
                                                <Checkbox
                                                    id={`price-enabled-${vehicle.id}`}
                                                    checked={!!currentPrice}
                                                    onCheckedChange={checked => {
                                                        const currentPrices = transferForm.getValues('prices');
                                                        if (checked) {
                                                            transferForm.setValue('prices', [...currentPrices, { vehicleId: vehicle.id, price: 0 }]);
                                                        } else {
                                                            transferForm.setValue('prices', currentPrices.filter(p => p.vehicleId !== vehicle.id));
                                                        }
                                                    }}
                                                />
                                                <label htmlFor={`price-enabled-${vehicle.id}`} className='font-medium min-w-[200px]'>{vehicle.name}</label>
                                                {!!currentPrice && (
                                                    <Input
                                                        type="number"
                                                        placeholder={t('admin.pricePlaceholder')}
                                                        defaultValue={currentPrice.price > 0 ? currentPrice.price : ''}
                                                        onChange={e => {
                                                            const newPrice = e.target.value === '' ? 0 : parseFloat(e.target.value);
                                                            const newPrices = transferForm.getValues('prices').map(p => p.vehicleId === vehicle.id ? { ...p, price: newPrice } : p);
                                                            transferForm.setValue('prices', newPrices, { shouldValidate: true });
                                                        }}
                                                        className='max-w-[150px]'
                                                    />
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>
                                <FormMessage>{transferForm.formState.errors.prices?.message}</FormMessage>
                            </FormItem>
                            <FormField control={transferForm.control} name="isFeatured" render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">{t('admin.featuredTransferLabel')}</FormLabel>
                                        <FormDescription>{t('admin.featuredTransferDescription')}</FormDescription>
                                    </div>
                                    <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                                </FormItem>
                            )} />
                            <div className="flex gap-4 pt-4">
                                <Button type="submit" disabled={transferForm.formState.isSubmitting}>
                                    {transferForm.formState.isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <CheckCircle className="mr-2 h-4 w-4" />}
                                    {editingTransferId ? t('admin.updateButton') : t('admin.addButton')}
                                </Button>
                                <Button type="button" variant="ghost" onClick={() => onTransferFormOpenChange(false)}>
                                    <Ban className="mr-2 h-4 w-4" /> {t('admin.deleteConfirmCancel')}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
      
      <div className="flex justify-between items-start mb-8">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Панель управления</h1>
        </div>
        <Button variant="outline" size="sm" onClick={handleLogout}>
            {t('header.logout')} <LogOut className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="vehicles">
        <TabsList className='mb-4'>
            <TabsTrigger value="vehicles">{t('admin.vehicles')}</TabsTrigger>
            <TabsTrigger value="transfers">{t('admin.transfers')}</TabsTrigger>
        </TabsList>
        <TabsContent value="vehicles">
            <Card className="max-w-7xl mx-auto">
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle>{t('admin.vehicleListTitle')}</CardTitle>
                            <CardDescription>{t('admin.vehicleListDescription')}</CardDescription>
                        </div>
                        <Button onClick={handleAddNewVehicle}>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            {t('admin.addButton')}
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    {vehiclesLoading ? (
                        <div className="flex items-center justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
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
                                <TableCell>{vehicle.isFeatured && <Star className="h-5 w-5 text-amber-500 fill-amber-500" />}</TableCell>
                                <TableCell className="font-medium">{vehicle.name}</TableCell>
                                <TableCell>{t(`vehicleCategories.${vehicle.category}`)}</TableCell>
                                <TableCell className="text-right">{vehicle.price > 0 ? `$${vehicle.price}`: t('vehicleDetail.negotiablePrice')}</TableCell>
                                <TableCell className="text-right">{vehicle.capacity}</TableCell>
                                <TableCell className="text-right">
                                <div className="flex gap-2 justify-end">
                                    <Button variant="outline" size="icon" onClick={() => handleEditVehicle(vehicle)}><FilePenLine className="h-4 w-4" /></Button>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild><Button variant="destructive" size="icon"><Trash2 className="h-4 w-4" /></Button></AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                            <AlertDialogTitle>{t('admin.deleteConfirmTitle')}</AlertDialogTitle>
                                            <AlertDialogDescription>{t('admin.deleteConfirmDescription', { name: vehicle.name })}</AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                            <AlertDialogCancel>{t('admin.deleteConfirmCancel')}</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleDeleteVehicle(vehicle.id)}>{t('admin.deleteConfirmAction')}</AlertDialogAction>
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
        </TabsContent>
        <TabsContent value="transfers">
             <Card className="max-w-7xl mx-auto">
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle>{t('admin.transferListTitle')}</CardTitle>
                            <CardDescription>{t('admin.transferListDescription')}</CardDescription>
                        </div>
                        <Button onClick={handleAddNewTransfer}>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            {t('admin.addButton')}
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    {transfersLoading ? (
                        <div className="flex items-center justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
                    ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className='w-[80px]'>{t('admin.table.isFeatured')}</TableHead>
                                <TableHead>{t('admin.table.title')}</TableHead>
                                <TableHead>{t('admin.table.route')}</TableHead>
                                <TableHead>{t('admin.table.time')}</TableHead>
                                <TableHead>{t('admin.table.distance')}</TableHead>
                                <TableHead className="text-right">{t('admin.table.actions')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                        {transfers?.map(transfer => (
                            <TableRow key={transfer.id}>
                                <TableCell>{transfer.isFeatured && <Star className="h-5 w-5 text-amber-500 fill-amber-500" />}</TableCell>
                                <TableCell className="font-medium">{transfer.title}</TableCell>
                                <TableCell>{transfer.from} → {transfer.to}</TableCell>
                                <TableCell>{transfer.drivingTime}</TableCell>
                                <TableCell>{transfer.drivingDistance}</TableCell>
                                <TableCell className="text-right">
                                <div className="flex gap-2 justify-end">
                                    <Button variant="outline" size="icon" onClick={() => handleEditTransfer(transfer)}><FilePenLine className="h-4 w-4" /></Button>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild><Button variant="destructive" size="icon"><Trash2 className="h-4 w-4" /></Button></AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>{t('admin.deleteConfirmTitle')}</AlertDialogTitle>
                                                <AlertDialogDescription>{t('admin.deleteConfirmDescription', { name: transfer.title })}</AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>{t('admin.deleteConfirmCancel')}</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleDeleteTransfer(transfer.id, transfer.title)}>{t('admin.deleteConfirmAction')}</AlertDialogAction>
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
        </TabsContent>
      </Tabs>
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
