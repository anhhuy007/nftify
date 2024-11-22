"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserCard({
  userName = "Nguyễn Lâm Anh Duy",
  followers = 0,
  avatarUrl = "/placeholder.svg?height=100&width=100",
  bannerUrl = "https://i.pinimg.com/originals/49/73/5b/49735b38c27ca67787e201a8f4b0fd6d.jpg",
}) {
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <Card className="relative w-[345px] overflow-hidden rounded-3xl group border-2 hover:border-red-600">
      {/* Banner Image */}
      <div className="h-52 p-4 bg-[#797da0]">
        <img
          src={bannerUrl}
          alt=""
          className="h-full w-full rounded-xl object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Profile Info Container */}
      <div className="relative flex items-center justify-between gap-6 bg-[#797da0] p-6">
        {/* Avatar - Positioned to overlap banner */}
        <Avatar className="absolute -top-12 left-8 h-16 w-16 rounded-full">
          <AvatarImage src={avatarUrl} alt={userName} />
          <AvatarFallback className="bg-blue-500 text-2xl">
            {userName.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        {/* User Info */}
        <div className="flex flex-col max-w-[145px]">
          <h2 className="text-lg font-bold text-white truncate">{userName}</h2>
          <p className="text-sm font-semibold text-gray-300">
            {followers.toLocaleString()} Followers
          </p>
        </div>

        {/* Follow Button */}
        <Button
          variant="outline"
          className={`rounded-md w-[130px] px-6 py-6 text-lg font-semibold ${
            isFollowing
              ? "bg-white/10 text-white hover:bg-white/20"
              : "bg-white text-[#1a1b3b] hover:bg-white/90"
          }`}
          onClick={() => setIsFollowing(!isFollowing)}
        >
          <Plus className={`mr-2 h-5 w-5 ${isFollowing ? "rotate-45" : ""}`} />
          {isFollowing ? "Following" : "Follow"}
        </Button>
      </div>
    </Card>
  );
}
