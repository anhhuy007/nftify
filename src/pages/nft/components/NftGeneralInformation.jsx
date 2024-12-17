"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Eye, Heart, Upload, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { handleAddToCart } from "@/components/NFT/NftCard";
import { useCart } from "@/context/CartProvider";

export default function NftGeneralInformation({ data: stamp }) {
  const { addItemToCart } = useCart();

  const handleCartClick = async () => {
    try {
      const result = await addItemToCart(stamp._id);
      if (result) {
        handleAddToCart(stamp.title);
      }
    }
    catch (error) {
      toast.error("Failed: " + error.message);
    }
  };

  const handleBuyNow = () => {
    // Call the buy now API here and show the success toast
    toast.success(
      <>
        <div className="flex flex-col items-center justify-center">
          <span>"{stamp.title}" bought successfully 🎉.</span>
          <span className="whitespace-nowrap">
            Please check your new stamp at{" "}
            <Link
              to="/user/:userId/owned"
              style={{ color: "lightblue", textDecoration: "underline" }}
            >
              here
            </Link>
            .
          </span>
        </div>
      </>
    );
  };
  return (
    <>
      <Card className="w-full max-w-md bg-transparent shadow-none mx-auto md:mx-0 border-none">
        <CardContent className="">
          <Link to={`/collection/${stamp.collection?.id}`} className="group">
            <div className="flex items-center gap-3 ">
              <Avatar className="h-10 w-10 group-hover:opacity-75 transition-opacity duration-200">
                <AvatarImage
                  src={stamp.collection?.thumbUrl || "/placeholder.jpg"}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="font-medium group-hover:underline">
                {stamp.collection?.name || "Not in collection"}
              </span>
            </div>
          </Link>

          <h1 className="text-4xl font-bold my-6 md:my-10">{stamp.title}</h1>

          <div className="flex gap-20">
            <Link to={`/user/${stamp.creatorDetails?.id}`} className="group">
              <div className="flex items-center gap-3">
                <Avatar className="group-hover:opacity-75 transition-opacity duration-200">
                  <AvatarImage src={stamp.creatorDetails?.avatarUrl} />
                  <AvatarFallback>CR</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm ">Creator</p>
                  <p className="font-medium group-hover:underline">
                    {stamp.creatorDetails?.name || "Unknow"}
                  </p>
                </div>
              </div>
            </Link>

            <Link to={`/user/${stamp.ownerDetails?.id}`} className="group">
              <div className="flex items-center gap-3">
                <Avatar className="group-hover:opacity-75 transition-opacity duration-200">
                  <AvatarImage src={stamp.ownerDetails?.avatarUrl} />
                  <AvatarFallback>CO</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm ">Current owner</p>
                  <p className="font-medium group-hover:underline">
                    {stamp.ownerDetails?.name || "Unknow"}
                  </p>
                </div>
              </div>
            </Link>
          </div>

          <Separator className="bg-secondary my-4 md:my-6" />

          <div className="flex gap-9">
            <button className="flex items-center gap-2  transition-colors">
              <Eye className="h-5 w-5" />
              <span>{stamp.insight.viewCount} views</span>
            </button>
            <button className="flex items-center gap-2  transition-colors">
              <Heart className="h-5 w-5" />
              <span>{stamp.insight.favoriteCount} favorites</span>
            </button>
            <button className="flex items-center gap-2  transition-colors">
              <Upload className="h-5 w-5" />
              <span>share</span>
            </button>
          </div>

          <div className="space-y-4 border-2 rounded-lg p-4 mt-5">
            <div className=" p-4 rounded-xl bg-card">
              <p className=" mb-1">Price</p>
              <p className="text-2xl font-bold">
                {stamp.price.price.$numberDecimal} ETH
              </p>
              <p className="">$262</p>
            </div>

            <div className="grid grid-cols-[80%_5%_15%]">
              <Button
                className="w-full bg-white text-black hover:bg-gray-400 font-semibold py-6"
                onClick={handleBuyNow}
              >
                Buy now for {stamp.price.price.$numberDecimal} ETH
              </Button>
              <div></div>
              <Button
                className="w-full bg-white text-black hover:bg-gray-400 font-semibold py-6"
                onClick={() => handleCartClick(stamp._id)}
              >
                <ShoppingCart className="h-10 w-10" />
              </Button>
            </div>

            <Button
              variant="outline"
              className="w-full border-none  py-6 bg-card"
            >
              Place a bid
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
