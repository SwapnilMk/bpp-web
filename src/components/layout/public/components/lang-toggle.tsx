import { Globe, Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function LanguageToggle() {
  const { i18n } = useTranslation()

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language)
  }

  const currentLanguage = i18n.language

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' className='ghost mx-2 flex gap-1'>
          <Globe size={18} />
          <span>{currentLanguage.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {[
          { code: 'en', label: 'English (English)' },
          { code: 'hi', label: 'Hindi (हिंदी)' },
          { code: 'mr', label: 'Marathi (मराठी)' },
          // { code: 'ta', label: 'Tamil (தமிழ்)' },
          // { code: 'te', label: 'Telugu (తెలుగు)' },
          // { code: 'bn', label: 'Bengali (বাংলা)' },
          // { code: 'pa', label: 'Punjabi (ਪੰਜਾਬੀ)' },
          // { code: 'gu', label: 'Gujarati (ગુજરાતી)' },
          // { code: 'kn', label: 'Kannada (ಕನ್ನಡ)' },
          // { code: 'ml', label: 'Malayalam (മലയാളം)' },
          // { code: 'or', label: 'Oriya (ଓଡ଼ିଆ)' },
        ].map(({ code, label }) => (
          <DropdownMenuItem key={code} onClick={() => changeLanguage(code)}>
            {currentLanguage === code && <Check className='h-5 w-5' />}
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
