import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import CollectionChooser from "@/pages/create/components/CollectionChooser";
import { PreviewNftCard } from "@/components/NFT/NftCard";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useAuthHandler } from "@/handlers/AuthHandler";
import { USER_ENDPOINTS, MARKETPLACE_ENDPOINTS } from "@/handlers/Endpoints";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { DeleteNFTDialog } from "@/components/NFT/NftCard";
import NFTService from "../../../services/NFTService";

function EditNft() {
  const { nftId } = useParams();
  const navigate = useNavigate();
  const [isOnMarketplace, setIsOnMarketplace] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { fetchWithAuth } = useAuthHandler();

  const { user } = useAuth();

  const {
    data: nftDetail,
    error: nftDetailError,
    isLoading: nftDetailLoading,
  } = useQuery(
    ["nft-detail", nftId],
    () => fetchWithAuth(MARKETPLACE_ENDPOINTS.NFT_DETAIL + `/${nftId}`),
    {
      enabled: !!nftId,
      retry: 1,
      onError: (error) => {
        console.error("Failed to fetch NFT details:", error);
      },
    }
  );

  const [nft, setNft] = useState({
    title: nftDetail?.data?.title || "",
    price: nftDetail?.data?.price.price.$numberDecimal || "",
    imgUrl: nftDetail?.data?.imgUrl || "",
    ownerDetails: {
      username: user.name,
      avatarUrl: user.avatarUrl,
      id: user._id,
    },
  });
  const [selectedCollection, setSelectedCollection] = useState(
    nftDetail?.data?.collection?._id || ""
  );

  useEffect(() => {
    console.log("NFT Detail", nftDetail);
    if (nftDetail?.data) {
      console.log("Fetched NFT details:", nftDetail.data);
      setNft((prev) => ({
        ...prev,
        title: nftDetail.data.title || "",
        price: nftDetail.data.price?.price?.$numberDecimal || "",
        imgUrl: nftDetail.data.imgUrl || "",
        tokenID: nftDetail.data.tokenID,
        isListed: nftDetail.data.insight.isListed,
      }));

      setIsOnMarketplace(nftDetail.data.insight.isListed);
      setSelectedCollection(nftDetail.data.collection?._id || "");
    }
  }, [nftDetail]);
  const [collection, setCollection] = useState([]);

  const fetchCollections = async () => {
    try {
      const result = await fetchWithAuth(USER_ENDPOINTS.GET_COLLECTIONS);
      setCollection(result.data);
    } catch (error) {
      console.error("Error fetching collections", error);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setNft((prev) => ({ ...prev, price: value }));
    }
  };

  const handleEditNft = async () => {
    if (!nft.title || !nft.price) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsLoading(true);

    try {
      const nftData = {
        price: nft.price,
        _id: nftId,
        isListed: isOnMarketplace,
        collection: selectedCollection,
        oldCollection: {
          id: nftDetail.data?.collection?._id || "",
        },
      };

      // update NFT listing status on blockchain
      const isListedUpdate = await NFTService.updateTokenListing(
        nft.tokenID,
        nftData.isListed
      );

      // update NFT price on blockchain
      const priceUpdate = await NFTService.updateTokenPrice(
        nft.tokenID,
        nftData.price
      );

      // update NFT on backend
      const result = await fetchWithAuth(
        USER_ENDPOINTS.PROFILE.EDIT_NFT + `/${nftId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(nftData),
        }
      );

      if (result.success !== true) {
        throw new Error(result.message || "Error editing NFT on backend");
      }

      toast.success("Edit Nft successfully");

      setNft({
        title: "",
        price: "",
      });

      navigate(`/user/${user._id}/owned `);
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="flex flex-col min-h-screen my-20 mx-10 xl:mx-56 ">
        <h1 className="text-primary-foreground text-6xl font-bold">
          Edit your NFT
        </h1>
        <span className="text-muted-foreground mt-5 text-2xl">
          Fill in the details to edit your Nft
        </span>
        <div className="grid grid-cols-[60%_5%_35%] mt-10">
          <div className="space-y-14">
            {/* Blockchain connection */}

            <div className="flex items-center justify-between">
              <div>
                <span className="text-primary-foreground text-3xl font-bold">
                  Put on marketplace
                </span>
                <p className="text-xl mt-2 text-muted-foreground">
                  Enter price to allow users instantly purchase your NFT
                </p>
              </div>
              <Switch
                checked={isOnMarketplace}
                onCheckedChange={setIsOnMarketplace}
                aria-label="Toggle marketplace listing"
              />
            </div>
            {isOnMarketplace && (
              <div className="space-y-4">
                <span className="text-primary-foreground text-3xl font-bold">
                  Price
                </span>
                <div className="relative">
                  <Input
                    id="price"
                    placeholder="Enter price"
                    value={nft.price}
                    onChange={handlePriceChange}
                    className={`pl-5 py-8 text-4xl text-primary-foreground rounded-xl bg-[hsl(232,40%,35%)]`}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-primary-foreground font-medium">
                    ETH
                  </div>
                </div>
              </div>
            )}

            {/* Collection */}
            <div className="space-y-4">
              <CollectionChooser
                collections={collection}
                onCollectionSelect={setSelectedCollection}
                initialCollection={nftDetail?.data?.collection}
              />
            </div>
          </div>

          {/* Gap */}
          <div></div>

          {/* Preview */}
          <div className="max-h-[600px] sticky top-20 w-full overflow-auto">
            <div className="flex flex-col gap-10 mx-5">
              <span className="text-primary-foreground text-3xl font-bold">
                Preview
              </span>
              <PreviewNftCard stamp={nft} />
            </div>
          </div>

          <div className="flex gap-10">
            <Button
              className="mt-10 w-1/2 mx-auto p-8 bg-white text-black  text-2xl font-bold"
              onClick={handleEditNft}
              disabled={isLoading}
            >
              Save NFT
            </Button>
            <DeleteNFTDialog stampId={nftId}>
              <Button className="mt-10 w-1/2 mx-auto p-8 bg-destructive text-white text-2xl font-bold">
                Delete NFT
              </Button>
            </DeleteNFTDialog>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditNft;
