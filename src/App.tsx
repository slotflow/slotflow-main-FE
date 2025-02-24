import { Provider } from 'react-redux';
import { appRouter } from './router/appRouter';
import { ToastContainer } from 'react-toastify';
import { RouterProvider } from 'react-router-dom';
import { appStore } from './utils/redux/appStore';

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
      <Provider store={appStore}>
        <RouterProvider router={appRouter} />
      </Provider>
    </>
  )
}

export default App
