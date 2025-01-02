import { Outlet } from "react-router-dom";
import Header from "@/components/header/Header";
import Footer from "@/components/header/Footer";
import { Link, useLocation } from "react-router-dom";
import menuItems from "@/config/Links";

const renderMarketplaceLinks = (pathname) =>
  menuItems
    .filter((item) => item.group === "marketplace")
    .map((item) => (
      <Link to={item.link} key={item.link} className="flex items-center">
        <p
          className={`text-2xl md:text-4xl font-bold ${
            pathname === item.link ? "text-white" : "text-gray-500"
          }`}
        >
          {item.name}
        </p>
      </Link>
    ));

const RootLayout = () => {
  const location = useLocation();
  return (
    <>
      <div className=" min-h-screen w-full bg-background flex flex-col">
        <Header />
        <main className="flex-1 p-5 md:px-32 mt-32 flex flex-col">
          <div className="flex gap-4 md:gap-10 lg:gap-12 xl:gap-16 mb-12">
            {renderMarketplaceLinks(location.pathname)}
          </div>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default RootLayout;
