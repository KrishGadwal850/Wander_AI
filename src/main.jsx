import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateTrip from "./createTrip/CreateTrip.jsx";
import Header from "./components/custom/Header.jsx";
import { Toaster } from "@/components/ui/toaster";
import { GoogleOAuthProvider } from "@react-oauth/google";
import UserAuth from "./components/authentication/UserAuth.jsx";
import "remixicon/fonts/remixicon.css";
import ViewTrip from "./viewTripDetails/[tripID]/ViewTrip.jsx";
import ShowTrip from "./showTrips/ShowTrip.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/create-trip",
    element: <CreateTrip />,
  },
  {
    path: "/sign-in",
    element: <UserAuth />,
  },
  {
    path: "/view-trip/:tripID",
    element: <ViewTrip />,
  },
  {
    path: "/profile",
    element: <ShowTrip />,
  },
]);
createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
    <Header />
    <Toaster />
    <RouterProvider router={router} />
  </GoogleOAuthProvider>
  // </StrictMode>
);
