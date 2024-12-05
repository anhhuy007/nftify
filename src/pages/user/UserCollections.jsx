import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchNfts from "@/pages/marketplace/nfts/components/SearchNfts";
import CollectionCard from "@/pages/marketplace/collections/components/CollectionCard";
import { useOutletContext } from "react-router-dom";

const fetchCollections = async (
  searchValue,
  currentPage,
  limitCard,
  userId
) => {
  try {
    const response = await fetch("/api/collections", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        searchValue,
        currentPage,
        limitCard,
        userId,
      }),
    });

    const data = await response.json();
    return data.collections; // Assuming the API returns collections in 'collections'
  } catch (error) {
    console.error("Error fetching collections:", error);
    return [];
  }
};

function UserCollections() {
  // Fetch location to determine the current path
  const { userName, userId } = useOutletContext(); // Fetch user details from outlet context
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || ""
  );
  const [collections, setCollections] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page")) || 1
  );
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0); // Track total number of results
  const limitCard = 12;

  const handleSearch = (value) => setSearchValue(value);

  const updateUrlParams = () => {
    setSearchParams({ search: searchValue, page: currentPage });
  };

  useEffect(() => {
    const fetchData = async () => {
      const collectionsData = await fetchCollections(
        searchValue,
        currentPage,
        limitCard,
        userId
      );
      setCollections(collectionsData);

      // Assuming the API sends back the total count of collections
      const totalCount = collectionsData.length;
      setTotalResults(totalCount);
      setTotalPages(Math.ceil(totalCount / limitCard));
    };

    // fetchData();
    updateUrlParams();
  }, [searchValue, currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate start and end results based on current page and limit
  const startResult = (currentPage - 1) * limitCard + 1;
  const endResult = Math.min(currentPage * limitCard, totalResults);

  return (
    <>
      <div className="flex flex-col gap-20">
        {/* Display search input */}
        <SearchNfts searchValue={searchValue} onSearch={handleSearch} />

        {/* Results info */}
        {totalResults > 0 ? (
          <p className="text-primary-foreground text-bold text-xl">
            Showing {startResult} to {endResult} of {totalResults} results
          </p>
        ) : (
          <p className="text-center text-primary-foreground text-bold text-xl">
            No results found
          </p>
        )}

        {/* Collection Cards */}
        <div className="grid grid-cols-3 gap-4">
          {collections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-4 mt-4">
            <button
              className="px-4 py-2 bg-gray-300 rounded"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded ${
                  currentPage === index + 1
                    ? "bg-primary-500 text-white"
                    : "bg-gray-300"
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            <button
              className="px-4 py-2 bg-gray-300 rounded"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default UserCollections;
