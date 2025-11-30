'use client'

import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/lib/auth'
import { toast } from 'sonner'
import { useTranslations } from 'next-intl'
import { LoginModal as SharedLoginModal, type HiveAuthSession } from '@hiveio/auth-components'
import { cn } from '@/lib/utils'

interface LoginModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Styled wrapper components for dark theme
const DarkDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogContent>,
  React.ComponentPropsWithoutRef<typeof DialogContent>
>(({ className, ...props }, ref) => (
  <DialogContent
    ref={ref}
    className={cn('bg-gray-900 border-gray-700', className)}
    {...props}
  />
))
DarkDialogContent.displayName = 'DarkDialogContent'

const DarkDialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogTitle>,
  React.ComponentPropsWithoutRef<typeof DialogTitle>
>(({ className, ...props }, ref) => (
  <DialogTitle
    ref={ref}
    className={cn('text-white', className)}
    {...props}
  />
))
DarkDialogTitle.displayName = 'DarkDialogTitle'

const DarkDialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogDescription>,
  React.ComponentPropsWithoutRef<typeof DialogDescription>
>(({ className, ...props }, ref) => (
  <DialogDescription
    ref={ref}
    className={cn('text-gray-400', className)}
    {...props}
  />
))
DarkDialogDescription.displayName = 'DarkDialogDescription'

const DarkInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  React.ComponentPropsWithoutRef<typeof Input>
>(({ className, ...props }, ref) => (
  <Input
    ref={ref}
    className={cn('bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500', className)}
    {...props}
  />
))
DarkInput.displayName = 'DarkInput'

const DarkButton = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentPropsWithoutRef<typeof Button>
>(({ className, variant, ...props }, ref) => (
  <Button
    ref={ref}
    variant={variant}
    className={cn(
      // Put className first so our overrides come later in merge
      className,
      // Base dark theme
      'bg-gray-800 hover:bg-gray-700 text-white border-gray-700',
      // Outline buttons - darker card background
      variant === 'outline' && 'bg-gray-800 hover:bg-gray-700 border-gray-700 text-gray-200 hover:text-white',
      // Ghost buttons
      variant === 'ghost' && 'bg-transparent hover:bg-gray-800 text-gray-300 hover:text-white',
    )}
    {...props}
  />
))
DarkButton.displayName = 'DarkButton'

export function LoginModal({ open, onOpenChange }: LoginModalProps) {
  const { login } = useAuth()
  const t = useTranslations('join.loginModal')

  const handleKeychainLogin = async (username: string) => {
    login(username)
    toast.success(`${t('welcome')} @${username}!`)
  }

  const handleHiveAuthLogin = async (username: string, session: HiveAuthSession) => {
    login(username, 'hiveauth', session)
    toast.success(`${t('welcome')} @${username}!`)
  }

  return (
    <SharedLoginModal
      open={open}
      onOpenChange={onOpenChange}
      config={{
        appName: 'Hive.io',
        appDescription: 'Create your Hive account',
        translations: {
          title: t('title'),
          description: t('description'),
          usernamePlaceholder: t('usernamePlaceholder'),
          chooseMethod: t('chooseMethod'),
          cancel: t('cancel'),
        },
        keychainEnabled: true,
        hiveAuthEnabled: true,
        discordEnabled: false,
        onKeychainLogin: handleKeychainLogin,
        onHiveAuthLogin: handleHiveAuthLogin,
      }}
      Dialog={Dialog}
      DialogContent={DarkDialogContent}
      DialogHeader={DialogHeader}
      DialogTitle={DarkDialogTitle}
      DialogDescription={DarkDialogDescription}
      Button={DarkButton}
      Input={DarkInput}
      toast={toast}
    />
  )
}
