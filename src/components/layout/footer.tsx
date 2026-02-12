"use client";

import { useTranslation } from "@/hooks/useTranslation";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-background border-t">
      <div className="container py-8">
        <p className="text-center text-sm text-muted-foreground">
          &copy; 2019-2026 {t('footer.copyright')}
        </p>
      </div>
    </footer>
  );
}
