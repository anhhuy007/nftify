import React from "react";
import {
  User,
  CreditCard,
  Settings,
  LifeBuoy,
  LogOut,
  ShoppingCart,
  Users,
  Shield,
  Bell,
  Heart,
} from "lucide-react";

import CreateNft from "@/pages/create/CreateNft";
import Help from "@/pages/help/Help";
import Setting from "@/pages/setting/Setting";
import SignIn from "@/pages/auth/sign-in/SignIn";
import SignUp from "@/pages/auth/sign-up/SignUp";
import SignOut from "@/pages/auth/sign-out/SignOut";
import Home from "@/pages/home/Home";
import NftDetail from "@/pages/nft/NftDetail";
import NftsMarketplace from "@/pages/marketplace/nfts/NftsMarketplace";
import CollectionsMarketplace from "@/pages/marketplace/collections/CollectionsMarketplace";
import UsersMarketplace from "@/pages/marketplace/users/UsersMarketplace";
import CollectionDetail from "@/pages/collection/CollectionDetail";
import UserDetail from "@/pages/user/UserDetail";
import UserActivities from "@/pages/user/UserActivities";
import UserCollections from "@/pages/user/UserCollections";
import UserNfts from "@/pages/user/UserNfts";
import CreateCollection from "@/pages/create/CreateCollection";
import Profile from "@/pages/setting/Profile/Profile";
import Notification from "@/pages/setting/Notification/Notification";
import Account from "@/pages/setting/Account/Account";
import EditCollection from "@/pages/edit/collection/EditCollection";
import EditNft from "@/pages/edit/nft/EditNft";

const menuItems = [
  {
    name: "Profile",
    group: "user",
    link: "/user/:userId",
    layout: "RootLayout",
    icon: <User />,
    element: <UserDetail />,
    isPrivate: true,
    children: [
      {
        name: "Owned",
        link: "owned",
        element: <UserNfts />,
      },
      {
        name: "On Sale",
        link: "onSale",
        element: <UserNfts />,
      },
      {
        name: "Collections",
        link: "collections",
        element: <UserCollections />,
      },
      {
        name: "Created",
        link: "created",
        element: <UserNfts />,
      },
      {
        name: "Activity",
        link: "activity",
        element: <UserActivities />,
      },
      {
        name: "Liked",
        link: "liked",
        element: <UserNfts />,
      },
    ],
  },
  {
    name: "Favorites",
    group: "user",
    link: "/user/:userId/favorites",
    layout: "RootLayout",
    icon: <Heart />,
    element: <UserDetail />,
    isPrivate: true,
  },
  {
    name: "Setting",
    group: "help",
    link: "/setting",
    layout: "RootLayout",
    icon: <Settings />,
    element: <Setting />,
    isPrivate: true,
    children: [
      {
        name: "Profile",
        link: "profile",
        icon: <User size={32} />,
        element: <Profile />,
      },
      {
        name: "Account",
        link: "account",
        icon: <Shield size={32} />,
        element: <Account />,
      },
      {
        name: "Notification",
        link: "notification",
        icon: <Bell size={32} />,
        element: <Notification />,
      },
    ],
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
    name: "Create Collection",
    group: "create",
    layout: "RootLayout",
    link: "/create/collection",
    icon: <User />,
    element: <CreateCollection />,
    // isPrivate: true,
  },
  {
    name: "Create",
    group: "create",
    layout: "RootLayout",
    link: "/create/nft",
    icon: <User />,
    element: <CreateNft />,
    // isPrivate: true,
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
    name: "Edit NFT",
    group: "edit",
    link: "/edit/nft/:nftId",
    layout: "RootLayout",
    element: <EditNft />,
    // isPrivate: true,
  },
  {
    name: "Edit Collection",
    group: "edit",
    link: "/edit/collection/:collectionId",
    layout: "RootLayout",
    element: <EditCollection />,
    // isPrivate: true,
  },
  {
    name: "Edit Collection",
    group: "edit",
    link: "/edit/collection/:collectionId",
    layout: "RootLayout",
    element: <EditCollection />,
    // isPrivate: true,
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
  {
    name: "Collection Detail",
    group: "collection",
    link: "/collection/:id",
    layout: "RootLayout",
    element: <CollectionDetail />,
    isPrivate: false,
  },
  {
    name: "User Detail",
    group: "userDetail",
    link: "/user/:userId",
    layout: "RootLayout",
    element: <UserDetail />,
    children: [
      {
        name: "Owned",
        link: "owned",
        element: <UserNfts />,
      },
      {
        name: "On Sale",
        link: "onSale",
        element: <UserNfts />,
      },
      {
        name: "Collections",
        link: "collections",
        element: <UserCollections />,
      },
      {
        name: "Created",
        link: "created",
        element: <UserNfts />,
      },
      {
        name: "Activity",
        link: "activity",
        element: <UserActivities />,
      },
      {
        name: "Liked",
        link: "liked",
        element: <UserNfts />,
      },
    ],
  },
];

export default menuItems;
