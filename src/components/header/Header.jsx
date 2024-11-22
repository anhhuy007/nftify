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
import { Button } from "@/components/ui/button";
import Notification from "@/components/header/Notification";
import Cart from "@/components/header/Cart";
import { Separator } from "@/components/ui/separator";
import React from "react";
import menuItems from "@/config/Links";
import { User } from "lucide-react";
import { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import Logo from "../../assets/logo.svg";

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
          <p className="ml-2">{item.name}</p>
        </Link>
      </DropdownMenuItem>
    ));

const DropdownMenuComponent = () => {
  const location = useLocation();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center justify-center p-3 rounded-lg transition-all transform hover:scale-105 cursor-pointer hover:bg-white hover:text-black text-white bg-white/[.2]">
          <User size={20}/>
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed w-full top-0 left-0 right-0 bg-background border-b border-[var(--border)] z-50">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center justify-start gap-4">
          <Link href="/" claName="flex-shrink-0">
              <img src={Logo} alt="Logo" className="h-5" />
            </Link>

            <Separator
              orientation="vertical"
              className="h-7 w-0.5 hidden md:block"
            />
            <nav className="hidden md:flex items-center justify-start gap-4">
              {menuItems
                .filter((item) => item.group === "create")
                .map((item, index, array) => (
                  <React.Fragment key={item.name}>
                    <Link
                      to={item.link}
                      className="group relative transition-all duration-300 ease-in-out hover:scale-105 flex items-center gap-2 border-b-0 hover:border-b-2 border-transparent hover:border-primary text-foreground font-semibold"
                    >
                      {item.name}
                    </Link>
                  </React.Fragment>
                ))}
            </nav>
          </div>

          <div className="hidden md:flex items-center gap-6 text-white">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search items, collections..."
                className="w-[320px] h-10 pl-4 pr-10 rounded-xl"
              />
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4">
              <DropdownMenuComponent />
              <Notification />
              <Cart />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <nav className="flex flex-col gap-4">
              {menuItems
                .filter((item) => item.group === "create")
                .map((item) => (
                  <Link
                    key={item.name}
                    to={item.link}
                    className="py-2 px-4 hover:bg-accent rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
            </nav>
            <div className="mt-4">
              <Input
                type="text"
                placeholder="Search items, collections..."
                className="w-full h-10 pl-4 pr-10 rounded-xl"
              />
            </div>
            <div className="mt-4 flex justify-between">
              <DropdownMenuComponent />
              <Notification />
              <Cart />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
