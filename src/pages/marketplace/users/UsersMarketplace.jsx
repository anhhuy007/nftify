import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import Sort from "@/pages/marketplace/nfts/components/Sort";
import ToggleSwitch from "@/pages/marketplace/nfts/components/ToggleSwitch";
import UserCard from "@/pages/marketplace/users/components/UserCard";
import { Pagination } from "@/components/ui/pagination";
import LoadingAnimation from "@/components/ui/loading";

const fetcher = (url) => fetch(url).then((res) => res.json());
const usersApiEndpoint = "http://localhost:3000/api/v1/marketplace/list/creators";

function UsersMarketplace() {
  // const [searchValue, setSearchValue] = useState("");
  const [sortOption, setSortOption] = useState("latest");
  // const [filter, setFilter] = useState({});
  const [isGrid, setIsGrid] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [limitCard, setLimitCard] = useState(20);

  const {
    data: usersData,
    error: usersError,
    isLoading: usersLoading,
  } = useQuery("users", () => fetcher(usersApiEndpoint));

  useEffect(() => {
    const newCardCount = isGrid ? 4 : 1;
    setLimitCard(newCardCount * 4);
  }, [isGrid]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSort = (option) => setSortOption(option);
  const handleToggleGrid = (value) => setIsGrid(value);

  const startResult = (currentPage - 1) * limitCard + 1;
  const endResult = Math.min(
    currentPage * limitCard,
    usersData?.totalResults || 0
  );

  if (usersLoading) return LoadingAnimation();
  if (usersError) return <div>Error: {usersError.message}</div>;

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8">
        <div className="flex items-center justify-center w-full lg:w-auto gap-8 mt-4 lg:mt-0">
          <Sort sortOption={sortOption} setSortOption={handleSort} />
          <ToggleSwitch isGrid={isGrid} setIsGrid={handleToggleGrid} />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {usersData.items.length !== 0 &&
          usersData.items.map((user, index) => (
            <UserCard key={user._id || index} user={user} />
          ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalResults={usersData?.totalResults}
        resultsPerPage={limitCard}
        onPageChange={handlePageChange}
      />
      <div className="text-white">
        Showing {startResult} to {endResult} of {usersData?.totalResults} results
      </div>
    </div>
  );
}

export default UsersMarketplace;