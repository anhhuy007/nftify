"use client";

import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import userPlaceHolder from "@/assets/user-placeholder.png";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2, Pencil } from "lucide-react";
import toast from "react-hot-toast";
import { useCart } from "@/context/CartProvider";
import { useWallet } from "@/context/WalletProvider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { useAuthHandler } from "@/handlers/AuthHandler";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";
import { USER_ENDPOINTS } from "../../handlers/Endpoints";

export function DeleteNFTDialog({ stampId, children: child }) {
  const navigate = useNavigate();
  const { fetchWithAuth } = useAuthHandler();
  const { user } = useAuth();

  const deleteStamp = async () => {
    try {
      const result = await fetchWithAuth(
        USER_ENDPOINTS.PROFILE.DELETE_NFT + `/${stampId}`,
        {
          method: "DELETE",
        }
      );
      if (result.success !== true) {
        throw new Error("Failed to delete stamp");
      } else {
        toast.success("Stamp deleted successfully");
        navigate(`/user/${user._id}/owned `);
      }
    } catch (error) {
      console.error("Failed to delete stamp:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{child}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] text-primary-foreground">
        <DialogHeader>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this NFT? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              variant="destructive"
              type="button"
              onClick={() => deleteStamp(stampId)}
            >
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export const handleAddToCart = (title) => {
  toast.success(
    <>
      <span className="">"{title}" added to your cart 🛒.</span>
    </>
  );
};

export default function NftCard({ stamp }) {
  const [isHovered, setIsHovered] = useState(false);
  const { addItemToCart } = useCart();
  const { address } = useWallet();

  let isBuyable = false;
  if (stamp.insight.isListed && stamp.ownerDetails.wallet_address !== address) {
    isBuyable = true;
  }

  const handleCartClick = async () => {
    try {
      if (!isBuyable) {
        toast.error("This stamp is not for sale");
        return;
      }

      const result = await addItemToCart(stamp._id);
      if (result) {
        handleAddToCart(stamp.title);
      }
    } catch (error) {
      toast.error("Failed: " + error.message);
    }
  };

  return (
    <>
      <div
        className={`w-[260x] h-96 p-[2px] rounded-xl transition-all duration-300 ease-in-out
          ${
            isHovered
              ? "bg-gradient-to-r from-[hsl(166,75%,66%)] via-[hsl(281,76%,89%)] to-[hsl(247,85%,64%)] shadow-[0_0_15px_5px_rgba(255,255,255,0.5)]"
              : "bg-card"
          }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Card
          className={`w-full h-full p-0 bg-card transition-all duration-300 
          ${
            isHovered
              ? "shadow-[0_-5px_10px_rgba(0,0,0,0.2),0_5px_10px_rgba(0,0,0,0.2)]"
              : ""
          }`}
        >
          <Link to={`/nft/${stamp._id}`}>
            <CardHeader
              className={`px-3 pt-3 pb-0 transition-all duration-300 ${
                isHovered ? "h-[255px]" : "h-[306px]"
              }`}
            >
              <img
                src={stamp.imgUrl ?? userPlaceHolder}
                alt="Stamp"
                className="w-full h-full object-cover shadow-sm rounded-xl transition-all duration-300"
              />
            </CardHeader>
          </Link>
          <CardContent
            className={`px-3 pt-2 transition-all duration-300 ${
              isHovered ? "h-[150px]" : "h-[90px]"
            }`}
          >
            <Link to={`/nft/${stamp._id}`}>
              <div className="grid grid-cols-[20%_2%_45%_3%_20%] items-center mt-1">
                <img
                  // get placeholder image if null
                  src={stamp?.ownerDetails?.avatarUrl || userPlaceHolder}
                  alt={stamp?.ownerDetails?.name || "Unknown"}
                  className="w-11 h-11 rounded-sm"
                />
                <div></div>
                <div className="flex flex-col">
                  <p className="text-xs text-zinc-300 dark:text-zinc-400 line-clamp-1">
                    {stamp.ownerDetails?.name || "Unknown"}
                  </p>
                  <p className="text-sm font-semibold line-clamp-1">
                    {stamp.title}
                  </p>
                </div>
                <div></div>
                <div className="flex-1 text-right whitespace-nowrap">
                  {stamp.price.$numberDecimal ?? "Not for sale"} ETH
                </div>
              </div>
            </Link>
            {isHovered && (
              <div className="grid grid-cols-[80%_5%_15%]">
                <Link to={`/nft/${stamp._id}`}>
                  <Button className="  hover:bg-gray-400 font-semibold text-primary-foreground px-4 py-2 mt-3 rounded-md w-full transition-colors duration-200">
                    Collect now!
                  </Button>
                </Link>
                <div></div>
                <Button
                  className="hover:bg-gray-400 font-semibold text-primary-foreground px-4 py-2 mt-3 rounded-md w-full transition-colors duration-200"
                  onClick={handleCartClick}
                >
                  <ShoppingCart className="h-10 w-10" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export function SmallNftCard({ stamp }) {
  const [isHovered, setIsHovered] = useState(false);
  const { addItemToCart } = useCart();
  const { address } = useWallet();

  let isBuyable = false;
  if (stamp.isListed && stamp.ownerDetails.wallet_address !== address) {
    isBuyable = true;
  }

  const handleCartClick = async () => {
    try {
      if (!isBuyable) {
        toast.error("This stamp is not for sale");
        return;
      }

      const result = await addItemToCart(stamp._id);
      if (result) {
        handleAddToCart(stamp.title);
      }
    } catch (error) {
      toast.error("Failed: " + error.message);
    }
  };

  return (
    <div
      className={`w-[16vw] h-[370px] p-[2px] rounded-xl transition-all duration-300 ease-in-out
        ${
          isHovered
            ? "bg-gradient-to-r from-[hsl(166,75%,66%)] via-[#ebcef8] to-[hsl(247,85%,64%)] shadow-[0_0_15px_5px_rgba(255,255,255,0.5)]"
            : "bg-card"
        }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card
        className={`w-full h-full p-0 overflow-hidden bg-card border-2 transition-all duration-300
          ${
            isHovered
              ? "shadow-[0_-5px_10px_rgba(0,0,0,0.2),0_5px_10px_rgba(0,0,0,0.2)]"
              : ""
          }`}
      >
        <Link to={`/nft/${stamp._id}`}>
          <CardHeader
            className={`px-3 pt-5 pb-0 transition-all duration-300 ${
              isHovered ? "h-[265px]" : "h-[320px]"
            }`}
          >
            <img
              src={stamp.imgUrl ?? userPlaceHolder}
              alt="Stamp"
              className="w-full h-full object-cover shadow-sm rounded-xl transition-all duration-300"
            />
          </CardHeader>
        </Link>
        <CardContent className={`px-3 pt-2 transition-all duration-300`}>
          <Link to={`/nft/${stamp._id}`}>
            <div className="flex justify-between items-center gap-4">
              <p className="text-lg font-semibold line-clamp-1">
                {stamp.title}
              </p>
              <p className="text-lg font-semibold text-right whitespace-nowrap ">
                {stamp.price?.$numberDecimal} ETH
              </p>
            </div>
          </Link>
          {isHovered && (
            <div className="grid grid-cols-[80%_5%_15%]">
              <Link to={`/nft/${stamp._id}`}>
                <Button className="  hover:bg-gray-400 font-semibold text-primary-foreground px-4 py-2 mt-3 rounded-md w-full transition-colors duration-200">
                  Collect now!
                </Button>
              </Link>
              <div></div>
              <Button
                className="hover:bg-gray-400 font-semibold text-primary-foreground px-4 py-2 mt-3 rounded-md w-full transition-colors duration-200"
                onClick={handleCartClick}
              >
                <ShoppingCart className="h-10 w-10" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export function BigNftCard({ stamp }) {
  const [isHovered, setIsHovered] = useState(false);
  const { addItemToCart } = useCart();
  const { address } = useWallet();

  console.log("Big NFT Card", stamp);

  let isBuyable = false;
  if (stamp.isListed && stamp.ownerDetails.wallet_address !== address) {
    isBuyable = true;
  }

  const handleCartClick = async () => {
    try {
      if (!isBuyable) {
        toast.error("This stamp is not for sale");
        return;
      }

      const result = await addItemToCart(stamp._id);
      if (result) {
        handleAddToCart(stamp.title);
      }
    } catch (error) {
      toast.error("Failed: " + error.message);
    }
  };

  return (
    <div
      className={`w-[20vw] h-[440px] p-[2px] rounded-xl transition-all duration-300 ease-in-out
        ${
          isHovered
            ? "bg-gradient-to-r from-[hsl(166,75%,66%)] via-[hsl(281,76%,89%)] to-[hsl(247,85%,64%)] shadow-[0_0_15px_5px_rgba(255,255,255,0.5)]"
            : "bg-card"
        }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card
        className={`w-full h-full p-0 overflow-hidden bg-card border-2 transition-all duration-300
         ${
           isHovered
             ? "shadow-[0_-5px_10px_rgba(0,0,0,0.2),0_5px_10px_rgba(0,0,0,0.2)]"
             : ""
         }`}
      >
        <Link to={`/nft/${stamp._id}`}>
          <CardHeader
            className={`px-3 pt-3 pb-0 transition-all duration-300 ${
              isHovered ? "h-[310px]" : "h-[360px]"
            }`}
          >
            <img
              src={stamp.imgUrl ?? userPlaceHolder}
              alt="Stamp"
              className="w-full h-full object-cover shadow-sm rounded-xl transition-all duration-300"
            />
          </CardHeader>
        </Link>
        <CardContent
          className={`px-3 pt-2 transition-all duration-300 ${
            isHovered ? "h-[150px]" : "h-[90px]"
          }`}
        >
          <Link to={`/nft/${stamp._id}`}>
            <div className="grid grid-cols-[20%_49%_1%_20%]  items-center">
              <img
                src={stamp?.ownerDetails?.avatarUrl || userPlaceHolder}
                alt={stamp?.ownerDetails?.name || "Unknown"}
                className="w-12 h-12 rounded-sm border-2"
              />
              <div className="flex flex-col">
                <p className="text-xl font-bold text-zinc-400 dark:text-zinc-400 line-clamp-1">
                  {stamp?.ownerDetails?.name || "Unknown"}
                </p>
                <p className="text-lg font-semibold line-clamp-1">
                  {stamp.title}
                </p>
              </div>
              <div></div>
              <div className="flex-1 text-right whitespace-nowrap">
                <p className="text-lg font-semibold">
                  {stamp?.price?.$numberDecimal ?? "Not for sale"} ETH
                </p>
              </div>
            </div>
          </Link>
          {isHovered && (
            <div className="grid grid-cols-[80%_5%_15%]">
              <Link to={`/nft/${stamp._id}`}>
                <Button className="  hover:bg-gray-400 font-semibold text-primary-foreground px-4 py-2 mt-3 rounded-md w-full transition-colors duration-200">
                  Collect now!
                </Button>
              </Link>
              <div></div>
              <Button
                className="hover:bg-gray-400 font-semibold text-primary-foreground px-4 py-2 mt-3 rounded-md w-full transition-colors duration-200"
                onClick={handleCartClick}
              >
                <ShoppingCart className="h-10 w-10" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export function PreviewNftCard({ stamp }) {
  let img;

  if (stamp.imgUrl instanceof Blob || stamp.imgUrl instanceof File) {
    img = URL.createObjectURL(stamp.imgUrl);
  } else if (typeof stamp.imgUrl === "string") {
    img = stamp.imgUrl;
  } else {
    console.error(
      "Invalid imgUrl format. Expected Blob, File, or URL:",
      stamp.imgUrl
    );
  }

  const [isHovered, setIsHovered] = useState(false);
  const { addItemToCart } = useCart();

  const handleCartClick = async () => {
    try {
      const result = await addItemToCart(stamp._id);
      if (result) {
        handleAddToCart(stamp.title);
      }
    } catch (error) {
      toast.error("Failed: " + error.message);
    }
  };

  return (
    <div
      className={`w-[330px] h-[480px] p-[2px] rounded-xl transition-all duration-300 ease-in-out
        ${
          isHovered
            ? "bg-gradient-to-r from-[hsl(166,75%,66%)] via-[hsl(281,76%,89%)] to-[hsl(247,85%,64%)] shadow-[0_0_15px_5px_rgba(255,255,255,0.5)]"
            : "bg-card"
        }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card
        className={`w-full h-full p-0 overflow-hidden bg-card border-2 transition-all duration-300
         ${
           isHovered
             ? "shadow-[0_-5px_10px_rgba(0,0,0,0.2),0_5px_10px_rgba(0,0,0,0.2)]"
             : ""
         }`}
      >
        <CardHeader
          className={`px-3 pt-3 pb-0 transition-all duration-300 ${
            isHovered ? "h-[340px]" : "h-[390px]"
          }`}
        >
          <img
            src={img ?? userPlaceHolder}
            alt="Stamp"
            className="w-full h-full object-cover shadow-sm rounded-xl transition-all duration-300"
          />
        </CardHeader>
        <CardContent
          className={`px-3 pt-2 transition-all duration-300 ${
            isHovered ? "h-[150px]" : "h-[90px]"
          }`}
        >
          <div className="grid grid-cols-[20%_54%_5%_20%] mt-1  items-center">
            <img
              src={stamp?.ownerDetails?.avatarUrl || userPlaceHolder}
              alt={stamp?.ownerDetails?.username || "Unknown"}
              className="w-12 h-12 rounded-sm border-2"
            />
            <div className="flex flex-col">
              <p className="text-xl font-bold text-zinc-400 dark:text-zinc-400 line-clamp-1 truncate w-full">
                {stamp?.ownerDetails?.username || "Unknown"}
              </p>
              <p className="text-lg font-semibold line-clamp-1">
                {stamp.title}
              </p>
            </div>
            <div></div>
            <div className="flex-1 text-right ">
              {stamp.price ? (
                <p className="text-lg font-semibold">
                  {stamp.price ?? "Not for sale"} ETH
                </p>
              ) : (
                <p className="text-lg font-semibold whitespace-nowrap">
                  Not for <br /> SALE
                </p>
              )}
            </div>
          </div>
          {isHovered && (
            <div className="grid grid-cols-[80%_5%_15%]">
              <Button className="  hover:bg-gray-400 font-semibold text-primary-foreground px-4 py-2 mt-3 rounded-md w-full transition-colors duration-200">
                Collect now!
              </Button>
              <div></div>
              <Button
                className="hover:bg-gray-400 font-semibold text-primary-foreground px-4 py-2 mt-3 rounded-md w-full transition-colors duration-200"
                onClick={handleCartClick}
              >
                <ShoppingCart className="h-10 w-10" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export function SmallEditNftCard({ stamp }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`w-[16vw] h-[370px] p-[2px] rounded-xl transition-all duration-300 ease-in-out
        ${
          isHovered
            ? "bg-gradient-to-r from-[hsl(166,75%,66%)] via-[#ebcef8] to-[hsl(247,85%,64%)] shadow-[0_0_15px_5px_rgba(255,255,255,0.5)]"
            : "bg-card"
        }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card
        className={`w-full h-full p-0 overflow-hidden bg-card border-2 transition-all duration-300
          ${
            isHovered
              ? "shadow-[0_-5px_10px_rgba(0,0,0,0.2),0_5px_10px_rgba(0,0,0,0.2)]"
              : ""
          }`}
      >
        <Link to={`/nft/${stamp._id}`}>
          <CardHeader
            className={`px-3 pt-5 pb-0 transition-all duration-300 ${
              isHovered ? "h-[265px]" : "h-[320px]"
            }`}
          >
            <img
              src={stamp.imgUrl ?? userPlaceHolder}
              alt="Stamp"
              className="w-full h-full object-cover shadow-sm rounded-xl transition-all duration-300"
            />
          </CardHeader>
        </Link>
        <CardContent className={`px-3 pt-2 transition-all duration-300`}>
          <Link to={`/nft/${stamp._id}`}>
            <div className="flex justify-between items-center gap-4">
              <p className="text-lg font-semibold line-clamp-1">
                {stamp.title}
              </p>
              <p className="text-lg font-semibold text-right whitespace-nowrap ">
                {stamp.price?.$numberDecimal} ETH
              </p>
            </div>
          </Link>
          {isHovered && (
            <div className="grid grid-cols-[80%_5%_15%]">
              <Link to={`/edit/nft/${stamp._id}`}>
                <Button className="  hover:bg-gray-400 font-semibold text-primary-foreground px-4 py-2 mt-3 rounded-md w-full transition-colors duration-200">
                  Edit <Pencil className="h-10 w-10" />
                </Button>
              </Link>
              <div></div>
              <DeleteNFTDialog stampId={stamp._id}>
                <Button className="hover:bg-gray-400 font-semibold bg-destructive text-primary-foreground px-4 py-2 mt-3 rounded-md w-full transition-colors duration-200">
                  <Trash2 className="h-10 w-10" />
                </Button>
              </DeleteNFTDialog>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export function BigEditNftCard({ stamp }) {
  const [isHovered, setIsHovered] = useState(false);
  const { address } = useWallet();

  return (
    <div
      className={`w-[20vw] h-[440px] p-[2px] rounded-xl transition-all duration-300 ease-in-out
        ${
          isHovered
            ? "bg-gradient-to-r from-[hsl(166,75%,66%)] via-[hsl(281,76%,89%)] to-[hsl(247,85%,64%)] shadow-[0_0_15px_5px_rgba(255,255,255,0.5)]"
            : "bg-card"
        }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card
        className={`w-full h-full p-0 overflow-hidden bg-card border-2 transition-all duration-300
         ${
           isHovered
             ? "shadow-[0_-5px_10px_rgba(0,0,0,0.2),0_5px_10px_rgba(0,0,0,0.2)]"
             : ""
         }`}
      >
        <Link to={`/nft/${stamp._id}`}>
          <CardHeader
            className={`px-3 pt-3 pb-0 transition-all duration-300 ${
              isHovered ? "h-[310px]" : "h-[360px]"
            }`}
          >
            <img
              src={stamp.imgUrl ?? userPlaceHolder}
              alt="Stamp"
              className="w-full h-full object-cover shadow-sm rounded-xl transition-all duration-300"
            />
          </CardHeader>
        </Link>
        <CardContent
          className={`px-3 pt-2 transition-all duration-300 ${
            isHovered ? "h-[150px]" : "h-[90px]"
          }`}
        >
          <Link to={`/nft/${stamp._id}`}>
            <div className="grid grid-cols-[20%_49%_1%_20%]  items-center">
              <img
                src={stamp?.ownerDetails?.avatarUrl || userPlaceHolder}
                alt={stamp?.ownerDetails?.name || "Unknown"}
                className="w-12 h-12 rounded-sm border-2"
              />
              <div className="flex flex-col">
                <p className="text-xl font-bold text-zinc-400 dark:text-zinc-400 line-clamp-1">
                  {stamp?.ownerDetails?.name || "Unknown"}
                </p>
                <p className="text-lg font-semibold line-clamp-1">
                  {stamp.title}
                </p>
              </div>
              <div></div>
              <div className="flex-1 text-right whitespace-nowrap">
                <p className="text-lg font-semibold">
                  {stamp.price.$numberDecimal ?? "Not for sale"} ETH
                </p>
              </div>
            </div>
          </Link>
          {isHovered && (
            <div className="grid grid-cols-[80%_5%_15%]">
              <Link to={`/edit/nft/${stamp._id}`}>
                <Button className="  hover:bg-gray-400 font-semibold text-primary-foreground px-4 py-2 mt-3 rounded-md w-full transition-colors duration-200">
                  Edit <Pencil className="h-10 w-10" />
                </Button>
              </Link>
              <div></div>
              <DeleteNFTDialog stampId={stamp._id}>
                <Button className="hover:bg-gray-400 font-semibold bg-destructive text-primary-foreground px-4 py-2 mt-3 rounded-md w-full transition-colors duration-200">
                  <Trash2 className="h-10 w-10" />
                </Button>
              </DeleteNFTDialog>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
