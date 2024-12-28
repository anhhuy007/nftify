import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "react-query";
import { useNavigate, useLocation, useOutletContext } from "react-router-dom";
import ToggleSwitch from "@/pages/marketplace/nfts/components/ToggleSwitch";
import { BigNftCard, SmallNftCard } from "@/components/NFT/NftCard";
import LoadingAnimation from "@/components/ui/loading";
import ErrorAnimation from "@/components/ui/error";
import Filter from "@/pages/marketplace/nfts/components/Filter";
import SearchNfts from "@/pages/marketplace/nfts/components/SearchNfts";
import Sort from "@/pages/marketplace/nfts/components/Sort";
import InfiniteScroll from "react-infinite-scroll-component";
import FetchingMoreAnimation from "@/components/ui/fetching-more";
import {
  fetcher,
  userOwnedNftsApiEndpoint,
  userOnSaleNftsApiEndpoint,
  userCreatedNftsApiEndpoint,
} from "@/handlers/Endpoints";
import { useAuth } from "@/context/AuthProvider";

const UserNfts = () => {
  const { userId } = useOutletContext();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const [searchValue, setSearchValue] = useState(
    new URLSearchParams(location.search).get("search") || ""
  );
  const [sortOption, setSortOption] = useState(
    new URLSearchParams(location.search).get("sort") || "default"
  );
  const [filter, setFilter] = useState({
    lowestPrice: new URLSearchParams(location.search).get("minPrice") || "",
    highestPrice: new URLSearchParams(location.search).get("maxPrice") || "",
    status: new URLSearchParams(location.search).get("status") || "all",
    collection:
      new URLSearchParams(location.search).get("collectionName") || "",
  });
  const [isGrid, setIsGrid] = useState(true);
  const [currentPage, setCurrentPage] = useState(
    parseInt(new URLSearchParams(location.search).get("page"), 10) || 1
  );
  const [limitCard, setLimitCard] = useState(
    parseInt(new URLSearchParams(location.search).get("limit"), 10) || 20
  );
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [apiUrl, setApiUrl] = useState("");
  const [typeData, setTypeData] = useState("");

  const CardComponent = isGrid ? SmallNftCard : BigNftCard;
  const filterSheetRef = useRef();

  useEffect(() => {
    const userId = currentPath.split("/")[2];
    if (currentPath.includes("owned")) {
      setTypeData("owned");
      setApiUrl(userOwnedNftsApiEndpoint.replace(":userId", userId));
    } else if (currentPath.includes("onSale")) {
      setTypeData("onSale");
      setApiUrl(userOnSaleNftsApiEndpoint.replace(":userId", userId));
    } else if (currentPath.includes("created")) {
      setTypeData("created");
      setApiUrl(userCreatedNftsApiEndpoint.replace(":userId", userId));
    }
    setCurrentPage(1);
    setItems([]);
  }, [currentPath]);

  const {
    data: nftsData,
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
    () =>
      fetcher(
        `${apiUrl}?title=${searchValue}&sort=${sortOption}&minPrice=${filter.lowestPrice}&maxPrice=${filter.highestPrice}&collectionName=${filter.collection}&page=${currentPage}&limit=${limitCard}`
      ),
    {
      keepPreviousData: true,
      onSuccess: (response) => {
        console.log(
          `Request API: ${apiUrl}?title=${searchValue}&sort=${sortOption}&minPrice=${filter.lowestPrice}&maxPrice=${filter.highestPrice}&collectionName=${filter.collection}&page=${currentPage}&limit=${limitCard}`
        );

        const data = response.data;
        if (currentPage === 1) {
          setItems(data.items);
        } else {
          setItems((prevItems) => [...prevItems, ...data.items]);
        }
        setHasMore(data.hasMore || data.items.length > 0);
      },
      enabled: !!userId && !!apiUrl,
    }
  );

  useEffect(() => {
    const newCardCount = isGrid ? 5 : 4;
    setLimitCard(newCardCount * 4);
    setCurrentPage(1);
    setItems([]);
    refetch();
  }, [isGrid, refetch]);

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

  const handleFilterChange = (newFilter) => {
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
  };

  const handleClearFilter = () => {
    setFilter({
      lowestPrice: "",
      highestPrice: "",
      status: "all",
      collection: "",
    });
    updateQueryParams({
      minPrice: "",
      maxPrice: "",
      status: "all",
      collectionName: "",
    });
    setCurrentPage(1);
    setItems([]);
    refetch();
  };

  const handleToggleGrid = (value) => setIsGrid(value);

  const fetchMoreData = () => {
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
};

export default UserNfts;
