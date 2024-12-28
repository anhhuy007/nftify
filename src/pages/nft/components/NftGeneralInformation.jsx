import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Eye, Heart, Upload, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { handleAddToCart } from "@/components/NFT/NftCard";
import { useCart } from "@/context/CartProvider";
import { useWallet } from "@/context/WalletProvider";
import CheckoutModal from "@/pages/checkout/CheckoutModal";

export default function NftGeneralInformation({ data: stamp }) {
  const { addItemToCart, removeItemFromCart } = useCart();
  const { address } = useWallet();

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

  let isBuyable = false;
  if (
    stamp.insight.isListed &&
    stamp.ownerDetails?.wallet_address !== address
  ) {
    isBuyable = true;
  }

  const handleBuyNow = async () => {
    try {
      await addItemToCart(stamp._id);
    } catch (error) {
      if (error.message === "Contract not initialized") {
        toast.error("Please connect your wallet first");
      } else {
        toast.error("Failed to process purchase: " + error.message);
      }
    }
  };

  const handleCancel = async () => {
    try {
      await removeItemFromCart(stamp._id);
    } catch (error) {
      toast.error("Failed: " + error.message);
    }
  }

  return (
    <>
      <Card className="w-full max-w-md bg-transparent shadow-none mx-auto md:mx-0 border-none">
        <CardContent className="">
          <Link to={`/collection/${stamp.collection?._id}`} className="group">
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
            <Link to={`/user/${stamp.creatorDetails?._id}`} className="group">
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

            <Link to={`/user/${stamp.ownerDetails?._id}`} className="group">
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
              <p className="text-2xl font-bold mt-2">
                {stamp.price.price.$numberDecimal} ETH
              </p>
              <p className="">${stamp.price.usdPrice} USD</p>
            </div>

            <div className="grid grid-cols-[80%_5%_15%]">
              {isBuyable ? (
                <CheckoutModal
                  style="w-full font-semibold py-6 bg-white text-black hover:bg-gray-400"
                  content={`Buy now for ${stamp.price.price.$numberDecimal} ETH`}
                  preprocess={handleBuyNow}
                  cancelCheckout={handleCancel}
                />
              ) : (
                <Button
                  className={
                    "w-full font-semibold py-6 bg-gray-300 text-gray-500 cursor-not-allowed"
                  }
                  disabled={!isBuyable}
                >
                  Not available for sale
                </Button>
              )}
              <div></div>
              <Button
                className={`w-full font-semibold py-6 ${
                  isBuyable
                    ? "bg-white text-black hover:bg-gray-400"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                onClick={
                  isBuyable ? () => handleCartClick(stamp._id) : undefined
                }
                disabled={!isBuyable}
              >
                <ShoppingCart className="h-10 w-10" />
              </Button>
            </div>
          </div>

          <Separator className="bg-secondary my-4 md:my-6" />

          <div className="mt-5">
            <h3 className="text-2xl font-bold mb-3">Attributes</h3>
            <div className="bg-card rounded-lg border-2 p-4 space-y-2">
              <div className="flex justify-between items-center py-2 border-b border-gray-400/70">
                <span className="text-gray-400 font-normal">Issued By</span>
                <span>{stamp.issuedBy || "N/A"}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-400/70">
                <span className="text-gray-400 font-normal">Release Date</span>
                <span>{formatDate(stamp.date) || "N/A"}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-400/70">
                <span className="text-gray-400 font-normal">Function</span>
                <span>{stamp.function || "N/A"}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-400/70">
                <span className="text-gray-400 font-normal">Face value</span>
                <span>{stamp.denom ? stamp.denom.$numberDecimal : "N/A"}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-400 font-normal">Color</span>
                <span>{stamp.color || "N/A"}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
