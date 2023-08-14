import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Card = ({ children, className }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`${theme ? "dark" : ""} dark:bg-slate-900 bg-white relative`}
    >
      <div
        className={`overflow-hidden group h-[300px] w-full xl:h-[500px] rounded-md relative dark:bg-slate-900 bg-white text-white ${className}`}
      >
        <div className="absolute top-0 left-0 right-0 bottom-0 h-full w-full duration-200 group-hover:bg-black/40"></div>
        {children}
      </div>
    </div>
  );
};

export default Card;
