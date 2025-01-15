import React from "react";
import Menu from "../custom/menu/Menu";
import { Link } from "react-router-dom";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MouseFollower from "@/components/custom/MouseFollower";
const UserAuth = () => {
  const navigate = useNavigate();
  const handleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => getUserInfo(tokenResponse),
    onError: (error) => console.log(error),
  });
  const getUserInfo = async (token) => {
    await axios
      .get(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${token?.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate("/create-trip");
      });
  };
  return (
    <>
      <Menu hl={"sign-in"} />
      <MouseFollower />
      <section className="flex justify-center items-center h-screen">
        {!localStorage.getItem("user") ? (
          <section className="w-[90%] max-w-[350px] flex flex-col justify-between rounded-md text-neutral-100 shadow-[1px_1px_20px_rgba(200,200,200,0.1)] transition-all duration-300">
            {/* <h1 className="text-2xl font-bold text-center p-4 uppercase">
              L<i className="ri-login-circle-line"></i>gin
            </h1> */}
            <form className="flex flex-col gap-4 p-5">
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="w-fit">
                  Email
                </label>
                <Input type="email" id="email" />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="password" className="w-fit">å
                  Password
                </label>
                <Input type="password" id="password" />
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-600 text-white hover:bg-blue-700"
              >
                <i className="ri-login-box-fill"></i>
                Sign in
              </Button>
            </form>
            <div className="flex items-center justify-center">
              <hr className="w-1/3" />
              <p className="mx-4">or</p>
              <hr className="w-1/3" />
            </div>
            <div className="flex flex-col gap-2 p-5">
              <Button
                type="button"
                className="w-full bg-red-500 text-white hover:bg-red-600"
                onClick={handleLogin}
              >
                <i className="ri-google-fill text-xl text-white"></i>
                Sign in with Google
              </Button>
            </div>
          </section>
        ) : (
          <section className="w-[90%] max-w-[350px] shadow-[1px_1px_20px_rgba(200,200,200,0.1)] transition-all duration-300 flex flex-col justify-between rounded-md p-6 gap-6 text-neutral-100">
            <p className="text-center p-2 font-mono pointer-events-none">
              <span className="font-bold block p-2 text-red-500">
                Welcome,{" "}
                <span className="font-bold">
                  {JSON.parse(localStorage.getItem("user")).given_name}
                </span>{" "}
              </span>
              <span className="block p-2">
                you are already logged in as{" "}
                <span className="font-bold text-blue-500">
                  {JSON.parse(localStorage.getItem("user")).email.toUpperCase()}
                </span>
                {" !"}
              </span>
              Ready to explore and make the most of your journey? Let’s dive in!
            </p>
            <div className="flex flex-col gap-2">
              <Link to="/create-trip">
                <Button
                  type="button"
                  className="w-full bg-red-500 hover:bg-red-600 text-white"
                >
                  <i className="ri-arrow-right-line"></i>
                  Create a trip
                </Button>
              </Link>
              <Button
                type="button"
                className="bg-gray-500 hover:bg-gray-600 text-neutral-300"
                onClick={() => {
                  localStorage.removeItem("user");
                  navigate("/sign-in");
                }}
              >
                Logout
              </Button>
            </div>
          </section>
        )}
      </section>
    </>
  );
};

export default UserAuth;
