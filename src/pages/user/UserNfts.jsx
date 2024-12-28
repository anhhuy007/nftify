import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "react-query";
import { useNavigate, useLocation, useOutletContext } from "react-router-dom";
import ToggleSwitch from "@/pages/marketplace/nfts/components/ToggleSwitch";
import {
  BigNftCard,
  SmallNftCard,
  SmallEditNftCard,
  BigEditNftCard,
} from "@/components/NFT/NftCard";
import LoadingAnimation from "@/components/ui/loading";
import ErrorAnimation from "@/components/ui/error";
import Filter from "@/pages/marketplace/nfts/components/Filter";
import SearchNfts from "@/pages/marketplace/nfts/components/SearchNfts";
import Sort from "@/pages/marketplace/nfts/components/Sort";
import InfiniteScroll from "react-infinite-scroll-component";
import FetchingMoreAnimation from "@/components/ui/fetching-more";
import { fetcher, USER_ENDPOINTS } from "../../handlers/Endpoints";

const ITEMS_PER_ROW = {
  GRID: 5,
  LIST: 4,
};

const DEFAULT_FILTER_STATE = {
  lowestPrice: "",
  highestPrice: "",
  status: "all",
  collection: "",
};

function getInitialStateFromURL(searchParams, paramName, defaultValue) {
  return searchParams.get(paramName) || defaultValue;
}

function getCardComponent(currentPath, isGrid) {
  return currentPath.includes("liked")
    ? isGrid
      ? SmallNftCard
      : BigNftCard
    : isGrid
    ? SmallEditNftCard
    : BigEditNftCard;
}

function buildApiEndpoint(currentPath, userId) {
  const pathSegments = currentPath.split("/");
  const profileId = pathSegments[2];

  if (currentPath.includes("owned")) {
    return {
      type: "owned",
      url: USER_ENDPOINTS.PROFILE.OWNED_NFTS.replace(":userId", profileId),
    };
  } else if (currentPath.includes("onSale")) {
    return {
      type: "onSale",
      url: USER_ENDPOINTS.PROFILE.ON_SALE_NFTS.replace(":userId", profileId),
    };
  } else if (currentPath.includes("created")) {
    return {
      type: "created",
      url: USER_ENDPOINTS.PROFILE.CREATED_NFTS.replace(":userId", profileId),
    };
  }
  return { type: "", url: "" };
}

function UserNfts() {
  const { userId } = useOutletContext();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const filterSheetRef = useRef();
  const searchParams = new URLSearchParams(location.search);

  // State initialization
  const [searchValue, setSearchValue] = useState(
    getInitialStateFromURL(searchParams, "search", "")
  );
  const [sortOption, setSortOption] = useState(
    getInitialStateFromURL(searchParams, "sort", "default")
  );
  const [filter, setFilter] = useState({
    lowestPrice: getInitialStateFromURL(searchParams, "minPrice", ""),
    highestPrice: getInitialStateFromURL(searchParams, "maxPrice", ""),
    status: getInitialStateFromURL(searchParams, "status", "all"),
    collection: getInitialStateFromURL(searchParams, "collectionName", ""),
  });
  const [isGrid, setIsGrid] = useState(true);
  const [currentPage, setCurrentPage] = useState(
    parseInt(getInitialStateFromURL(searchParams, "page", "1"), 10)
  );
  const [limitCard, setLimitCard] = useState(
    parseInt(getInitialStateFromURL(searchParams, "limit", "20"), 10)
  );
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [apiUrl, setApiUrl] = useState("");
  const [typeData, setTypeData] = useState("");

  const CardComponent = getCardComponent(currentPath, isGrid);

  // Path-based initialization
  useEffect(
    function initializeApiEndpoint() {
      const { type, url } = buildApiEndpoint(currentPath, userId);
      setTypeData(type);
      setApiUrl(url);
      setCurrentPage(1);
      setItems([]);
    },
    [currentPath]
  );

  // Query configuration
  const {
    data,
    error: nftsError,
    isLoading: nftsLoading,
    refetch,
  } = useQuery(
    [
      "userNfts",
      userId,
      typeData,
      searchValue,
      sortOption,
      filter.lowestPrice,
      filter.highestPrice,
      filter.status,
      filter.collection,
      currentPage,
      limitCard,
    ],
    function fetchUserNfts() {
      const queryParams = new URLSearchParams({
        title: searchValue,
        sort: sortOption,
        minPrice: filter.lowestPrice,
        maxPrice: filter.highestPrice,
        collectionName: filter.collection,
        page: currentPage.toString(),
        limit: limitCard.toString(),
      });

      return fetcher(`${apiUrl}?${queryParams.toString()}`);
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
        setHasMore(responseData.hasMore || responseData.items.length > 0);
      },
      enabled: Boolean(userId && apiUrl),
    }
  );

  // Grid/List view handling
  useEffect(
    function handleLayoutChange() {
      const newCardCount = isGrid ? ITEMS_PER_ROW.GRID : ITEMS_PER_ROW.LIST;
      setLimitCard(newCardCount * 4);
      setCurrentPage(1);
      setItems([]);
      refetch();
    },
    [isGrid, refetch]
  );

  function updateQueryParams(params) {
    const updatedParams = new URLSearchParams({
      ...Object.fromEntries(new URLSearchParams(location.search).entries()),
      ...params,
    });
    navigate({ search: updatedParams.toString() });
  }

  function handlePageChange(pageNumber) {
    setCurrentPage(pageNumber);
    updateQueryParams({ page: pageNumber });
  }

  function handleSearch(value) {
    setSearchValue(value);
    updateQueryParams({ search: value });
    setCurrentPage(1);
    setItems([]);
    refetch();
  }

  function handleSort(option) {
    setSortOption(option);
    updateQueryParams({ sort: option });
    setCurrentPage(1);
    setItems([]);
    refetch();
  }

  function handleFilterChange(newFilter) {
    setFilter(newFilter);
    updateQueryParams({
      minPrice: newFilter.lowestPrice,
      maxPrice: newFilter.highestPrice,
      status: newFilter.status,
      collectionName: newFilter.collection,
    });
    setCurrentPage(1);
    setItems([]);
    refetch();
  }

  function handleClearFilter() {
    setFilter(DEFAULT_FILTER_STATE);
    updateQueryParams({
      minPrice: "",
      maxPrice: "",
      status: "all",
      collectionName: "",
    });
    setCurrentPage(1);
    setItems([]);
    refetch();
  }

  function handleToggleGrid(value) {
    setIsGrid(value);
  }

  function fetchMoreData() {
    handlePageChange(currentPage + 1);
  }

  function closeFilter() {
    filterSheetRef.current?.close();
  }

  if (nftsLoading && currentPage === 1) {
    return <LoadingAnimation />;
  }

  if (nftsError) {
    return <ErrorAnimation />;
  }

  return (
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
          <ToggleSwitch isGrid={isGrid} setIsGrid={handleToggleGrid} disabled />
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
          className={`grid grid-cols-1 sm:grid-cols-2 gap-2 ${
            isGrid ? "md:grid-cols-5" : "md:grid-cols-4"
          }`}
        >
          {items.map((card, index) => (
            <CardComponent key={card._id || index} stamp={card} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default UserNfts;
