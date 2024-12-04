import React from "react";

function CollectionActivity({ activity }) {
  const getActivityDescription = () => {
    switch (activity.type) {
      case "listed":
        return (
          <>
            Listed by <strong>{activity.currentOwner}</strong> for{" "}
            <strong>{activity.price}</strong>
          </>
        );
      case "transferred":
        return (
          <>
            Transferred from <strong>{activity.previousOwner}</strong> to{" "}
            <strong>{activity.currentOwner}</strong>
          </>
        );
      case "purchased":
        return (
          <>
            Purchased by <strong>{activity.currentOwner}</strong> for{" "}
            <strong>{activity.price}</strong> from{" "}
            <strong>{activity.previousOwner}</strong>
          </>
        );
      default:
        return <span>No description available</span>;
    }
  };

  return (
    <div className="w-full p-6 flex gap-10 rounded-2xl text-primary-foreground border">
      <img
        src={activity.image}
        alt={activity.name}
        className="w-32 h-32 rounded-lg object-cover "
      />
      <div className="flex flex-col gap-3">
        <span className="font-semibold text-2xl">{activity.name}</span>
        <p className="text-gray-300 text-lg">{getActivityDescription()}</p>
        <p className="text-gray-400 text-sm">{activity.time}</p>
      </div>
    </div>
  );
}

export default CollectionActivity;
