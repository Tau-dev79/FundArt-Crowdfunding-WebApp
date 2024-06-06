import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ConnectButton } from "thirdweb/react";
import { logo, menu, search, thirdweb } from "../assets";
import { navlinks } from "../constants";
import { useStateContext } from "../context";

const Navbar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { client } = useStateContext();

  const handleSearch = () => {
    navigate(`/search/${searchTerm}`, {
      state: { searchItem: searchTerm },
    });
    setSearchTerm("");
  };

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-full">
        <input
          type="text"
          placeholder="Search for campaigns"
          className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div
          className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer"
          onClick={handleSearch}
        >
          <img
            src={search}
            alt="search"
            className="w-[15px] h-[15px] object-contain"
          />
        </div>
      </div>

      <div className="sm:flex hidden items-center flex-row justify-end gap-4">
        <ConnectButton client={client} />

        <Link to="/create-campaign">
          <div className="w-[55px] h-[55px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer">
            <img
              src={thirdweb}
              alt="user"
              className="w-[60%] h-[60%] object-contain"
            />
          </div>
        </Link>
      </div>

      <div className="sm:hidden flex justify-between relative items-center">
        <div className="w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer">
          <img
            src={logo}
            alt="user"
            className="w-[60%] h-[60%] object-contain"
          />
        </div>

        <img
          src={menu}
          alt="menu"
          className="w-[34px] h-[34px] object-contain cursor-pointer"
          onClick={() => setToggleDrawer(!toggleDrawer)}
        />
      </div>

      <div
        className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${
          !toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"
        } transition-all duration-700`}
      >
        <ul className="mb-4">
          {navlinks.map((link) => (
            <li
              key={link.name}
              className={`flex p-4 ${isActive === link.name && "bg-[#3a3a43]"}`}
              onClick={() => {
                if (!link.disabled) {
                  setIsActive(link.name);
                  setToggleDrawer(false);
                  navigate(link.link);
                }
              }}
            >
              <img
                src={link.imgUrl}
                alt={link.name}
                className={`w-[24px] h-[24px] object-contain ${
                  isActive === link.name ? "grayscale-0" : "grayscale"
                }`}
              />
              <p
                className={`ml-[20px] font-epilogue font-semibold text-[14px] ${
                  isActive === link.name ? "text-[#1dv071]" : "text-[#808191]"
                } cursor-pointer`}
              >
                {link.name}
              </p>
            </li>
          ))}
        </ul>

        <div className="flex mx-4">
          <ConnectButton client={client} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
