"use client";

import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const stamp = {
  id: 1,
  name: "Stamp",
  owner: "0x1234567890",
  price: "0.1",
  image:
    "https://i.etsystatic.com/27708971/r/il/1b55f0/2853845438/il_1588xN.2853845438_n8z5.jpg",
  owner_image:
    "https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2023/02/Hinh-anh-avatar-cute.jpg?ssl\u003d1",
};

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

/*
Stamp data structure:
{
    "_id": "6745e27e336bf17419810dd6",
    "creatorId": "673876c24af03358be502d81",
    "title": "King George V",
    "issuedBy": "Turks & Caicos Islands",
    "function": "postage",
    "date": "31/12/1904",
    "denom": {
        "$numberDecimal": "34.91"
    },
    "color": "scarlet",
    "imgUrl": "https://stampdata.com/files/thumbs/zk/300px-Colnect-5572-405-King-George-V.jpg",
    "createdAt": "2024-11-26T15:00:14.460Z",
    "itemIdString": "6745e27e336bf17419810dd6",
    "insight": [
        {
            "_id": "67489392a9874935b081326b",
            "itemId": "6745e27e336bf17419810dd6",
            "verifyStatus": "verified",
            "favoriteCount": 869,
            "viewCount": 991,
            "updatedAt": "2024-11-29T04:12:22.751Z"
        }
    ],
    "price": [
        {
            "_id": "67484c3a3965399cd6354e85",
            "itemId": "6745e27e336bf17419810dd6",
            "price": {
                "$numberDecimal": "92.15"
            },
            "currency": "ETH",
            "createdAt": "2024-11-28T10:55:54.674Z"
        }
    ],
    "collectionName": "Art on Envelopes"
},
*/

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
              src={stamp.imgUrl}
              alt="Stamp"
              className="w-full h-full object-cover shadow-sm rounded-xl transition-all duration-300"
            />
          </CardHeader>
          <CardContent
            className={`px-3 pt-2 transition-all duration-300 ${
              isHovered ? "h-[150px]" : "h-[90px]"
            }`}
          >
            <div className="flex items-center gap-4 mt-1">
              <img
                src={stamp.imgUrl}
                alt={stamp.collectionName}
                className="w-11 h-11 rounded-sm"
              />
              <div className="flex flex-col">
                <p className="text-xs text-zinc-300 dark:text-zinc-400">
                  {stamp.collectionName}
                </p>
                <p className="text-sm font-semibold">{stamp.title}</p>
              </div>
              <div className="flex-1 text-right">
                <h1>{stamp.price[0].price.$numberDecimal} ETH</h1>
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
  const { id, name, owner, price, image, owner_image } = stamp;

  return (
    <Link to={`/nft/${id}`}>
      <div
        className={`w-[260px] h-[374px] p-[2px] rounded-xl transition-all duration-300 ease-in-out
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
            className={`px-3 pt-5 pb-0 transition-all duration-300 ${
              isHovered ? "h-[254px]" : "h-[320px]"
            }`}
          >
            <img
              src={image}
              alt="Stamp"
              className="w-full h-full object-cover shadow-sm rounded-xl transition-all duration-300"
            />
          </CardHeader>
          <CardContent className={`px-3 pt-2 transition-all duration-300`}>
            <div className="flex items-center justify-between gap-4">
              <p className="text-xl font-bold">{name}</p>
              <p className="text-xl font-bold">{price} ETH</p>
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
  const { id, name, owner, price, image, owner_image } = stamp;

  return (
    <Link to={`/nft/${id}`}>
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
              isHovered ? "h-[327px]" : "h-[390px]"
            }`}
          >
            <img
              src={image}
              alt="Stamp"
              className="w-full h-full object-cover shadow-sm rounded-xl transition-all duration-300"
            />
          </CardHeader>
          <CardContent
            className={`px-3 pt-2 transition-all duration-300 ${
              isHovered ? "h-[150px]" : "h-[90px]"
            }`}
          >
            <div className="flex items-center gap-3">
              <img
                src={owner_image}
                alt={owner}
                className="w-12 h-12 rounded-sm border-2"
              />
              <div className="flex flex-col">
                <p className="text-xl font-bold text-zinc-400 dark:text-zinc-400">
                  {owner}
                </p>
                <p className="text-xl font-bold">{name}</p>
              </div>
              <div className="flex-1 text-right">
                <p className="text-xl font-bold">{price} ETH</p>
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
