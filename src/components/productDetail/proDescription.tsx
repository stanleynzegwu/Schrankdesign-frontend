import React from "react";

export default function ProductDescription({ product }) {
    return (<>
        <div className="mx-auto justify-items-start max-w-xl">
            <p className="text-lg text-black my-4">Produktname</p>
            <p className="my-2">{product?.name}</p>
            <p className="text-lg text-black my-4">Beschreibung</p>
            <p className="my-2">{product?.description}</p>
            <p className="text-lg text-black my-4">Konfigurationsnumber</p>
            <p className="my-2">{product?.number}</p>
        </div>
    </>)
}