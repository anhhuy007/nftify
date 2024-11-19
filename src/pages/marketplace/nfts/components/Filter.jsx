"use client";

import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SlidersHorizontal, ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

export default function Filter() {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [collections, setCollections] = useState([
    { id: 1, name: "Collection Name", image: "/placeholder.svg" },
    { id: 2, name: "Collection Name", image: "/placeholder.svg" },
    { id: 3, name: "Collection Name", image: "/placeholder.svg" },
  ]);

  return (
    <Sheet>
      <SheetTrigger>
        <Button className="flex items-center py-7 justify-between px-4 whitespace-nowrap">
          <SlidersHorizontal size={20} />
          <p className="ml-3 text-base">Filters</p>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[400px] p-0 bg-[#1a1b3b] text-white flex flex-col"
      >
        <div className="flex flex-col flex-grow overflow-hidden">
          <div className="flex-grow overflow-y-auto">
            <div className="flex flex-col gap-10 p-6 pt-20">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-3xl font-semibold">Price</h3>
                  <ChevronDown className="h-5 w-5" />
                </div>
                <div className="flex justify-between items-center gap-10">
                  <div className="flex flex-col gap-4 flex-1">
                    <p className="text-sm text-gray-400">Lowest</p>
                    <div className="relative">
                      <Input
                        className="w-full bg-[#252850] border-0 pr-16 py-7"
                        placeholder="0"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                        ETH
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 flex-1">
                    <p className="text-sm text-gray-400">Highest</p>
                    <div className="relative">
                      <Input
                        className="w-full bg-[#252850] border-0 pr-16 py-7"
                        placeholder="0"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                        ETH
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="bg-gray-700" />

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-3xl font-semibold">Status</h3>
                  <ChevronDown className="h-5 w-5" />
                </div>
                <div className="flex justify-between">
                  <Button
                    variant={selectedStatus === "all" ? "default" : "secondary"}
                    className={`rounded-full text-lg ${
                      selectedStatus === "all"
                        ? "bg-white text-black"
                        : "bg-[#252850] text-white"
                    }`}
                    size="xl"
                    onClick={() => setSelectedStatus("all")}
                  >
                    All
                  </Button>
                  <Button
                    variant={selectedStatus === "buy" ? "default" : "secondary"}
                    className={`rounded-full text-lg ${
                      selectedStatus === "buy"
                        ? "bg-white text-black"
                        : "bg-[#252850] text-white"
                    }`}
                    onClick={() => setSelectedStatus("buy")}
                    size="xl"
                  >
                    Buy now
                  </Button>
                  <Button
                    variant={
                      selectedStatus === "auction" ? "default" : "secondary"
                    }
                    className={`rounded-full text-lg  ${
                      selectedStatus === "auction"
                        ? "bg-white text-black"
                        : "bg-[#252850] text-white"
                    }`}
                    size="xl"
                    onClick={() => setSelectedStatus("auction")}
                  >
                    Live auction
                  </Button>
                </div>
              </div>

              <Separator className="bg-gray-700" />

              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-3xl font-semibold">Collection</h3>
                  <ChevronDown className="h-5 w-5" />
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    className="w-full bg-[#252850] border-0 pl-10"
                    placeholder="Search by Collections"
                  />
                </div>
                <div className="space-y-8">
                  {collections.map((collection) => (
                    <div
                      key={collection.id}
                      className="flex items-center gap-3"
                    >
                      <img
                        src={collection.image}
                        alt={collection.name}
                        className="h-8 w-8 rounded-full bg-[#252850]"
                      />
                      <span>{collection.name}</span>
                    </div>
                  ))}
                </div>
                <Button className="w-full bg-[#252850] text-lg h-11 text-white hover:bg-[#2f3266]">
                  Load More{" "}
                </Button>
              </div>
            </div>
          </div>
          <SheetFooter className="mt-auto p-6">
            <Button className="w-full bg-[#252850] text-lg h-11 text-white hover:bg-[#2f3266]">
              Apply Filters
            </Button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}
