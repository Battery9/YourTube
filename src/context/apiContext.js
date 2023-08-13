import { createContext, useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/rapidApi";

export const Context = createContext();

export const AllContext = (props) => {
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [selectedCatagory, setSelectedCatagory] = useState("New");

  useEffect(() => {
    fetchCatagoryContent(selectedCatagory);
  }, [selectedCatagory]);

  const fetchCatagoryContent = (q) => {
    setLoading(true);
    fetchDataFromApi(`search?query=${q}`).then(({ data }) => {
      setSearchResult(data);
      setLoading(false);
    });
  };
  
  
  return (
    <Context.Provider
      value={{
        loading,
        setLoading,
        searchResult,
        setSearchResult,
        selectedCatagory,
        setSelectedCatagory,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};