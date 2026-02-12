'use client';

import { useUser, signInWithEmail, addVehicle, useFirestore, signOutUser, deleteVehicle, updateVehicle, addTransfer, useMemoFirebase, updateTransfer, deleteTransfer, useCollection } from '@/firebase';
import { collection, writeBatch, doc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';
import { Loader2, LogOut, Upload, X, Trash2, FilePenLine, Ban, CheckCircle, PlusCircle, Star, ArrowUpDown, GripVertical } from 'lucide-react';
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
import { Dialog, DialogContent, DialogDescription as DialogDescriptionComponent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { type Transfer } from '@/lib/transfers';
import { Textarea } from '@/components/ui/textarea';
import { locations, serviceTypesMap } from '@/lib/locations';
import { useLanguage } from '@/context/LanguageContext';
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';


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
  displayOrder: z.number().optional(),
});
type VehicleFormValues = z.infer<typeof vehicleSchema>;

const transferPriceSchema = z.object({
  category: z.enum(["premium", "comfort", "minivan", "bus"]),
  price: z.preprocess(
    (val) => {
      const sVal = String(val).trim();
      if (sVal === "") return 0;
      const num = parseFloat(sVal);
      return isNaN(num) ? val : num;
    },
    z.number().min(1, "Цена должна быть больше 0")
  ),
  vehicleIds: z.string().array().optional(),
});

