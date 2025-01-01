import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Maximize2 } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import NftGeneralInformation from "@/pages/nft/components/NftGeneralInformation";
import NftDetailTabs from "@/pages/nft/components/NftDetailTabs";
import NftCarousel from "@/components/NFT/NftCarousel";
import { useQuery } from "react-query";
import LoadingAnimation from "@/components/ui/loading";
import ErrorAnimation from "@/components/ui/error";
import { Link } from "react-router-dom";
import { useAuthHandler } from "@/handlers/AuthHandler";
import { MARKETPLACE_ENDPOINTS } from "../../handlers/Endpoints";

export default function NftDetail() {
  const { nftId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [creatorNfts, setCreatorNfts] = useState([]);
  const { fetcher } = useAuthHandler();

  // NFT Detail Query
  const {
    data: nftDetail,
    error: nftDetailError,
    isLoading: nftDetailLoading,
  } = useQuery(
    ["nft-detail", nftId],
    () => fetcher(MARKETPLACE_ENDPOINTS.NFT_DETAIL + `/${nftId}`),
    {
      enabled: !!nftId,
      retry: 1,
      onError: (error) => {
        console.error("Failed to fetch NFT details:", error);
      },
    }
  );

  // More From Creator Query
  const {
    data: moreFromCreatorData,
    error: moreFromCreatorError,
    isLoading: moreFromCreatorLoading,
    refetch: refetchMoreFromCreator,
  } = useQuery(
    ["more-from-creator", nftDetail?.data?.creatorId],
    () => {
      if (!nftDetail?.data?.creatorId) {
        throw new Error("Creator ID not available");
      }
      return fetcher(
        `http://localhost:3000/api/v1/stamp/list/${nftDetail.data.creatorId}?page=1&limit=10`
      );
    },
    {
      enabled: !!nftDetail?.data?.creatorId,
      refetchOnWindowFocus: false,
      retry: 1,
      onError: (error) => {
        console.error("Failed to fetch creator's NFTs:", error);
      },
      // Directly use the data from API response
      onSuccess: (data) => {
        if (data) {
          setCreatorNfts(data);
        }
      },
    }
  );

  // Manually update creator NFTs when data is available
  useEffect(() => {
    if (moreFromCreatorData) {
      setCreatorNfts(moreFromCreatorData);
    }
  }, [moreFromCreatorData]);

  // Handle loading and error states
  if (nftDetailLoading) return LoadingAnimation();
  if (nftDetailError) return ErrorAnimation();

  // Render component
  return (
    <div className="w-full flex flex-col my-20 p-0 md:px-32 items-center justify-center gap-32">
      <div className="w-full flex-1 flex flex-col justify-center md:flex-row gap-16 md:gap-10 xl:gap-28">
        <div className="flex flex-col">
          <div className="relative">
            <img
              src={nftDetail.data.imgUrl}
              alt="NFT Image"
              className="w-full relative object-contain mx-auto md:mx-0 h-auto max-w-xs md:max-w-[600px] xl:max-w-[700px] aspect-square rounded-xl"
            />
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-black/50 hover:bg-primary hover:text-primary-foreground text-white rounded-full p-1"
                  aria-label="View full image"
                >
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="p-10">
                <img
                  src={nftDetail.data.imgUrl}
                  alt="Full size NFT"
                  className="max-w-[50vw] max-h-[80vw] w-full h-full"
                />
              </DialogContent>
            </Dialog>
          </div>
          <NftDetailTabs data={nftDetail.data} />
        </div>
        <NftGeneralInformation data={nftDetail.data} />
      </div>
      <div className="flex flex-col gap-10 items-center">
        <h2 className="text-3xl text-primary-foreground font-bold">
          More from this creator
        </h2>
        {moreFromCreatorLoading ? (
          <div>Loading creator's NFTs...</div>
        ) : moreFromCreatorError ? (
          <div className="text-red-500">
            Unable to load creator's NFTs.
            <button
              onClick={() => refetchMoreFromCreator()}
              className="ml-2 text-blue-500 underline"
            >
              Retry
            </button>
          </div>
        ) : creatorNfts?.items?.length > 0 ? (
          <NftCarousel data={creatorNfts} />
        ) : (
          <p className="text-gray-500">No additional NFTs from this creator</p>
        )}
        {nftDetail.data.creatorId && (
          <Link to={`/user/${nftDetail.data.creatorId}`}>
            <div className="p-4 border-2 rounded-xl text-primary-foreground flex justify-center cursor-pointer">
              <p>View creator NFTs</p>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
