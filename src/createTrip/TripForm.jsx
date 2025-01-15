import React from "react";
import { useContext } from "react";
import { formContext } from "../context/Context";
import { Input } from "@/components/ui/input";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
const TripForm = () => {
  const { formData, setFormData } = useContext(formContext);
  return (
    <div className="flex md:flex-row flex-col gap-4 md:items-end">
      <div className="flex flex-col gap-2 md:w-1/2 font-mono">
        <label htmlFor="destination" className="text-lg font-bold ">
          What is your destination of choice?
        </label>
        <GooglePlacesAutocomplete
          apiKey={import.meta.env.VITE_GOOGLE_PLACES_API_KEY}
          selectProps={{
            inputId: "destination",
            placeholder: "Search for a destination",
            onChange: (e) => {
              console.log(e.value.description);
              setFormData({ ...formData, destination: e });
            },
            styles: {
              container: (provided) => ({
                ...provided,
                color: "black",
                pointerEvents: "auto",
              }),
              input: (provided) => ({
                ...provided,
                padding: "0.5rem",
                color: "black",
                // border: "1px solid #e0e0e0",
              }),
            },
          }}
        />
      </div>
      <div className="flex flex-col gap-2 md:w-1/2 font-mono">
        <label htmlFor="tripDuration" className="text-lg font-bold">
          How many days you're planning your trip?
        </label>
        <Input
          id="tripDuration"
          className="border border-neutral-300 p-[1.5rem_0.7rem] rounded-[5px] pointer-events-auto text-black"
          placeholder="Enter number of days"
          min={1}
          value={formData.tripDuration}
          onChange={(e) =>
            setFormData({ ...formData, tripDuration: e.target.value })
          }
        />
      </div>
    </div>
  );
};

export default TripForm;
