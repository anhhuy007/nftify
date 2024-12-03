import React from "react";
import Activity from "@/pages/collection/components/Activity";

function CollectionActivities({ collection }) {
  return (
    <div className="space-y-5">
      {collection.activity.map((activity, index) => (
        <Activity key={index} activity={activity} />
      ))}
    </div>
  );
}

export default CollectionActivities;
