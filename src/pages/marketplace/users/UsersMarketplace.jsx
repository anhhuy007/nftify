import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import UserCard from "@/pages/marketplace/users/components/UserCard";
import SearchNfts from "@/pages/marketplace/nfts/components/SearchNfts";

// Function to fetch users based on search value, current page, and card limit
const fetchUsers = async (searchValue, currentPage, limitCard) => {
  try {
    // Sending a POST request to the API to get users based on the given parameters
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        searchValue, // Search term entered by the user
        currentPage, // The current page number
        limitCard, // The number of users per page
      }),
    });

    const data = await response.json(); // Parsing the response from the server
    return data.users; // Assuming the API returns an array of users in 'users'
  } catch (error) {
    console.error("Error fetching users:", error); // Handling any errors during the fetch request
    return []; // Return an empty array if there's an error
  }
};

function UsersMarketplace() {
  // Hook to read and update the URL search parameters
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || ""
  );
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page")) || 1
  );
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const limitCard = 12; // Number of users to display per page

  // Function to handle changes in the search input
  const handleSearch = (value) => setSearchValue(value);

  // Function to update the URL with the current search and page parameters
  const updateUrlParams = () => {
    setSearchParams({ search: searchValue, page: currentPage });
  };

  // useEffect hook to fetch users when searchValue or currentPage changes
  useEffect(() => {
    const fetchData = async () => {
      const usersData = await fetchUsers(searchValue, currentPage, limitCard);
      setUsers(usersData);

      // Assuming the API sends back the total count of users
      const totalCount = usersData.length;
      setTotalResults(totalCount);
      setTotalPages(Math.ceil(totalCount / limitCard));
    };

    fetchData();
    updateUrlParams();
  }, [searchValue, currentPage]);

  // Function to handle page changes
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the range of results to display based on current page
  const startResult = (currentPage - 1) * limitCard + 1;
  const endResult = Math.min(currentPage * limitCard, totalResults);

  return (
    <div className="flex flex-col gap-20">
      {/* Search component to filter users */}
      <SearchNfts searchValue={searchValue} onSearch={handleSearch} />

      {/* Display the results info */}
      {totalResults > 0 ? (
        <p className="text-primary-foreground text-bold text-xl">
          Showing {startResult} to {endResult} of {totalResults} results
        </p>
      ) : (
        <p className="text-center text-primary-foreground text-bold text-xl">
          No results found
        </p>
      )}

      {/* Display the list of users in card format */}
      <div className="grid grid-cols-2 gap-4">
        {users.map((user, index) => (
          <UserCard key={index} user={user} />
        ))}
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-4 mt-4">
          {/* Previous button */}
          <button
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {/* Page number buttons */}
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

          {/* Next button */}
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
  );
}

export default UsersMarketplace;
