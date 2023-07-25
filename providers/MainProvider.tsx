'use client'

import { FC, ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { persistor, store } from '../redux/store'
import { Provider } from 'react-redux'
import { ChakraProvider, theme } from '@chakra-ui/react'
import { PersistGate } from 'redux-persist/integration/react'
import Layout from '../components/Layout/Layout'

// Провайдер react query
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
})

// Основной провайдер
const MainProvider: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<QueryClientProvider client={queryClient}>
			{/* Провайдер redux toolkit */}
			<Provider store={store}>
				{/* Persist провайдер */}
				<PersistGate loading={null} persistor={persistor}>
					{/* Chakra ui провайдер */}
					<ChakraProvider theme={theme}>
						<Layout>{children}</Layout>
					</ChakraProvider>
				</PersistGate>
			</Provider>
		</QueryClientProvider>
	)
}

export default MainProvider
