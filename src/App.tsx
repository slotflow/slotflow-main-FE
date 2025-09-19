import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { appRouter } from './router/appRouter';
import { queryClient } from './lib/queryClient';
import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import LoadingFallback from './pages/common/LoadingFallback';
import { PersistGate } from "redux-persist/integration/react";
import { appStore, persistAppStore } from './utils/redux/appStore';
import AosAnimation from './components/common/AosAnimation';

function App() {

  return (
    <AosAnimation>
      <Provider store={appStore}>
        <PersistGate loading={null} persistor={persistAppStore}>
          <QueryClientProvider client={queryClient}>
            <Suspense fallback={<LoadingFallback />}>
              <RouterProvider router={appRouter} />
            </Suspense>
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </AosAnimation>
  )
}

export default App
