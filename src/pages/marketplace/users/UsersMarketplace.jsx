import React from "react";
import UserCard from "@/pages/marketplace/users/components/UserCard";

function UsersMarketplace() {
  return (
    <>
      <div className="flex flex-col gap-10">
        <div className="flex justify-between">
          {Array.from({ length: 4 }, (_, index) => (
            <UserCard key={index} />
          ))}
        </div>
        <div className="flex justify-between">
          {Array.from({ length: 4 }, (_, index) => (
            <UserCard key={index} />
          ))}
        </div>
        <div className="flex justify-between">
          {Array.from({ length: 4 }, (_, index) => (
            <UserCard key={index} />
          ))}
        </div>
      </div>
    </>
  );
}

export default UsersMarketplace;
