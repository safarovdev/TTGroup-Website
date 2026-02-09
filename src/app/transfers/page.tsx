'use client';

import React from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { useTranslation } from '@/hooks/useTranslation';
import { useTransfers } from '@/hooks/useTransfers';
import { Skeleton } from '@/components/ui/skeleton';
import { TransferCard } from '@/components/transfer-card';

const TransfersPage = () => {
    const { t } = useTranslation();
    const { data: transfers, loading: transfersLoading } = useTransfers();

    return (
        <div className="flex min-h-screen flex-col bg-muted/20">
            <Header />
            <main className="flex-grow py-12 md:py-20">
                <div className="container">
                    <div className="text-center mb-12 md:mb-16">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{t('transfers.pageTitle')}</h1>
                        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                            {t('transfers.pageDescription')}
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                      {transfersLoading ? (
                          [...Array(6)].map((_, i) => (
                              <Skeleton key={i} className="h-64 w-full rounded-xl" />
                          ))
                      ) : transfers && transfers.length > 0 ? (
                          transfers.map((transfer) => (
                              <TransferCard key={transfer.id} transfer={transfer} />
                          ))
                      ) : (
                          <div className="col-span-full flex flex-col items-center justify-center text-center py-20 bg-card rounded-xl">
                              <h3 className="text-2xl font-bold tracking-tight">{t('transfers.noResultsTitle')}</h3>
                              <p className="mt-3 text-muted-foreground max-w-sm">
                                  {t('transfers.noResultsDescription')}
                              </p>
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
