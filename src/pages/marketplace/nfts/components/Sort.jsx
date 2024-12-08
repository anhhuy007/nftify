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
  ArrowUpDown,
  Heart,
} from "lucide-react";

const sortOptions = [
  { value: "default", label: "Default", icon: ArrowUpDown },
  { value: "price-up", label: "Price Up", icon: ArrowUpNarrowWide },
  { value: "price-down", label: "Price Down", icon: ArrowDownWideNarrow },
  { value: "trending", label: "Trending", icon: TrendingUp },
  { value: "favourite", label: "Favourite", icon: Heart },
  { value: "a-to-z", label: "A to Z", icon: ArrowDownAZ },
  { value: "z-to-a", label: "Z to A", icon: ArrowUpAZ },
];

function Sort({ sortOption = sortOptions[0], setSortOption }) {
  const handleSortChange = (value) => {
    setSortOption(value);
  };

  return (
    <>
      <Select
        // className="flex-none"
        value={sortOption}
        onValueChange={handleSortChange}
        aria-label="Sort options"
      >
        <SelectTrigger className="w-[170px] py-7 px-4 ">
          <SelectValue placeholder="Select a filter" />
        </SelectTrigger>
        <SelectContent side="bottom" align="start">
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
