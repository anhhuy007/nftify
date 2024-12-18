import { BrowserRouter, Routes, Route } from "react-router-dom"; // Import BrowserRouter, Routes và Route
import RootLayout from "@/layouts/RootLayout";
import AuthLayout from "@/layouts/AuthLayout";
import MarketplaceLayout from "@/layouts/MarketplaceLayout";
import menuItems from "@/config/Links";
import PrivateRoute from "@/routes/PrivateRoute"; // Import PrivateRoute

export const router = (
  <Routes>
    <Route path="/" element={<RootLayout />}>
      {menuItems
        .filter((item) => item.layout === "RootLayout")
        .map((item) => {
          if (item.children) {
            return (
              <Route
                key={item.link}
                path={item.link.replace(/^\//, "")}
                element={item.element}
              >
                {item.children.map((child) => (
                  <Route
                    key={child.link}
                    path={child.link}
                    element={child.element}
                  />
                ))}
              </Route>
            );
          } else {
            return (
              <Route
                key={item.link}
                path={item.link.replace(/^\//, "")}
                element={
                  item.isPrivate ? (
                    <PrivateRoute>{item.element}</PrivateRoute>
                  ) : (
                    item.element
                  )
                }
              />
            );
          }
        })}
    </Route>

    <Route path="/auth" element={<AuthLayout />}>
      {menuItems
        .filter((item) => item.layout === "AuthLayout")
        .map((item) => (
          <Route
            key={item.link}
            path={item.link.replace(/^\/auth\//, "")}
            element={item.element}
          />
        ))}
    </Route>

    <Route path="/marketplace" element={<MarketplaceLayout />}>
      {menuItems
        .filter((item) => item.layout === "MarketplaceLayout")
        .map((item) => (
          <Route
            key={item.link}
            path={item.link.replace(/^\/marketplace\//, "")}
            element={
              item.isPrivate ? (
                <PrivateRoute>{item.element}</PrivateRoute>
              ) : (
                item.element
              )
            }
          />
        ))}
    </Route>
  </Routes>
);
