"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function CollectionCard({ collection }) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <Link to={`/collection/${collection._id}`}>
      <Card className="group relative overflow-hidden rounded-3xl border-0 w-full max-w-[450px]">
        {/* Collection Image */}
        <div className="overflow-hidden bg-[#C5C6FF]">
          <img
            src={collection.thumbUrl}
            alt={collection.name}
            className="h-[300px] w-full oject-cover transition-transform duration-300 group-hover:scale-110"
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
            <AvatarImage src={collection.ownerDetails.avatarUrl} alt={collection.ownerDetails.name} />
            <AvatarFallback className="rounded-lg bg-blue-500">
              {collection.ownerDetails.avatarUrl}
            </AvatarFallback>
          </Avatar>
          <span className="font-semibold text-white">{collection.ownerDetails.avatarUrl}</span>
        </div>
      </Card>
    </Link>
  );
}
