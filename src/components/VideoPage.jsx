import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../context/apiContext";
import { fetchDownloadDataFromApi } from "../utils/downloadApi";
import LeftNaBar from "./LeftNavBar";
import MobileMenu from "./MobileMenu";
import ReactPlayer from "react-player";
import DownloadModal from "./DownloadModal";
import { Link } from "react-router-dom";
import { FiThumbsUp, FiDownload } from "react-icons/fi";

export default function VideoPage() {
  const { id } = useParams();
  const [video, setVideo] = useState();
  const [suggestion, setSuggestion] = useState();
  const { setLoading } = useContext(Context);

  useEffect(() => {
    const fetchVideo = () => {
      setLoading(true);
      fetchDownloadDataFromApi(`video/info?id=${id}&extend=1`).then((info) => {
        setVideo(info);
        setLoading(false);
        setSuggestion(info?.relatedVideos?.data);
      });
    };
    fetchVideo();
    document.title = `${video?.title} | YourTube`
  }, [id, video?.title]);

  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleShowFullDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const [showModal, setShowModal] = useState(false)

  function formatNumber(number) {
    if (number < 1000) {
      return number?.toString();
    } else if (number >= 1000 && number < 1000000) {
      return `${(number / 1000).toFixed(1)}K`;
    } else if (number >= 1000000 && number < 1000000000) {
      return `${(number / 1000000).toFixed(1)}M`;
    } else {
      return `${(number / 1000000000).toFixed(1)}B`;
    }
  }

  return (
    <div className="bg-black flex h-full text-white overflow-x-hidden">
      <LeftNaBar />
      <MobileMenu />
      <div className="h-[calc(100%-3rem)] md:w-[calc(100%-6rem)] mt-6 px-4 overflow-x-hidden scrollbar-hide">
        <div className="flex lg:flex-row flex-col p-2">
          <div className="lg:w-2/3">
            <div className="aspect-video rounded-md m-3 mt-px overflow-hidden">
              <ReactPlayer
                url={`https://youtube.com/watch?v=${id}`}
                controls
                width="100%"
                height="100%"
                playing={true}
              />
            </div>

            <div className="mt-4">
              <h1 className="text-lg md:text-xl font-semibold line-clamp-3">
                {video?.title}
              </h1>
              <div className="flex items-center mt-2">
                <img
                  src={video?.channelThumbnail[1]?.url}
                  alt="Channel Logo"
                  className="w-9 h-9 rounded-full mr-2 ml-2"
                />
                <div>
                  <p className="font-semibold">{video?.channelTitle}</p>
                  <p className="text-sm text-gray-300">
                    {video?.subscriberCountText}
                  </p>
                </div>
                <div className="flex items-center ml-5 font-semibold md:ml-16 px-1 bg-slate-100 text-black rounded gap-1">
                <FiThumbsUp /> <p>{formatNumber(video?.likeCount)}</p>
                </div>
                <div className="flex items-center ml-3 font-semibold px-1 bg-slate-100 text-black rounded gap-1 cursor-pointer" onClick={() => setShowModal(true)}>
                <FiDownload /> <p>Download</p>
                </div>
              </div>

              <div className="text-sm font-medium text-gray-200 mt-2">
                {formatNumber(video?.viewCount)} views • Published on {video?.uploadDate}
              </div>

              <div className="text-sm text-gray-200 mt-2">
                {showFullDescription ? (
                  <pre className="whitespace-pre-wrap">
                    {video?.description}
                  </pre>
                ) : (
                  <pre className="line-clamp-2 whitespace-pre-wrap">
                    {video?.description}
                  </pre>
                )}
                {video?.description?.length > 200 && (
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={toggleShowFullDescription}
                  >
                    {showFullDescription ? "Show Less" : "Show More"}
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="lg:w-1/3 ml-2 w-full max-h-[86vh] overflow-y-scroll overflow-x-hidden scrollbar-hide mt-5 lg:mt-0">
            <div className="text-xl font-semibold mb-4 m-2">
              Suggested Videos
            </div>
            {suggestion?.map((video) => {
              return (
                <Link to={`/video/${video.videoId}`} key={video?.videoId}>
                  <div
                    className="relative flex flex-col md:flex-row mr-4 hover:bg-red-900/70"
                    key={video?.videoId}
                  >
                    <img
                      src={video?.thumbnail[0]?.url}
                      alt="thumbnail"
                      className="m-2 rounded-lg object-cover lg:w-[75%] md:w-52 md:h-36 lg:h-16 xl:h-24 xl:w-auto"
                    />

                    <span className="absolute top-4 text-sm md:text-base md:top-auto md:bottom-3 left-4 bg-slate-700 px-1 rounded">
                      {video?.lengthText ? video?.lengthText : "LIVE"}
                    </span>
                    <div className="mt-2 text-sm mx-3 mb-3">
                      <p className="line-clamp-2 font-semibold">
                        {video?.title}
                      </p>
                      <p className="font-light">{video?.channelTitle}</p>
                      <p>
                        {video?.viewCount === null || video?.viewCount === 0
                          ? "No views"
                          : formatNumber(video?.viewCount) + " views"}{" "}
                        •{" "}
                        {video?.publishedTimeText !== null
                          ? video?.publishedTimeText
                          : "LIVE"}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <DownloadModal visible={showModal} onClose={() => setShowModal(false)} id={id}/>
    </div>
  );
}
