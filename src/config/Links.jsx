import React from "react";
import {
  User,
  CreditCard,
  Settings,
  LifeBuoy,
  LogOut,
  ShoppingCart,
  Users,
} from "lucide-react";

import Billing from "@/pages/billing/Billing";
import Create from "@/pages/create/Create";
import Help from "@/pages/help/Help";
import Marketplace from "@/pages/marketplace/Marketplace";
import Profile from "@/pages/profile/Profile";
import Setting from "@/pages/setting/Setting";
import SignIn from "@/pages/auth/sign-in/SignIn";
import SignUp from "@/pages/auth/sign-up/SignUp";
import SignOut from "@/pages/auth/sign-out/SignOut";
import Home from "@/pages/home/Home";
import NftDetail from "@/pages/nft/NftDetail";
import NftsMarketplace from "@/pages/marketplace/nfts/NftsMarketplace";
import CollectionsMarketplace from "@/pages/marketplace/collections/CollectionsMarketplace";
import UsersMarketplace from "@/pages/marketplace/users/UsersMarketplace";

const menuItems = [
  {
    name: "Profile",
    group: "user",
    link: "/profile",
    layout: "RootLayout",
    icon: <User />,
    element: <Profile />,
    isPrivate: true,
  },
  {
    name: "Billing",
    group: "user",
    link: "/billing",
    layout: "RootLayout",
    icon: <CreditCard />,
    element: <Billing />,
    isPrivate: true,
  },
  {
    name: "Setting",
    group: "help",
    link: "/settings",
    layout: "RootLayout",
    icon: <Settings />,
    element: <Setting />,
    isPrivate: true,
  },
  {
    name: "Help Center",
    group: "help",
    link: "/help",
    layout: "RootLayout",
    icon: <LifeBuoy />,
    element: <Help />,
    isPrivate: false,
  },
  {
    name: "Log out",
    group: "logout",
    layout: "AuthLayout",
    link: "/auth/sign-out",
    icon: <LogOut />,
    element: <SignOut />,
    isPrivate: false,
  },
  {
    name: "Sign in",
    group: "auth",
    link: "/auth/sign-in",
    layout: "AuthLayout",
    icon: <User />,
    element: <SignIn />,
    isPrivate: false,
  },
  {
    name: "Sign up",
    group: "auth",
    link: "/auth/sign-up",
    layout: "AuthLayout",
    icon: <User />,
    element: <SignUp />,
    isPrivate: false,
  },
  {
    name: "Create",
    group: "create",
    layout: "RootLayout",
    link: "/create",
    icon: <User />,
    element: <Create />,
    isPrivate: true,
  },
  {
    name: "Marketplace",
    group: "create",
    link: "/marketplace/nfts",
    layout: "MarketplaceLayout",
    icon: <ShoppingCart />,
    element: <NftsMarketplace />,
    isPrivate: false,
  },
  {
    name: "Home",
    group: "home",
    layout: "RootLayout",
    link: "/",
    icon: <User />,
    element: <Home />,
    isPrivate: false,
  },
  {
    name: "NFT Detail",
    group: "nft",
    link: "/nft/:nftId",
    layout: "RootLayout",
    element: <NftDetail />,
    isPrivate: false,
  },
  {
    name: "NFTs",
    group: "marketplace",
    link: "/marketplace/nfts",
    layout: "MarketplaceLayout",
    element: <NftsMarketplace />,
    isPrivate: false,
  },
  {
    name: "Collections",
    group: "marketplace",
    link: "/marketplace/collections",
    layout: "MarketplaceLayout",
    element: <CollectionsMarketplace />,
    isPrivate: false,
  },
  {
    name: "Users",
    group: "marketplace",
    link: "/marketplace/users",
    layout: "MarketplaceLayout",
    element: <UsersMarketplace />,
    isPrivate: false,
  },
];

export default menuItems;

