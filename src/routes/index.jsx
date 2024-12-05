import { createBrowserRouter, Route } from "react-router-dom";
import RootLayout from "@/layouts/RootLayout";
import AuthLayout from "@/layouts/AuthLayout";
import MarketplaceLayout from "@/layouts/MarketplaceLayout";
import menuItems from "@/config/Links";
import PrivateRoute from "@/routes/PrivateRoute"; // Import the PrivateRoute component

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: menuItems
      .filter((item) => item.layout === "RootLayout")
      .map((item) => {
        if (item.children) {
          return {
            path: item.link.replace(/^\//, ""),
            element: item.element,
            children: item.children.map((child) => ({
              path: child.link,
              element: child.element,
            })),
          };
        } else {
          return {
            path: item.link.replace(/^\//, ""),
            element: item.isPrivate ? (
              <PrivateRoute>{item.element}</PrivateRoute>
            ) : (
              item.element
            ),
          };
        }
      }),
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
        element: item.isPrivate ? (
          <PrivateRoute>{item.element}</PrivateRoute>
        ) : (
          item.element
        ),
      })),
  },
]);
