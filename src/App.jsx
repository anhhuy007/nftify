import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes/index';
import AuthProvider from '@/context/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;