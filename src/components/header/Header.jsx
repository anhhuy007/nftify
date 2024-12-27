import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Notification from "@/components/header/Notification";
import DropdownMenuComponent from "@/components/header/DropdownMenu";
import Cart from "@/components/header/Cart";
import { Separator } from "@/components/ui/separator";
import React, { useEffect } from "react";
import menuItems from "@/config/Links";
import { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import Logo from "../../assets/logo.svg";
import { useAuth } from "@/context/AuthProvider";
import LoginDialog from "@/components/auth/LoginDialog";
import { User, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { WalletButton } from "../ui/wallet-button";
import CreateAccountDialog from "../auth/CreateAccountDialog";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { isAuth } = useAuth();
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };
  const handleSubmit = (event) => {
    if (searchValue.trim() !== "") {
      navigate(`/marketplace/nfts?search=${searchValue}`);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <header className="fixed w-full top-0 left-0 right-0 bg-background border-b border-[var(--border)] z-50 shadow-2xl">
      <div className="container mx-auto px-4">
        <div className=" h-20  flex items-center justify-between">
          <div className="flex items-center justify-start gap-4">
            <Link to="/" className="flex-shrink-0">
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
                value={searchValue}
                onChange={handleSearch}
                placeholder="Search items, collections..."
                onKeyDown={handleKeyDown}
                className="w-[350px] h-10 py-6 pl-4 pr-10 rounded-xl"
              />
              <Button
                size="icon"
                variant="ghost"
                onClick={handleSubmit}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4">
              {isAuth ? (
                <>
                  <WalletButton />
                  <DropdownMenuComponent />
                  <Notification />
                  <Cart />
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2"> 
                    <LoginDialog>
                      <div className="flex items-center justify-center py-3 px-4 rounded-lg transition-all transform hover:scale-105 cursor-pointer hover:bg-white hover:text-black text-white bg-white/[.2]">
                        Login
                      </div>
                    </LoginDialog>

                    <CreateAccountDialog>
                      <div className="flex items-center justify-center p-3 rounded-lg transition-all transform hover:scale-105 cursor-pointer bg-purple-600 hover:bg-purple-700 text-white">
                        Create Account
                      </div>
                    </CreateAccountDialog>
                  </div>
                </>
              )}
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
                className="w-full h-20 pl-4 pr-10 rounded-xl"
                value={searchValue}
                onChange={handleSearch}
                onKeyDown={handleKeyDown}
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
