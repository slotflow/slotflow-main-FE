import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { appRouter } from './router/appRouter';
import { queryClient } from './lib/queryClient';
import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import LoadingFallback from './pages/common/LoadingFallback';
import { PersistGate } from "redux-persist/integration/react";
import { appStore, persistAppStore } from './utils/redux/appStore';
import { SocketProvider } from './components/context/socketProvider';

function App() {

  return (
    <Provider store={appStore}>
      <PersistGate loading={null} persistor={persistAppStore}>
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<LoadingFallback />}>
            <SocketProvider>
              <RouterProvider router={appRouter} />
            </SocketProvider>
          </Suspense>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
