import { BrowserRouter, RouterProvider } from 'react-router-dom';
import { router } from '@/routes/index';
import AuthProvider from '@/context/AuthProvider';

function App() {
  return (
    <RouterProvider router={router}>
    </RouterProvider>
  );
}

export default App;
