import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useNavigate, useLocation, useOutletContext } from "react-router-dom";
import SearchNfts from "@/pages/marketplace/nfts/components/SearchNfts";
import CollectionCard from "@/pages/marketplace/collections/components/CollectionCard";
import LoadingAnimation from "@/components/ui/loading";
import ErrorAnimation from "@/components/ui/error";
import InfiniteScroll from "react-infinite-scroll-component";
import FetchingMoreAnimation from "@/components/ui/fetching-more";
import { fetcher } from "@/handlers/Endpoints";
import { USER_ENDPOINTS } from "../../handlers/Endpoints";

const ITEMS_PER_PAGE = 12;

function getInitialStateFromURL(searchParams, paramName, defaultValue) {
  const value = searchParams.get(paramName);
  return paramName === "page" || paramName === "limit"
    ? parseInt(value, 10) || defaultValue
    : value || defaultValue;
}

function constructQueryString(params) {
  return new URLSearchParams(params).toString();
}

function UserCollections() {
  const { userId } = useOutletContext();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // State initialization
  const [searchValue, setSearchValue] = useState(
    getInitialStateFromURL(searchParams, "search", "")
  );
  const [currentPage, setCurrentPage] = useState(
    getInitialStateFromURL(searchParams, "page", 1)
  );
  const [limitCard, setLimitCard] = useState(
    getInitialStateFromURL(searchParams, "limit", ITEMS_PER_PAGE)
  );
  const [collections, setCollections] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const apiUrl = USER_ENDPOINTS.PROFILE.COLLECTIONS.replace(":userId", userId);

  // Query configuration
  const {
    error: collectionsError,
    isLoading: collectionsLoading,
    refetch,
  } = useQuery(
    ["userCollections", userId, searchValue, currentPage, limitCard],
    function fetchUserCollections() {
      const queryParams = {
        title: searchValue,
        page: currentPage,
        limit: limitCard,
      };
      return fetcher(`${apiUrl}?${constructQueryString(queryParams)}`);
    },
    {
      keepPreviousData: true,
      onSuccess: function handleQuerySuccess(response) {
        const responseData = response.data;
        setCollections(
          currentPage === 1
            ? responseData.items
            : (prevCollections) => [...prevCollections, ...responseData.items]
        );
        setHasMore(responseData.hasMore || responseData.items.length > 0);
      },
      enabled: Boolean(userId),
    }
  );

  // Reset page and collections when search changes
  useEffect(
    function handleSearchChange() {
      setCurrentPage(1);
      setCollections([]);
      refetch();
    },
    [searchValue, refetch]
  );

  function updateQueryParams(params) {
    const updatedParams = new URLSearchParams({
      ...Object.fromEntries(searchParams),
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
    setCollections([]);
    refetch();
  }

  function fetchMoreData() {
    handlePageChange(currentPage + 1);
  }

  if (collectionsLoading && currentPage === 1) {
    return <LoadingAnimation />;
  }

  if (collectionsError) {
    return <ErrorAnimation />;
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8">
        <div className="flex w-full lg:w-auto gap-8 lg:flex-1">
          <SearchNfts searchValue={searchValue} onSearch={handleSearch} />
        </div>
      </div>
      <InfiniteScroll
        dataLength={collections.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<FetchingMoreAnimation />}
        endMessage={
          <p className="text-center text-white mt-20">
            {collections.length > 0
              ? "No more items to display"
              : "No items found"}
          </p>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:grid-cols-4">
          {collections.map((collection, index) => (
            <CollectionCard
              key={collection._id || index}
              collection={collection}
            />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default UserCollections;
