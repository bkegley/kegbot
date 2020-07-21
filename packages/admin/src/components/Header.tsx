import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div className="absolute top-0 left-0 flex items-center justify-between w-full px-8 py-4 text-white bg-indigo-600 ">
      <div className="text-lg">
        <span>Kegbot Admin</span>
      </div>
      <nav className="flex items-center justify-end space-x-4">
        <Link to="/commands">commands</Link>
        <Link to="/xstream">xStream</Link>
      </nav>
    </div>
  );
};
