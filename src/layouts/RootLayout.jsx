import { Outlet } from "react-router-dom";
import Header from "@/components/header/Header";
import Footer from "@/components/header/Footer";

const RootLayout = () => {
  return (
    <>
      <div className=" min-h-screen w-full bg-background flex flex-col">
        <Header />
        <main className="flex-1 pt-16">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default RootLayout;
