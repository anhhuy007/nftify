import React from "react";
import { useParams } from "react-router-dom";
import NftGeneralInformation from "@/pages/nft/components/NftGeneralInformation";
import NftDetailTabs from "@/pages/nft/components/NftDetailTabs";
import NftCarousel from "@/components/NFT/NftCarousel";

function NftDetail() {
  const { nftId } = useParams();

  return (
    <>
      <div className="w-full flex flex-col my-20 p-0 md:px-32 items-center justify-center gap-32">
        <div className="w-full flex-1 flex flex-col justify-center md:flex-row gap-16 md:gap-10 xl:gap-28">
          <div className="flex-flex-col">
            <img
              src="https://th.bing.com/th/id/OIP.GubYybcE-2aUiHUBmhl53wHaI-?w=164&h=183&c=7&r=0&o=5&dpr=1.5&pid=1.7"
              alt="NFT Image"
              className="w-full mx-auto md:mx-0 h-auto max-w-xs md:max-w-[600px] xl:max-w-[700px] aspect-square border-2 border-primary rounded-xl"
            />
            <NftDetailTabs />
          </div>

          <NftGeneralInformation />
        </div>
        <NftCarousel />
      </div>
    </>
  );
}

export default NftDetail;
