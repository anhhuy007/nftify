import { BrowserRouter, Routes, Route } from "react-router-dom"; // Import BrowserRouter, Routes và Route
import RootLayout from "@/layouts/RootLayout";
import AuthLayout from "@/layouts/AuthLayout";
import MarketplaceLayout from "@/layouts/MarketplaceLayout";
import menuItems from "@/config/Links";
import PrivateRoute from "@/routes/PrivateRoute"; // Import PrivateRoute

const renderRoutes = (layout) => {
  return menuItems
    .filter((item) => item.layout === layout)
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
      }
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
    });
};

export const router = (
  <Routes>
    <Route path="/" element={<RootLayout />}>
      {renderRoutes("RootLayout")}
    </Route>
    <Route path="/auth" element={<AuthLayout />}>
      {renderRoutes("AuthLayout")}
    </Route>
    <Route path="/marketplace" element={<MarketplaceLayout />}>
      {renderRoutes("MarketplaceLayout")}
    </Route>
  </Routes>
);
