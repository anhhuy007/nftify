import { Link, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import Notification from "@/components/header/Notification";
import Cart from "@/components/header/Cart";
import { Separator } from "@/components/ui/separator";
import React from "react";
import menuItems from "@/config/Links"
import { User } from "lucide-react";

const renderMenuItems = (group, pathname) =>
  menuItems
    .filter((item) => item.group === group)
    .map((item) => (
      <DropdownMenuItem
        key={item.name}
        className={`${
          pathname === item.link ? "bg-primary text-primary-foreground" : ""
        } text-base font-normal py-3 pl-7`}
      >
        <Link to={item.link} className="flex items-center">
          <span className="text-xl mr-2">{item.icon}</span>
          <p className="ml-2 text-base">{item.name}</p>
        </Link>
      </DropdownMenuItem>
    ));

const DropdownMenuComponent = () => {
  const location = useLocation();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center justify-center p-3 rounded-lg border border-[var(--border)] transition-all transform hover:scale-105 cursor-pointer hover:bg-primary hover:text-primary-foreground">
          <User size={20} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52">
        <DropdownMenuLabel className="text-base font-medium py-2">
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-2" />
        <DropdownMenuGroup>
          {renderMenuItems("user", location.pathname)}
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="my-2" />
        <DropdownMenuGroup>
          {renderMenuItems("help", location.pathname)}
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="my-2" />
        <DropdownMenuGroup>
          {renderMenuItems("logout", location.pathname)}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

function Header() {
  return (
    <header className="sticky top-0 left-0 right-0 bg-background border-b border-[var(--border)] z-50">
      <div className="container mx-auto px-2">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center justify-start gap-4">
            <Link to="/home" className="flex-shrink-0">
              Logo
            </Link>
            <Separator orientation="vertical" className="h-7 w-0.5" />
            <ul className="flex items-center justify-start gap-4">
              {menuItems
                .filter((item) => item.group === "create")
                .map((item, index, array) => (
                  <React.Fragment key={item.name}>
                    <Link
                      to={item.link}
                      className="group relative transition-all duration-300 ease-in-out hover:scale-105 flex items-center gap-2 border-b-0 hover:border-b-2 border-transparent hover:border-primary"
                    >
                      {item.name}
                    </Link>
                    {index < array.length - 1 && (
                      <Separator orientation="vertical" className="h-7 w-0.5" />
                    )}
                  </React.Fragment>
                ))}
            </ul>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search items, collections..."
                className="w-[320px] h-10 pl-4 pr-10 rounded-3xl bg-muted border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <DropdownMenuComponent />
            <Notification />
            <Cart />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
