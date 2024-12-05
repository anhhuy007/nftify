import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Sort from "@/pages/marketplace/nfts/components/Sort";
import SearchNfts from "@/pages/marketplace/nfts/components/SearchNfts";
import ToggleSwitch from "@/pages/marketplace/nfts/components/ToggleSwitch";
import { BigNftCard, SmallNftCard } from "@/components/NFT/NftCard";
import Filter from "@/pages/marketplace/nfts/components/Filter";
import { useLocation } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useOutletContext } from "react-router-dom";

function UserNfts() {
  // Fetch location to determine the current path
  const location = useLocation();
  const { userName, userId } = useOutletContext(); // Fetch user details from outlet context

  const currentPath = location.pathname; // Get the current path (URL)

  // Determine the NFT type based on the path (owned, onSale, or created)
  let typeData = "";
  if (currentPath.includes("owned")) {
    typeData = "owned";
  } else if (currentPath.includes("onSale")) {
    typeData = "onSale";
  } else if (currentPath.includes("created")) {
    typeData = "created";
  }
  // useSearchParams is a hook to read and manipulate the URL search parameters
  const [searchParams, setSearchParams] = useSearchParams();

  // State variables for different parameters (grid view, sorting, search, etc.)
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
    lowestPrice: searchParams.get("lowestPrice") || "",
    highestPrice: searchParams.get("highestPrice") || "",
  });
  const [cards, setCards] = useState([]); // State for storing fetched NFT cards
  const [totalPages, setTotalPages] = useState(5); // Total number of pages for pagination
  const [totalResults, setTotalResults] = useState(0); // Total number of NFT results

  // Calculate the number of cards per row based on grid view state
  const calculateCardCount = () => (isGrid ? 5 : 4);
  const [cardCount, setCardCount] = useState(calculateCardCount());
  const [limitCard, setLimitCard] = useState(cardCount * 4); // Limit the number of cards per page

  // Function to fetch data based on the current parameters
  const fetchData = async () => {
    try {
      const payload = {
        type: typeData,
        status: filter.status,
        collection: filter.collection,
        user: userId,
        lowestPrice: filter.lowestPrice,
        highestPrice: filter.highestPrice,
        sort: sortOption,
        search: searchValue,
        page: currentPage,
        limit: limitCard,
      };

      const response = await fetch(`/api/users/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      setCards(result.data); // Set the fetched NFT cards
      setTotalPages(Math.ceil(result.total / limitCard)); // Set total pages for pagination
      setTotalResults(result.total); // Set total results for displaying info
    } catch (error) {
      console.error("Error fetching filtered data:", error); // Log error if fetch fails
    }
  };

  // Update the card count and limit based on grid view toggle
  useEffect(() => {
    const newCardCount = calculateCardCount();
    setCardCount(newCardCount);
    setLimitCard(newCardCount * 4); // Update limitCard according to card count
  }, [isGrid]);

  // Update URL search parameters when filters, search, sorting, etc., change
  useEffect(() => {
    updateUrlParams();
    // fetchData(); // Uncomment to fetch data when parameters change
  }, [searchValue, sortOption, currentPage, filter, isGrid, limitCard]);

  // Update URL parameters based on current state
  const updateUrlParams = () => {
    const newParams = {
      search: searchValue,
      sort: sortOption,
      page: currentPage,
      isGrid,
      ...filter,
      limit: limitCard,
    };
    setSearchParams(newParams); // Set the updated search params in the URL
  };

  // updateUrlParams(); // Call the function to update URL params

  // Handlers for page change, search input, sorting, filter change, and grid toggle
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const handleSearch = (value) => setSearchValue(value);
  const handleSort = (option) => setSortOption(option);
  const handleFilterChange = (newFilter) => setFilter(newFilter);
  const handleToggleGrid = (value) => setIsGrid(value);

  // Calculate the range of results to display (start and end)
  const startResult = (currentPage - 1) * limitCard + 1;
  const endResult = Math.min(currentPage * limitCard, totalResults);

  // Disabled fields (user details)
  const disabledFields = {
    user: {
      isDisabled: true,
      name: userName,
    },
  };

  return (
    <>
      <div className="flex flex-col gap-10">
        {/* Filters and controls */}
        <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8">
          <div className="flex w-full lg:w-auto gap-8 lg:flex-1">
            <Filter
              filter={filter}
              setFilter={handleFilterChange}
              disabledFields={disabledFields}
            />
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
    </>
  );
}

export default UserNfts;
