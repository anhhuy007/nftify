import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "react-query";
import { useNavigate, useLocation } from "react-router-dom";
import ToggleSwitch from "@/pages/marketplace/nfts/components/ToggleSwitch";
import { BigNftCard, SmallNftCard } from "@/components/NFT/NftCard";
import LoadingAnimation from "@/components/ui/loading";
import ErrorAnimation from "@/components/ui/error";
import Filter from "@/pages/marketplace/nfts/components/Filter";
import SearchNfts from "@/pages/marketplace/nfts/components/SearchNfts";
import Sort from "@/pages/marketplace/nfts/components/Sort";
import InfiniteScroll from "react-infinite-scroll-component";
import FetchingMoreAnimation from "@/components/ui/fetching-more";
import { fetcher, nftsApiEndpoint } from "@/api/Endpoints";

function NftsMarketplace() {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(useLocation().search);

  const [searchValue, setSearchValue] = useState(
    queryParams.get("search") || ""
  );
  const [sortOption, setSortOption] = useState(
    queryParams.get("sort") || "default"
  );
  const [filter, setFilter] = useState({
    lowestPrice: queryParams.get("minPrice") || "",
    highestPrice: queryParams.get("maxPrice") || "",
    status: queryParams.get("status") || "all",
    collection: queryParams.get("collectionName") || "",
    owner: queryParams.get("ownerName") || "",
  });
  const [isGrid, setIsGrid] = useState(true);
  const [currentPage, setCurrentPage] = useState(
    parseInt(queryParams.get("page"), 10) || 1
  );
  const [limitCard, setLimitCard] = useState(
    parseInt(queryParams.get("limit"), 10) || 20
  );
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const CardComponent = isGrid ? SmallNftCard : BigNftCard;
  const filterSheetRef = useRef();

  const {
    data: nftsData,
    error: nftsError,
    isLoading: nftsLoading,
    refetch,
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
        `${nftsApiEndpoint}?title=${searchValue}&sort=${sortOption}&minPrice=${filter.lowestPrice}&maxPrice=${filter.highestPrice}&status=${filter.status}&collectionName=${filter.collection}&ownerName=${filter.owner}&page=${currentPage}&limit=${limitCard}`
      ),
    {
      keepPreviousData: true,
      onSuccess: (data) => {
        // Append new items or reset based on page
        if (currentPage === 1) {
          setItems(data.items);
        } else {
          setItems((prevItems) => [...prevItems, ...data.items]);
        }

        // Update hasMore based on API response
        setHasMore(data.hasMore || data.items.length > 0);
      },
      enabled: true, // Ensure query can be manually triggered
    }
  );

  useEffect(() => {
    const newCardCount = isGrid ? 5 : 4;
    setLimitCard(newCardCount * 4);
    // Reset pagination when view changes
    setCurrentPage(1);
    setItems([]);
    refetch();
  }, [isGrid, refetch]);

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
    // Reset pagination and items when searching
    setCurrentPage(1);
    setItems([]);
    refetch();
  };

  const handleSort = (option) => {
    setSortOption(option);
    updateQueryParams({ sort: option });
    // Reset pagination and items when sorting
    setCurrentPage(1);
    setItems([]);
    refetch();
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
    // Reset pagination and items when filtering
    setCurrentPage(1);
    setItems([]);
    refetch();
  };

  const handleClearFilter = () => {
    setFilter({
      lowestPrice: "",
      highestPrice: "",
      status: "all",
      collection: "",
      owner: "",
    });
    updateQueryParams({
      minPrice: "",
      maxPrice: "",
      status: "all",
      collectionName: "",
      ownerName: "",
    });
    // Reset pagination and items when clearing filter
    setCurrentPage(1);
    setItems([]);
    refetch();
  };

  const handleToggleGrid = (value) => setIsGrid(value);

  const fetchMoreData = () => {
    // Increment page and trigger refetch
    handlePageChange(currentPage + 1);
  };

  const closeFilter = () => {
    if (filterSheetRef.current) {
      filterSheetRef.current.close();
    }
  };

  if (nftsLoading && currentPage === 1) return <LoadingAnimation />;
  if (nftsError) return <ErrorAnimation />;

  return (
    <>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8">
          <div className="flex w-full lg:w-auto gap-8 lg:flex-1">
            <SearchNfts searchValue={searchValue} onSearch={handleSearch} />
            <Filter
              filter={filter}
              setFilter={handleFilterChange}
              clearFilter={handleClearFilter}
              closeFilter={closeFilter}
            />
          </div>
          <div className="flex items-center justify-center w-full lg:w-auto gap-8 mt-4 lg:mt-0">
            <Sort sortOption={sortOption} setSortOption={handleSort} />
            <ToggleSwitch
              isGrid={isGrid}
              setIsGrid={handleToggleGrid}
              disabled
            />
          </div>
        </div>
        <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<FetchingMoreAnimation />}
          endMessage={
            <p className="text-center text-white mt-20">
              {items.length > 0 ? "No more items to display" : "No items found"}
            </p>
          }
        >
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 gap-2
          ${isGrid ? "md:grid-cols-5" : "md:grid-cols-4"}
          `}
          >
            {items.map((card, index) => (
              <CardComponent key={card._id || index} stamp={card} />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
}

export default NftsMarketplace;
