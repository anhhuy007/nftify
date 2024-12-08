"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Eye, Heart, Upload } from "lucide-react";

export default function NftGeneralInformation({ data }) {
  return (
    <Card className="w-full max-w-md bg-transparent shadow-none mx-auto md:mx-0 border-none">
      <CardContent className="">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={data.collection?.thumbUrl || "/placeholder.jpg"}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="font-medium">
            {data.collection?.name || "Not in collection"}
          </span>
        </div>

        <h1 className="text-4xl font-bold my-6 md:my-10">{data.title}</h1>

        <div className="flex gap-20">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={data.creatorDetails?.avatarUrl} />
              <AvatarFallback>CR</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm ">Creator</p>
              <p className="font-medium">
                {data.creatorDetails?.name || "Unknow"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={data.ownerDetails?.avatarUrl} />
              <AvatarFallback>CO</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm ">Current owner</p>
              <p className="font-medium">
                {data.ownerDetails?.name || "Unknow"}
              </p>
            </div>
          </div>
        </div>

        <Separator className="bg-secondary my-4 md:my-6" />

        <div className="flex gap-9">
          <button className="flex items-center gap-2  transition-colors">
            <Eye className="h-5 w-5" />
            <span>{data.insight.viewCount} views</span>
          </button>
          <button className="flex items-center gap-2  transition-colors">
            <Heart className="h-5 w-5" />
            <span>{data.insight.favoriteCount} favorites</span>
          </button>
          <button className="flex items-center gap-2  transition-colors">
            <Upload className="h-5 w-5" />
            <span>share</span>
          </button>
        </div>

        <div className="space-y-4 border-2 rounded-lg p-4 mt-5">
          <div className=" p-4 rounded-xl bg-card">
            <p className=" mb-1">Price</p>
            <p className="text-2xl font-bold">
              {data.price.price.$numberDecimal} ETH
            </p>
            <p className="">$262</p>
          </div>

          <Button className="w-full bg-white text-black hover:bg-gray-200 font-semibold py-6">
            Buy now for {data.price.price.$numberDecimal} ETH
          </Button>
          <Button
            variant="outline"
            className="w-full border-none  py-6 bg-card"
          >
            Place a bid
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
