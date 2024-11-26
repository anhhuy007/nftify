import React, { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function SearchNfts({ searchValue, onSearch }) {
  const [inputValue, setInputValue] = useState(searchValue || "");

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch(inputValue);
    }
  };

  const handleSearchClick = () => {
    onSearch(inputValue);
  };

  return (
    <div className="flex-1 relative text-white">
      <Input
        type="text"
        placeholder="Search items, collections..."
        className="h-14 pl-4 pr-10 rounded-xl"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <Button
        size="icon"
        variant="ghost"
        className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
        onClick={handleSearchClick}
      >
        <Search className="h-6 w-6" />
      </Button>
    </div>
  );
}

export default SearchNfts;
