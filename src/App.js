import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import { AllContext } from "./context/apiContext";
import VideoPage from "./components/VideoPage";
import SearchPage from "./components/SearchPage"

function App() {
  return (
    <AllContext>
      <BrowserRouter>
        <div className="flex flex-col h-full">
          <Header />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/video/:id" element={<VideoPage />} />
            <Route path="/search/:query" element={<SearchPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AllContext>
  );
}

export default App;
