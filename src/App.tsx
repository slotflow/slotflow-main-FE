import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { appRouter } from './router/appRouter';
import { queryClient } from './lib/queryClient';
import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { PersistGate } from "redux-persist/integration/react";
import { appStore, persistAppStore } from './utils/redux/appStore';
import LoadingFallback from './pages/common/LoadingFallback';

function App() {

  return (
    <Provider store={appStore}>
      <PersistGate loading={null} persistor={persistAppStore}>
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<LoadingFallback />}>
            <RouterProvider router={appRouter} />
          </Suspense>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
