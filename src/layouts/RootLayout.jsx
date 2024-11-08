import { Outlet } from "react-router-dom";
import Header from "@/components/header/Header";
import Footer from "@/components/header/Footer";

const RootLayout = () => {
  return (
    <>
      <div className="flex min-h-screen flex-col w-full">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default RootLayout;
