'use client';

import React, { useMemo, useState } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/context/LanguageContext';
import { useTransfers } from '@/hooks/useTransfers';
import { Skeleton } from '@/components/ui/skeleton';
import { TransferCard } from '@/components/transfer-card';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Search } from 'lucide-react';
import { serviceTypesMap, locations } from '@/lib/locations';
import type { Transfer } from '@/lib/transfers';

const TransfersPage = () => {
    const { t } = useTranslation();
    const { locale } = useLanguage();
    const { data: transfers, loading: transfersLoading } = useTransfers();

    const [serviceType, setServiceType] = useState('');
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [city, setCity] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const clearFilters = () => {
        setServiceType('');
        setFrom('');
        setTo('');
        setCity('');
        setSearchTerm('');
    };

    const { filteredTransfers, fromOptions, toOptions, cityOptions } = useMemo(() => {
        if (!transfers) {
            return { filteredTransfers: [], fromOptions: [], toOptions: [], cityOptions: [] };
        }

        const lowerCaseSearchTerm = searchTerm.toLowerCase();

        // Derive filter options from all available transfers
        const allFroms = new Set<string>();
        const allTos = new Set<string>();
        const allCities = new Set<string>();

        transfers.forEach(t => {
            if (t.from) allFroms.add(t.from);
            if (t.to) allTos.add(t.to);
            if (t.city) allCities.add(t.city);
        });

        const mapToOptions = (ids: Set<string>) => {
            return Array.from(ids).map(id => ({
                id,
                name: locations.find(l => l.id === id)?.[`name_${locale}`] ?? id,
            })).sort((a,b) => a.name.localeCompare(b.name));
        };
        
        const fromOptions = mapToOptions(allFroms);
        const toOptions = mapToOptions(allTos);
        const cityOptions = mapToOptions(allCities);
        

        const filtered = transfers.filter((transfer: Transfer) => {
            const title = transfer[`title_${locale}`].toLowerCase();
            const description = (transfer[`description_${locale}`] || '').toLowerCase();
            
            if (searchTerm && !title.includes(lowerCaseSearchTerm) && !description.includes(lowerCaseSearchTerm)) {
                 return false;
            }
            if (serviceType && transfer.serviceType !== serviceType) {
                return false;
            }
            if (serviceType === 'intercity') {
                if (from && transfer.from !== from) return false;
                if (to && transfer.to !== to) return false;
            } else if (serviceType === 'meet_and_greet' || serviceType === 'excursion') {
                if (city && transfer.city !== city) return false;
            }
            return true;
        });

        return { filteredTransfers: filtered, fromOptions, toOptions, cityOptions };

    }, [transfers, searchTerm, serviceType, from, to, city, locale]);
    
    const hasActiveFilters = serviceType || from || to || city || searchTerm;

    return (
        <div className="flex min-h-screen flex-col bg-muted/20">
            <Header />
            <main className="flex-grow py-12 md:py-20">
                <div className="container">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{t('transfers.pageTitle')}</h1>
                        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                            {t('transfers.pageDescription')}
                        </p>
                    </div>

                    <Card className="p-4 md:p-6 mb-8 md:mb-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                           <div className="relative">
                               <Input 
                                   placeholder={t('transfers.searchPlaceholder')}
                                   value={searchTerm}
                                   onChange={e => setSearchTerm(e.target.value)}
                                   className="pr-8"
                               />
                               <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                           </div>
                           <Select value={serviceType} onValueChange={val => {
                               const finalVal = val === 'all' ? '' : val;
                               setServiceType(finalVal); 
                               setCity(''); 
                               setFrom(''); 
                               setTo('');
                           }}>
                               <SelectTrigger><SelectValue placeholder={t('transfers.serviceType')} /></SelectTrigger>
                               <SelectContent>
                                   <SelectItem value="all">{t('transfers.allServices')}</SelectItem>
                                   {Object.entries(serviceTypesMap).map(([key, value]) => (
                                       <SelectItem key={key} value={key}>{value[locale]}</SelectItem>
                                   ))}
                               </SelectContent>
                           </Select>

                           {serviceType === 'intercity' ? (
                               <>
                                   <Select value={from} onValueChange={val => setFrom(val === 'all' ? '' : val)}>
                                       <SelectTrigger><SelectValue placeholder={t('transfers.from')} /></SelectTrigger>
                                       <SelectContent>
                                          <SelectItem value="all">{t('transfers.from')}</SelectItem>
                                          {fromOptions.map(opt => <SelectItem key={opt.id} value={opt.id}>{opt.name}</SelectItem>)}
                                       </SelectContent>
                                   </Select>
                                   <Select value={to} onValueChange={val => setTo(val === 'all' ? '' : val)}>
                                       <SelectTrigger><SelectValue placeholder={t('transfers.to')} /></SelectTrigger>
                                       <SelectContent>
                                           <SelectItem value="all">{t('transfers.to')}</SelectItem>
                                           {toOptions.map(opt => <SelectItem key={opt.id} value={opt.id}>{opt.name}</SelectItem>)}
                                       </SelectContent>
                                   </Select>
                               </>
                           ) : serviceType === 'meet_and_greet' || serviceType === 'excursion' ? (
                               <Select value={city} onValueChange={val => setCity(val === 'all' ? '' : val)}>
                                   <SelectTrigger><SelectValue placeholder={t('transfers.city')} /></SelectTrigger>
                                   <SelectContent>
                                       <SelectItem value="all">{t('transfers.city')}</SelectItem>
                                       {cityOptions.map(opt => <SelectItem key={opt.id} value={opt.id}>{opt.name}</SelectItem>)}
                                   </SelectContent>
                               </Select>
                           ) : (
                               <div className='hidden lg:block'></div>
                           )}

                           {hasActiveFilters && (
                               <Button onClick={clearFilters} variant="ghost" className="w-full md:col-span-2 lg:col-span-1">
                                   <X className="w-4 h-4 mr-2" />
                                   {t('transfers.clearFilters')}
                               </Button>
                           )}
                        </div>
                    </Card>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                      {transfersLoading ? (
                          [...Array(6)].map((_, i) => (
                              <Skeleton key={i} className="h-64 w-full rounded-xl" />
                          ))
                      ) : filteredTransfers && filteredTransfers.length > 0 ? (
                          filteredTransfers.map((transfer) => (
                              <TransferCard key={transfer.id} transfer={transfer} />
                          ))
                      ) : (
                          <div className="col-span-full flex flex-col items-center justify-center text-center py-20 bg-card rounded-xl">
                              <h3 className="text-2xl font-bold tracking-tight">{t('transfers.noResultsTitle')}</h3>
                              <p className="mt-3 text-muted-foreground max-w-sm">
                                  {t('transfers.noResultsDescription')}
                              </p>
                              {hasActiveFilters && <Button onClick={clearFilters} className="mt-6">{t('transfers.clearFilters')}</Button>}
                          </div>
                      )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default TransfersPage;
