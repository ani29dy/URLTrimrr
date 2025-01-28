import React from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7x1 text-white text-center font-extrabold">
        The only URL Shortener <br /> you&rsquo;ll ever need! 👇
      </h2>
      <form className="sm:h-14 flex flex-col w-full sm:flex-row md:w-2/4 gap-2">
        <Input />
        <Button className="bg-white text-black cursor-pointer">Shorten!</Button>
      </form>
      <img src="banner2.jpg" alt="Banner" className="w-full md:px-11 my-11" />
    </div>
  );
};

export default LandingPage;
