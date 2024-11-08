import React, {useState} from "react";
import Config from "../../configurator/config";
import ImageTooltip from "../common/ImageTooltip";
export default function ProductDimAndTech({ product_properties }) {
  const {
    length,
    depth,
    height,
    color_body_back,
    color_body_back_img,
    color_front,
    color_front_img,
    doors,
    top_flap,
    bottom_flap,
    drawers,
    inner_drawers,
    back_walls,
    clothes_rail,
    adjust_shelves,
    fixed_shelves,
    glas_shelves,
    led_lighting,
    handles,
    handles_img,
    clothes_lift,
    trousers_pull_out,
    feet,
    feet_img,
    base_cut_out,
    outer_panels,
    body_shape,
    estimated_weight,
    max_load_per_compartment,
    max_load_furniture,
    furniture_parts_number,
  } = product_properties;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <div className="mx-auto justify-items-start max-w-2xl">
        <div className="flex grid-col-2 gap-y-2 my-2">
          <p className="text-lg text-black min-w-64 flex items-center">Länge</p>
          <p className="flex items-center">{`${length} cm`}</p>
        </div>
        <div className="flex grid-col-2 gap-y-2 my-2">
          <p className="text-lg text-black min-w-64 flex items-center">Tiefe</p>
          <p className="flex items-center">{`${depth} cm (Tiefe Innen ${depth-Config.plate.backThickness-Config.plate.backIncident}cm)`}</p>
        </div>
        <div className="flex grid-col-2 gap-y-2 my-2">
          <p className="text-lg text-black min-w-64 flex items-center">Höhe</p>
          <p className="flex items-center">{`${height.height} cm ${
            height.withFeet
              ? `(Ohne Füße ${height.height - height.feetHeight}cm)`
              : ""
          }`}</p>
        </div>
        <div className="flex grid-col-2 gap-y-2 my-2">
          <p className="text-lg text-black min-w-64 flex items-center">
            Farbe Korpus/Rückwand
          </p>
          <div className="flex items-center">
            {color_body_back}
            <span className="ml-4 tooltip">
              <img src={color_body_back_img} alt="" className="w-[40px] h-[40px] rounded-[5px]"/>
              <ImageTooltip imageUrl={color_body_back_img}/>
            </span>
          </div>
        </div>
        <div className="flex grid-col-2 gap-y-2 my-2">
          <p className="text-lg text-black min-w-64 flex items-center">
            Farbe Front
          </p>
          <div className="flex items-center">
            {color_front}
            <span className="ml-4 tooltip">
              <img src={color_front_img} alt="" className="w-[40px] h-[40px] rounded-[5px]"/>
              <ImageTooltip imageUrl={color_front_img}/>
            </span>
          </div>
        </div>
        {doors > 0 && (
          <div className="flex grid-col-2 gap-y-2 my-2">
            <p className="text-lg text-black min-w-64 flex items-center">Türen</p>
            <p className="flex items-center">{`x${doors}`}</p>
          </div>
        )}
        {top_flap > 0 && (
          <div className="flex grid-col-2 gap-y-2 my-2">
            <p className="text-lg text-black min-w-64 flex items-center">
              Klappe Oben
            </p>
            <p className="flex items-center">{`x${top_flap}`}</p>
          </div>
        )}
        {bottom_flap > 0 && (
          <div className="flex grid-col-2 gap-y-2 my-2">
            <p className="text-lg text-black min-w-64 flex items-center">
              Klappe Unten
            </p>
            <p className="flex items-center">{`x${bottom_flap}`}</p>
          </div>
        )}
        {drawers.show && (
          <div className="flex grid-col-2 gap-y-2 my-2">
            <div className="text-lg text-black min-w-64 flex ">Schubladen</div>
            <div>
              {drawers?.drawer8?.count > 0 && (
                <p className="flex items-center">{`x ${drawers?.drawer8?.count} Schublade Klein (Länge ${drawers?.drawer8?.scale.length}c m x Tiefe ${drawers?.drawer8?.scale.depth} cm x Höhe ${drawers?.drawer8?.scale.height} cm )`}</p>
              )}
              {drawers?.drawer16.count > 0 && (
                <p className="flex items-center">{`x ${drawers?.drawer16?.count} Schublade Mittel (Länge ${drawers?.drawer16?.scale.length}c m x Tiefe ${drawers?.drawer16?.scale.depth} cm x Höhe ${drawers?.drawer16?.scale.height} cm )`}</p>
              )}
              {drawers?.drawer24.count > 0 && (
                <p className="flex items-center">{`x ${drawers?.drawer24?.count} Schublade Mittel (Länge ${drawers?.drawer24?.scale.length}c m x Tiefe ${drawers?.drawer24?.scale.depth} cm x Höhe ${drawers?.drawer24?.scale.height} cm )`}</p>
              )}
              {drawers?.drawerCustom.count > 0 && (
                <p className="flex items-center">{`x ${drawers?.drawerCustom?.count} Schublade Mittel (Länge ${drawers?.drawerCustom?.scale.length}c m x Tiefe ${drawers?.drawerCustom?.scale.depth} cm x Höhe ${drawers?.drawerCustom?.scale.height} cm )`}</p>
              )}
            </div>
          </div>
        )}
        {inner_drawers.show && (
          <div className="flex grid-col-2 gap-y-2 my-2">
            <div className="text-lg text-black min-w-64 flex ">
              Innenschubladen
            </div>
            <div>
              {inner_drawers?.drawer8?.count > 0 && (
                <p className="flex items-center">{`x ${inner_drawers?.drawer8?.count} Schublade Klein (Länge ${inner_drawers?.drawer8?.scale.length}cm x Tiefe ${inner_drawers?.drawer8?.scale.depth} cm x Höhe ${inner_drawers?.drawer8?.scale.height} cm )`}</p>
              )}
              {inner_drawers?.drawer16.count > 0 && (
                <p className="flex items-center">{`x ${inner_drawers?.drawer16?.count} Schublade Mittel (Länge ${Number(inner_drawers?.drawer16?.scale.length.toFixed(1))}cm x Tiefe ${inner_drawers?.drawer16?.scale.depth} cm x Höhe ${inner_drawers?.drawer16?.scale.height} cm )`}</p>
              )}
              {inner_drawers?.drawer24.count > 0 && (
                <p className="flex items-center">{`x ${inner_drawers?.drawer24?.count} Schublade Groß (Länge ${inner_drawers?.drawer24?.scale.length}cm x Tiefe ${inner_drawers?.drawer24?.scale.depth} cm x Höhe ${inner_drawers?.drawer24?.scale.height} cm )`}</p>
              )}
            </div>
          </div>
        )}
        <div className="flex grid-col-2 gap-y-2 my-2">
          <p className="text-lg text-black min-w-64 flex items-center">
            Rückwände
          </p>
          <p className="flex items-center">{back_walls}</p>
        </div>
        {clothes_rail > 0 && (
          <div className="flex grid-col-2 gap-y-2 my-2">
            <p className="text-lg text-black min-w-64 flex items-center">
              Kleiderstange
            </p>
            <p className="flex items-center">{`x${clothes_rail}`}</p>
          </div>
        )}
        {adjust_shelves > 0 && (
          <div className="flex grid-col-2 gap-y-2 my-2">
            <p className="text-lg text-black min-w-64 flex items-center">
              Verstellbare Böden
            </p>
            <p className="flex items-center">{`x${adjust_shelves}`}</p>
          </div>
        )}
        {fixed_shelves > 0 && (
          <div className="flex grid-col-2 gap-y-2 my-2">
            <p className="text-lg text-black min-w-64 flex items-center">
              Feste Böden
            </p>
            <p className="flex items-center">{`x${fixed_shelves}`}</p>
          </div>
        )}
        {glas_shelves > 0 && (
          <div className="flex grid-col-2 gap-y-2 my-2">
            <p className="text-lg text-black min-w-64 flex items-center">
              Glas Böden
            </p>
            <p className="flex items-center">{`x${glas_shelves}`}</p>
          </div>
        )}
        {led_lighting > 0 && (
          <div className="flex grid-col-2 gap-y-2 my-2">
            <p className="text-lg text-black min-w-64 flex items-center">
              LED-Beleuchtung
            </p>
            <p className="flex items-center">{`x${led_lighting}`}</p>
          </div>
        )}
        {handles.show && (
          <div className="flex grid-col-2 gap-y-2 my-2">
            <p className="text-lg text-black min-w-64 flex items-center">
              Griffe
            </p>
            <div className="flex items-center">
              {`x${handles.count} Bogengriff  Stahl ( Länge ${handles.handleLength} cm) `}
              <span className="ml-4 w-10 h-10 bg-white rounded-[5px] tooltip">
                <img src={handles_img} alt="" className="w-[40px] h-[40px] rounded-[5px]"/>
                <ImageTooltip imageUrl={handles_img}/>
              </span>
            </div>
          </div>
        )}
        {clothes_lift > 0 && (
          <div className="flex grid-col-2 gap-y-2 my-2">
            <p className="text-lg text-black min-w-64 flex items-center">
              Kleiderlift
            </p>
            <p className="flex items-center">{`x${clothes_lift}`}</p>
          </div>
        )}
        {trousers_pull_out > 0 && (
          <div className="flex grid-col-2 gap-y-2 my-2">
            <p className="text-lg text-black min-w-64 flex items-center">
              Hosenauszug
            </p>
            <p className="flex items-center">{`x${trousers_pull_out}`}</p>
          </div>
        )}
        {feet.show && (
          <div className="flex grid-col-2 gap-y-2 my-2">
            <p className="text-lg text-black min-w-64 flex items-center">Füße</p>
            <div className="flex items-center">
              {`x${feet.count} Fuß schräg Messing (Höhe ${feet.feetHeight} cm) `}
              <span className="ml-4 w-10 h-10 bg-white rounded-[5px] tooltip">
                <img src={feet_img} alt="" className="w-[40px] h-[40px] rounded-[5px]"/>
                <ImageTooltip imageUrl={feet_img}/>
              </span>
            </div>
          </div>
        )}
        <div className="flex grid-col-2 gap-y-2 my-2">
          <p className="text-lg text-black min-w-64 flex items-center">
            Sockel-Ausschnitt
          </p>
          <p className="flex items-center">{base_cut_out}</p>
        </div>
        <div className="flex grid-col-2 gap-y-2 my-2">
          <p className="text-lg text-black min-w-64 flex items-center">
            Außen-Blenden
          </p>
          <p className="flex items-center">{outer_panels}</p>
        </div>
        <div className="flex grid-col-2 gap-y-2 my-2">
          <p className="text-lg text-black min-w-64 flex items-center">
            Korpus-Form
          </p>
          <p className="flex items-center">{body_shape}</p>
        </div>
        <div className="flex grid-col-2 gap-y-2 my-2">
          <p className="text-lg text-black min-w-64 flex items-center">
            Geschätztes Gewicht
          </p>
          <p className="flex items-center">{estimated_weight}</p>
        </div>
        <div className="flex grid-col-2 gap-y-2 my-2">
          <p className="text-lg text-black min-w-64 flex items-center">
            Max. Traglast pro Fach
          </p>
          <p className="flex items-center">{max_load_per_compartment}</p>
        </div>
        {/* <div className="flex grid-col-2 gap-y-2 my-2">
          <p className="text-lg text-black min-w-64 flex items-center">
            Möbelteile Anzahl
          </p>
          <p className="flex items-center">{furniture_parts_number}</p>
        </div> */}
      </div>
    </>
  );
}
