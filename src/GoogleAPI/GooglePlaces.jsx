import axios from "axios";

const BaseURL = "https://places.googleapis.com/v1/places:searchText";
const config = {
  headers: {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": import.meta.env.VITE_GOOGLE_PLACES_API_KEY,
    "X-Goog-FieldMask": "places.photos,places.displayName,places.id",
  },
};

export const getPlacesDetails = async (query) => {
  const requestBody = {
    textQuery: query,
    languageCode: "en",
  };

  try {
    const response = await axios.post(BaseURL, requestBody, config);
    if (!response.data) {
      throw new Error("No data received from Google Places API");
    }
    return response.data;
  } catch (error) {
    console.error(
      "Google Places API Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};
