import React from "react";
import CollectionActivity from "@/pages/collection/components/CollectionActivity";

function CollectionActivities({ collection }) {
  return (
    <div className="space-y-5">
      {collection.activity.map((activity, index) => (
        <CollectionActivity key={index} activity={activity} />
      ))}
    </div>
  );
}

export default CollectionActivities;
