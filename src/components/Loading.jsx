import { FaSpinner } from "react-icons/fa";

const Loading = () => {
  return (
    <div className="flex justify-center items-center mt-4">
      <FaSpinner className="animate-spin text-4xl text-yellow-400" />
    </div>
  );
};

export default Loading;
