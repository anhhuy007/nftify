import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { BigNftCard, SmallNftCard } from "@/components/NFT/NftCard";
import LoadingAnimation from "@/components/ui/loading";
import ErrorAnimation from "@/components/ui/error";
import InfiniteScroll from "react-infinite-scroll-component";
import FetchingMoreAnimation from "@/components/ui/fetching-more";
import { fetcher, collectionItemsApiEndpoint } from "@/api/Endpoints";
import ToggleSwitch from "@/pages/marketplace/nfts/components/ToggleSwitch";
import SearchNfts from "@/pages/marketplace/nfts/components/SearchNfts";
import Sort from "@/pages/marketplace/nfts/components/Sort";

function CollectionItems() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(useLocation().search);

  const [isGrid, setIsGrid] = useState(queryParams.get("isGrid") === "true");
  const [currentPage, setCurrentPage] = useState(
    parseInt(queryParams.get("page"), 10) || 1
  );
  const [limitCard, setLimitCard] = useState(
    parseInt(queryParams.get("limit"), 10) || 20
  );
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [searchValue, setSearchValue] = useState(
    queryParams.get("search") || ""
  );
  const [sortOption, setSortOption] = useState(
    queryParams.get("sort") || "default"
  );

  const CardComponent = isGrid ? SmallNftCard : BigNftCard;
  const url = collectionItemsApiEndpoint.replace(":id", id);

  const { data, error, isLoading, refetch } = useQuery(
    ["collectionItems", searchValue, sortOption, currentPage, limitCard],
    () =>
      fetcher(
        `${url}?title=${searchValue}&sort=${sortOption}&page=${currentPage}&limit=${limitCard}`
      ),
    {
      keepPreviousData: true,
      onSuccess: (response) => {
        const data = response.data;
        // Append new items or reset based on page
        if (currentPage === 1) {
          setItems(data.items);
        } else {
          setItems((prevItems) => [...prevItems, ...data.items]);
        }

        // Update hasMore based on API response
        setHasMore(data.page < data.totalPages);
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

  const fetchMoreData = () => {
    // Increment page and trigger refetch
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const updateQueryParams = (params) => {
    const searchParams = new URLSearchParams({
      ...Object.fromEntries(queryParams.entries()),
      ...params,
    });
    navigate({ search: searchParams.toString() });
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
    setCurrentPage(1);
    setItems([]);
    refetch();
  };

  const handleToggleGrid = (value) => setIsGrid(value);

  if (isLoading && currentPage === 1) return <LoadingAnimation />;
  if (error) return <ErrorAnimation />;

  return (
    <>
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
            className={`grid grid-cols-1 sm:grid-cols-2 gap-2
          ${isGrid ? "md:grid-cols-5" : "md:grid-cols-4"}
          `}
          >
            {items.map((item) => (
              <CardComponent key={item._id} stamp={item} />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
}

export default CollectionItems;
