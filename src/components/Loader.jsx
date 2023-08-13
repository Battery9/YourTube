import React from "react";

// Credit - https://codepen.io/ABSamma/pen/NWxpmNR
function Loader() {
  return (
    <div id="container" className="absolute top-[40vh] left-[30vw] md:left-[50%]">
      <svg viewBox="0 0 100 100">
        <defs>
          <filter id="shadow">
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="1.5"
              floodColor="#fc6767"
            />
          </filter>
        </defs>
        <circle
          id="spinner"
          className="fill-transparent stroke-[#dd2476] stroke-2 filter"
          cx="50"
          cy="50"
          r="45"
        />
      </svg>
    </div>
  );
}

export default Loader;
