import { useState } from "react";
import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

export default function UserCard({ user }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link to={`/user/${user._id}`}>
      <Card
        className={`relative w-full min-w-[280px] max-w-[450px] overflow-hidden rounded-3xl group border-2 transition-all duration-300 ${
          isHovered
            ? "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 border-transparent"
            : "bg-card border-2"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Banner Image */}
        <div className="h-[40vh] max-h-60 min-h-[200px] p-4 bg-[#797da0]">
          <img
            src={user.bgUrl}
            alt=""
            className="h-full w-full rounded-xl object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Profile Info Container */}
        <div className="relative flex items-center justify-between gap-4 bg-[#797da0] p-4 lg:p-6">
          {/* Avatar - Positioned to overlap banner */}
          <Avatar className="absolute -top-12 left-4 lg:left-8 h-14 w-14 lg:h-16 lg:w-16 rounded-full">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback className="bg-blue-500 text-xl lg:text-2xl">
              {user.name}
            </AvatarFallback>
          </Avatar>

          {/* User Info */}
          <div className="flex flex-col max-w-[120px] lg:max-w-[145px]">
            <h2 className="text-base lg:text-lg font-bold text-white truncate">
              {user.name}
            </h2>
            <p className="text-xs lg:text-sm font-semibold text-gray-300">
              {user.total} NFTs
            </p>
          </div>

          {/* Follow Button */}
          <Button
            variant="outline"
            className={`rounded-md w-[100px] lg:w-[130px] px-4 lg:px-6 py-4 lg:py-6 text-base lg:text-lg font-semibold ${
              isFollowing
                ? "bg-white/10 text-white hover:bg-white/20"
                : "bg-white text-[#1a1b3b] hover:bg-white/90"
            }`}
            onClick={(e) => {
              e.preventDefault();
              setIsFollowing(!isFollowing);
            }}
          >
            <Plus
              className={`mr-2 h-4 w-4 lg:h-5 lg:w-5 ${
                isFollowing ? "rotate-45" : ""
              }`}
            />
            {isFollowing ? "Following" : "Follow"}
          </Button>
        </div>
      </Card>
    </Link>
  );
}
