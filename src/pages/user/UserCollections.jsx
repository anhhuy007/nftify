import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "react-query";
import { useNavigate, useLocation, useOutletContext } from "react-router-dom";
import SearchNfts from "@/pages/marketplace/nfts/components/SearchNfts";
import CollectionCard from "@/pages/marketplace/collections/components/CollectionCard";
import LoadingAnimation from "@/components/ui/loading";
import ErrorAnimation from "@/components/ui/error";
import InfiniteScroll from "react-infinite-scroll-component";
import FetchingMoreAnimation from "@/components/ui/fetching-more";
import { fetcher, userCollectionsApiEndpoint } from "@/api/Endpoints";

const UserCollections = () => {
  const { userId } = useOutletContext();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const [searchValue, setSearchValue] = useState(new URLSearchParams(location.search).get("search") || "");
  const [currentPage, setCurrentPage] = useState(parseInt(new URLSearchParams(location.search).get("page"), 10) || 1);
  const [limitCard, setLimitCard] = useState(parseInt(new URLSearchParams(location.search).get("limit"), 10) || 12);
  const [collections, setCollections] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const apiUrl = userCollectionsApiEndpoint.replace(":userId", userId);
  const {
    data: collectionsData,
    error: collectionsError,
    isLoading: collectionsLoading,
    refetch,
  } = useQuery(
    [
      "userCollections",
      userId,
      searchValue,
      currentPage,
      limitCard,
    ],
    () =>
      fetcher(
        `${apiUrl}?&title=${searchValue}&page=${currentPage}&limit=${limitCard}`
      ),
    {
      keepPreviousData: true,
      onSuccess: (data) => {
        if (currentPage === 1) {
          setCollections(data.items);
        } else {
          setCollections((prevCollections) => [...prevCollections, ...data.items]);
        }
        setHasMore(data.hasMore || data.items.length > 0);
      },
      enabled: !!userId,
    }
  );

  useEffect(() => {
    setCurrentPage(1);
    setCollections([]);
    refetch();
  }, [searchValue, refetch]);

  const updateQueryParams = (params) => {
    const searchParams = new URLSearchParams({
      ...Object.fromEntries(new URLSearchParams(location.search).entries()),
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
    setCurrentPage(1);
    setCollections([]);
    refetch();
  };

  const fetchMoreData = () => {
    handlePageChange(currentPage + 1);
  };

  if (collectionsLoading && currentPage === 1) return <LoadingAnimation />;
  if (collectionsError) return <ErrorAnimation />;

  console.log("UserCollections:", collections);

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
            {collections.length > 0 ? "No more items to display" : "No items found"}
          </p>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:grid-cols-4">
          {collections.map((collection, index) => (
            <CollectionCard key={collection._id || index} collection={collection} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default UserCollections;