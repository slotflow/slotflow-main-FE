import { Provider } from 'react-redux';
import { appRouter } from './router/appRouter';
import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { PersistGate } from "redux-persist/integration/react";
import { appStore, persistAppStore } from './utils/redux/appStore';
import { queryClient } from './lib/queryClient';


function App() {
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
