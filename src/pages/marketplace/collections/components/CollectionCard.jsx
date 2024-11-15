"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function CollectionCard({
  collectionImage = "https://th.bing.com/th/id/R.582aeb6f2468c6d95bd2980d851ee930?rik=UJ7DtDG2WX%2bKIQ&riu=http%3a%2f%2fwallpapercave.com%2fwp%2f1ZLpfHy.jpg&ehk=2O%2fMhpse%2foxlEYNYjOubsF9%2b6KDDDiHtZ6moSHe2Quw%3d&risl=&pid=ImgRaw&r=0",
  userAvatar = "/placeholder.svg?height=40&width=40",
  userName = "Collection Name",
}) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <Card className="group relative overflow-hidden rounded-3xl border-0">
      {/* Collection Image */}
      <div className="overflow-hidden bg-[#C5C6FF]">
        <img
          src={collectionImage}
          alt={userName}
          className="h-[300px] w-[460px] object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Like Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-3 top-3 h-8 w-8 rounded-full bg-black/20 backdrop-blur-sm transition-colors hover:bg-black/40"
        onClick={() => setIsLiked(!isLiked)}
      >
        <Heart
          className={`h-5 w-5 ${
            isLiked ? "fill-white text-white" : "text-white"
          }`}
        />
      </Button>

      {/* User Info */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 bg-gradient-to-t from-black/60 to-transparent p-4">
        <Avatar className="h-10 w-10 rounded-lg border-2 border-white">
          <AvatarImage src={userAvatar} alt={userName} />
          <AvatarFallback className="rounded-lg bg-blue-500">
            {userName.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <span className="font-semibold text-white">{userName}</span>
      </div>
    </Card>
  );
}
