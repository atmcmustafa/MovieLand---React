import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Card = ({ children, className }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`${theme ? "dark" : ""} dark:bg-slate-900 bg-white `}>
      <div
        className={`overflow-hidden h-[300px] w-full xl:h-[500px] rounded-md relative dark:bg-slate-900 bg-white text-white ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Card;
