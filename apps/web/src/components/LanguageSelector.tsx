'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { useTransition } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const localeNames: Record<string, string> = {
  en: 'EN',
  de: 'DE'
};

const locales = ['en', 'de'] as const;

export const LanguageSelector = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const [isPending, startTransition] = useTransition();

  const handleChange = (newLocale: string) => {
    if (newLocale === currentLocale) return;

    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        disabled={isPending}
        className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 text-gray-900 rounded cursor-pointer transition-colors disabled:opacity-50 outline-none focus:outline-none focus-visible:outline-none border-none"
      >
        <span className="text-sm font-medium">{localeNames[currentLocale]}</span>
        <ChevronDown className="w-4 h-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white border-gray-200 min-w-20">
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => handleChange(locale)}
            className="text-gray-900 cursor-pointer hover:bg-gray-100 focus:bg-gray-100 outline-none focus:outline-none focus-visible:outline-none"
          >
            {localeNames[locale]}
            {locale === currentLocale && (
              <span className="ml-auto text-[#e31337]">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
