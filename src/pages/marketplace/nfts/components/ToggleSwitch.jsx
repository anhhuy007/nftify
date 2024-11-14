import React, { useState } from "react";
import { Grid2x2, Grid3x3 } from "lucide-react";

const ToggleSwitch = ({ isGrid, setIsGrid }) => {
  const toggleGrid = () => {
    setIsGrid(!isGrid);
  };

  return (
    <button
      className="relative bg-slate-800 rounded-lg p-2 w-24 h-14 flex items-center"
      onClick={() => toggleGrid()}
    >
      {/* Background icons */}
      <div className="absolute inset-0 flex justify-between px-1">
        <div className="w-10 h-full flex items-center justify-center">
          <Grid2x2 size={24} className="text-gray-500" />
        </div>
        <div className="w-10 h-full flex items-center justify-center">
          <Grid3x3 size={24} className="text-gray-500" />
        </div>
      </div>

      {/* Sliding indicator */}
      <div
        className={`w-10 h-10 bg-white rounded transition-transform duration-200 ease-in-out transform ${
          isGrid ? "translate-x-10" : "translate-x-0"
        }`}
      >
        <div className="h-full flex items-center justify-center">
          {isGrid ? (
            <Grid3x3 size={24} className="text-slate-800" />
          ) : (
            <Grid2x2 size={24} className="text-slate-800" />
          )}
        </div>
      </div>
    </button>
  );
};

export default ToggleSwitch;
