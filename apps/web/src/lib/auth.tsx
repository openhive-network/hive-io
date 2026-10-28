'use client'

import { createContext, useContext, useEffect, useState, useSyncExternalStore } from 'react'
import Cookies from 'js-cookie'

export type AuthMethod = 'keychain' | 'hiveauth'

interface HiveAuthSession {
  token: string
  key: string
  expire: number
}

interface User {
  username: string
  authMethod: AuthMethod
  hiveAuthSession?: HiveAuthSession
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  pendingClaimedAccounts: number | null
  loadingAccountInfo: boolean
  refreshAccountInfo: () => Promise<void>
  login: (username: string, authMethod?: AuthMethod, hiveAuthSession?: HiveAuthSession) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

function readUserFromCookies(): User | null {
  const savedUsername = Cookies.get('hive_username')
  const savedAuthMethod = Cookies.get('hive_auth_method') as AuthMethod | undefined
  const savedHiveAuthSession = Cookies.get('hive_auth_session')

  if (!savedUsername) {
    return null
  }

  const user: User = {
    username: savedUsername,
    authMethod: savedAuthMethod || 'keychain',
  }

  if (savedAuthMethod === 'hiveauth' && savedHiveAuthSession) {
    try {
      user.hiveAuthSession = JSON.parse(savedHiveAuthSession)
    } catch (e) {
      console.error('Failed to parse HiveAuth session:', e)
    }
  }

  return user
}

// The signed-in user, read from the cookies on first client access. Kept
// outside React so the static export renders signed out (server snapshot) and
// the client switches to the cookie's user right after hydration.
let sessionUser: User | null | undefined
const sessionListeners = new Set<() => void>()

function getSessionUser(): User | null {
  if (sessionUser === undefined) {
    sessionUser = readUserFromCookies()
  }
  return sessionUser
}

function setSessionUser(user: User | null) {
  sessionUser = user
  sessionListeners.forEach((listener) => listener())
}

function subscribeSessionUser(listener: () => void) {
  sessionListeners.add(listener)
  return () => {
    sessionListeners.delete(listener)
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const user = useSyncExternalStore(subscribeSessionUser, getSessionUser, () => null)
  const [pendingClaimedAccounts, setPendingClaimedAccounts] = useState<number | null>(null)
  const [loadingAccountInfo, setLoadingAccountInfo] = useState(false)

  // Fetch account info when user changes
  useEffect(() => {
    const fetchAccountInfo = async () => {
      if (!user?.username) {
        setPendingClaimedAccounts(null)
        return
      }

      setLoadingAccountInfo(true)
      try {
        const { getHiveChain } = await import('@hiveio/hive-lib')
        const chain = await getHiveChain()
        const { accounts } = await chain.api.database_api.find_accounts({
          accounts: [user.username]
        })

        if (accounts && accounts.length > 0) {
          const account = accounts[0]
          setPendingClaimedAccounts(Number(account.pending_claimed_accounts))
        }
      } catch (error) {
        console.error('Error fetching account info:', error)
        setPendingClaimedAccounts(null)
      } finally {
        setLoadingAccountInfo(false)
      }
    }

    fetchAccountInfo()
  }, [user?.username])

  const refreshAccountInfo = async () => {
    if (!user?.username) return

    setLoadingAccountInfo(true)
    try {
      const { getHiveChain } = await import('@hiveio/hive-lib')
      const chain = await getHiveChain()
      const { accounts } = await chain.api.database_api.find_accounts({
        accounts: [user.username]
      })

      if (accounts && accounts.length > 0) {
        setPendingClaimedAccounts(Number(accounts[0].pending_claimed_accounts))
      }
    } catch (error) {
      console.error('Error refreshing account info:', error)
    } finally {
      setLoadingAccountInfo(false)
    }
  }

  const login = (username: string, authMethod: AuthMethod = 'keychain', hiveAuthSession?: HiveAuthSession) => {
    const userData: User = {
      username,
      authMethod,
      hiveAuthSession
    }
    setSessionUser(userData)

    const cookieOptions = {
      expires: 7, // 7 days
      sameSite: 'lax' as const,
      secure: window.location.protocol === 'https:',
      path: '/'
    }

    Cookies.set('hive_username', username, cookieOptions)
    Cookies.set('hive_auth_method', authMethod, cookieOptions)

    if (authMethod === 'hiveauth' && hiveAuthSession) {
      Cookies.set('hive_auth_session', JSON.stringify(hiveAuthSession), cookieOptions)
    }
  }

  const logout = () => {
    setSessionUser(null)
    setPendingClaimedAccounts(null)
    Cookies.remove('hive_username', { path: '/' })
    Cookies.remove('hive_auth_method', { path: '/' })
    Cookies.remove('hive_auth_session', { path: '/' })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        pendingClaimedAccounts,
        loadingAccountInfo,
        refreshAccountInfo,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
