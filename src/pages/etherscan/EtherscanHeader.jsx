import { Link } from "react-router-dom";
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function EtherscanHeader() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = (event) => {
    if (searchValue.trim() !== "") {
      navigate(`/etherscan?search=${searchValue}`);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="bg-white">
      <div className="container mx-auto">
        <div className="flex items-center justify-center gap-8 px-6 pt-7 pb-3">
          <Link to="/etherscan" className="text-3xl font-bold text-black">
            Etherscan
          </Link>

          <div className="flex-1 max-w-8xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                value={searchValue}
                onChange={handleSearch}
                onKeyDown={handleKeyDown}
                placeholder="Search by Transaction Hash, Address"
                className="w-full h-12 pl-10 bg-[#1C1D3A] border-none text-white placeholder:text-gray-400 rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EtherscanHeader;

