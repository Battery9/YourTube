import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import { AllContext } from "./context/apiContext";
import VideoPage from "./components/VideoPage";
import SearchPage from "./components/SearchPage"
import { HashRouter } from "react-router-dom";

function App() {
  return (
    <AllContext>
      <HashRouter>
        <div className="flex flex-col h-full">
          <Header />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/video/:id" element={<VideoPage />} />
            <Route path="/search/:query" element={<SearchPage />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </HashRouter>
    </AllContext>
  );
}

export default App;
