import { useState, useEffect } from "react";
import axios from "axios";

const useSearch = (initialParams = { websiteView: 0, noOfBeds: 1 }) => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [allPagesFetched, setAllPagesFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rooms, setRooms] = useState([]);

  const handleSearch = async (params = {}) => {
    setAllPagesFetched(false); // Reset flag for new searches
    setPage(1); // Start from page 1
    setRooms([]); // Clear previous results

    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/rooms?websiteView=${
          initialParams.websiteView
        }&noOfBeds=${initialParams.noOfBeds}&_page=${1}`, // Start with page 1
        { params: { ...params } } // Merge initial and new params
      );
      const totalPages = response.data.pages;
      setTotalPages(totalPages);
      setRooms(response.data.data);

      if (page >= totalPages) {
        setAllPagesFetched(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = async () => {
    if (allPagesFetched || isLoading) return;

    setIsLoading(true);
    try {
      const newPage = page + 1;
      const response = await axios.get(
        `http://localhost:5000/rooms?websiteView=${initialParams.websiteView}&noOfBeds=${initialParams.noOfBeds}&_page=${newPage}`
      );

      if (newPage > page) {
        setRooms([...rooms, ...response.data.data]); // Append new results
      }

      if (newPage >= totalPages) {
        setAllPagesFetched(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleSearch(initialParams); // Perform initial search on mount
  }, [initialParams]); // Re-run search on initialParams change

  return {
    rooms,
    page,
    totalPages,
    isLoading,
    handleSearch,
    handleLoadMore,
  };
};

export default useSearch;
