import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-flash-latest",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a Cheap budget ,Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for 3 days with each day plan with best time to visit in JSON format.",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "tripDetails": {\n    "location": "Las Vegas, Nevada",\n    "duration": "3 Days",\n    "travelers": "Couple",\n    "budget": "Cheap"\n  },\n  "hotels": [\n    {\n      "hotelName": "Travelodge by Wyndham Las Vegas Center Strip",\n      "hotelAddress": "2500 Las Vegas Blvd S, Las Vegas, NV 89109",\n      "price": "From $40/night (prices vary)",\n      "hotelImageUrl": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/41/4f/c7/hotel-exterior--v162860780.jpg?w=900&h=-1&s=1",\n      "geoCoordinates": {\n        "latitude": 36.1289,\n        "longitude": -115.1557\n      },\n      "rating": 3.5,\n      "description": "Budget-friendly hotel near the Strip with basic amenities."\n    },\n    {\n      "hotelName": "Motel 6 Las Vegas, NV - I-15 Motor Speedway",\n      "hotelAddress": "1300 North Motel 6 Drive, Las Vegas, NV 89101",\n       "price": "From $35/night (prices vary)",\n      "hotelImageUrl": "https://www.motel6.com/content/dam/motel6/property-images/1071/std-2q-1071.jpg",\n      "geoCoordinates": {\n        "latitude": 36.2094,\n        "longitude": -115.1848\n      },\n      "rating": 3.0,\n      "description": "Basic motel further from the Strip, good for budget travelers with cars."\n    },\n    {\n      "hotelName": "Downtown Grand Hotel & Casino",  \n      "hotelAddress": "206 N 3rd St, Las Vegas, NV 89101",\n      "price": "From $50/night (prices vary, check deals)", \n      "hotelImageUrl": "https://downtowngrand.com/wp-content/uploads/2022/01/Downtown-Grand-Exterior-Twilight-2-scaled.jpg",\n      "geoCoordinates": {\n        "latitude": 36.1715,\n        "longitude": -115.1431\n      },\n      "rating": 4.0,\n      "description": "Downtown location, good value, sometimes has affordable deals."\n    } \n  ],\n  "itinerary": [\n    {\n      "day": 1,\n      "plan": [\n        {\n          "placeName": "Welcome to Las Vegas Sign",\n          "placeDetails": "Iconic photo opportunity.",\n          "placeImageUrl": "https://www.lasvegashowto.com/wp-content/uploads/2023/08/welcome-to-las-vegas-sign-night-view.jpg",\n          "geoCoordinates": {\n            "latitude": 36.084,\n            "longitude": -115.153\n          },\n          "ticketPricing": "Free",\n          "rating": 4.5,\n          "timeTravel": "30 minutes (travel + photo)" ,\n          "bestTime": "Morning or evening for better lighting"\n        },\n        {\n          "placeName": "The Strip (walking tour)",\n          "placeDetails": "Explore iconic hotels like Bellagio, Caesars Palace, Venetian.",\n          "placeImageUrl": "https://www.lasvegashowto.com/wp-content/uploads/2023/08/las-vegas-strip-view-from-the-bellagio.jpg",\n          "geoCoordinates": {\n            "latitude": 36.1146,\n            "longitude": -115.1728\n          },\n          "ticketPricing": "Free (unless entering attractions)",\n          "rating": 4.5,\n          "timeTravel": "3-4 hours",\n           "bestTime": "Afternoon/Evening"\n        },\n        {\n          "placeName": "Fountains of Bellagio",\n          "placeDetails": "Free water show.",\n          "placeImageUrl": "https://www.lasvegashowto.com/wp-content/uploads/2023/08/fountains-of-bellagio-water-show.jpg",\n          "geoCoordinates": {\n            "latitude": 36.1136,\n            "longitude": -115.1762\n          },\n          "ticketPricing": "Free",\n          "rating": 4.5,\n          "timeTravel": "30 minutes",\n          "bestTime": "Evening"\n        }\n      ]\n    },\n    {\n      "day": 2,\n      "plan": [\n         {\n          "placeName": "Fremont Street Experience",\n          "placeDetails": "Downtown light show and entertainment.",\n          "placeImageUrl": "https://www.visitlasvegas.com/-/media/images/las-vegas/things-to-do/viva-vision/viva-vision-fremont-street-experience-01-4k.jpg",\n          "geoCoordinates": {\n            "latitude": 36.1716,\n            "longitude": -115.1434\n          },\n          "ticketPricing": "Free",\n          "rating": 4.0,\n          "timeTravel": "2-3 hours",\n           "bestTime": "Evening"\n        },\n        {\n          "placeName": "Arts District",\n          "placeDetails": "Explore street art and galleries.",\n          "placeImageUrl": "https://assets.simpleviewinc.com/simpleview/image/fetch/c_limit,q_75,w_1200/https://assets.simpleviewinc.com/simpleview/image/upload/crm/lasvegas/18thStreetArtsDistrict_0-9529954f5056a37f75_9529a28f-5056-a37f-77c75986474a684b.jpg",\n          "geoCoordinates": {\n            "latitude": 36.165,\n            "longitude": -115.135\n          },\n          "ticketPricing": "Free (unless entering galleries)",\n          "rating": 4.0,\n          "timeTravel": "2-3 hours",\n          "bestTime": "Afternoon"\n        }\n      ]\n    },\n    {\n      "day": 3,\n      "plan": [\n        {\n          "placeName": "High Roller Observation Wheel (Optional - Check for discounts)",\n          "placeDetails": "Panoramic city views (consider less expensive LINQ Promenade for similar views).",\n          "placeImageUrl": "https://www.caesars.com/content/dam/clv/linq/high-roller/overview-hero/high-roller-overview-hero-d.jpg",\n          "geoCoordinates": {\n            "latitude": 36.1173,\n            "longitude": -115.1726\n          },\n          "ticketPricing": "From $30 (check online for deals)",\n          "rating": 4.0,\n          "timeTravel": "1-2 hours",\n           "bestTime": "Daytime or sunset"\n        },\n         {\n          "placeName": "Seven Magic Mountains",\n          "placeDetails": "Colorful art installation south of the city (requires transportation).",\n          "placeImageUrl": "https://cdn.britannica.com/44/224144-050-8A36413B/Seven-Magic-Mountains-installation-Nevada-Ugo-Rondinone.jpg",\n          "geoCoordinates": {\n            "latitude": 35.991,\n            "longitude": -115.038\n          },\n          "ticketPricing": "Free",\n          "rating": 4.0,\n          "timeTravel": "2-3 hours (including travel time)",\n          "bestTime": "Daytime (avoid midday heat)" \n        }\n      ]\n    }\n  ]\n}\n```',
        },
      ],
    },
  ],
});

// export const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());
