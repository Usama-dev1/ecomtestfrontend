import { FaSpinner } from "react-icons/fa";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <FaSpinner className="animate-spin text-gray-500 text-8xl" />
    </div>
  );
};

export default Spinner;
