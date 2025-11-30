'use client'

import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'

export interface LoginModalConfig {
  appName: string
  appDescription: string
  translations?: {
    title?: string
    description?: string
    usernamePlaceholder?: string
    chooseMethod?: string
    cancel?: string
    scanQRCode?: string
    loadingQRCode?: string
  }
  keychainEnabled?: boolean
  hiveAuthEnabled?: boolean
  discordEnabled?: boolean
  onKeychainLogin?: (username: string, signature: string, message: string) => Promise<void> | void
  onHiveAuthLogin?: (username: string, session: HiveAuthSession, signature?: string, message?: string) => Promise<void> | void
  onDiscordLogin?: () => void
}

export interface HiveAuthSession {
  token: string
  key: string
  expire: number
}

interface LoginModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  config: LoginModalConfig
  // Pass through UI components from the consuming app
  Dialog: any
  DialogContent: any
  DialogHeader: any
  DialogTitle: any
  DialogDescription: any
  Button: any
  Input: any
  toast: any
}

declare global {
  interface Window {
    hive_keychain?: {
      requestSignBuffer: (
        username: string,
        message: string,
        method: string,
        callback: (result: any) => void
      ) => void
    }
  }
}

export function LoginModal({
  open,
  onOpenChange,
  config,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Button,
  Input,
  toast,
}: LoginModalProps) {
  const [hiveUsername, setHiveUsername] = useState('')
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [showHiveAuth, setShowHiveAuth] = useState(false)
  const [qrCode, setQrCode] = useState<string | null>(null)

  const {
    appName,
    appDescription,
    translations = {},
    keychainEnabled = true,
    hiveAuthEnabled = true,
    discordEnabled = false,
    onKeychainLogin,
    onHiveAuthLogin,
    onDiscordLogin,
  } = config

  const t = {
    title: translations.title || 'Sign in',
    description: translations.description || 'Enter your Hive username and choose your preferred authentication method.',
    usernamePlaceholder: translations.usernamePlaceholder || 'Enter your Hive username',
    chooseMethod: translations.chooseMethod || 'Choose method',
    cancel: translations.cancel || 'Cancel',
    scanQRCode: translations.scanQRCode || 'Scan the QR code with your HiveAuth mobile app',
    loadingQRCode: translations.loadingQRCode || 'Loading QR code...',
  }

  const handleKeychainLogin = async () => {
    if (!hiveUsername.trim() || isAuthenticating) {
      if (!hiveUsername.trim()) toast.error('Please enter your Hive username')
      return
    }

    // Check if Keychain is available
    if (typeof window !== 'undefined' && window.hive_keychain) {
      setIsAuthenticating(true)

      const message = `Login to ${appName} | ${Date.now()}`

      window.hive_keychain.requestSignBuffer(
        hiveUsername,
        message,
        'Posting',
        async (result: any) => {
          setIsAuthenticating(false)
          if (result.success) {
            if (onKeychainLogin) {
              await onKeychainLogin(hiveUsername, result.result, message)
            }
            onOpenChange(false)
            setHiveUsername('')
          } else if (!result.cancel) {
            toast.error(result.message || 'Keychain signature failed')
          }
        }
      )
    } else {
      toast.error('Keychain Required', {
        description: 'Please install and enable Hive Keychain extension.',
        action: {
          label: 'Install Keychain',
          onClick: () => {
            window.open('https://chrome.google.com/webstore/detail/hive-keychain/jcacnejopjdphbnjgfaaobbfafkihpep', '_blank')
          }
        }
      })
    }
  }

  const handleHiveAuthLogin = async () => {
    if (!hiveUsername.trim() || isAuthenticating) {
      if (!hiveUsername.trim()) toast.error('Please enter your Hive username')
      return
    }

    setIsAuthenticating(true)
    setShowHiveAuth(true)

    try {
      // @ts-ignore - hive-auth-wrapper doesn't have types
      const HASModule = await import('hive-auth-wrapper')
      const HAS = HASModule.default

      const hasServer = 'wss://hive-auth.arcange.eu'
      HAS.setOptions({ host: hasServer })

      const APP_META = {
        name: appName,
        description: appDescription,
        icon: undefined
      }

      let capturedKey = ''

      // Prepare challenge data
      const message = `Login to ${appName} | ${Date.now()}`
      const challenge_data = {
        key_type: 'posting',
        challenge: message
      }

      await HAS.authenticate(
        { username: hiveUsername },
        APP_META,
        challenge_data,
        (data: any) => {
          capturedKey = data.key

          // Generate QR code
          const qrData = `has://auth_req/${btoa(JSON.stringify({
            account: hiveUsername,
            uuid: data.uuid,
            key: data.key,
            host: hasServer
          }))}`

          setQrCode(qrData)
          setIsAuthenticating(false)
        }
      ).then(async (result: any) => {
        setQrCode(null)
        setShowHiveAuth(false)

        if (result.data) {
          const hiveAuthSession: HiveAuthSession = {
            token: result.data.token,
            key: capturedKey,
            expire: result.data.expire
          }

          let signature: string | undefined
          if (result.data?.challenge) {
            signature = result.data.challenge.challenge
          }

          if (onHiveAuthLogin) {
            await onHiveAuthLogin(hiveUsername, hiveAuthSession, signature, message)
          }

          onOpenChange(false)
          setHiveUsername('')
        }
      }).catch((error: any) => {
        setQrCode(null)
        setIsAuthenticating(false)
        setShowHiveAuth(false)

        if (error.message !== 'Canceled' && error.message !== 'canceled') {
          toast.error('HiveAuth authentication failed')
        }
      })
    } catch (error) {
      setQrCode(null)
      setIsAuthenticating(false)
      setShowHiveAuth(false)
      toast.error('Failed to initialize HiveAuth')
    }
  }

  const handleCancelHiveAuth = () => {
    setShowHiveAuth(false)
    setQrCode(null)
    setIsAuthenticating(false)
  }

  const handleDiscordLogin = () => {
    if (onDiscordLogin) {
      onDiscordLogin()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{t.title}</DialogTitle>
          <DialogDescription className="text-base">
            {showHiveAuth ? t.scanQRCode : t.description}
          </DialogDescription>
        </DialogHeader>

        {showHiveAuth ? (
          <div className="space-y-6 mt-2">
            {qrCode && (
              <div className="flex flex-col items-center gap-4">
                <a
                  href={qrCode}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={(e) => {
                    // On desktop, prevent default and show a message
                    if (!/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
                      e.preventDefault()
                      toast.error('Please scan the QR code with your mobile device')
                    }
                    // On mobile, let the deeplink work
                  }}
                >
                  <div className="bg-white p-4 rounded-lg">
                    <QRCodeSVG
                      value={qrCode}
                      size={256}
                      level="H"
                      bgColor="#ffffff"
                      fgColor="#000000"
                    />
                  </div>
                </a>
              </div>
            )}

            {/* Cancel Button */}
            <Button
              onClick={handleCancelHiveAuth}
              variant="outline"
              className="w-full"
            >
              {t.cancel}
            </Button>
          </div>
        ) : (
          <div className="space-y-6 mt-2">
            {/* Username Input */}
            <div>
              <Input
                id="hive-username"
                type="text"
                placeholder={t.usernamePlaceholder}
                value={hiveUsername}
                onChange={(e: any) => setHiveUsername(e.target.value)}
                onKeyDown={(e: any) => {
                  if (e.key === 'Enter' && hiveUsername.trim()) {
                    handleKeychainLogin()
                  }
                }}
                autoComplete="off"
                className="h-12 text-base"
              />
            </div>

            {/* Authentication Methods */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-muted-foreground">
                {t.chooseMethod}
              </p>

              {/* Keychain Button */}
              {keychainEnabled && (
                <Button
                  onClick={handleKeychainLogin}
                  disabled={!hiveUsername.trim() || isAuthenticating}
                  className="w-full h-auto p-0 overflow-hidden bg-card hover:bg-accent border-2 border-border hover:border-primary transition-all duration-200"
                  variant="outline"
                >
                  <div className="w-full py-3 px-6 flex items-center justify-center">
                    <img
                      src="/keychain.png"
                      alt="Keychain"
                      width={180}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                </Button>
              )}

              {/* HiveAuth Button */}
              {hiveAuthEnabled && (
                <Button
                  onClick={handleHiveAuthLogin}
                  disabled={!hiveUsername.trim() || isAuthenticating}
                  className="w-full h-auto p-0 overflow-hidden bg-card hover:bg-accent border-2 border-border hover:border-red-500 transition-all duration-200"
                  variant="outline"
                >
                  <div className="w-full py-3 px-6 flex items-center justify-center">
                    <img
                      src="/hiveauth.svg"
                      alt="HiveAuth"
                      width={180}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                </Button>
              )}

              {/* Discord Button */}
              {discordEnabled && (
                <Button
                  onClick={handleDiscordLogin}
                  disabled={isAuthenticating}
                  className="w-full h-auto py-3 px-6 bg-[#5865F2] hover:bg-[#4752C4] text-white transition-all duration-200"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515a.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0a12.64 12.64 0 00-.617-1.25a.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057a19.9 19.9 0 005.993 3.03a.078.078 0 00.084-.028a14.09 14.09 0 001.226-1.994a.076.076 0 00-.041-.106a13.107 13.107 0 01-1.872-.892a.077.077 0 01-.008-.128a10.2 10.2 0 00.372-.292a.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127a12.299 12.299 0 01-1.873.892a.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028a19.839 19.839 0 006.002-3.03a.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                  Sign in with Discord
                </Button>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
