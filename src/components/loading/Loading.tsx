import React from "react";

const Loading: React.FC = () => {
  return (
    <div
      className="absolute w-full h-screen justify-center items-center flex z-50 bg-gray-200"
      style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
    >
      <span className="loader"></span>
    </div>
  );
};
export default Loading;
