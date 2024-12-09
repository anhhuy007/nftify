"use client";

import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import userPlaceHolder from "@/assets/user-placeholder.png";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NftCard({ stamp }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link to={`/nft/${stamp._id}`}>
      <div
        className={`w-[260x] h-96 p-[2px] rounded-xl transition-all duration-300 ease-in-out
          ${
            isHovered
              ? "bg-gradient-to-r from-[hsl(166,75%,66%)] via-[hsl(281,76%,89%)] to-[hsl(247,85%,64%)] shadow-[0_0_15px_5px_rgba(255,255,255,0.5)]"
              : "bg-card"
          }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Card
          className={`w-full h-full p-0 bg-card transition-all duration-300 
          ${
            isHovered
              ? "shadow-[0_-5px_10px_rgba(0,0,0,0.2),0_5px_10px_rgba(0,0,0,0.2)]"
              : ""
          }`}
        >
          <CardHeader
            className={`px-3 pt-3 pb-0 transition-all duration-300 ${
              isHovered ? "h-[255px]" : "h-[306px]"
            }`}
          >
            <img
              src={stamp.imgUrl ?? userPlaceHolder}
              alt="Stamp"
              className="w-full h-full object-cover shadow-sm rounded-xl transition-all duration-300"
            />
          </CardHeader>
          <CardContent
            className={`px-3 pt-2 transition-all duration-300 ${
              isHovered ? "h-[150px]" : "h-[90px]"
            }`}
          >
            <div className="grid grid-cols-[20%_2%_45%_3%_20%] items-center mt-1">
              <img
                // get placeholder image if null
                src={stamp?.ownerDetails?.avatarUrl || userPlaceHolder}
                alt={stamp?.ownerDetails?.name || "Unknown"}
                className="w-11 h-11 rounded-sm"
              />
              <div></div>
              <div className="flex flex-col">
                <p className="text-xs text-zinc-300 dark:text-zinc-400 line-clamp-1">
                  {stamp.ownerDetails?.name || "Unknown"}
                </p>
                <p className="text-sm font-semibold line-clamp-1">
                  {stamp.title}
                </p>
              </div>
              <div></div>
              <div className="flex-1 text-right whitespace-nowrap">
                <h1>{stamp.price.$numberDecimal} ETH</h1>
              </div>
            </div>
            {isHovered && (
              <Button className="text-primary-foreground px-4 py-2 mt-3 rounded-md w-full transition-colors duration-200">
                Collect now!
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </Link>
  );
}

export function SmallNftCard({ stamp }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link to={`/nft/${stamp._id}`}>
      <div
        className={`w-[16vw] h-[370px] p-[2px] rounded-xl transition-all duration-300 ease-in-out
        ${
          isHovered
            ? "bg-gradient-to-r from-[hsl(166,75%,66%)] via-[#ebcef8] to-[hsl(247,85%,64%)] shadow-[0_0_15px_5px_rgba(255,255,255,0.5)]"
            : "bg-card"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Card
          className={`w-full h-full p-0 overflow-hidden bg-card border-2 transition-all duration-300
          ${
            isHovered
              ? "shadow-[0_-5px_10px_rgba(0,0,0,0.2),0_5px_10px_rgba(0,0,0,0.2)]"
              : ""
          }`}
        >
          <CardHeader
            className={`px-3 pt-5 pb-0 transition-all duration-300 ${
              isHovered ? "h-[260px]" : "h-[320px]"
            }`}
          >
            <img
              src={stamp.imgUrl ?? userPlaceHolder}
              alt="Stamp"
              className="w-full h-full object-cover shadow-sm rounded-xl transition-all duration-300"
            />
          </CardHeader>
          <CardContent className={`px-3 pt-2 transition-all duration-300`}>
            <div className="flex justify-between items-center gap-4">
              <p className="text-lg font-semibold line-clamp-1">
                {stamp.title}
              </p>
              <p className="text-lg font-semibold text-right whitespace-nowrap ">
                {stamp.price.$numberDecimal} ETH
              </p>
            </div>
            {isHovered && (
              <Button className="text-primary-foreground px-6 py-4 mt-2 rounded-md w-full transition-colors duration-200">
                Collect now!
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </Link>
  );
}

export function BigNftCard({ stamp }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link to={`/nft/${stamp._id}`}>
      <div
        className={`w-[20vw] h-[440px] p-[2px] rounded-xl transition-all duration-300 ease-in-out
        ${
          isHovered
            ? "bg-gradient-to-r from-[hsl(166,75%,66%)] via-[hsl(281,76%,89%)] to-[hsl(247,85%,64%)] shadow-[0_0_15px_5px_rgba(255,255,255,0.5)]"
            : "bg-card"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Card
          className={`w-full h-full p-0 overflow-hidden bg-card border-2 transition-all duration-300
         ${
           isHovered
             ? "shadow-[0_-5px_10px_rgba(0,0,0,0.2),0_5px_10px_rgba(0,0,0,0.2)]"
             : ""
         }`}
        >
          <CardHeader
            className={`px-3 pt-3 pb-0 transition-all duration-300 ${
              isHovered ? "h-[310px]" : "h-[360px]"
            }`}
          >
            <img
              src={stamp.imgUrl ?? userPlaceHolder}
              alt="Stamp"
              className="w-full h-full object-cover shadow-sm rounded-xl transition-all duration-300"
            />
          </CardHeader>
          <CardContent
            className={`px-3 pt-2 transition-all duration-300 ${
              isHovered ? "h-[150px]" : "h-[90px]"
            }`}
          >
            <div className="grid grid-cols-[20%_49%_1%_20%]  items-center">
              <img
                src={stamp?.ownerDetails?.avatarUrl || userPlaceHolder}
                alt={stamp?.ownerDetails?.name || "Unknown"}
                className="w-12 h-12 rounded-sm border-2"
              />
              <div className="flex flex-col">
                <p className="text-xl font-bold text-zinc-400 dark:text-zinc-400 line-clamp-1">
                  {stamp?.ownerDetails?.name || "Unknown"}
                </p>
                <p className="text-lg font-semibold line-clamp-1">
                  {stamp.title}
                </p>
              </div>
              <div></div>
              <div className="flex-1 text-right whitespace-nowrap">
                <p className="text-lg font-semibold">
                  {stamp.price.$numberDecimal} ETH
                </p>
              </div>
            </div>
            {isHovered && (
              <Button className="text-primary-foreground px-6 py-4 mt-2 rounded-md w-full transition-colors duration-300">
                Collect now!
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </Link>
  );
}

export function PreviewNftCard({ stamp }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`w-[330px] h-[480px] p-[2px] rounded-xl transition-all duration-300 ease-in-out
        ${
          isHovered
            ? "bg-gradient-to-r from-[hsl(166,75%,66%)] via-[hsl(281,76%,89%)] to-[hsl(247,85%,64%)] shadow-[0_0_15px_5px_rgba(255,255,255,0.5)]"
            : "bg-card"
        }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card
        className={`w-full h-full p-0 overflow-hidden bg-card border-2 transition-all duration-300
         ${
           isHovered
             ? "shadow-[0_-5px_10px_rgba(0,0,0,0.2),0_5px_10px_rgba(0,0,0,0.2)]"
             : ""
         }`}
      >
        <CardHeader
          className={`px-3 pt-3 pb-0 transition-all duration-300 ${
            isHovered ? "h-[350px]" : "h-[390px]"
          }`}
        >
          <img
            src={stamp.imgUrl ?? userPlaceHolder}
            alt="Stamp"
            className="w-full h-full object-cover shadow-sm rounded-xl transition-all duration-300"
          />
        </CardHeader>
        <CardContent
          className={`px-3 pt-2 transition-all duration-300 ${
            isHovered ? "h-[150px]" : "h-[90px]"
          }`}
        >
          <div className="grid grid-cols-[20%_54%_5%_20%]  items-center">
            <img
              src={stamp?.ownerDetails?.avatarUrl || userPlaceHolder}
              alt={stamp?.ownerDetails?.name || "Unknown"}
              className="w-12 h-12 rounded-sm border-2"
            />
            <div className="flex flex-col">
              <p className="text-xl font-bold text-zinc-400 dark:text-zinc-400 line-clamp-1 truncate w-full">
                {stamp?.ownerDetails?.name || "Unknown"}
              </p>
              <p className="text-lg font-semibold line-clamp-1">
                {stamp.title}
              </p>
            </div>
            <div></div>
            <div className="flex-1 text-right ">
              {stamp.price?.$numberDecimal ? (
                <p className="text-lg font-semibold whitespace-nowrap">
                  {stamp.price.$numberDecimal} ETH
                </p>
              ) : (
                <p className="text-lg font-semibold whitespace-nowrap">
                  Not for <br /> SALE
                </p>
              )}
            </div>
          </div>
          {isHovered && (
            <Button className="text-primary-foreground px-6 py-4 mt-2 rounded-md w-full transition-colors duration-300">
              Collect now!
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
