import React from "react";

export default function ProductMaterial({ products_material }) {
    const {
        body_back_panel,
        body_back_panel_matrial,
        body_back_panel_thickness,
        body_back_panel_surface_texture,
        body_back_panel_coating,
        body_back_panel_img,
        body_back_panel_description,
        front,
        front_matrial,
        front_thickness,
        front_surface_texture,
        front_coating,
        front_img,
        front_description,
        drawers,
        drawers_matrial,
        drawers_thickness,
        drawers_surface_texture,
        drawers_coating,
        opening_method,
        drawers_weight,
        drawers_img,
        drawers_description,
        handles,
        handles_matrial,
        handles_thickness,
        handles_length,
        handles_img,
        handles_description,
        feet,
        feet_name,
        feet_thickness,
        feet_height,
        feet_img,
        feet_description,
    } = products_material;
    return (<>
        <div className="mx-auto justify-items-start max-w-xl mb-10">
            <p className="text-lg text-black my-4">{body_back_panel}</p>
            <div className="flex">
                <div className="flex flex-col w-2/3">
                    <div className="flex grid-col-2 gap-4">
                        <p className="text-black my-2 flex items-center min-w-36">Material:</p>
                        <p className=" flex items-center">{body_back_panel_matrial}</p>
                    </div>
                    <div className="flex grid-col-2 gap-4">
                        <p className="text-black my-2 flex items-center min-w-36">Stärke:</p>
                        <p className=" flex items-center">{body_back_panel_thickness}</p>
                    </div>
                    <div className="flex grid-col-2 gap-4">
                        <p className="text-black my-2 flex items-center min-w-36">Oberflächenstruktur:</p>
                        <p className=" flex items-center">{body_back_panel_surface_texture}</p>
                    </div>
                    <div className="flex grid-col-2 gap-4">
                        <p className="text-black my-2 flex items-center min-w-36">Beschichtung:</p>
                        <p className="flex items-center">{body_back_panel_coating}</p>
                    </div>
                </div>
                <div className="w-1/3 flex items-center">
                    <img src={body_back_panel_img} width={90} height={90} alt="" className="rounded-[5px] shadow-lg"/>
                </div>
            </div>
            <div>
                <p>{body_back_panel_description}</p>
            </div>
        </div>
        <div className="mx-auto justify-items-start max-w-xl mb-10">
            <p className="text-lg text-black my-4">{front}</p>
            <div className="flex">
                <div className="flex flex-col w-2/3">
                    <div className="flex grid-col-2 gap-4">
                        <p className="text-black my-2 flex items-center min-w-36">Material:</p>
                        <p className=" flex items-center">{front_matrial}</p>
                    </div>
                    <div className="flex grid-col-2 gap-4">
                        <p className="text-black my-2 flex items-center min-w-36">Stärke:</p>
                        <p className=" flex items-center">{front_thickness}</p>
                    </div>
                    <div className="flex grid-col-2 gap-4">
                        <p className="text-black my-2 flex items-center min-w-36">Oberflächenstruktur:</p>
                        <p className=" flex items-center">{front_surface_texture}</p>
                    </div>
                    <div className="flex grid-col-2 gap-4">
                        <p className="text-black my-2 flex items-center min-w-36">Beschichtung:</p>
                        <p className="flex items-center">{front_coating}</p>
                    </div>
                </div>
                <div className="w-1/3 flex items-center">
                    <img src={front_img} width={90} height={90} alt="" className="rounded-[5px] shadow-lg"/>
                </div>
            </div>
            <div>
                <p>{front_description}</p>
            </div>
        </div>
        <div className="mx-auto justify-items-start max-w-xl mb-10">
            <p className="text-lg text-black my-4">{drawers}</p>
            <div className="flex">
                <div className="flex flex-col w-2/3">
                    <div className="flex grid-col-2 gap-4">
                        <p className="text-black my-2 flex items-center min-w-36">Material:</p>
                        <p className=" flex items-center">{drawers_matrial}</p>
                    </div>
                    <div className="flex grid-col-2 gap-4">
                        <p className="text-black my-2 flex items-center min-w-36">Stärke:</p>
                        <p className=" flex items-center">{drawers_thickness}</p>
                    </div>
                    <div className="flex grid-col-2 gap-4">
                        <p className="text-black my-2 flex items-center min-w-36">Oberflächenstruktur:</p>
                        <p className=" flex items-center">{drawers_surface_texture}</p>
                    </div>
                    <div className="flex grid-col-2 gap-4">
                        <p className="text-black my-2 flex items-center min-w-36">Beschichtung:</p>
                        <p className="flex items-center">{drawers_coating}</p>
                    </div>
                    <div className="flex grid-col-2 gap-4">
                        <p className="text-black my-2 flex items-center min-w-36">Öffnungsart:</p>
                        <p className="flex items-center">{opening_method}</p>
                    </div>
                    <div className="flex grid-col-2 gap-4">
                        <p className="text-black my-2 flex items-center min-w-36">Belastung:</p>
                        <p className="flex items-center">{drawers_weight}</p>
                    </div>
                </div>
                <div className="w-1/3 flex items-center">
                    <img src={drawers_img} width={90} height={90} alt="" className="rounded-[5px] shadow-lg"/>
                </div>
            </div>
            <div>
                <p>{drawers_description}</p>
            </div>
        </div>
        <div className="mx-auto justify-items-start max-w-xl mb-10">
            <p className="text-lg text-black my-4">{handles}</p>
            <div className="flex">
                <div className="flex flex-col w-2/3">
                    <div className="flex grid-col-2 gap-4">
                        <p className="text-black my-2 flex items-center min-w-36">Name:</p>
                        <p className=" flex items-center">{handles_matrial}</p>
                    </div>
                    <div className="flex grid-col-2 gap-4">
                        <p className="text-black my-2 flex items-center min-w-36">Material:</p>
                        <p className=" flex items-center">{handles_thickness}</p>
                    </div>
                    <div className="flex grid-col-2 gap-4">
                        <p className="text-black my-2 flex items-center min-w-36">Länge:</p>
                        <p className=" flex items-center">{handles_length}</p>
                    </div>
                </div>
                <div className="w-1/3 flex items-center">
                    <img src={handles_img} width={90} height={90} alt="" className="bg-white rounded-[5px] shadow-lg"/>
                </div>
            </div>
            <div>
                <p>{handles_description}</p>
            </div>
        </div>
        <div className="mx-auto justify-items-start max-w-xl mb-10">
            <p className="text-lg text-black my-4">{feet}</p>
            <div className="flex">
                <div className="flex flex-col w-2/3">
                    <div className="flex grid-col-2 gap-4">
                        <p className="text-black my-2 flex items-center min-w-36">Name:</p>
                        <p className=" flex items-center">{feet_name}</p>
                    </div>
                    <div className="flex grid-col-2 gap-4">
                        <p className="text-black my-2 flex items-center min-w-36">Material:</p>
                        <p className=" flex items-center">{feet_thickness}</p>
                    </div>
                    <div className="flex grid-col-2 gap-4">
                        <p className="text-black my-2 flex items-center min-w-36">Höhe:</p>
                        <p className=" flex items-center">{feet_height}</p>
                    </div>
                </div>
                <div className="w-1/3 flex items-center">
                    <img src={feet_img} width={90} height={90} alt="" className="bg-white rounded-[5px] shadow-lg"/>
                </div>
            </div>
            <div>
                <p>{feet_description}</p>
            </div>
        </div>
    </>)
}