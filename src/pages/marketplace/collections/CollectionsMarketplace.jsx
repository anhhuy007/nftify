import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import CollectionCard from "@/pages/marketplace/collections/components/CollectionCard";
import LoadingAnimation from "@/components/ui/loading";
import SearchNfts from "../nfts/components/SearchNfts";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import FetchingMoreAnimation from "@/components/ui/fetching-more";
import { fetcher } from "@/handlers/Endpoints";
import { useLocation } from "react-router-dom";
import ErrorAnimation from "@/components/ui/error";
import { MARKETPLACE_ENDPOINTS } from "../../../handlers/Endpoints";

function CollectionsMarketplace() {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(useLocation().search);

  const [searchValue, setSearchValue] = useState(
    queryParams.get("search") || ""
  );
  const [currentPage, setCurrentPage] = useState(
    parseInt(queryParams.get("page"), 10) || 1
  );
  const limitCard = 6;
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const {
    data: collectionsData,
    error: collectionsError,
    isLoading: collectionsLoading,
    refetch,
  } = useQuery(
    ["collections", searchValue, currentPage, limitCard],
    () =>
      fetcher(
        `${MARKETPLACE_ENDPOINTS.LIST_COLLECTIONS}?name=${searchValue}&page=${currentPage}&limit=${limitCard}`
      ),
    {
      keepPreviousData: true,
      onSuccess: (response) => {
        const data = response.data;
        if (currentPage === 1) {
          setItems(data.items);
        } else {
          setItems((prev) => [...prev, ...data.items]);
        }
        setHasMore(data.hasMore || data.items.length > 0);
      },

      enabled: true,
    }
  );

  useEffect(() => {
    setCurrentPage(1);
    setItems([]);
    refetch();
  }, [refetch]);

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
    setCurrentPage(1);
    setItems([]);
    refetch();
  };

  const fetchMoreData = () => {
    handlePageChange(currentPage + 1);
  };

  if (collectionsLoading && currentPage === 1) return LoadingAnimation();
  if (collectionsError) return ErrorAnimation();

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8">
        <div className="flex w-full lg:w-auto gap-8 lg:flex-1">
          <div className="flex-1">
            <SearchNfts searchValue={searchValue} onSearch={handleSearch} />
          </div>
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
        <div className={`grid grid-cols-3 gap-4`}>
          {items.map((card, index) => (
            <CollectionCard key={index} collection={card} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default CollectionsMarketplace;
