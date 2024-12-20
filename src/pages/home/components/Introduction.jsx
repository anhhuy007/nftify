import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";
import { useAuthHandler } from "@/api/AuthHandler";
import { testEndpoint } from "@/api/Endpoints";
import { toast } from "react-hot-toast";

function Introduction() {
  const { fetchWithAuth } = useAuthHandler();

  const handleCreate = async () => {
    try {
      const result = await fetchWithAuth(testEndpoint);

      console.log("Test endpoint result: ", result);
      alert("Test endpoint result: " + JSON.stringify(result));
    } catch (error) {
      console.error("Test endpoint error: ", error);
      alert("Test endpoint error: " + error.message);
    }
    if (!isAuth) {
      toast("Please login to create NFTs");
      return;
    }
  };

  return (
    <div className="min-h-[600px] w-full flex items-center">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            Discover
            <br />
            Collect, & Sell
            <br />
            <span className="text-gradient">Extraordinary</span>
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
              <Link to="/marketplace/nfts">Explore</Link>
            </button>
            {
              <button
                onClick={handleCreate}
                className="px-8 py-3 border border-gray-700 hover:border-gray-600 text-foreground rounded-lg font-medium transition-colors"
              >
                {/* <Link to="/create">Create</Link> */}
                Create
              </button>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Introduction;
