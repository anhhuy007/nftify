import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import Filter from "@/pages/marketplace/nfts/components/Filter";
import SearchNfts from "@/pages/marketplace/nfts/components/SearchNfts";
import Sort from "@/pages/marketplace/nfts/components/Sort";
import ToggleSwitch from "@/pages/marketplace/nfts/components/ToggleSwitch";
import { BigNftCard, SmallNftCard } from "@/components/NFT/NftCard";
import { Pagination } from "@/components/ui/pagination";
import LoadingAnimation from "@/components/ui/loading";

const fetcher = (url) => fetch(url).then((res) => res.json());
const nftsApiEndpoint = "http://localhost:3000/api/v1/marketplace/list/stamps";

function NftsMarketplace() {
  const [searchValue, setSearchValue] = useState("");
  const [sortOption, setSortOption] = useState("latest");
  const [filter, setFilter] = useState({});
  const [isGrid, setIsGrid] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [limitCard, setLimitCard] = useState(20);

  const {
    data: nftsData,
    error: nftsError,
    isLoading: nftsLoading,
  } = useQuery("nfts", () => fetcher(nftsApiEndpoint));

  useEffect(() => {
    const newCardCount = isGrid ? 4 : 1;
    setLimitCard(newCardCount * 4);
  }, [isGrid]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (value) => setSearchValue(value);
  const handleSort = (option) => setSortOption(option);
  const handleFilterChange = (newFilter) => setFilter(newFilter);
  const handleToggleGrid = (value) => setIsGrid(value);

  const startResult = (currentPage - 1) * limitCard + 1;
  const endResult = Math.min(
    currentPage * limitCard,
    nftsData?.totalResults || 0
  );

  if (nftsLoading) return LoadingAnimation();
  if (nftsError) return <div>Error: {nftsError.message}</div>;

  console.log("nftsData", nftsData);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8">
        <div className="flex w-full lg:w-auto gap-8 lg:flex-1">
          <Filter filter={filter} setFilter={handleFilterChange} />
          <div className="flex-1">
            <SearchNfts searchValue={searchValue} onSearch={handleSearch} />
          </div>
        </div>
        <div className="flex items-center justify-center w-full lg:w-auto gap-8 mt-4 lg:mt-0">
          <Sort sortOption={sortOption} setSortOption={handleSort} />
          <ToggleSwitch isGrid={isGrid} setIsGrid={handleToggleGrid} />
        </div>
      </div>
      <div
        className={`text-primary-foreground grid gap-4 ${
          isGrid ? "grid-cols-5" : "grid-cols-4"
        }`}
      >
        {nftsData.items.length !== 0 &&
          nftsData.items.map((card, index) =>
            limitCard === 4 ? (
              <BigNftCard key={card._id || index} stamp={card} />
            ) : (
              <SmallNftCard key={card._id || index} stamp={card} />
            )
          )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalResults={nftsData?.totalResults}
        resultsPerPage={limitCard}
        onPageChange={handlePageChange}
      />
      <div className="text-white">
        Showing {startResult} to {endResult} of {nftsData?.totalResults} results
      </div>
    </div>
  );
}

export default NftsMarketplace;
