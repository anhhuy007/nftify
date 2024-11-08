import NftCarousel from "@/components/NFT/NftCarousel";
import React from "react";
import { Link } from "react-router-dom";
import Banner from "@/pages/home/components/Banner";

function Home() {
  return (
    <>
      <div className="flex flex-col gap-10">
        <div className="min-h-[600px] w-full flex items-center">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
                Discover
                <br />
                Collect, & Sell
                <br />
                <span className="bg-gradient-to-r from-teal-400 via-purple-400 to-teal-400 text-transparent bg-clip-text">
                  Extraordinary
                </span>
                <br />
                NFTs
              </h1>
              <p className="text-lg text-gray-400 mb-8 max-w-xl">
                The Leading NFT Marketplace On Ethereum
                <br />
                Home To The Next Generation Of Digital Creators.
                <br />
                Discover The Best NFT Collections.
              </p>
              <div className="flex gap-4">
                <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-foreground rounded-lg font-medium transition-colors">
                  <Link to="/marketplace">Explore</Link>
                </button>
                <button className="px-8 py-3 border border-gray-700 hover:border-gray-600 text-foreground rounded-lg font-medium transition-colors">
                  <Link to="/create">Create</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <span className="text-5xl bg-gradient-to-r from-teal-400 via-purple-400 to-teal-400 text-transparent bg-clip-text">
            Trending NFTs
          </span>
          <NftCarousel />
        </div>
        <Banner />
      </div>
    </>
  );
}

export default Home;
