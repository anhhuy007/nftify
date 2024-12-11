import { QueryClient, QueryClientProvider } from 'react-query';
import { router } from '@/routes/index';
import AuthProvider from '@/context/AuthProvider';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{router}</AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
