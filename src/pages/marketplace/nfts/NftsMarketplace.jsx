import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Sort from "@/pages/marketplace/nfts/components/Sort";
import SearchNfts from "@/pages/marketplace/nfts/components/SearchNfts";
import ToggleSwitch from "@/pages/marketplace/nfts/components/ToggleSwitch";
import { BigNftCard, SmallNftCard } from "@/components/NFT/NftCard";
import Filter from "@/pages/marketplace/nfts/components/Filter";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function NftsMarketplace() {
  const [searchParams, setSearchParams] = useSearchParams();

  // View state: grid or list layout
  const [isGrid, setIsGrid] = useState(searchParams.get("isGrid") === "true");
  const [sortOption, setSortOption] = useState(searchParams.get("sort") || "");
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || ""
  );
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page"), 10) || 1
  );
  const [filter, setFilter] = useState({
    status: searchParams.get("status") || "all",
    collection: searchParams.get("collection") || "",
    user: searchParams.get("user") || "",
    lowestPrice: searchParams.get("lowestPrice") || "",
    highestPrice: searchParams.get("highestPrice") || "",
  });
  const [cards, setCards] = useState([]);
  const [totalPages, setTotalPages] = useState(5);
  const [totalResults, setTotalResults] = useState(0); // Total number of results

  // Determine card count per page based on isGrid state
  const calculateCardCount = () => (isGrid ? 5 : 4); // 5 cards for grid, 4 for list
  const [cardCount, setCardCount] = useState(calculateCardCount());
  const [limitCard, setLimitCard] = useState(cardCount * 4);

  // Function to fetch NFT data from the API
  const fetchData = async () => {
    try {
      const payload = {
        status: filter.status,
        collection: filter.collection,
        user: filter.user,
        lowestPrice: filter.lowestPrice,
        highestPrice: filter.highestPrice,
        sort: sortOption,
        search: searchValue,
        page: currentPage,
        limit: limitCard,
      };

      const response = await fetch(`/api/nfts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      setCards(result.data);
      setTotalPages(Math.ceil(result.total / limitCard));
      setTotalResults(result.total); // Store the total number of results
    } catch (error) {
      console.error("Error fetching filtered data:", error);
    }
  };

  // Update URL params when states change
  const updateUrlParams = () => {
    const newParams = {
      search: searchValue,
      sort: sortOption,
      page: currentPage,
      isGrid,
      ...filter,
      limit: limitCard,
    };
    setSearchParams(newParams);
  };

  // Update cardCount and limitCard when isGrid changes
  useEffect(() => {
    const newCardCount = calculateCardCount();
    setCardCount(newCardCount);
    setLimitCard(newCardCount * 4);
  }, [isGrid]);

  // Update URL params whenever relevant states change
  useEffect(() => {
    // fetchData();
    updateUrlParams();
  }, [searchValue, sortOption, currentPage, filter, isGrid, limitCard]);

  // Update cards when currentPage changes
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (value) => setSearchValue(value);
  const handleSort = (option) => setSortOption(option);
  const handleFilterChange = (newFilter) => setFilter(newFilter);
  const handleToggleGrid = (value) => setIsGrid(value);

  // Dynamically calculate the start and end result
  const startResult = (currentPage - 1) * limitCard + 1;
  const endResult = Math.min(currentPage * limitCard, totalResults);

  return (
    <div className="flex flex-col gap-10">
      {/* Filters and controls */}
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

      {/* Results info */}
      {totalResults > 0 ? (
        <p className=" text-primary-foreground text-bold text-xl">
          Showing {startResult} to {endResult} of {totalResults} results
        </p>
      ) : (
        <p className="text-center text-primary-foreground  text-bold text-xl">
          No results found
        </p>
      )}

      {/* Card list */}
      <div
        className={`text-primary-foreground grid gap-4 ${
          isGrid ? "grid-cols-5" : "grid-cols-4"
        }`}
      >
        {cards.length != 0 &&
          cards.map((card, index) =>
            cardCount === 4 ? (
              <BigNftCard key={card.id || index} {...card} />
            ) : (
              <SmallNftCard key={card.id || index} {...card} />
            )
          )}
      </div>

      {/* Pagination only shows if there are cards */}
      {cards.length > 0 && (
        <Pagination>
          <PaginationContent className="text-primary-foreground">
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  onClick={() => handlePageChange(index + 1)}
                  isActive={currentPage === index + 1}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}

export default NftsMarketplace;
