import React from "react";
import Header from "./Header";
import Home from "./Home";
import Footer from "./Footer";
import Adds from "./Adds";

const Color = () => {
  return (
    <>
      <div className="flex flex-col justify-between h-screen">
        <div className="">
          <Header />
          <div className="grid grid-cols-1 sm:grid-cols-5">
            <div className="col-span-1 sm:col-span-4">
              <Home />
            </div>
            <Adds/>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Color;
