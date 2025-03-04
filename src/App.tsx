import { Provider } from 'react-redux';
import { useEffect, useState } from 'react';
import { appRouter } from './router/appRouter';
import { queryClient } from './lib/queryClient';
import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { PersistGate } from "redux-persist/integration/react";
import { appStore, persistAppStore } from './utils/redux/appStore';
import { initializeApp } from './utils/appInitialization';

function App() {

  const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const init = async () => {
            await initializeApp();
            setIsInitialized(true);
        };
        init();
    }, []);

    if (!isInitialized) {
        return <div>Loading...</div>;
    }

  return (
    <Provider store={appStore}>
      <PersistGate loading={null} persistor={persistAppStore}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={appRouter} />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
