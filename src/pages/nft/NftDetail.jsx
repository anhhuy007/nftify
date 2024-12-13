"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Maximize2 } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import NftGeneralInformation from "@/pages/nft/components/NftGeneralInformation";
import NftDetailTabs from "@/pages/nft/components/NftDetailTabs";
import NftCarousel from "@/components/NFT/NftCarousel";
import { useQuery } from "react-query";
import LoadingAnimation from "@/components/ui/loading";
import ErrorAnimation from "@/components/ui/error";
import { Link } from "react-router-dom";
import { useAuthHandler } from "@/api/AuthHandler";
import { stampDetailApiEndpoint } from "@/api/Endpoints";

export default function NftDetail() {
  const { nftId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { fetcher } = useAuthHandler();

  const {
    data: nftDetail,
    error: nftDetailError,
    isLoading: nftDetailLoading,
  } = useQuery(["nft-detail", nftId], () => fetcher(stampDetailApiEndpoint + `/${nftId}`), {
    enabled: !!nftId,
  });

  const moreFromCreatorEndpoint = nftDetail
    ? `http://localhost:3000/api/v1/stamp/list/${nftDetail.creatorId}?page=1&limit=10`
    : null;

  const {
    data: moreFromCreatorData,
    error: moreFromCreatorError,
    isLoading: moreFromCreatorLoading,
  } = useQuery(
    ["more-from-creator", nftId],
    () => fetcher(moreFromCreatorEndpoint),
    { enabled: !!nftDetail }
  );
  if (nftDetailLoading) return LoadingAnimation();
  if (nftDetailError) return ErrorAnimation();

  return (
    <div className="w-full flex flex-col my-20 p-0 md:px-32 items-center justify-center gap-32">
      <div className="w-full flex-1 flex flex-col justify-center md:flex-row gap-16 md:gap-10 xl:gap-28">
        <div className="flex flex-col">
          <div className="relative">
            <img
              src={nftDetail.imgUrl}
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
                  src={nftDetail.imgUrl}
                  alt="Full size NFT"
                  className=" max-w-[50vw] max-h-[80vw] w-full h-full"
                />
              </DialogContent>
            </Dialog>
          </div>
          <NftDetailTabs data={nftDetail} />
        </div>
        <NftGeneralInformation data={nftDetail} />
      </div>
      <div className="flex flex-col gap-10 items-center">
        <h2 className="text-3xl text-primary-foreground font-bold">
          More from this creator
        </h2>
        {moreFromCreatorLoading ? (
          <div>Loading...</div>
        ) : moreFromCreatorError ? (
          <div>Error: {moreFromCreatorError.message}</div>
        ) : (
          <NftCarousel data={moreFromCreatorData} />
        )}
        <Link to={`/user/${nftDetail.creatorId}`}>
          <div className="p-4 border-2 rounded-xl text-primary-foreground flex justify-center cursor-pointer">
            <p>View creator NFTs</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
