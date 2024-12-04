"use client";

import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { SlidersHorizontal, ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

export default function Filter({ filter, setFilter, disabledFields }) {
  const [tempFilter, setTempFilter] = useState(() => {
    const initialFilter = {
      lowestPrice: filter.lowestPrice || "",
      highestPrice: filter.highestPrice || "",
      status: filter.status || "all",
      user: filter.user || "",
    };
    if (!disabledFields || disabledFields.collection?.isDisabled !== true) {
      initialFilter.collection = filter.collection || "";
    }

    if (!disabledFields || disabledFields.user?.isDisabled !== true) {
      initialFilter.user = filter.user || "";
    }

    return initialFilter;
  });

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setFilter(tempFilter);
    }
  };

  const handleTempFilterChange = (key, value) => {
    setTempFilter((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    setFilter(tempFilter);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="flex items-center py-7 justify-between px-4 whitespace-nowrap font-semibold bg-white/20 hover:bg-white/30">
          <SlidersHorizontal size={20} />
          <span className="ml-3 text-base">Filters</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[400px] p-0 bg-[#1a1b3b] text-white flex flex-col"
        onKeyDown={handleKeyPress}
      >
        <SheetTitle className="text-3xl p-6 pb-0 font-semibold">
          {/* Filter Option */}
        </SheetTitle>
        <SheetDescription></SheetDescription>
        <div className="flex-grow">
          <div className="flex flex-col gap-8 p-6">
            {/* Price Filter */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-semibold">Status</span>
                <ChevronDown className="h-5 w-5" />
              </div>
              <div className="flex justify-between items-center gap-10">
                <div className="flex flex-col gap-4 flex-1">
                  <span className="text-sm text-gray-400">Lowest</span>
                  <div className="relative">
                    <Input
                      className="w-full bg-[#252850] border-0 pr-16 py-7"
                      placeholder="0"
                      value={tempFilter.lowestPrice}
                      onChange={(e) =>
                        handleTempFilterChange("lowestPrice", e.target.value)
                      }
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      ETH
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-4 flex-1">
                  <span className="text-sm text-gray-400">Highest</span>
                  <div className="relative">
                    <Input
                      className="w-full bg-[#252850] border-0 pr-16 py-7"
                      placeholder="0"
                      value={tempFilter.highestPrice}
                      onChange={(e) =>
                        handleTempFilterChange("highestPrice", e.target.value)
                      }
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      ETH
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="bg-gray-700" />

            {/* Status Filter */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-semibold">Status</span>
                <ChevronDown className="h-5 w-5" />
              </div>
              <div className="flex justify-between">
                {["all", "buy", "auction"].map((status) => (
                  <Button
                    key={status}
                    className={`rounded-full text-lg ${
                      tempFilter.status === status
                        ? "bg-white text-black"
                        : "bg-[#252850] text-white"
                    } hover:bg-[#2f3266]`}
                    size="xl"
                    onClick={() => handleTempFilterChange("status", status)}
                  >
                    {status === "all"
                      ? "All"
                      : status === "buy"
                      ? "Buy now"
                      : "Live auction"}
                  </Button>
                ))}
              </div>
            </div>

            <Separator className="bg-gray-700" />

            {/* Collection Filter */}
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-semibold">Collection</span>
                <ChevronDown className="h-5 w-5" />
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                {disabledFields?.collection?.isDisabled || false ? (
                  <Input
                    className="w-full bg-[#252850] border-0 pl-10 h-14"
                    placeholder={`${
                      disabledFields?.collection?.name || "Collection"
                    }`}
                    disabled
                  />
                ) : (
                  <Input
                    className="w-full bg-[#252850] border-0 pl-10 h-14"
                    placeholder="Search by Collections"
                    value={tempFilter.collection}
                    onChange={(e) =>
                      handleTempFilterChange("collection", e.target.value)
                    }
                  />
                )}
              </div>
            </div>

            {/* User Filter */}
            <Separator className="bg-gray-700" />

            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-semibold">User</span>
                <ChevronDown className="h-5 w-5" />
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                {disabledFields?.user?.isDisabled || false ? (
                  <Input
                    className="w-full bg-[#252850] border-0 pl-10 h-14"
                    placeholder={`${disabledFields?.user?.name || "User"}`}
                    disabled
                  />
                ) : (
                  <Input
                    className="w-full bg-[#252850] border-0 pl-10 h-14"
                    placeholder="Search by User"
                    value={tempFilter.user}
                    onChange={(e) =>
                      handleTempFilterChange("user", e.target.value)
                    }
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <Separator className="bg-gray-700" />

        <SheetFooter className="mt-auto p-6">
          <Button
            onClick={applyFilters}
            className="w-full bg-[#252850] text-lg h-14 text-white hover:bg-[#2f3266]"
          >
            Apply Filters
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
