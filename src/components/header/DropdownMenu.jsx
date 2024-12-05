import React from 'react'
import {
    DropdownMenu as UI_DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import menuItems from "@/config/Links";

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

function DropdownMenuComponent() {
  const location = useLocation();
  return (
    <UI_DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center justify-center p-3 rounded-lg transition-all transform hover:scale-105 cursor-pointer hover:bg-white hover:text-black text-white bg-white/[.2]">
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
    </UI_DropdownMenu>
  );
}

export default DropdownMenuComponent; 