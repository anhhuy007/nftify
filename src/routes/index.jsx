import { Routes, Route } from "react-router-dom"; // Import Routes và Route
import RootLayout from "@/layouts/RootLayout";
import AuthLayout from "@/layouts/AuthLayout";
import MarketplaceLayout from "@/layouts/MarketplaceLayout";
import menuItems from "@/config/Links";
import PrivateRoute from "@/routes/PrivateRoute"; // Import PrivateRoute

export const router = (
  <Routes>
    {/* Root Layout */}
    <Route path="/" element={<RootLayout />}>
      {menuItems
        .filter((item) => item.layout === "RootLayout")
        .map((item) => (
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
          >
            {item.children &&
              item.children.map((child) => (
                <Route
                  key={child.link}
                  path={child.link}
                  element={
                    child.isPrivate ? (
                      <PrivateRoute>{child.element}</PrivateRoute>
                    ) : (
                      child.element
                    )
                  }
                />
              ))}
          </Route>
        ))}
    </Route>

    {/* Auth Layout */}
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

    {/* Marketplace Layout */}
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
