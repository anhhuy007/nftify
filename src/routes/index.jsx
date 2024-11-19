import { createBrowserRouter } from "react-router-dom";
import RootLayout from "@/layouts/RootLayout";
import AuthLayout from "@/layouts/AuthLayout";
import MarketplaceLayout from "@/layouts/MarketplaceLayout";
import menuItems from "@/config/Links";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: menuItems
      .filter((item) => item.layout === "RootLayout")
      .map((item) => ({
        path: item.link.replace(/^\//, ""),
        element: item.element,
        index: item.link === "/",
      })),
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: menuItems
      .filter((item) => item.layout === "AuthLayout")
      .map((item) => ({
        path: item.link.replace(/^\/auth\//, ""),
        element: item.element,
      })),
  },
  {
    path: "/marketplace",
    element: <MarketplaceLayout />,
    children: menuItems
      .filter((item) => item.layout === "MarketplaceLayout")
      .map((item) => ({
        path: item.link.replace(/^\/marketplace\//, ""),
        element: item.element,
      })),
  },
]);
