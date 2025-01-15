import { useState, useEffect } from "react";
import { getPlacesDetails } from "@/GoogleAPI/GooglePlaces";

export const useGooglePlacePhoto = (
  location,
  photoIndex = 3,
  width,
  height
) => {
  const [photoUrl, setPhotoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlacePhoto = async () => {
      if (!location) return;

      setLoading(true);
      try {
        const res = await getPlacesDetails(location);
        const name = res.places[0].photos[photoIndex].name;
        const photoUrl = `https://places.googleapis.com/v1/${name}/media?maxWidthPx=${width}&maxHeightPx=${height}&key=${
          import.meta.env.VITE_GOOGLE_PLACES_API_KEY
        }`;
        setPhotoUrl(photoUrl);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlacePhoto();
  }, [location, photoIndex]);

  return { photoUrl, loading, error };
};
