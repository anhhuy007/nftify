import NftCarousel from "@/components/NFT/NftCarousel";
import React from "react";
import Banner from "@/pages/home/components/Banner";
import Introduction from "@/pages/home/components/Introduction";
import CollectionCarousel from "@/pages/home/components/CollectionCarousel";
import { useQuery } from "react-query";
import CreatorCarousel from "./components/CreatorCarousel";
import ErrorAnimation from "@/components/ui/error";
import { SkeletonNftCarousel } from "@/components/skeleton/SkeletonNft";
// import { SkeletonCollectionCarousel } from "@/components/skeleton/SkeletonCollection";
// import { SkeletonCreatorCarousel } from "@/components/skeleton/SkeletonCreator";
import { fetcher, HOME_ENDPOINTS } from "@/handlers/Endpoints";

function Home() {
  const {
    data: trendingNftsData,
    isLoading: trendingNftsLoading,
    error: trendingNftsError,
  } = useQuery("trending-nfts", () => fetcher(HOME_ENDPOINTS.TRENDING_NFTS));

  const {
    data: topCollectionsData,
    isLoading: topCollectionsLoading,
    error: topCollectionsError,
  } = useQuery("top-collections", () =>
    fetcher(HOME_ENDPOINTS.TRENDING_COLLECTIONS)
  );

  const {
    data: topCreatorsData,
    isLoading: topCreatorsLoading,
    error: topCreatorsError,
  } = useQuery("top-creators", () => fetcher(HOME_ENDPOINTS.TRENDING_CREATORS));

  const isLoading =
    trendingNftsLoading || topCollectionsLoading || topCreatorsLoading;
  const isError = trendingNftsError || topCollectionsError || topCreatorsError;

  if (isLoading) {
    return (
      <>
        <div className="flex flex-col items-center justify-center">
          <Introduction />
        </div>
        <div className="flex flex-col gap-32 items-center justify-center">
          <div className="flex flex-col gap-10 items-center">
            <span className="text-5xl font-bold leading-normal text-gradient">
              Trending NFTs
            </span>
            <SkeletonNftCarousel />
          </div>
          <div className="flex flex-col justify-center items-center gap-10">
            <span className="text-5xl leading-normal font-bold text-gradient">
              Top Collections
            </span>
            {/* <SkeletonCollectionCarousel /> Added skeleton */}
          </div>
          <div className="flex flex-col justify-center items-center gap-10">
            <span className="text-5xl leading-normal font-bold text-gradient">
              Top Creators
            </span>
            {/* <SkeletonCreatorCarousel /> Added skeleton */}
          </div>
          <Banner />
        </div>
      </>
    );
  }

  if (isError) {
    return <ErrorAnimation />;
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <Introduction />
      </div>
      <div className="flex flex-col gap-32 items-center justify-center">
        <div className="flex flex-col gap-10 items-center">
          <span className="text-5xl font-bold leading-normal text-gradient">
            Trending NFTs
          </span>
          <NftCarousel
            data={trendingNftsData?.data}
            isLoading={trendingNftsLoading}
          />{" "}
          {/* Added optional chaining */}
        </div>
        <div className="flex flex-col justify-center items-center gap-10">
          <span className="text-5xl leading-normal font-bold text-gradient">
            Top Collections
          </span>
          <CollectionCarousel data={topCollectionsData?.data} />{" "}
          {/* Added optional chaining */}
        </div>
        <div className="flex flex-col justify-center items-center gap-10">
          <span className="text-5xl leading-normal font-bold text-gradient">
            Top Creators
          </span>
          <CreatorCarousel
            data={topCreatorsData?.data}
            isLoading={topCreatorsLoading}
          />{" "}
          {/* Added optional chaining, corrected loading prop */}
        </div>
        <Banner />
      </div>
    </>
  );
}

export default Home;
