'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { useTransition } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fil', name: 'Filipino', flag: '🇵🇭' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  { code: 'th', name: 'ไทย', flag: '🇹🇭' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
] as const;

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

  const currentLanguage = languages.find(lang => lang.code === currentLocale) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        disabled={isPending}
        className="flex items-center gap-1.5 h-8 px-2.5 text-xs font-semibold tracking-wide bg-gray-100 text-gray-900 rounded cursor-pointer transition-colors disabled:opacity-50 outline-none focus:outline-none focus-visible:outline-none border-none hover:bg-gray-200"
        title="Change Language"
      >
        <span>{currentLanguage.flag}</span>
        <span>{currentLocale.toUpperCase()}</span>
        <ChevronDown className="h-3 w-3 opacity-50" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52 p-1.5 bg-white border-gray-200">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleChange(lang.code)}
            className="cursor-pointer rounded-md px-3 py-2.5 text-gray-900 hover:bg-gray-100 focus:bg-gray-100 outline-none focus:outline-none focus-visible:outline-none"
          >
            <span className="mr-3 text-base leading-none">{lang.flag}</span>
            <div className="flex flex-1 items-baseline gap-2">
              <span className="font-medium">{lang.name}</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                {lang.code}
              </span>
            </div>
            {currentLocale === lang.code && (
              <Check className="h-3.5 w-3.5 text-[#e31337] ml-2" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
