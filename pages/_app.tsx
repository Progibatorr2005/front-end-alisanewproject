import '../src/assets/styles/globals.scss'
import '../src/assets/styles/auth.scss'
import '../src/assets/styles/card.scss'
import AuthProvider from '@/providers/auth-providers/AuthProvider'
import { TypeComponentAuthFields } from '@/providers/auth-providers/auth-page.types'
import { persistor, store } from '@/store/store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

export default function App({ Component, pageProps }: AppProps & TypeComponentAuthFields) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AuthProvider Component={{isOnlyUser: Component.isOnlyUser}}>
            <Component {...pageProps} />
          </AuthProvider>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  ) 
}
