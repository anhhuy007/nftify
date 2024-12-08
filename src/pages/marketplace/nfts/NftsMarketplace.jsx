import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useNavigate, useLocation } from "react-router-dom";
import ToggleSwitch from "@/pages/marketplace/nfts/components/ToggleSwitch";
import { BigNftCard, SmallNftCard } from "@/components/NFT/NftCard";
import { Pagination } from "@/components/ui/pagination";
import LoadingAnimation from "@/components/ui/loading";
import { fetcher, nftsApiEndpoint } from "@/utils/endpoints";
import ErrorAnimation from "@/components/ui/error";
import Filter from "@/pages/marketplace/nfts/components/Filter";
import SearchNfts from "@/pages/marketplace/nfts/components/SearchNfts";
import Sort from "@/pages/marketplace/nfts/components/Sort";

function useQueryParams() {
  return new URLSearchParams(useLocation().search);
}

function NftsMarketplace() {
  const navigate = useNavigate();
  const queryParams = useQueryParams();

  const [searchValue, setSearchValue] = useState(queryParams.get("search") || "");
  const [sortOption, setSortOption] = useState(queryParams.get("sort") || "default");
  const [filter, setFilter] = useState({
    lowestPrice: queryParams.get("minPrice") || "",
    highestPrice: queryParams.get("maxPrice") || "",
    status: queryParams.get("status") || "all",
    collection: queryParams.get("collectionName") || "",
    owner: queryParams.get("ownerName") || "",
  });
  const [isGrid, setIsGrid] = useState(true);
  const [currentPage, setCurrentPage] = useState(parseInt(queryParams.get("page"), 10) || 1);
  const [limitCard, setLimitCard] = useState(parseInt(queryParams.get("limit"), 10) || 20);

  const {
    data: nftsData,
    error: nftsError,
    isLoading: nftsLoading,
  } = useQuery(
    [
      "nfts",
      searchValue,
      sortOption,
      filter.lowestPrice,
      filter.highestPrice,
      filter.status,
      filter.collection,
      filter.owner,
      currentPage,
      limitCard,
    ],
    () =>
      fetcher(
        `${nftsApiEndpoint}?title=${searchValue}&sort=${sortOption}&minPrice=${filter.lowestPrice}&maxPrice=${filter.highestPrice}&status=${filter.status}&collectionName=${filter.collection}&ownerName=${filter.owner}&page=${1}&limit=${10}`
      )
  );

  // watch api changes
  useEffect(() => {
    console.log("API: ", nftsApiEndpoint);
  }, [nftsApiEndpoint]);

  useEffect(() => {
    const newCardCount = isGrid ? 4 : 1;
    setLimitCard(newCardCount * 4);
  }, [isGrid]);

  const updateQueryParams = (params) => {
    const searchParams = new URLSearchParams({
      ...Object.fromEntries(queryParams.entries()),
      ...params,
    });
    navigate({ search: searchParams.toString() });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    updateQueryParams({ page: pageNumber });
  };

  const handleSearch = (value) => {
    setSearchValue(value);
    updateQueryParams({ search: value });
  };

  const handleSort = (option) => {
    setSortOption(option);
    updateQueryParams({ sort: option });
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    updateQueryParams({ 
      minPrice: newFilter.lowestPrice,
      maxPrice: newFilter.highestPrice,
      status: newFilter.status,
      collectionName: newFilter.collection,
      ownerName: newFilter.owner,
    });
  };

  const handleToggleGrid = (value) => setIsGrid(value);

  const startResult = (currentPage - 1) * limitCard + 1;
  const endResult = Math.min(currentPage * limitCard, nftsData?.totalResults || 0);

  if (nftsLoading) return <LoadingAnimation />;
  if (nftsError) return <ErrorAnimation />;

  console.log("Data: ", nftsData);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8">
        <div className="flex w-full lg:w-auto gap-8 lg:flex-1">
          <SearchNfts searchValue={searchValue} onSearch={handleSearch} />
          <Filter filter={filter} setFilter={handleFilterChange} />
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