const transferSchema = z.object({
  serviceType: z.enum(["intercity", "meet_and_greet", "excursion"], { required_error: "Выберите тип услуги" }),
  city: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  title_ru: z.string().min(3, "Название (RU) обязательно"),
  title_en: z.string().min(3, "Название (EN) обязательно"),
  description_ru: z.string().optional(),
  description_en: z.string().optional(),
  duration: z.string().optional(),
  distance: z.preprocess(
    (val) => (String(val).trim() === "" ? undefined : parseFloat(String(val))),
    z.number({ invalid_type_error: "Расстояние должно быть числом" }).min(0, "Расстояние не может быть отрицательным").optional()
  ),
  prices: z.array(transferPriceSchema).min(1, "Нужно указать хотя бы одну цену"),
  isFeatured: z.boolean().optional().default(false),
  displayOrder: z.number().optional(),
}).refine(data => {
    if (data.serviceType === 'intercity') {
        return !!data.from && !!data.to;
    }
    return true;
}, { message: "Для межгорода поля 'Откуда' и 'Куда' обязательны", path: ["from"] })
.refine(data => {
    if (data.serviceType === 'meet_and_greet' || data.serviceType === 'excursion') {
        return !!data.city;
    }
    return true;
}, { message: "Для встреч и экскурсий поле 'Город' обязательно", path: ["city"] });
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

  // Data fetching with useCollection for real-time updates
  const vehiclesQuery = useMemoFirebase(() => firestore ? collection(firestore, 'vehicles') : null, [firestore]);
  const { data: vehicles, loading: vehiclesLoading } = useCollection<Vehicle>(vehiclesQuery);
  const transfersQuery = useMemoFirebase(() => firestore ? collection(firestore, 'transfers') : null, [firestore]);
  const { data: transfers, loading: transfersLoading } = useCollection<Transfer>(transfersQuery);

  // Sorting state
  type VehicleSortOption = 'order' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';
  const [vehicleSort, setVehicleSort] = useState<VehicleSortOption>('order');
  type TransferSortOption = 'order' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';
  const [transferSort, setTransferSort] = useState<TransferSortOption>('order');
  
  // Drag-and-drop state
  const [draggingVehicleIndex, setDraggingVehicleIndex] = useState<number | null>(null);
  const [draggingTransferIndex, setDraggingTransferIndex] = useState<number | null>(null);

  // Forms
  const vehicleForm = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: { name: "", price: 0, capacity: 1, imageUrls: [], featureKeys: [], isFeatured: false, displayOrder: 0 },
  });

  const transferForm = useForm<TransferFormValues>({
    resolver: zodResolver(transferSchema),
    defaultValues: {
      serviceType: 'intercity',
      title_ru: "",
      title_en: "",
      city: "",
      from: "",
      to: "",
      description_ru: "",
      description_en: "",
      duration: "",
      distance: undefined,
      prices: [],
      isFeatured: false,
      displayOrder: 0,
    },
  });

  // Dialog states
  const [editingVehicleId, setEditingVehicleId] = useState<string | null>(null);
  const [isVehicleFormOpen, setIsVehicleFormOpen] = useState(false);
  const [editingTransferId, setEditingTransferId] = useState<string | null>(null);
  const [isTransferFormOpen, setIsTransferFormOpen] = useState(false);
  const [isVehicleSelectorOpen, setIsVehicleSelectorOpen] = useState(false);
  const [editingVehicleCategory, setEditingVehicleCategory] = useState<{key: string; label: string} | null>(null);

  // Memoized sorted data
  const sortedVehicles = useMemo(() => {
      if (!vehicles) return [];
      const sorted = [...vehicles];
      switch (vehicleSort) {
          case 'price-asc': return sorted.sort((a, b) => a.price - b.price);
          case 'price-desc': return sorted.sort((a, b) => b.price - a.price);
          case 'name-asc': return sorted.sort((a, b) => a.name.localeCompare(b.name));
          case 'name-desc': return sorted.sort((a, b) => b.name.localeCompare(a.name));
          case 'order': default: return sorted.sort((a, b) => (a.displayOrder ?? 999) - (b.displayOrder ?? 999));
      }
  }, [vehicles, vehicleSort]);

  const sortedTransfers = useMemo(() => {
      if (!transfers) return [];
      
      const getMinPrice = (transfer: Transfer) => {
        if (!transfer.prices || transfer.prices.length === 0) return Infinity;
        const validPrices = transfer.prices.filter(p => p.price > 0).map(p => p.price);
        if (validPrices.length === 0) return Infinity; // Treat as most expensive if no valid price
        return Math.min(...validPrices);
      };

      const sorted = [...transfers];
      switch (transferSort) {
          case 'price-asc': return sorted.sort((a, b) => getMinPrice(a) - getMinPrice(b));
          case 'price-desc': return sorted.sort((a, b) => getMinPrice(b) - getMinPrice(a));
          case 'name-asc': return sorted.sort((a, b) => a.title_ru.localeCompare(b.title_ru));
          case 'name-desc': return sorted.sort((a, b) => b.title_ru.localeCompare(a.title_ru));
          case 'order': default: return sorted.sort((a, b) => (a.displayOrder ?? 999) - (b.displayOrder ?? 999));
      }
  }, [transfers, transferSort]);


  const vehiclesByCategory = useMemo(() => {
    if (!vehicles) return {};
    return vehicles.reduce((acc, vehicle) => {
        (acc[vehicle.category] = acc[vehicle.category] || []).push(vehicle);
        return acc;
    }, {} as Record<string, Vehicle[]>);
  }, [vehicles]);


  // Effects to reset forms when dialogs close or data changes
  useEffect(() => {
    if (editingVehicleId && vehicles) {
      const vehicleToEdit = vehicles.find(v => v.id === editingVehicleId);
      if (vehicleToEdit) vehicleForm.reset({ ...vehicleToEdit });
    } else {
        vehicleForm.reset({ name: "", price: 0, capacity: 1, imageUrls: [], featureKeys: [], isFeatured: false, displayOrder: 0 });
    }
  }, [editingVehicleId, vehicles, vehicleForm]);

  useEffect(() => {
    if (editingTransferId && transfers) {
        const transferToEdit = transfers.find(t => t.id === editingTransferId);
        if (transferToEdit) transferForm.reset({ ...transferToEdit });
    } else {
        transferForm.reset({
          serviceType: 'intercity', title_ru: "", title_en: "", city: "", from: "", to: "", description_ru: "", description_en: "", duration: "", distance: undefined, prices: [], isFeatured: false, displayOrder: 0
        });
    }
  }, [editingTransferId, transfers, transferForm]);


  // Submit handlers
  const onVehicleSubmit = (data: VehicleFormValues) => {
    if (!firestore || !vehicles) return;
    if (editingVehicleId) {
        updateVehicle(firestore, editingVehicleId, data);
        toast({ title: "✅ Автомобиль обновлен", description: `Данные для "${data.name}" сохранены.` });
    } else {
        const maxOrder = Math.max(0, ...vehicles.map(v => v.displayOrder || 0));
        addVehicle(firestore, { ...data, displayOrder: maxOrder + 1 });
        toast({ title: "✅ Автомобиль добавлен", description: `Модель "${data.name}" добавлена в автопарк.` });
    }
    setIsVehicleFormOpen(false);
    setEditingVehicleId(null);
  };
  
  const onTransferSubmit = (data: TransferFormValues) => {
    if (!firestore || !transfers) return;
    const dataToSubmit = {
        ...data,
        city: data.serviceType !== 'intercity' ? data.city : '',
        from: data.serviceType === 'intercity' ? data.from : '',
        to: data.serviceType === 'intercity' ? data.to : '',
    };
    if (editingTransferId) {
        updateTransfer(firestore, editingTransferId, dataToSubmit);
        toast({ title: "✅ Трансфер обновлен", description: `Данные для "${data.title_ru}" сохранены.` });
    } else {
        const maxOrder = Math.max(0, ...transfers.map(t => t.displayOrder || 0));
        addTransfer(firestore, { ...dataToSubmit, displayOrder: maxOrder + 1 });
        toast({ title: "✅ Трансфер добавлен", description: `Маршрут "${data.title_ru}" добавлен.` });
    }
    setIsTransferFormOpen(false);
    setEditingTransferId(null);
  };

  const handleLogout = async () => {
    await signOutUser();
    toast({ title: "Вы вышли из системы." });
  };

    // --- Drag and Drop Handlers ---
  const handleDragOver = (e: React.DragEvent<HTMLTableRowElement>) => e.preventDefault();

  const createDropHandler = (
    collectionName: 'vehicles' | 'transfers',
    list: any[],
    draggingIndex: number | null,
    setDraggingIndex: (index: number | null) => void
  ) => async (droppedOnIndex: number) => {
      if (draggingIndex === null || draggingIndex === droppedOnIndex) {
          setDraggingIndex(null);
          return;
      }
      
      if (!list || !firestore) return;

      let itemsToUpdate = [...list];
      const [draggedItem] = itemsToUpdate.splice(draggingIndex, 1);
      itemsToUpdate.splice(droppedOnIndex, 0, draggedItem);

      const batch = writeBatch(firestore);
      itemsToUpdate.forEach((item, index) => {
          if (item.displayOrder !== index) {
              const docRef = doc(firestore, collectionName, item.id);
              batch.update(docRef, { displayOrder: index });
          }
      });

      try {
          await batch.commit();
          toast({ title: `Порядок обновлен` });
      } catch (err) {
          console.error(`Failed to reorder ${collectionName}:`, err);
          toast({ variant: 'destructive', title: "Ошибка при обновлении порядка" });
      } finally {
          setDraggingIndex(null);
      }
  };
  
  const handleVehicleDrop = createDropHandler('vehicles', sortedVehicles, draggingVehicleIndex, setDraggingVehicleIndex);
  const handleTransferDrop = createDropHandler('transfers', sortedTransfers, draggingTransferIndex, setDraggingTransferIndex);

  
  // Dialog and form open/close handlers
  const handleEditVehicle = (vehicle: Vehicle) => { setEditingVehicleId(vehicle.id); setIsVehicleFormOpen(true); };
  const handleAddNewVehicle = () => { setEditingVehicleId(null); setIsVehicleFormOpen(true); };
  const handleDeleteVehicle = (vehicleId: string) => { if (firestore) deleteVehicle(firestore, vehicleId); toast({ variant: 'destructive', title: "🗑️ Автомобиль удален"});};
  const onVehicleFormOpenChange = (open: boolean) => { setIsVehicleFormOpen(open); if (!open) setEditingVehicleId(null); };

  const handleEditTransfer = (transfer: Transfer) => { setEditingTransferId(transfer.id); setIsTransferFormOpen(true); };
  const handleAddNewTransfer = () => { setEditingTransferId(null); setIsTransferFormOpen(true); };
  const handleDeleteTransfer = (transferId: string) => { if (firestore) deleteTransfer(firestore, transferId); toast({ variant: 'destructive', title: "🗑️ Трансфер удален"}); };
  const onTransferFormOpenChange = (open: boolean) => { setIsTransferFormOpen(open); if (!open) setEditingTransferId(null); };
  
  const watchedPrices = transferForm.watch('prices');
  const watchedServiceType = transferForm.watch('serviceType');
  
  const getMinTransferPriceForDisplay = (t: Transfer) => {
    if (!t.prices || t.prices.length === 0) return 0;
    const validPrices = t.prices.filter(p => p.price > 0).map(p => p.price);
    if (validPrices.length === 0) return 0;
    return Math.min(...validPrices);
  };

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
                            <div className="grid md:grid-cols-2 gap-6">
                                <FormField control={transferForm.control} name="title_ru" render={({ field }) => (
                                    <FormItem><FormLabel>{t('admin.titleRuLabel')}</FormLabel><FormControl><Input placeholder={t('admin.titlePlaceholder')} {...field} /></FormControl><FormMessage /></FormItem>
                                )} />
                                <FormField control={transferForm.control} name="title_en" render={({ field }) => (
                                    <FormItem><FormLabel>{t('admin.titleEnLabel')}</FormLabel><FormControl><Input placeholder="e.g., Khiva to Urgench Airport" {...field} /></FormControl><FormMessage /></FormItem>
                                )} />
                            </div>

                            <FormField control={transferForm.control} name="serviceType" render={({ field }) => (
                                <FormItem><FormLabel>{t('admin.serviceTypeLabel')}</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl><SelectTrigger><SelectValue placeholder={t('admin.serviceTypeLabel')} /></SelectTrigger></FormControl>
                                <SelectContent>
                                    {Object.entries(serviceTypesMap).map(([key, value]) => (
                                        <SelectItem key={key} value={key}>{value.ru}</SelectItem>
                                    ))}
                                </SelectContent>
                                </Select>
                                <FormMessage /></FormItem>
                            )} />

                            {watchedServiceType === 'intercity' && (
                                <div className="grid md:grid-cols-2 gap-6">
                                    <FormField control={transferForm.control} name="from" render={({ field }) => (
                                        <FormItem><FormLabel>{t('admin.fromLabel')}</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl><SelectTrigger><SelectValue placeholder={t('admin.fromPlaceholder')} /></SelectTrigger></FormControl>
                                            <SelectContent>
                                                {locations.map(loc => <SelectItem key={loc.id} value={loc.id}>{loc.name_ru}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage /></FormItem>
                                    )} />
                                    <FormField control={transferForm.control} name="to" render={({ field }) => (
                                        <FormItem><FormLabel>{t('admin.toLabel')}</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl><SelectTrigger><SelectValue placeholder={t('admin.toPlaceholder')} /></SelectTrigger></FormControl>
                                            <SelectContent>
                                                {locations.map(loc => <SelectItem key={loc.id} value={loc.id}>{loc.name_ru}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage /></FormItem>
                                    )} />
                                </div>
                            )}

                            {(watchedServiceType === 'meet_and_greet' || watchedServiceType === 'excursion') && (
                                <FormField control={transferForm.control} name="city" render={({ field }) => (
                                    <FormItem><FormLabel>{t('admin.cityLabel')}</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl><SelectTrigger><SelectValue placeholder={t('admin.cityLabel')} /></SelectTrigger></FormControl>
                                        <SelectContent>
                                            {locations.map(loc => <SelectItem key={loc.id} value={loc.id}>{loc.name_ru}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage /></FormItem>
                                )} />
                            )}

                             <div className="grid md:grid-cols-2 gap-6">
                                <FormField control={transferForm.control} name="description_ru" render={({ field }) => (
                                    <FormItem><FormLabel>{t('admin.descriptionRuLabel')}</FormLabel><FormControl><Textarea placeholder="Дополнительная информация на русском..." {...field} /></FormControl><FormMessage /></FormItem>
                                )} />
                                <FormField control={transferForm.control} name="description_en" render={({ field }) => (
                                    <FormItem><FormLabel>{t('admin.descriptionEnLabel')}</FormLabel><FormControl><Textarea placeholder="Additional information in English..." {...field} /></FormControl><FormMessage /></FormItem>
                                )} />
                             </div>
                            
                            <div className="grid md:grid-cols-2 gap-6">
                                <FormField control={transferForm.control} name="duration" render={({ field }) => (
                                    <FormItem><FormLabel>{t('admin.durationLabel')}</FormLabel><FormControl><Input placeholder={t('admin.durationPlaceholder')} {...field} value={field.value || ''} /></FormControl><FormMessage /></FormItem>
                                )} />
                                <FormField control={transferForm.control} name="distance" render={({ field }) => (
                                    <FormItem><FormLabel>{t('admin.distanceLabel')}</FormLabel><FormControl><Input type="number" placeholder={t('admin.distancePlaceholder')} {...field} value={field.value || ''} onChange={e => field.onChange(e.target.value === '' ? undefined : parseInt(e.target.value, 10))} /></FormControl><FormMessage /></FormItem>
                                )} />
                            </div>

                            <FormItem>
                                <FormLabel>{t('admin.pricesLabel')}</FormLabel>
                                <div className='space-y-4 rounded-lg border p-4 max-h-72 overflow-y-auto'>
                                    {Object.entries(vehicleCategoryMap).map(([categoryKey, categoryLabel]) => {
                                        const priceInfoIndex = watchedPrices.findIndex(p => p.category === categoryKey);
                                        const currentPrice = priceInfoIndex !== -1 ? watchedPrices[priceInfoIndex] : null;
                                        const category = categoryKey as keyof typeof vehicleCategoryMap;
                                        return (
                                            <div key={category} className='space-y-3'>
                                                <div className='flex items-center gap-4'>
                                                    <Checkbox
                                                        id={`price-enabled-${category}`}
                                                        checked={!!currentPrice}
                                                        onCheckedChange={checked => {
                                                            const currentPrices = transferForm.getValues('prices');
                                                            if (checked) {
                                                                transferForm.setValue('prices', [...currentPrices, { category: category, price: 0, vehicleIds: [] }], { shouldDirty: true, shouldValidate: true });
                                                            } else {
                                                                transferForm.setValue('prices', currentPrices.filter(p => p.category !== category), { shouldDirty: true, shouldValidate: true });
                                                            }
                                                        }}
                                                    />
                                                    <label htmlFor={`price-enabled-${category}`} className='font-medium min-w-[200px]'>{categoryLabel}</label>
                                                </div>
                                                {!!currentPrice && priceInfoIndex !== -1 && (
                                                   <div className='flex items-center gap-2 pl-8'>
                                                        <Input
                                                            type="number"
                                                            placeholder="Цена"
                                                            defaultValue={currentPrice.price > 0 ? currentPrice.price : ''}
                                                            onChange={e => {
                                                                const newPrice = e.target.value === '' ? 0 : parseFloat(e.target.value);
                                                                const newPrices = transferForm.getValues('prices').map(p => p.category === category ? { ...p, price: newPrice } : p);
                                                                transferForm.setValue('prices', newPrices, { shouldValidate: true });
                                                            }}
                                                            className='max-w-[150px]'
                                                        />
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            className="shrink-0 font-normal"
                                                            onClick={() => {
                                                                setEditingVehicleCategory({ key: categoryKey, label: categoryLabel });
                                                                setIsVehicleSelectorOpen(true);
                                                            }}
                                                        >
                                                            Машины ({currentPrice.vehicleIds?.length || 0})
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>
                                <FormMessage>{transferForm.formState.errors.prices?.message || transferForm.formState.errors.prices?.root?.message}</FormMessage>
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
      
        {/* Vehicle Selector Dialog */}
        <Dialog open={isVehicleSelectorOpen} onOpenChange={setIsVehicleSelectorOpen}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Выберите автомобили</DialogTitle>
                    <DialogDescriptionComponent>
                        Для тарифа "{editingVehicleCategory?.label}"
                    </DialogDescriptionComponent>
                </DialogHeader>
                {editingVehicleCategory && (
                    <div className="pt-4">
                        {(() => {
                            const prices = transferForm.getValues('prices');
                            const priceInfoIndex = prices.findIndex(p => p.category === editingVehicleCategory.key);

                            if (priceInfoIndex === -1) {
                                return <p className="text-sm text-muted-foreground">Сначала активируйте этот тариф и сохраните, чтобы выбрать машины.</p>;
                            }

                            return (
                                <FormField
                                    control={transferForm.control}
                                    name={`prices.${priceInfoIndex}.vehicleIds`}
                                    render={({ field }) => {
                                        const selectedVehicleIds = field.value || [];
                                        const availableVehicles = vehiclesByCategory[editingVehicleCategory.key] || [];
                                        
                                        return (
                                            <div className="grid gap-3 max-h-80 overflow-y-auto pr-4">
                                                {availableVehicles.length > 0 ? (
                                                    availableVehicles.map((vehicle) => (
                                                        <div
                                                            key={vehicle.id}
                                                            className="flex items-center space-x-3 p-3 rounded-md hover:bg-muted"
                                                        >
                                                            <Checkbox
                                                                id={`selector-${vehicle.id}`}
                                                                checked={selectedVehicleIds.includes(vehicle.id)}
                                                                onCheckedChange={(checked) => {
                                                                    const newIds = checked
                                                                        ? [...selectedVehicleIds, vehicle.id]
                                                                        : selectedVehicleIds.filter(id => id !== vehicle.id);
                                                                    field.onChange(newIds);
                                                                }}
                                                            />
                                                            <label
                                                                htmlFor={`selector-${vehicle.id}`}
                                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-grow"
                                                            >
                                                                {vehicle.name}
                                                            </label>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p className='text-sm text-muted-foreground'>Нет машин в этой категории.</p>
                                                )}
                                            </div>
                                        );
                                    }}
                                />
                            );
                        })()}
                    </div>
                )}
                <DialogFooter>
                    <Button onClick={() => setIsVehicleSelectorOpen(false)}>Готово</Button>
                </DialogFooter>
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
                        <div className='flex items-center gap-4'>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">
                                    <ArrowUpDown className="mr-2 h-4 w-4" />
                                    Сортировка
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuRadioGroup value={vehicleSort} onValueChange={(v) => setVehicleSort(v as VehicleSortOption)}>
                                        <DropdownMenuRadioItem value="order">По порядку</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="price-asc">Цена (возр.)</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="price-desc">Цена (убыв.)</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="name-asc">Название (А-Я)</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="name-desc">Название (Я-А)</DropdownMenuRadioItem>
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <Button onClick={handleAddNewVehicle}>
                                <PlusCircle className="mr-2 h-4 w-4" />
                                {t('admin.addButton')}
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {vehiclesLoading ? (
                        <div className="flex items-center justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
                    ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className='w-[60px] pl-4'>Порядок</TableHead>
                                <TableHead className='w-[80px]'>{t('admin.table.isFeatured')}</TableHead>
                                <TableHead>{t('admin.table.name')}</TableHead>
                                <TableHead>{t('admin.table.category')}</TableHead>
                                <TableHead className="text-right">{t('admin.table.price')}</TableHead>
                                <TableHead className="text-right">{t('admin.table.capacity')}</TableHead>
                                <TableHead className="text-right">{t('admin.table.actions')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                        {sortedVehicles.map((vehicle, index) => (
                            <TableRow 
                                key={vehicle.id}
                                draggable={vehicleSort === 'order'}
                                onDragStart={(e) => {
                                    setDraggingVehicleIndex(index);
                                    e.dataTransfer.effectAllowed = 'move';
                                }}
                                onDragOver={handleDragOver}
                                onDrop={() => handleVehicleDrop(index)}
                                onDragEnd={() => setDraggingVehicleIndex(null)}
                                className={cn('transition-opacity', draggingVehicleIndex === index && 'opacity-30')}
                            >
                                <TableCell className='pl-4'>
                                    {vehicleSort === 'order' ? (
                                        <div className="flex items-center justify-center cursor-grab active:cursor-grabbing">
                                            <GripVertical className="h-5 w-5 text-muted-foreground" />
                                        </div>
                                    ) : null}
                                </TableCell>
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
                        <div className="flex items-center gap-4">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">
                                    <ArrowUpDown className="mr-2 h-4 w-4" />
                                    Сортировка
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuRadioGroup value={transferSort} onValueChange={(v) => setTransferSort(v as TransferSortOption)}>
                                        <DropdownMenuRadioItem value="order">По порядку</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="price-asc">Цена (возр.)</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="price-desc">Цена (убыв.)</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="name-asc">Название (А-Я)</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="name-desc">Название (Я-А)</DropdownMenuRadioItem>
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <Button onClick={handleAddNewTransfer}>
                                <PlusCircle className="mr-2 h-4 w-4" />
                                {t('admin.addButton')}
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {transfersLoading ? (
                        <div className="flex items-center justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
                    ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className='w-[60px] pl-4'>Порядок</TableHead>
                                <TableHead className='w-[80px]'>{t('admin.table.isFeatured')}</TableHead>
                                <TableHead>{t('admin.table.title')}</TableHead>
                                <TableHead>{t('admin.table.route')}</TableHead>
                                <TableHead>{t('admin.table.duration')}</TableHead>
                                <TableHead>{t('admin.table.distance')}</TableHead>
                                <TableHead className="text-right">{t('admin.table.price')}</TableHead>
                                <TableHead className="text-right">{t('admin.table.actions')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                        {sortedTransfers.map((transfer, index) => {
                            const minPrice = getMinTransferPriceForDisplay(transfer);
                            return (
                                <TableRow 
                                    key={transfer.id}
                                    draggable={transferSort === 'order'}
                                    onDragStart={(e) => {
                                        setDraggingTransferIndex(index);
                                        e.dataTransfer.effectAllowed = 'move';
                                    }}
                                    onDragOver={handleDragOver}
                                    onDrop={() => handleTransferDrop(index)}
                                    onDragEnd={() => setDraggingTransferIndex(null)}
                                    className={cn('transition-opacity', draggingTransferIndex === index && 'opacity-30')}
                                >
                                    <TableCell className='pl-4'>
                                        {transferSort === 'order' ? (
                                            <div className="flex items-center justify-center cursor-grab active:cursor-grabbing">
                                                <GripVertical className="h-5 w-5 text-muted-foreground" />
                                            </div>
                                        ) : null}
                                    </TableCell>
                                    <TableCell>{transfer.isFeatured && <Star className="h-5 w-5 text-amber-500 fill-amber-500" />}</TableCell>
                                    <TableCell className="font-medium">{transfer.title_ru}</TableCell>
                                    <TableCell>
                                        {transfer.serviceType === 'intercity' ? `${transfer.from} → ${transfer.to}` : transfer.city}
                                    </TableCell>
                                    <TableCell>{transfer.duration ? `${transfer.duration} ч.` : '—'}</TableCell>
                                    <TableCell>{transfer.distance ? `${transfer.distance} км` : '—'}</TableCell>
                                    <TableCell className="text-right">
                                        {minPrice > 0 ? `$${minPrice}` : t('vehicleDetail.negotiablePrice')}
                                    </TableCell>
                                    <TableCell className="text-right">
                                    <div className="flex gap-2 justify-end">
                                        <Button variant="outline" size="icon" onClick={() => handleEditTransfer(transfer)}><FilePenLine className="h-4 w-4" /></Button>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild><Button variant="destructive" size="icon"><Trash2 className="h-4 w-4" /></Button></AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>{t('admin.deleteConfirmTitle')}</AlertDialogTitle>
                                                    <AlertDialogDescription>{t('admin.deleteConfirmDescription', { name: transfer.title_ru })}</AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>{t('admin.deleteConfirmCancel')}</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => handleDeleteTransfer(transfer.id)}>{t('admin.deleteConfirmAction')}</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
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
