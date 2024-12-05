import React from "react";
import { Button } from "@/components/ui/button";

function CollectionGeneralInformation({ collection }) {
  return (
    <>
      <div className="flex flex-col space-y-6">
        <span className="font-bold text-5xl">{collection.name}</span>
        <p>
          by <span className="font-bold text-2xl">{collection.owner}</span>
        </p>
        <p>{collection.abstract}</p>
        <Button size="xl" variant="buy">
          Buy Collection
        </Button>
        <div className="flex gap-14">
          <div className="flex flex-col gap-3">
            <span className="font-light">Total volume</span>
            <span className="font-bold text-2xl">
              {collection.totalVolume} ETH
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-light">Floor Price</span>
            <span className="font-bold text-2xl">
              {collection.floorPrice} ETH
            </span>{" "}
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-light">Owners</span>
            <span className="font-bold text-2xl">{collection.owners}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default CollectionGeneralInformation;