import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import {
  ArrowUpNarrowWide,
  ArrowDownWideNarrow,
  TrendingUp,
  ArrowDownAZ,
  ArrowUpAZ,
  Star,
} from "lucide-react";

const sortOptions = [
  { value: "price-up", label: "Price Up", icon: ArrowUpNarrowWide },
  { value: "price-down", label: "Price Down", icon: ArrowDownWideNarrow },
  { value: "trending", label: "Trending", icon: TrendingUp },
  { value: "popular", label: "Popular", icon: Star },
  { value: "a-to-z", label: "A to Z", icon: ArrowDownAZ },
  { value: "z-to-a", label: "Z to A", icon: ArrowUpAZ },
];

function Sort() {
  return (
    <>
      <Select className="flex-none">
        <SelectTrigger className="w-[170px] py-7 px-4 ">
          <SelectValue placeholder="Select a filter" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {sortOptions.map(({ value, label, icon: Icon }) => (
              <SelectItem key={value} value={value}>
                <div className="flex items-center my-3">
                  <Icon className="mr-4 h-6 w-6" />
                  <span>{label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}

export default Sort;
