import { QueryClient, QueryClientProvider } from "react-query";
import { router } from "@/routes/index";
import AuthProvider from "@/context/AuthProvider";
import CartProvider from "@/context/CartProvider";
import WalletProvider from "./context/WalletProvider";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <WalletProvider>
          <CartProvider>{router}</CartProvider>
        </WalletProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
