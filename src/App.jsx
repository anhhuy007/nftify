import { QueryClient, QueryClientProvider } from "react-query";
import { router } from "@/routes/index";
import AuthProvider from "@/context/AuthProvider";
import CartProvider from "@/context/CartProvider";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          {router}
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
