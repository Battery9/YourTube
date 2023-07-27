import axios from "axios";

const MAIN_URL = "https://yt-api.p.rapidapi.com";

const options = {
  method: "GET",
  params: {},
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY,
    "X-RapidAPI-Host": "yt-api.p.rapidapi.com",
  },
};

export const fetchDownloadDataFromApi = async (url) => {
  try {
    const apiResponse = await axios.get(`${MAIN_URL}/${url}`, options);
    return apiResponse.data;
  } catch (error) {
    return error;
  }
};
