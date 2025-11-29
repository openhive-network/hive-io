'use client'

import { useState, useEffect, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { SOCIAL_MEDIAS } from '@/lib/data/socialmedias'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { CheckCircle, Copy, Download, Pencil, Eye, EyeOff, AlertCircle, Loader2, RefreshCw, Key } from 'lucide-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { QRCodeSVG } from 'qrcode.react'
import { toast } from 'sonner'
import { useAuth } from '@/lib/auth'
import { LoginModal } from './LoginModal'
import { generateShareableLink, decodeAccountData, type ShareableAccountData } from '@/lib/share-link'
import {
  checkAccountAvailability,
  validateAccountName,
  generatePassword,
  generateKeys,
  downloadBackupFile,
  createHiveAccount,
  getHiveChain,
  type PrivateKeys
} from '@hiveio/hive-lib'

export default function CreateHiveAccount() {
  const { user, isAuthenticated, pendingClaimedAccounts, refreshAccountInfo } = useAuth()
  const t = useTranslations('join.accountForm')
  const tButtons = useTranslations('join.buttons')
  const tSuccess = useTranslations('join.success')
  const tErrors = useTranslations('join.errors')
  const tKeys = useTranslations('join.keysModal')
  const tShare = useTranslations('join.shareDialog')
  const tNotifications = useTranslations('join.notifications')
  const tHero = useTranslations('join.hero')
  const tCommon = useTranslations('join.common')
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const [privateKeys, setPrivateKeys] = useState<PrivateKeys | null>(null)
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [acceptedBackup, setAcceptedBackup] = useState(false)
  const [showKeys, setShowKeys] = useState(false)
  const [success, setSuccess] = useState(false)
  const [isAccountValid, setIsAccountValid] = useState(false)
  const [showPassword, setShowPassword] = useState(true)
  const [isCheckingAccount, setIsCheckingAccount] = useState(false)
  const [accountError, setAccountError] = useState<string | null>(null)
  const [checkTimeout, setCheckTimeout] = useState<NodeJS.Timeout | null>(null)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [claimingAccount, setClaimingAccount] = useState(false)
  const [transactionId, setTransactionId] = useState<string | null>(null)
  const [isEditingPassword, setIsEditingPassword] = useState(false)
  const [tempPassword, setTempPassword] = useState('')
  const [backupDownloaded, setBackupDownloaded] = useState(false)
  const [showShareDialog, setShowShareDialog] = useState(false)
  const [shareableLink, setShareableLink] = useState('')
  const [hasBeenValidOnce, setHasBeenValidOnce] = useState(false)
  const [devMode, setDevMode] = useState(false)
  const [checkingAccountCreation, setCheckingAccountCreation] = useState(false)
  const [addingToKeychain, setAddingToKeychain] = useState(false)
  const [addedToKeychain, setAddedToKeychain] = useState(false)
  const [qrExpanded, setQrExpanded] = useState(false)

  // Initialize dev mode from localStorage
  useEffect(() => {
    const savedDevMode = localStorage.getItem('hive-account-creator-dev-mode')
    if (savedDevMode === 'true') {
      setDevMode(true)
    }
  }, [])

  // Generate password on component mount
  useEffect(() => {
    if (!password) {
      setPassword(generatePassword())
    }
  }, [password])

  // Periodic check for account creation after sharing link
  useEffect(() => {
    if (!checkingAccountCreation || !account) {
      return
    }

    const checkAccountCreation = async () => {
      try {
        const chain = await getHiveChain()
        const { accounts } = await chain.api.database_api.find_accounts({
          accounts: [account]
        })

        if (accounts && accounts.length > 0) {
          // Account was created!
          setCheckingAccountCreation(false)
          setSuccess(true)
          toast.success(`${tSuccess('accountCreated')} @${account}!`)
        }
      } catch (error) {
        console.error('Error checking account creation:', error)
      }
    }

    // Check immediately
    checkAccountCreation()

    // Then check every 5 seconds
    const interval = setInterval(checkAccountCreation, 5000)

    return () => clearInterval(interval)
  }, [checkingAccountCreation, account])

  // Generate keys whenever account or password changes
  useEffect(() => {
    if (account && password) {
      setPrivateKeys(generateKeys(account, password))
    }
  }, [account, password])


  const checkIfAccountExists = useCallback(async (accountName: string): Promise<boolean> => {
    // First validate the format
    const validation = validateAccountName(accountName)
    if (!validation.isValid) {
      setAccountError(validation.error!)
      return false
    }

    setIsCheckingAccount(true)
    setAccountError(null)

    try {
      console.log('Checking account availability for:', accountName)

      const isAvailable = await checkAccountAvailability(accountName)

      console.log('Account check result:', accountName, 'Available:', isAvailable)

      if (!isAvailable) {
        setAccountError(t('usernameTaken'))
        setIsCheckingAccount(false)
        return false
      }

      setAccountError(null)
      setIsCheckingAccount(false)
      return true
    } catch (error) {
      console.error('Error checking account:', error)
      setAccountError(t('usernameCheckError'))
      setIsCheckingAccount(false)
      return false
    }
  }, [t])

  const handleAccountChange = (value: string) => {
    const cleanValue = value.toLowerCase().trim()
    setAccount(cleanValue)
    setIsAccountValid(false)
    setAccountError(null)
    setBackupDownloaded(false)
    setAcceptedBackup(false)

    // Clear existing timeout
    if (checkTimeout) {
      clearTimeout(checkTimeout)
    }

    if (cleanValue.length >= 3) {
      // Set a new timeout for debounced checking (500ms delay)
      const timeout = setTimeout(async () => {
        const isValid = await checkIfAccountExists(cleanValue)
        setIsAccountValid(isValid)
        if (isValid) {
          setHasBeenValidOnce(true)
        }
      }, 500)
      setCheckTimeout(timeout)
    } else if (cleanValue.length > 0) {
      setAccountError(t('usernameMinLength'))
    }
  }

  const reset = (keepPassword = false) => {
    setStep(1)
    setAccount('')
    setSuccess(false)
    setPrivateKeys(null)
    setAcceptedBackup(false)
    setTransactionId(null)
    setHasBeenValidOnce(false)
    setIsAccountValid(false)
    setAccountError(null)
    setBackupDownloaded(false)
    setCheckingAccountCreation(false)
    setShareableLink('')
    setAddingToKeychain(false)
    setAddedToKeychain(false)

    if (!keepPassword) {
      setPassword(generatePassword())
    }
  }

  const claimAccountToken = async () => {
    if (!user?.username) {
      toast.error(tErrors('loginRequired'))
      return
    }

    setClaimingAccount(true)
    try {
      const { executeOperation, getHiveChain } = await import('@hiveio/hive-lib')
      const chain = await getHiveChain()

      const result = await executeOperation(
        [{
          claim_account_operation: {
            creator: user.username,
            fee: chain.hiveCoins(0),
            extensions: []
          }
        }],
        user.username,
        {
          authMethod: user.authMethod,
          hiveAuthData: user.hiveAuthSession
        }
      )

      if (result.success) {
        toast.success(tSuccess('tokenClaimed'))
        await refreshAccountInfo()
      } else {
        toast.error(result.error || tErrors('claimFailed'))
      }
    } catch (error) {
      console.error('Error claiming account token:', error)
      toast.error(tErrors('claimFailed'))
    } finally {
      setClaimingAccount(false)
    }
  }

  const createHiveAccountAction = async () => {
    if (!user || !privateKeys) {
      toast.error(tErrors('loginRequired'))
      return
    }

    if (pendingClaimedAccounts !== null && pendingClaimedAccounts <= 0) {
      toast.error(tErrors('tokenRequired'))
      return
    }

    setLoading(true)
    try {
      // Stop periodic checking if running
      setCheckingAccountCreation(false)

      // In dev mode, simulate account creation without broadcasting
      if (devMode) {
        await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate network delay
        setSuccess(true)
        setTransactionId('DEV_MODE_TX_' + Date.now())
        toast.success(`[DEV MODE] ${tSuccess('accountCreated')} @${account} (not broadcasted)`)
      } else {
        const result = await createHiveAccount(
          account,
          privateKeys,
          user.username,
          {
            isLiveEnv: true, // Set to true when ready for production
            authMethod: user.authMethod,
            hiveAuthData: user.hiveAuthSession
          }
        )

        if (result.success) {
          setSuccess(true)
          setTransactionId((result as any).transactionId || null)
          toast.success(`${tSuccess('welcome')} @${account}!`)

          // Refresh account info to update claimed accounts count
          if (user?.username) {
            await refreshAccountInfo()
          }
        } else {
          toast.error(result.error || tErrors('createFailed'))
        }
      }
    } catch (error) {
      console.error('Account creation error:', error)
      toast.error(tErrors('createFailed'))
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadBackup = () => {
    if (!privateKeys) return
    downloadBackupFile(
      account,
      password,
      privateKeys,
      () => {
        // iOS in-app browser: copied to clipboard
        toast.success(tNotifications('backupCopied'))
      },
      () => {
        // Regular browser: downloaded file
        setBackupDownloaded(true)
        setAcceptedBackup(true)
      }
    )
  }

  const handleGenerateShareableLink = () => {
    if (!privateKeys || !account) return

    const shareData: ShareableAccountData = {
      username: account,
      ownerPubkey: privateKeys.ownerPubkey,
      activePubkey: privateKeys.activePubkey,
      postingPubkey: privateKeys.postingPubkey,
      memoPubkey: privateKeys.memoPubkey,
    }

    const link = generateShareableLink(shareData)

    // Verify encoding/decoding without logging sensitive data
    const encoded = link.split('?join=')[1]
    if (encoded) {
      const decoded = decodeAccountData(encoded)

      // Verify they match
      const matches =
        decoded?.username === shareData.username &&
        decoded?.ownerPubkey === shareData.ownerPubkey &&
        decoded?.activePubkey === shareData.activePubkey &&
        decoded?.postingPubkey === shareData.postingPubkey &&
        decoded?.memoPubkey === shareData.memoPubkey

      if (!matches) {
        toast.error(tErrors('encodingError'))
        console.error('Encoding verification failed')
        return
      }
    }

    setShareableLink(link)
    setShowShareDialog(true)

    // Start periodic check for account creation
    setCheckingAccountCreation(true)
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success(`${label} ${tNotifications('copiedToClipboard')}`)
    })
  }


  const CopyText = ({ text, title, showIcon = true }: { text: string; title: string; showIcon?: boolean }) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-white">{title}</Label>
      <div className="flex items-center gap-2">
        <div className="flex-1 p-2 sm:p-3 bg-gray-800/50 rounded-md font-mono text-xs sm:text-sm break-all text-gray-300">
          {text}
        </div>
        {showIcon && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => copyToClipboard(text, title)}
            className="shrink-0 h-8 w-8 p-0 sm:h-9 sm:w-9 border-gray-700 text-gray-300 hover:text-white"
          >
            <Copy className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Button>
        )}
      </div>
    </div>
  )

  // Shared Hero Component
  const Hero = () => (
    <div className={`text-center space-y-2 ${hasBeenValidOnce ? 'pt-24 sm:pt-0' : 'pt-0'}`}>
      <h1 className="text-5xl md:text-6xl font-bold text-white">
        {tHero('title')} {tHero('titleBold')}<span className="text-[#e31337]">.</span>
      </h1>
      <p className="text-base sm:text-xl text-gray-400 max-w-lg mx-auto">
        {tHero('subtitle')}
      </p>
    </div>
  )

  const toggleDevMode = () => {
    const newDevMode = !devMode
    setDevMode(newDevMode)
    localStorage.setItem('hive-account-creator-dev-mode', String(newDevMode))
    toast.success(newDevMode ? 'Dev mode enabled - transactions will not be broadcasted' : 'Dev mode disabled')
  }

  const addToKeychain = () => {
    if (!privateKeys || !account) return

    if (typeof window !== 'undefined' && (window as any).hive_keychain) {
      const keychain = (window as any).hive_keychain

      setAddingToKeychain(true)
      keychain.requestAddAccount(
        account,
        {
          active: privateKeys.active,
          posting: privateKeys.posting,
          memo: privateKeys.memo
        },
        (response: any) => {
          setAddingToKeychain(false)
          if (response.success) {
            setAddedToKeychain(true)
            toast.success(tSuccess('keychainAdded'))
          } else {
            toast.error(response.message || tErrors('keychainFailed'))
          }
        }
      )
    } else {
      toast.error(tErrors('keychainRequired'))
      window.open('https://hive-keychain.com/', '_blank')
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto relative">
      {/* Dev Mode Toggle */}
      {typeof window !== 'undefined' && window.location.hostname === 'localhost' && (
        <button
          onClick={toggleDevMode}
          className={`absolute top-0 right-0 text-xs px-3 py-1.5 rounded-md border-2 transition-colors ${devMode
            ? 'bg-orange-500/10 border-orange-500 text-orange-400'
            : 'bg-muted/50 border-muted-foreground/30 text-muted-foreground'
            }`}
        >
          {devMode ? '🔧 Dev Mode: ON' : '🔧 Dev Mode: OFF'}
        </button>
      )}

      {step === 1 ? (
        /* STEP 1: Choose username & password */
        <div className="space-y-8 sm:space-y-12">
          <Hero />

          <div className="space-y-6 max-w-md mx-auto">
            {/* Username */}
            <div className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="account" className="text-sm text-white">{t('usernameLabel')}</Label>
                <p className="text-xs text-gray-400">{t('usernameHelper')}</p>
              </div>
              <div className="relative">
                <Input
                  id="account"
                  placeholder=""
                  value={account}
                  onChange={(e) => handleAccountChange(e.target.value)}
                  disabled={success}
                  className={`font-mono bg-gray-900/50 border-2 text-white placeholder:text-gray-500 ${success
                    ? 'border-gray-700 opaity-100 cursor-not-allowed'
                    : accountError ? '' : 'border-gray-700'
                    }`}
                  autoComplete="off"
                  autoFocus={!success}
                />
                {isCheckingAccount && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                  </div>
                )}
                {!isCheckingAccount && isAccountValid && account.length >= 3 && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                )}
              </div>
              {!success && (
                <div className="h-5">
                  {!isCheckingAccount && accountError ? (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {accountError}
                    </p>
                  ) : !isCheckingAccount && isAccountValid && account.length >= 3 ? (
                    <p className="text-sm text-green-500 flex items-center gap-1">
                      <CheckCircle className="h-4 w-4" />
                      {t('usernameAvailable')}
                    </p>
                  ) : null}
                </div>
              )}
            </div>

            {/* Password section - show when account is valid or has been valid once */}
            {hasBeenValidOnce && (
              <>
                {/* Password (editable with button) */}
                <div className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="password" className="text-sm text-white">{t('passwordLabel')}</Label>
                    <p className="text-xs text-gray-400">{t('passwordHelper')}</p>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={isEditingPassword ? tempPassword : password}
                      onChange={(e) => setTempPassword(e.target.value)}
                      disabled={success}
                      readOnly={!isEditingPassword && !success}
                      onClick={(e) => {
                        if (!isEditingPassword && !success) {
                          copyToClipboard(password, 'Password')
                          e.currentTarget.blur()
                        }
                      }}
                      className={`font-mono bg-gray-800/50 border-2 pr-12 text-white ${success
                        ? 'border-gray-700 opacity-60 cursor-not-allowed'
                        : isEditingPassword
                          ? 'border-gray-700'
                          : 'border-gray-700 opacity-60 cursor-pointer'
                        }`}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(password, 'Password')}
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9 p-0 bg-transparent hover:bg-transparent text-gray-400 hover:text-white"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    {!success && (
                      <Button
                        onClick={handleDownloadBackup}
                        variant="outline"
                        className={`border-2 bg-transparent hover:bg-transparent ${backupDownloaded
                          ? 'bg-green-500/10 border-green-500/50 text-green-400 hover:text-green-300'
                          : 'border-orange-500 text-orange-400 hover:text-orange-300'
                          }`}
                        size="sm"
                      >
                        <Download className="mr-2 h-3.5 w-3.5" />
                        {backupDownloaded ? t('backupDownloaded') : t('downloadBackup')}
                      </Button>
                    )}
                    {!success && (
                      <div className="flex items-center gap-2">
                        {!isEditingPassword ? (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setShowPassword(!showPassword)}
                              className="h-8 w-8 p-0 bg-transparent hover:bg-transparent border-gray-700 text-gray-400 hover:text-white"
                            >
                              {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setPassword(generatePassword())
                                setBackupDownloaded(false)
                                setAcceptedBackup(false)
                              }}
                              className="h-8 w-8 p-0 bg-transparent hover:bg-transparent border-gray-700 text-gray-400 hover:text-white"
                            >
                              <RefreshCw className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setIsEditingPassword(true)
                                setTempPassword(password)
                              }}
                              className="h-8 w-8 p-0 bg-transparent hover:bg-transparent border-gray-700 text-gray-400 hover:text-white"
                            >
                              <Pencil className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setShowKeys(true)}
                              className="h-8 w-8 p-0 bg-transparent hover:bg-transparent border-gray-700 text-gray-400 hover:text-white"
                            >
                              <Key className="h-3.5 w-3.5" />
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setPassword(tempPassword)
                                setIsEditingPassword(false)
                                setBackupDownloaded(false)
                                setAcceptedBackup(false)
                              }}
                              className="h-8 px-3 bg-transparent hover:bg-transparent border-gray-700 text-gray-300 hover:text-white"
                            >
                              {tCommon('confirm')}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setIsEditingPassword(false)
                                setTempPassword('')
                              }}
                              className="h-8 px-3 bg-transparent hover:bg-transparent text-gray-400 hover:text-white"
                            >
                              {tCommon('cancel')}
                            </Button>
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Download backup button on success */}
                  {success && (
                    <div className="mt-2">
                      <Button
                        onClick={handleDownloadBackup}
                        variant="outline"
                        className={`w-full border-2 ${backupDownloaded
                          ? 'bg-green-500/10 border-green-500/50 text-green-400'
                          : 'border-orange-500 text-orange-400'
                          }`}
                        size="sm"
                      >
                        <Download className="mr-2 h-3.5 w-3.5" />
                        {backupDownloaded ? t('backupDownloaded') : t('downloadBackup')}
                      </Button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Action buttons */}
          {hasBeenValidOnce && (
            <div className="space-y-6 max-w-md mx-auto">
              {/* Backup checkbox - hidden on success */}
              {!success && (
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="accepted"
                    checked={acceptedBackup}
                    onChange={(e) => setAcceptedBackup(e.target.checked)}
                    className="rounded"
                  />
                  <Label htmlFor="accepted" className="text-sm text-gray-300">
                    {t('backupConfirmation')}
                  </Label>
                </div>
              )}

              <div className="space-y-3">
                {success ? (
                  /* Success state buttons */
                  <>
                    <div className="flex flex-col items-center gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-lg mb-4">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-6 w-6 text-green-500 shrink-0" />
                        <div className="text-center">
                          <h3 className="font-semibold text-white">{tSuccess('accountCreated')}</h3>
                          <p className="text-sm text-gray-400">@{account} {tSuccess('accountLive')}</p>
                        </div>
                      </div>
                      <Button
                        onClick={addToKeychain}
                        disabled={addingToKeychain || addedToKeychain}
                        className="w-full bg-green-500/10 hover:bg-green-500/20 text-white border-2 border-green-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        size="sm"
                      >
                        {addingToKeychain ? tButtons('addingToKeychain') : addedToKeychain ? tButtons('addedToKeychain') : tButtons('addToKeychain')}
                      </Button>
                    </div>
                    <Button
                      onClick={() => reset(false)}
                      className="w-full"
                      size="lg"
                    >
                      {tButtons('restartProcess')}
                    </Button>
                    <Button
                      onClick={() => reset(true)}
                      variant="outline"
                      className="w-full"
                      size="lg"
                    >
                      {tButtons('advancedRestart')}
                    </Button>
                  </>
                ) : !isAuthenticated ? (
                  <>
                    <Button
                      onClick={handleGenerateShareableLink}
                      disabled={!isAccountValid || isCheckingAccount || !acceptedBackup}
                      className="w-full bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-full transition-colors duration-200"
                      size="lg"
                    >
                      {tButtons('shareLink')}
                    </Button>
                    <Button
                      onClick={() => setShowLoginModal(true)}
                      disabled={!isAccountValid || isCheckingAccount || !acceptedBackup}
                      variant="outline"
                      className="w-full bg-transparent hover:bg-transparent border-gray-700 text-gray-400 hover:text-gray-200"
                      size="lg"
                    >
                      {tButtons('advancedSignIn')}
                    </Button>
                  </>
                ) : pendingClaimedAccounts !== null && pendingClaimedAccounts > 0 ? (
                  <>
                    <Button
                      onClick={() => createHiveAccountAction()}
                      disabled={!isAccountValid || isCheckingAccount || !acceptedBackup || loading}
                      className="w-full rounded-full bg-white hover:bg-gray-200 text-gray-900 font-semibold transition-all duration-200 hover:shadow-lg"
                      size="lg"
                    >
                      {loading ? tButtons('creatingAccount') : tButtons('createAccount')}
                    </Button>
                    <Button
                      onClick={handleGenerateShareableLink}
                      disabled={!isAccountValid || isCheckingAccount || !acceptedBackup}
                      className="w-full bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-full transition-colors duration-200"
                      size="lg"
                    >
                      {tButtons('shareLink')}
                    </Button>
                  </>
                ) : pendingClaimedAccounts === 0 ? (
                  <>
                    <div className="text-center py-2">
                      <p className="text-sm text-gray-400 mb-3">
                        {tNotifications('needTokens')}
                      </p>
                      <Button
                        onClick={claimAccountToken}
                        variant="outline"
                        disabled={claimingAccount}
                        className="mb-3 bg-transparent hover:bg-gray-800 border-gray-700 text-gray-300 hover:text-white"
                      >
                        {claimingAccount ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {tButtons('claiming')}
                          </>
                        ) : (
                          tButtons('claimFreeToken')
                        )}
                      </Button>
                    </div>
                    <Button
                      onClick={handleGenerateShareableLink}
                      disabled={!isAccountValid || isCheckingAccount || !acceptedBackup}
                      className="w-full bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-full transition-colors duration-200"
                      size="lg"
                    >
                      {tButtons('shareLink')}
                    </Button>
                  </>
                ) : null}
              </div>
            </div>
          )}
        </div>
      ) : null}

      {/* Keys Modal */}
      <Dialog open={showKeys} onOpenChange={setShowKeys}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-gray-900 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-white">{tKeys('title')}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {privateKeys && (
              <>
                {/* Owner */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-white">{tKeys('owner')}</Label>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 p-2.5 bg-gray-800/50 rounded-md font-mono text-xs break-all text-gray-300">
                      {privateKeys.owner}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(privateKeys.owner, tKeys('owner'))}
                      className="shrink-0 border-gray-700 text-gray-300 hover:text-white"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="pl-2 font-mono text-[10px] text-gray-500 break-all">
                    {privateKeys.ownerPubkey}
                  </div>
                </div>

                {/* Active */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-white">{tKeys('active')}</Label>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 p-2.5 bg-gray-800/50 rounded-md font-mono text-xs break-all text-gray-300">
                      {privateKeys.active}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(privateKeys.active, tKeys('active'))}
                      className="shrink-0 border-gray-700 text-gray-300 hover:text-white"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="pl-2 font-mono text-[10px] text-gray-500 break-all">
                    {privateKeys.activePubkey}
                  </div>
                </div>

                {/* Posting */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-white">{tKeys('posting')}</Label>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 p-2.5 bg-gray-800/50 rounded-md font-mono text-xs break-all text-gray-300">
                      {privateKeys.posting}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(privateKeys.posting, tKeys('posting'))}
                      className="shrink-0 border-gray-700 text-gray-300 hover:text-white"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="pl-2 font-mono text-[10px] text-gray-500 break-all">
                    {privateKeys.postingPubkey}
                  </div>
                </div>

                {/* Memo */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-white">{tKeys('memo')}</Label>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 p-2.5 bg-gray-800/50 rounded-md font-mono text-xs break-all text-gray-300">
                      {privateKeys.memo}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(privateKeys.memo, tKeys('memo'))}
                      className="shrink-0 border-gray-700 text-gray-300 hover:text-white"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="pl-2 font-mono text-[10px] text-gray-500 break-all">
                    {privateKeys.memoPubkey}
                  </div>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Shareable Link Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="max-w-2xl bg-gray-900 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-white">{tShare('title')}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-start gap-2 p-3 bg-blue-950/30 border border-blue-800/30 rounded-md">
              <AlertCircle className="h-3.5 w-3.5 shrink-0 text-blue-400 mt-0.5" />
              <div className="text-xs text-blue-200/90">
                {tShare('infoText')}
              </div>
            </div>

            <div className="space-y-3">
              <div className="relative">
                <Input
                  value={shareableLink}
                  readOnly
                  onClick={(e) => {
                    copyToClipboard(shareableLink, 'Link')
                    e.currentTarget.blur()
                  }}
                  onFocus={(e) => e.currentTarget.blur()}
                  className="font-mono bg-gray-800/50 border-2 border-gray-700 pr-12 cursor-pointer text-sm text-gray-300"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(shareableLink, 'Link')}
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9 p-0 hover:bg-gray-800 text-gray-400 hover:text-white"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div
                  onClick={() => setQrExpanded(!qrExpanded)}
                  className={`bg-white rounded-md cursor-pointer transition-all ${qrExpanded ? 'p-2' : 'p-1'}`}
                >
                  <QRCodeSVG
                    value={shareableLink}
                    size={qrExpanded ? 200 : 64}
                    level="H"
                    bgColor="#ffffff"
                    fgColor="#000000"
                    style={{ display: 'block' }}
                  />
                </div>
                <p className="text-xs text-gray-500">{qrExpanded ? 'Click to collapse' : 'Click to expand'}</p>
              </div>
            </div>

            <div className="flex items-start gap-2 p-3 bg-gray-800/50 rounded-md">
              <AlertCircle className="h-4 w-4 shrink-0 text-gray-500 mt-0.5" />
              <div className="text-sm text-gray-400">
                {tShare('helpText')}
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 pt-2">
              <a
                href={SOCIAL_MEDIAS.find(s => s.icon === 'discord')?.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
              >
                <FontAwesomeIcon
                  icon={['fab', 'discord']}
                  className="w-6 h-6"
                />
              </a>
              <a
                href={SOCIAL_MEDIAS.find(s => s.icon === 'telegram')?.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
              >
                <FontAwesomeIcon
                  icon={['fab', 'telegram']}
                  className="w-6 h-6"
                />
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Login Modal */}
      <LoginModal
        open={showLoginModal}
        onOpenChange={setShowLoginModal}
      />
    </div>
  )
}
