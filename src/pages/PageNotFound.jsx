import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div>
      <div className="text-center mt-10">
        <h3>Page Not Found</h3>
        <Link to="/">
          <button className="bg-blue-500 p-2 rounded-md">Home</button>
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
