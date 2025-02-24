import { appRouter } from './router/appRouter';
import { ToastContainer } from 'react-toastify';
import { RouterProvider } from 'react-router-dom';

function App() {
  return (

    <>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
    />
    <RouterProvider router={appRouter} />
    </>
  )
}

export default App
