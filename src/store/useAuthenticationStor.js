import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export const useAuthStore = create(
  // ✅ Always wrap persist inside devtools (recommended order)
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (userData) =>
          set({ user: userData}, false, 'auth/setUser'),
        logout: () =>
          set({ user: null }, false, 'auth/logout'),
      }),
      {
        name: 'auth-storage',
        getStorage: () => localStorage,
        // avoid trying to store actions (not serializable):
        partialize: (state) => ({ user: state.user }),
        enabled: import.meta.env.VITE_AUTH_PERSIST === 'true',
      }
    ),
    {
      name: 'auth-store',
      enabled: import.meta.env.VITE_AUTH_DEVTOOLS === 'true',
      anonymousActionType: 'anonymous',
    }
  )
)
