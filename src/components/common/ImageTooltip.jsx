import React from "react";

const ImageTooltip = ({ imageUrl }) => (
  <div className="tooltiptext">
    <img
      src={imageUrl}
      alt="Tooltip"
      className="w-full h-full rounded-md"
    />
  </div>
);

export default ImageTooltip;
