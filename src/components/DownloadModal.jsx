import React, { useState, useEffect } from "react";
import { FiXCircle } from "react-icons/fi";
import { fetchDownloadDataFromApi } from "../utils/downloadApi";

function DownloadModal({ visible, onClose, id }) {
  const [linkLoaded, setLinkLoaded] = useState(false);
  const [downloadLinks, setDownloadLinks] = useState([]);
  const [audioLinks, setAudioLinks] = useState([]);

  useEffect(() => {
    if (linkLoaded) return;

    const fetchLinks = () => {
      const itags = [398, 399, 137, 136, 135, 134, 133];
      fetchDownloadDataFromApi(`dl?id=${id}`).then(({ adaptiveFormats }) => {
        const links = adaptiveFormats
          .filter((e) => itags.includes(e.itag))
          .map((e) => ({ quality: e.qualityLabel, link: e.url }));
        setLinkLoaded(true);
        setDownloadLinks(links);
        const audioLink = adaptiveFormats.filter((e) => e.itag === 140).map((e) => e.url)
        setAudioLinks(audioLink)
      });
    };

    fetchLinks();
  }, [id, linkLoaded]);

  if (!visible) return null;
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-white/30 backdrop-blur-sm">
      <div className="flex flex-col">
        <div className="place-self-end">
          <FiXCircle
            className="cursor-pointer text-3xl bg-black rounded"
            onClick={onClose}
          />
        </div>
        <div className="bg-black p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-center mb-2">
            Available Downloads
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {downloadLinks?.map((links, index) => {
              return (
                <a
                  className="bg-slate-100 flex items-center justify-center flex-col rounded text-black font-semibold p-2"
                  key={`${index} ${links.quality}`}
                  href={links.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p>MP4 | {links.quality}</p>
                  <p>Video</p>
                </a>
              );
            })}
            <a
              className="bg-slate-100 flex items-center justify-center flex-col rounded text-black font-semibold p-2"
              href={audioLinks[0]}
              target="_blank"
              rel="noopener noreferrer"
            >
              <p>M4A | 128K </p>
              <p>Audio</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DownloadModal;
