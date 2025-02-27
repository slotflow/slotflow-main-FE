import { Provider } from 'react-redux';
import { appRouter } from './router/appRouter';
import { RouterProvider } from 'react-router-dom';
import { PersistGate } from "redux-persist/integration/react";
import { appStore, persistAppStore } from './utils/redux/appStore';


function App() {
  return (
      <Provider store={appStore}>
        <PersistGate loading={null} persistor={persistAppStore}>
          <RouterProvider router={appRouter} />
        </PersistGate>
      </Provider>
  )
}

export default App
