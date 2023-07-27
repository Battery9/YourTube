import { createContext, useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/rapidApi";

export const Context = createContext();

export const AllContext = (props) => {
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [selectedCatagory, setSelectedCatagory] = useState("New");
  const [mobileMenu, setMobileMenu] = useState(false);

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
        mobileMenu,
        setMobileMenu,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};