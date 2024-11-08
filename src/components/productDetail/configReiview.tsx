import React from "react";
import { Star } from "@mui/icons-material";

const ConfigRiview = ({ stars, title }) => {
    const filledStars = Math.floor(stars);
    const halfStar = stars - filledStars >= 0.5;

    return (
        <>
            <div className="py-4 mr-auto">
                <div className="text-sm sm:text-xs mb-2">
                    {title}
                </div>
                <div className="flex items-center">
                    <div className="text-2xl font-bold mr-2">{stars.toFixed(1)} / 5</div>
                    <div className="flex">
                        {[...Array(filledStars)].map((_, i) => (
                            <Star key={i} className="text-black" />
                        ))}
                        {halfStar && <Star className="text-black" />}
                        {[...Array(5 - filledStars - (halfStar ? 1 : 0))].map((_, i) => (
                            <Star key={filledStars + i + 1} className="text-gray-400" />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ConfigRiview;
