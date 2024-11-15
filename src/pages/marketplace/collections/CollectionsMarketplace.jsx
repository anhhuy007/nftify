import CollectionCard from "@/pages/marketplace/collections/components/CollectionCard";
import React from "react";

function CollectionsMarketplace() {
  return (
    <>
      <div className="flex flex-col gap-10">
        <div className="flex justify-between">
          {Array.from({ length: 3 }, (_, index) => (
            <CollectionCard key={index} />
          ))}
        </div>
        <div className="flex justify-between">
          {Array.from({ length: 3 }, (_, index) => (
            <CollectionCard key={index} />
          ))}
        </div>
        <div className="flex justify-between">
          {Array.from({ length: 3 }, (_, index) => (
            <CollectionCard key={index} />
          ))}
        </div>
      </div>
    </>
  );
}

export default CollectionsMarketplace;
