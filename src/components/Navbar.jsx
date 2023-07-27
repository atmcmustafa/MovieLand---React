import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const { theme, changeTheme } = useContext(ThemeContext);
  const handleNavLinkClick = () => {
    setToggle(false);
  };
  return (
    <div className={`${theme ? "dark" : ""} `}>
      <div className=" dark:bg-slate-900 bg-white dark:text-white text-black duration-200">
        <div
          className={` flex container mx-auto justify-between items-center py-6`}
        >
          <h1 className="dark:text-white font-bold text-4xl ">
            Movie<span className="text-yellow-400">Land</span>
          </h1>
          <div className=" gap-x-8 text-lg hidden md:flex">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/popular">Popular</NavLink>
            <NavLink to="/toprated">Top Rated</NavLink>
            <NavLink to="/upcoming">Upcoming</NavLink>
            <button onClick={changeTheme}>
              {theme ? (
                <BsFillMoonFill size={24} />
              ) : (
                <BsFillSunFill size={24} />
              )}
            </button>
          </div>

          <div className="md:hidden block text-4xl cursor-pointer">
            <button className="mr-6" onClick={changeTheme}>
              {theme ? (
                <BsFillMoonFill size={28} />
              ) : (
                <BsFillSunFill size={28} />
              )}
            </button>
            <i
              onClick={() => setToggle((prev) => !prev)}
              className={`fas  ${toggle ? "fa-x" : "fa-bars"} `}
            ></i>
            {toggle && (
              <div
                className={`flex flex-col gap-4 py-8 transition-all duration-300 absolute z-30 w-full bg-black text-xl text-center left-0 text-white ${
                  toggle
                    ? "top-20 visible duration-200 opacity-100 "
                    : "-top-[999px] invisible duration-200 opacity-50"
                }`}
              >
                <NavLink onClick={handleNavLinkClick} to="/">
                  Home
                </NavLink>
                <NavLink onClick={handleNavLinkClick} to="/popular">
                  Popular
                </NavLink>
                <NavLink onClick={handleNavLinkClick} to="/toprated">
                  Top Rated
                </NavLink>
                <NavLink onClick={handleNavLinkClick} to="/upcoming">
                  Upcoming
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
