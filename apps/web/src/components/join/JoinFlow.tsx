'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { CheckCircle, AlertCircle, ExternalLink } from 'lucide-react'
import { toast } from 'sonner'
import { useAuth } from '@/lib/auth'
import { LoginModal } from '@/components/join/LoginModal'
import { decodeAccountData, type ShareableAccountData } from '@/lib/share-link'
import { createHiveAccount, type PrivateKeys } from '@hiveio/hive-lib'
import { useTranslations } from 'next-intl'

interface JoinFlowProps {
  encodedData: string
}

export default function JoinFlow({ encodedData }: JoinFlowProps) {
  const { user, isAuthenticated, pendingClaimedAccounts, refreshAccountInfo } = useAuth()
  const t = useTranslations('join.joinFlow')
  const tErrors = useTranslations('join.errors')
  const tSuccess = useTranslations('join.success')
  const [accountData, setAccountData] = useState<ShareableAccountData | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [transactionId, setTransactionId] = useState<string | null>(null)

  // Decode the account data from URL
  useEffect(() => {
    if (encodedData) {
      const decoded = decodeAccountData(encodedData)
      if (decoded) {
        setAccountData(decoded)
      } else {
        toast.error(tErrors('invalidShareLink'))
      }
    }
  }, [encodedData, tErrors])

  const createAccount = async () => {
    if (!user?.username || !accountData) {
      toast.error(tErrors('missingInfo'))
      return
    }

    if (pendingClaimedAccounts !== null && pendingClaimedAccounts <= 0) {
      toast.error(tErrors('tokenRequired'))
      return
    }

    setLoading(true)
    try {
      // Convert ShareableAccountData to PrivateKeys format (we only have public keys)
      const keys: PrivateKeys = {
        owner: '', // We don't have private keys, only public keys
        active: '',
        posting: '',
        memo: '',
        ownerPubkey: accountData.ownerPubkey,
        activePubkey: accountData.activePubkey,
        postingPubkey: accountData.postingPubkey,
        memoPubkey: accountData.memoPubkey,
      }

      const result = await createHiveAccount(
        accountData.username,
        keys,
        user.username,
        {
          isLiveEnv: true,
          authMethod: user.authMethod,
          hiveAuthData: user.hiveAuthSession
        }
      )

      if (result.success) {
        setSuccess(true)
        setTransactionId((result as any).txId || null)
        toast.success(`${tSuccess('accountCreated')} @${accountData.username}!`)

        // Refresh account info to update claimed accounts count
        await refreshAccountInfo()
      } else {
        toast.error(result.error || tErrors('createFailed'))
      }
    } catch (error) {
      console.error('Error creating account:', error)
      toast.error(tErrors('createFailed'))
    } finally {
      setLoading(false)
    }
  }

  const InfoField = ({ label, value }: { label: string; value: string }) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-white">{label}</Label>
      <div className="p-3 bg-gray-800/50 rounded-md font-mono text-sm break-all text-gray-300">
        {value}
      </div>
    </div>
  )

  if (!accountData) {
    return (
      <div className="pt-24 sm:pt-24">
        <Card className="w-full max-w-2xl mx-auto bg-gray-900/80 backdrop-blur border-gray-700">
          <CardContent className="p-6">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {t('noAccountData')}
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="pt-24 sm:pt-24 ">

      <Card className="w-full max-w-2xl mx-auto bg-gray-900/80 backdrop-blur border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white">{t('title')}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 pb-4">
          {!success ? (
            <>
              <div className="flex items-start gap-2 p-3 bg-blue-950/30 border border-blue-800/30 rounded-md">
                <AlertCircle className="h-3.5 w-3.5 shrink-0 text-blue-400 mt-0.5" />
                <div className="text-xs text-blue-200/90 space-y-1">
                  <p className="font-medium">
                    {t('inviteText')}
                    <span className="font-mono font-semibold"> @{accountData.username}</span>
                  </p>
                  <p>
                    {t('inviteDescription')}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <InfoField label={t('username')} value={accountData.username} />

                <Accordion type="single" collapsible>
                  <AccordionItem value="keys">
                    <AccordionTrigger>{t('showKeys')}</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-2">
                        <InfoField label={t('ownerPubkey')} value={accountData.ownerPubkey} />
                        <InfoField label={t('activePubkey')} value={accountData.activePubkey} />
                        <InfoField label={t('postingPubkey')} value={accountData.postingPubkey} />
                        <InfoField label={t('memoPubkey')} value={accountData.memoPubkey} />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <Button
                onClick={!isAuthenticated ? () => setShowLoginModal(true) : createAccount}
                disabled={
                  loading ||
                  (isAuthenticated && pendingClaimedAccounts !== null && pendingClaimedAccounts <= 0)
                }
                className="w-full"
                size="lg"
              >
                {!isAuthenticated
                  ? t('signInToCreate')
                  : (pendingClaimedAccounts !== null && pendingClaimedAccounts <= 0)
                    ? t('tokenRequired')
                    : loading
                      ? t('creatingAccount')
                      : t('createAccount')
                }
              </Button>
            </>
          ) : (
            <div className="space-y-6">
              {/* Success Message */}
              <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-500 shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-white">{t('accountCreated')}</h3>
                  <p className="text-sm text-gray-400">@{accountData.username} {t('accountLive')}</p>
                </div>
                {transactionId && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open(`https://hiveblocks.com/tx/${transactionId}`, '_blank')}
                    className="text-gray-400 hover:text-white"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <Button
                onClick={() => window.location.href = '/'}
                className="w-full"
                size="lg"
              >
                {t('createAnother')}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Login Modal */}
      <LoginModal
        open={showLoginModal}
        onOpenChange={setShowLoginModal}
      />
    </div>
  )
}
