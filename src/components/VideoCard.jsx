import React from "react";
import { Link } from "react-router-dom";

export default function VideoCard({ videos }) {
  const videoLength = videos?.lengthText
    ? videos?.lengthText
    : "LIVE";
  const title = videos?.title;
  const channelLogo = videos?.channelThumbnail[0]?.url;
  const channelName = videos?.channelTitle;
  const views = videos?.viewCount
  const uploadTime = videos?.publishedText

  return (
    <Link to={`video/${videos?.videoId}`}>
      <div className="flex flex-col">
        <div className="relative h-48 md:h-40 overflow-hidden rounded-xl">
          <img
            src={videos?.thumbnail[0]?.url}
            className="object-fill h-full w-full"
            alt={title}
          />
          <div className="absolute text-white bottom-2 right-2 bg-black/50 px-2 rounded-md">
            {videoLength}
          </div>
        </div>
        <div className="flex m-2 items-top overflow-hidden">
          <div className="h-9 w-9 flex-shrink-0">
            <img
              className="h-full w-full rounded-full object-fit"
              src={channelLogo}
            />
          </div>
          <div className="ml-2 overflow-hidden">
            <span className="text-white text-sm line-clamp-2 font-semibold">
              {title}
            </span>
            <div className="text-white/80 text-xs">{channelName}</div>
            <div className="text-white/80 text-xs">
              <span>{views} views</span> <span> • </span> <span>{uploadTime}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
