import React, { useEffect, useContext, useState } from "react";
import { Context } from "../context/apiContext";
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../utils/rapidApi";
import LeftNavBar from "./LeftNavBar";
import MobileMenu from "./MobileMenu";
import { Link } from "react-router-dom";

function SearchPage() {
  const { loading, setLoading } = useContext(Context);
  const { query } = useParams();
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    searchData();
    document.title = `Search - ${query} | YourTube`
  }, [query]);

  const searchData = () => {
    setLoading(true);
    fetchDataFromApi(`search?query=${query}`).then(({ data }) => {
      setSearchResult(data);
      setLoading(false);
    });
  };

  function formatNumber(number) {
    if (number < 1000) {
      return number.toString();
    } else if (number >= 1000 && number < 1000000) {
      return `${(number / 1000).toFixed(1)}K`;
    } else if (number >= 1000000 && number < 1000000000) {
      return `${(number / 1000000).toFixed(1)}M`;
    } else {
      return `${(number / 1000000000).toFixed(1)}B`;
    }
  }

  return (
    <div className="bg-black text-white flex h-full overflow-x-hidden">
      <LeftNavBar />
      <MobileMenu />
      <div className="h-[100%-3rem] w-full overflow-x-hidden m-9">
        {!loading &&
          searchResult?.map((video) => {
            if (video?.type !== "video") return '';
            return (
              <div key={video?.videoId} className="flex hover:bg-red-900 p-3 flex-col sm:flex-row">
                <Link to={`/video/${video?.videoId}`}>
                  <div className="sm:h-38 sm:w-48 md:h-36 md:w-52 object-fill flex-shrink-0">
                    <img
                      src={video?.thumbnail[0]?.url}
                      alt={video?.title}
                      className="rounded-lg w-full h-full"
                    />
                  </div>
                </Link>
                <div className="ml-3">
                  <Link to={`/video/${video?.videoId}`}>
                    <p className="line-clamp-2 text-xl md:line-clamp-1 sm:text-lg font-medium mt-3">
                      {video?.title}
                    </p>
                    <p className="hidden md:block line-clamp-2 font-light">
                      {video?.description}
                    </p>
                    <p className="text-sm">
                      {formatNumber(video?.viewCount)} views - {video?.publishedText}
                    </p>
                  </Link>
                  <div className="flex ml-2 mt-2 gap-2 items-center">
                    <img
                      src={video?.channelThumbnail[0]?.url}
                      className="h-9 w-9 rounded-full"
                      alt={video?.channelTitle}
                    />
                    <span>{video?.channelTitle}</span>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default SearchPage;
