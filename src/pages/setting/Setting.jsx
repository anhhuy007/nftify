import React, { useEffect } from "react";
import menuItems from "@/config/Links";
import { Outlet, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

function Setting() {
  const settingItem = menuItems.find((item) => item.name === "Setting");
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === "/setting") {
      navigate("/setting/profile");
    }
  }, [navigate]);

  return (
    <>
      <div className="grid md:grid-cols-[25%_75%] min-h-screen">
        <div className="px-20 py-14 border-r-2 text-primary-foreground">
          <div className="flex flex-col gap-12 sticky top-28 z-10">
            <h1 className="text-5xl font-bold">Settings</h1>
            {settingItem?.children?.map((item) => (
              <NavLink
                key={item.name}
                to={item.link}
                className={({ isActive }) =>
                  `flex gap-8 ${isActive ? "" : "text-primary-foreground/50"}`
                }
              >
                {item.icon}
                <p className="text-2xl font-semibold">{item.name}</p>
              </NavLink>
            ))}
          </div>
        </div>
        <div className="text-primary-foreground container mx-auto p-14">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Setting;
