import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const SearchComponent = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/rooms?websiteView=0&noOfBeds=1&_page=${page}&_limit=5`
        );
        setSearchResults((prevResults) => [...prevResults, ...response.data]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    const handleScroll = () => {
      if (
        containerRef.current &&
        containerRef.current.scrollHeight - containerRef.current.scrollTop ===
        containerRef.current.clientHeight
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    fetchData();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page]);

  return (
    <div ref={containerRef} style={{ height: "400px", overflowY: "scroll" }}>
      <ul>
        {searchResults.map((room) => (
          <li key={room.roomId}>{room.name}</li>
        ))}
      </ul>
      {loading && <div>Loading...</div>}
    </div>
  );
};

export default SearchComponent;
