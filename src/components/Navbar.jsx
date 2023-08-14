import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
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
      <div className="fixed top-0 w-full dark:bg-slate-900 bg-white dark:text-white text-black duration-200 z-40">
        <div
          className={` flex container mx-auto justify-between items-center py-6`}
        >
          <Link to={"/"} className="dark:text-white font-bold text-4xl">
            Movie<span className="text-yellow-400">Land</span>
          </Link>
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

            <div
              className={`flex flex-col gap-4 py-8 transition-all duration-300 absolute z-40 w-full bg-black text-xl text-center left-0 text-white ${
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
