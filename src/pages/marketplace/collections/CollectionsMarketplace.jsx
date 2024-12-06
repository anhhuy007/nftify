import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import Sort from "@/pages/marketplace/nfts/components/Sort";
import ToggleSwitch from "@/pages/marketplace/nfts/components/ToggleSwitch";
import CollectionCard from "@/pages/marketplace/collections/components/CollectionCard";
import { Pagination } from "@/components/ui/pagination";
import LoadingAnimation from "@/components/ui/loading";
import SearchNfts from "@/pages/marketplace/nfts/components/SearchNfts";
import Filter from "@/pages/marketplace/nfts/components/Filter";

const fetcher = (url) => fetch(url).then((res) => res.json());
const collectionsApiEndpoint = "http://localhost:3000/api/v1/marketplace/list/collections";

function CollectionsMarketplace() {
  const [searchValue, setSearchValue] = useState("");
  const [sortOption, setSortOption] = useState("latest");
  const [filter, setFilter] = useState({});
  const [isGrid, setIsGrid] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [limitCard, setLimitCard] = useState(20);

  const {
    data: collectionsData,
    error: collectionsError,
    isLoading: collectionsLoading,
  } = useQuery("collections", () => fetcher(collectionsApiEndpoint));

  useEffect(() => {
    const newCardCount = isGrid ? 4 : 1;
    setLimitCard(newCardCount * 4);
  }, [isGrid]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSort = (option) => setSortOption(option);
  const handleToggleGrid = (value) => setIsGrid(value);

  const startResult = (currentPage - 1) * limitCard + 1;
  const endResult = Math.min(
    currentPage * limitCard,
    collectionsData?.totalResults || 0
  );

  if (collectionsLoading) return LoadingAnimation();
  if (collectionsError) return <div>Error: {collectionsError.message}</div>;

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8">
        <div className="flex w-full lg:w-auto gap-8 lg:flex-1">
          <Filter filter={filter} />
          <div className="flex-1">
            <SearchNfts searchValue={searchValue} />
          </div>
        </div>
        <div className="flex items-center justify-center w-full lg:w-auto gap-8 mt-4 lg:mt-0">
          <Sort sortOption={sortOption} setSortOption={handleSort} />
          <ToggleSwitch isGrid={isGrid} setIsGrid={handleToggleGrid} />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {collectionsData.items.length !== 0 &&
          collectionsData.items.map((card, index) => (
            <CollectionCard key={card._id || index} collection={card} />
          ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalResults={collectionsData?.totalResults}
        resultsPerPage={limitCard}
        onPageChange={handlePageChange}
      />
      <div className="text-white">
        Showing {startResult} to {endResult} of {collectionsData?.totalResults} results
      </div>
    </div>
  );
}

export default CollectionsMarketplace;