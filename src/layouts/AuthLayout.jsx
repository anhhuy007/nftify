import { Outlet } from "react-router-dom";
import Header from "@/components/header/Header";

const RootLayout = () => {
  return (
    <div className=" min-h-screen w-full bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
