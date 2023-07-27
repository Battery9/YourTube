import axios from "axios";

const MAIN_URL = "https://youtube-v3-alternative.p.rapidapi.com";

const options = {
  method: "GET",
  params: {
    
  },
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY,
    "X-RapidAPI-Host": "youtube-v3-alternative.p.rapidapi.com",
  },
};

export const fetchDataFromApi = async (url) => {
  try {
    const apiResponse = await axios.get(`${MAIN_URL}/${url}`, options);
    return apiResponse.data;
  } catch (error) {
    return error;
  }
};
