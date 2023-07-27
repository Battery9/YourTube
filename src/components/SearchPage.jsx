import React, { useEffect, useContext, useState } from "react";
import { Context } from "../context/apiContext";
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../utils/rapidApi";
import LeftNavBar from "./LeftNavBar";
import { Link } from "react-router-dom";

function SearchPage() {
  const { setLoading } = useContext(Context);
  const { query } = useParams();
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    searchData();
  }, [query]);

  const searchData = () => {
    setLoading(true);
    fetchDataFromApi(`search?query=${query}`).then(({ data }) => {
      setSearchResult(data);
      setLoading(false);
      console.log(data);
    });
  };

  return (
    <div className="bg-black text-white flex h-full overflow-x-hidden">
        <LeftNavBar />
      <div className="h-[100%-3rem] w-full overflow-x-hidden m-9 mr-0 scrollbar-hide">
        {searchResult?.map((video) => {
          return (
            <div key={video?.videoId} className="flex my-4">
              <Link to={`/video/${video?.videoId}`}>
              <div className="h-38 w-48 md:h-36 md:w-52 object-fill flex-shrink-0">
                <img src={video?.thumbnail[0]?.url} alt={video.title} className="rounded-lg w-full h-full"/>
              </div>
              </Link>
              <div className="ml-3">
                <Link to={`/video/${video?.videoId}`}>
                <p className="line-clamp-2 md:line-clamp-1 md:text-lg font-medium">{video?.title}</p>
                <p className="hidden md:block line-clamp-2 font-light">{video?.description}</p>
                <p className="text-sm">{video?.viewCount} - {video?.publishedText}</p>
                </Link>
                <div className="flex ml-2 mt-2 gap-2 items-center">
                  <img src={video?.channelThumbnail[0].url} className="h-9 w-9 rounded-full" alt="video?.channelTitle"/> <span>{video?.channelTitle}</span>
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
