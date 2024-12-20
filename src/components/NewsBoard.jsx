import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";

const NewsBoard = ({category}) => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null); // State to track errors
  const [isLoading, setIsLoading] = useState(true); // State to track loading status

  useEffect(() => {
    // Log environment variables for debugging
   // console.log("Environment Variables:", import.meta.env);

    const fetchNews = async () => {
      try {
        // Construct URL with the API key
        const apiKey = import.meta.env.VITE_API_KEY; // Fetch the API key
        if (!apiKey) {
          throw new Error("API key is missing. Check your .env file.");
        }

        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;
        //console.log("Request URL:", url);

        // Fetch data from the API
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setArticles(data.articles || []);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError(err.message);
      } finally {
        setIsLoading(false); // End loading state
      }
    };

    fetchNews();
  }, [category]); // Dependency array ensures this runs only once

  return (
    <div>
      <h2 className="text-center">
        Latest <span className="badge bg-danger">News</span>
      </h2>

      {isLoading && <p className="text-center">Loading...</p>} {/* Show a loading message */}
      {error && <p className="text-center text-danger">Error: {error}</p>} {/* Show error message */}
      
      <div className="d-flex flex-wrap justify-content-center">
        {articles?.map((news, index) => (
          <NewsItem
            key={index}
            title={news.title}
            description={news.description}
            src={news.urlToImage}
            url={news.url}
          />
        ))}
      </div>
    </div>
  );
};

export default NewsBoard;
