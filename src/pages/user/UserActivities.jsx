import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import Activity from "@/pages/collection/components/Activity";

const fetcchActivities = async (currentPage, limitCard, userId) => {
  try {
    const response = await fetch("/api/activities", {
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

function UserActivities() {
  const { userName, userId } = useOutletContext(); // Fetch user details from outlet context
  const [searchParams, setSearchParams] = useSearchParams();
  const [activities, setActivities] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page")) || 1
  );
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0); // Track total number of results
  const limitCard = 5;

  const activity = [
    {
      image: "https://via.placeholder.com/150",
      name: "Activity 1",
      time: "2024-12-01",
      previousOwner: "Owner A",
      currentOwner: "Owner B",
      type: "transferred",
      price: 0.05,
    },
    {
      image: "https://via.placeholder.com/150",
      name: "Activity 2",
      time: "2024-12-02",
      previousOwner: "Owner B",
      currentOwner: "Owner C",
      type: "listed",
      price: 0.1,
    },
    {
      image: "https://via.placeholder.com/150",
      name: "Activity 3",
      time: "2024-12-03",
      previousOwner: "Owner C",
      currentOwner: "Owner D",
      type: "purchased",
      price: 0.15,
    },
  ];

  const updateUrlParams = () => {
    setSearchParams({ page: currentPage });
  };

  useEffect(() => {
    const fetchData = async () => {
      const activitiesData = await fetchActivities(
        currentPage,
        limitCard,
        userId
      );
      setActivities(activitiesData);

      // Assuming the API sends back the total count of collections
      const totalCount = activitiesData.length;
      setTotalResults(totalCount);
      setTotalPages(Math.ceil(totalCount / limitCard));
    };

    fetchData();
    updateUrlParams();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startResult = (currentPage - 1) * limitCard + 1;
  const endResult = Math.min(currentPage * limitCard, totalResults);

  return (
    <>
      <div className="flex flex-col gap-20">
        <div className="space-y-5">
          {activity.map((activity, index) => (
            <Activity key={index} activity={activity} />
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

export default UserActivities;
