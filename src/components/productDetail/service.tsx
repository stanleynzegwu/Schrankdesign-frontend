import React from "react";

export default function ProductService({service}) {
    const {
        title,
        description,
    } = service;
    return (<>
        <div className="mx-auto justify-items-start max-w-2xl">
            <p className="text-lg text-black my-4">{title}</p>
            <p className="my-2">{description}</p>
        </div>
    </>)
}