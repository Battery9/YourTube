import React, { useContext, useEffect } from "react";
import LeftNavBar from "./LeftNavBar";
import VideoCard from "./VideoCard";
import { Context } from "../context/apiContext";

export default function Home() {
  const { loading, searchResult } = useContext(Context);

  return (
    <div className="flex h-full overflow-x-hidden">
      <LeftNavBar />
      <div className="grow overflow-y-auto bg-black p-5 w-[calc(100%-12rem)]">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {!loading &&
            searchResult?.map((videos) => {
              if (videos?.type !== "video") return false;
              return (
                <VideoCard key={videos?.videoId} videos={videos}/>
              );
            })}
        </div>
      </div>
    </div>
  );
}
