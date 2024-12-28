import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { BigNftCard, SmallNftCard } from "@/components/NFT/NftCard";
import LoadingAnimation from "@/components/ui/loading";
import ErrorAnimation from "@/components/ui/error";
import InfiniteScroll from "react-infinite-scroll-component";
import FetchingMoreAnimation from "@/components/ui/fetching-more";
import { fetcher } from "@/handlers/Endpoints";
import ToggleSwitch from "@/pages/marketplace/nfts/components/ToggleSwitch";
import SearchNfts from "@/pages/marketplace/nfts/components/SearchNfts";
import Sort from "@/pages/marketplace/nfts/components/Sort";
import { COLLECTION_ENDPOINTS } from "../../../handlers/Endpoints";

const GRID_COLUMNS = {
  GRID: 5,
  LIST: 4,
};

const ITEMS_PER_ROW = 4;

function getInitialStateFromURL(searchParams, paramName, defaultValue) {
  const value = searchParams.get(paramName);

  switch (paramName) {
    case "isGrid":
      return value === "true";
    case "page":
    case "limit":
      return parseInt(value, 10) || defaultValue;
    default:
      return value || defaultValue;
  }
}

function useCollectionItems(collectionId) {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(useLocation().search);

  const [isGrid, setIsGrid] = useState(
    getInitialStateFromURL(queryParams, "isGrid", true)
  );
  const [currentPage, setCurrentPage] = useState(
    getInitialStateFromURL(queryParams, "page", 1)
  );
  const [limitCard, setLimitCard] = useState(
    getInitialStateFromURL(queryParams, "limit", 20)
  );
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [searchValue, setSearchValue] = useState(
    getInitialStateFromURL(queryParams, "search", "")
  );
  const [sortOption, setSortOption] = useState(
    getInitialStateFromURL(queryParams, "sort", "default")
  );

  const url = COLLECTION_ENDPOINTS.DETAIL.ITEMS.replace(":id", collectionId);

  const { error, isLoading, refetch } = useQuery(
    ["collectionItems", searchValue, sortOption, currentPage, limitCard],
    function fetchCollectionItems() {
      const queryString = new URLSearchParams({
        title: searchValue,
        sort: sortOption,
        page: currentPage.toString(),
        limit: limitCard.toString(),
      }).toString();

      return fetcher(`${url}?${queryString}`);
    },
    {
      keepPreviousData: true,
      onSuccess: function handleQuerySuccess(response) {
        const responseData = response.data;
        setItems(
          currentPage === 1
            ? responseData.items
            : (prevItems) => [...prevItems, ...responseData.items]
        );
        setHasMore(responseData.page < responseData.totalPages);
      },
    }
  );

  function updateQueryParams(params) {
    const searchParams = new URLSearchParams({
      ...Object.fromEntries(queryParams.entries()),
      ...params,
    });
    navigate({ search: searchParams.toString() });
  }

  function handleSearch(value) {
    setSearchValue(value);
    updateQueryParams({ search: value });
    resetPagination();
  }

  function handleSort(option) {
    setSortOption(option);
    updateQueryParams({ sort: option });
    resetPagination();
  }

  function handleToggleGrid(value) {
    setIsGrid(value);
    updateQueryParams({ isGrid: value });
  }

  function resetPagination() {
    setCurrentPage(1);
    setItems([]);
    refetch();
  }

  function fetchMoreData() {
    setCurrentPage((prevPage) => prevPage + 1);
  }

  // Update card limit when view changes
  useEffect(
    function handleViewChange() {
      const newCardCount = isGrid ? GRID_COLUMNS.GRID : GRID_COLUMNS.LIST;
      setLimitCard(newCardCount * ITEMS_PER_ROW);
      resetPagination();
    },
    [isGrid]
  );

  return {
    isGrid,
    items,
    hasMore,
    searchValue,
    sortOption,
    isLoading,
    error,
    handleSearch,
    handleSort,
    handleToggleGrid,
    fetchMoreData,
  };
}

function CollectionItems() {
  const { id } = useParams();
  const {
    isGrid,
    items,
    hasMore,
    searchValue,
    sortOption,
    isLoading,
    error,
    handleSearch,
    handleSort,
    handleToggleGrid,
    fetchMoreData,
  } = useCollectionItems(id);

  const CardComponent = isGrid ? SmallNftCard : BigNftCard;

  if (isLoading) {
    return <LoadingAnimation />;
  }

  if (error) {
    return <ErrorAnimation />;
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center justify-center w-full gap-8 mt-4">
        <SearchNfts searchValue={searchValue} onSearch={handleSearch} />
        <Sort sortOption={sortOption} setSortOption={handleSort} />
        <ToggleSwitch isGrid={isGrid} setIsGrid={handleToggleGrid} disabled />
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
          className={`grid grid-cols-1 sm:grid-cols-2 gap-2 ${
            isGrid ? "md:grid-cols-5" : "md:grid-cols-4"
          }`}
        >
          {items.map((item) => (
            <CardComponent key={item._id} stamp={item} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default CollectionItems;
