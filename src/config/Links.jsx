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
  },
  {
    name: "Billing",
    group: "user",
    link: "/billing",
    layout: "RootLayout",
    icon: <CreditCard />,
    element: <Billing />,
  },
  {
    name: "Setting",
    group: "help",
    link: "/settings",
    layout: "RootLayout",
    icon: <Settings />,
    element: <Setting />,
  },
  {
    name: "Help Center",
    group: "help",
    link: "/help",
    layout: "RootLayout",
    icon: <LifeBuoy />,
    element: <Help />,
  },
  {
    name: "Log out",
    group: "logout",
    layout: "AuthLayout",
    link: "/auth/sign-out",
    icon: <LogOut />,
    element: <SignOut />,
  },
  {
    name: "Sign in",
    group: "auth",
    link: "/auth/sign-in",
    layout: "AuthLayout",
    icon: <User />,
    element: <SignIn />,
  },
  {
    name: "Sign up",
    group: "auth",
    link: "/auth/sign-up",
    layout: "AuthLayout",
    icon: <User />,
    element: <SignUp />,
  },
  {
    name: "Create",
    group: "create",
    layout: "RootLayout",
    link: "/create",
    icon: <User />,
    element: <Create />,
  },
  {
    name: "Marketplace",
    group: "create",
    link: "/marketplace/nfts",
    layout: "MarketplaceLayout",
    icon: <ShoppingCart />,
    element: <NftsMarketplace />,
  },
  {
    name: "Home",
    group: "home",
    layout: "RootLayout",
    link: "/",
    icon: <User />,
    element: <Home />,
  },
  {
    name: "NFT Detail",
    group: "nft",
    link: "/nft/:nftId",
    layout: "RootLayout",
    element: <NftDetail />,
  },
  {
    name: "NFTs",
    group: "marketplace",
    link: "/marketplace/nfts",
    layout: "MarketplaceLayout",
    element: <NftsMarketplace />,
  },
  {
    name: "Collections",
    group: "marketplace",
    link: "/marketplace/collections",
    layout: "MarketplaceLayout",
    element: <CollectionsMarketplace />,
  },
  {
    name: "Users",
    group: "marketplace",
    link: "/marketplace/users",
    layout: "MarketplaceLayout",
    element: <UsersMarketplace />,
  },
];

export default menuItems;
