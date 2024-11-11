import React from "react";
import { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";

import TriangleLeft from "../../../assets/icons/triangle_left.svg";
import TriangleDown from "../../../assets/icons/triangle_down.svg";
import AvaIcon from "../../../assets/icons/avatar.svg";

import ProductDescription from "../../../components/productDetail/proDescription";
import ProductDimAndTech from "../../../components/productDetail/dimAndTech";
import ProductMaterial from "../../../components/productDetail/material";
import ProductService from "../../../components/productDetail/service";

import useFurnishingStore from "../zustand/furnishingStore";
import useDimensionStore from "../zustand/dimensionStore";
import Config from "../../config";

import useColorStore from "../zustand/colorStore";

const QuizImag = "@src/assets/icons/quiz.png";

function Icon({ id, open }) {
  return (
    <div className="flex flex-row gap-3">
      {id === open && (
        <>
          <img src={TriangleLeft} className="pt-1" />
        </>
      )}
      {id !== open && <img src={TriangleDown} className="pt-1" />}
    </div>
  );
}

export default function ProductDetail(props) {
  const { product } = props;
  const [open, setOpen] = useState("none");

  const handleOpen = (value) => setOpen(open === value ? "none" : value);

  const width = useDimensionStore.use.width();
  const height = useDimensionStore.use.height();
  const depth = useDimensionStore.use.depth();
  const korpusType = useDimensionStore.use.korpusType();
  const feet = useDimensionStore.use.feet();
  const feetIndex = useDimensionStore.use.feetIndex();
  const feetListIndex = useDimensionStore.use.feetListIndex();
  const feetCount = useDimensionStore.use.feetCount();
  const hangingSize = useDimensionStore.use.hangingSize();
  const withFeet = useDimensionStore.use.withFeet();
  const handle = useDimensionStore.use.handle();
  const handleIndex = useDimensionStore.use.handleIndex();
  const handleListIndex = useDimensionStore.use.handleListIndex();
  const pushOpen = useDimensionStore.use.pushOpen();

  const doorAssets = useFurnishingStore.use.doorAssets();
  const furnishingAssets = useFurnishingStore.use.furnishingAssets();
  const ledAssets = useFurnishingStore.use.ledAssets();
  
  const bodyInfo = useColorStore.use.bodyInfo()
  const frontInfo = useColorStore.use.frontInfo()
  const drawerInfo = useColorStore.use.drawerInfo()

  const doors = doorAssets.filter((door) => {
    return door.doorType !== "flap_up" && door.doorType !== "flap_down"
  }).length;
  const top_flap = doorAssets.filter((door) => {
    return door.doorType === "flap_up";
  }).length;
  const bottom_flap = doorAssets.filter((door) => {
    return door.doorType === "flap_down";
  }).length;

  const drawers = furnishingAssets.filter((asset) => {
    return asset.type === Config.furnishing.type.drawer
  });
  const drawer8 = drawers.filter((asset) => {
    return asset.drawerType ==="drawer8"
  })
  const drawer16 = drawers.filter((asset) => {
    return asset.drawerType ==="drawer16"
  })
  const drawer24 = drawers.filter((asset) => {
    return asset.drawerType ==="drawer24"
  })
  const drawerCustom = drawers.filter((asset) => {
    return asset.drawerType ==="custom"
  })

  const inner_drawers = furnishingAssets.filter((asset) => {
    return asset.type === Config.furnishing.type.internalDrawer
  })
  const innerDrawer8 = inner_drawers.filter((asset) => {
    return asset.drawerType === "drawer8"
  })
  const innerDrawer16 = inner_drawers.filter((asset) => {
    return asset.drawerType === "drawer16"
  })
  const innerDrawer24 = inner_drawers.filter((asset) => {
    return asset.drawerType === "drawer24"
  })

  const clothes_lift = furnishingAssets.filter((asset) => {
    return asset.type === "Clothes Lift"
  })

  const clothes_rail = furnishingAssets.filter((asset) => {
    return asset.type === Config.furnishing.type.clothesRail
  })

  const trousers_pull_out = furnishingAssets.filter((asset) => {
    return asset.type === Config.furnishing.type.pantsPullout
  })

  const fixed_sheves = furnishingAssets.filter((asset) => {
    return asset.type === Config.furnishing.type.shelf
  }).length

  const adjust_shelves = furnishingAssets.filter((asset) => {
    return asset.type === Config.furnishing.type.foldBottom
  }).length

  const glas_shelves = furnishingAssets.filter((asset) => {
    return asset.type === Config.furnishing.type.glassBottom
  }).length

  const product_properties = {
    length: width,
    depth: depth,
    height: {
      height: height,
      withFeet: withFeet,
      feetHeight: hangingSize+Config.plate.plinthHeight
    },
    color_body_back: `${bodyInfo.name} (${bodyInfo.thickness} mm)`,
    color_body_back_img: bodyInfo.thumbnail,
    color_front: `${frontInfo.name} (${frontInfo.thickness} mm)`,
    color_front_img: frontInfo.thumbnail,
    doors: doors,
    top_flap: top_flap,
    bottom_flap: bottom_flap,
    drawers: {
      show: drawers.length > 0 ? true : false,
      drawer8: {
        count : drawer8.length,
        scale : {
          length : drawer8[0]?.scale[0],
          depth : drawer8[0]?.scale[2],
          height : drawer8[0]?.scale[1]
        }
      },
      drawer16: {
        count : drawer16.length,
        scale : {
          length : drawer16[0]?.scale[0],
          depth : drawer16[0]?.scale[2],
          height : drawer16[0]?.scale[1]
        }
      },
      drawer24: {
        count : drawer24.length,
        scale : {
          length : drawer24[0]?.scale[0],
          depth : drawer24[0]?.scale[2],
          height : drawer24[0]?.scale[1]
        }
      },
      drawerCustom: {
        count : drawerCustom.length,
        scale : {
          length : drawerCustom[0]?.scale[0],
          depth : drawerCustom[0]?.scale[2],
          height : drawerCustom[0]?.scale[1]
        }
      },
    },
    inner_drawers: {
      show: inner_drawers.length > 0 ? true : false,
      drawer8 : {
        count: innerDrawer8.length,
        scale : {
          length : innerDrawer8[0]?.scale[0],
          depth : innerDrawer8[0]?.scale[2],
          height : innerDrawer8[0]?.scale[1]
        }
      },
      drawer16 : {
        count: innerDrawer16.length,
        scale : {
          length : innerDrawer16[0]?.scale[0],
          depth : innerDrawer16[0]?.scale[2],
          height : innerDrawer16[0]?.scale[1]
        }
      },
      drawer24 : {
        count: innerDrawer24.length,
        scale : {
          length : innerDrawer24[0]?.scale[0],
          depth : innerDrawer24[0]?.scale[2],
          height : innerDrawer24[0]?.scale[1]
        }
      },
    },
    back_walls: "Ja",
    clothes_rail: clothes_rail.length,
    adjust_shelves: adjust_shelves,
    fixed_shelves: fixed_sheves,
    glas_shelves: glas_shelves,
    led_lighting: ledAssets.length,
    handles: {
      show: !pushOpen,
      count: doorAssets.length,
      handleLength: 23
    },
    handles_img: handleListIndex === -1 ? handle[handleIndex]?.images : handle[handleIndex]?.list[handleListIndex].images,
    clothes_lift: clothes_lift.length,
    trousers_pull_out: trousers_pull_out.length,
    feet: {
      show: withFeet,
      count: feetCount,
      feetHeight: hangingSize+Config.plate.plinthHeight
    },
    feet_img: feetListIndex === -1 ? feet[feetIndex]?.images : feet[feetIndex]?.list[feetListIndex].images,
    base_cut_out: "Ja ( 4cm Hoch, 2 cm Tief)",
    outer_panels: "Ja (Umlaufend)",
    body_shape: korpusType,
    estimated_weight: "ca 46kg",
    max_load_per_compartment: "ca 25 kg",
    furniture_parts_number: 25,
  };
  const products_material = {
    body_back_panel: "Korpus und Rückwand",
    body_back_panel_matrial: bodyInfo?.name,
    body_back_panel_thickness: bodyInfo.thickness,
    body_back_panel_surface_texture: bodyInfo.surface,
    body_back_panel_coating: bodyInfo.coating,
    body_back_panel_img: bodyInfo.thumbnail,
    body_back_panel_description: bodyInfo.description,
    front: "Fronten",
    front_matrial: frontInfo?.name,
    front_thickness: frontInfo.thickness,
    front_surface_texture: frontInfo.surface,
    front_coating: frontInfo.coating,
    front_img: frontInfo.thumbnail,
    front_description: frontInfo.description,
    drawers: "Schubladen",
    drawers_matrial: drawerInfo.name,
    drawers_thickness: drawerInfo.thickness,
    drawers_surface_texture: drawerInfo.surface,
    drawers_coating: drawerInfo.coating,
    opening_method: "Push-to-Open (Vollauszug)",
    drawers_weight: `ca. ${drawerInfo.weight} kg`,
    drawers_img: drawerInfo.thumbnail,
    drawers_description: drawerInfo.description,
    handles: "Griffe",
    handles_matrial: handle[handleIndex]?.name,
    handles_thickness: handle[handleIndex]?.material,
    handles_length: `${handle[handleIndex]?.length} mm`,
    handles_img: handle[handleIndex]?.images,
    handles_description: handle[handleIndex]?.description,
    feet: "Füße",
    feet_name: feet[feetIndex]?.name,
    feet_thickness: feet[feetIndex]?.material,
    feet_height: `${feet[feetIndex]?.length} mm`,
    feet_img: feet[handleIndex]?.images,
    feet_description: feet[feetIndex]?.description
  };
  const service = [
    {
      title: "Lieferung",
      description:
        "Deine Tylko Möbel werden in flache Kartons verpackt und von zuverlässigen Speditionsunternehmen sicher direkt vor deine Wohnungs- oder Haustür geliefert.",
    },
    {
      title: "Nur einen Schraubendreher",
      description: "Nur einen Schraubendreher",
    },
    {
      title: "Aufbauanleitung",
      description:
        `Dein eleganter Design Aktenschrank in Weiß. Stabile Verarbeitung und elegantes Design.Böden: Eiche, Türen: konfigurierbar, Schubladen: Weiß. Abmessung: Breite ${width} x Höhe ${height} x Tiefe ${depth}. Material: Melaminveredelung in Weiß.MYCS Aktenschränke sind jederzeit mit unserem Konfigurator individuell flexibel erweiterbar um neue Farben und Module, wie z.b. Fronten, Wände oder Böden. Auch Höhe und Breite sind beinahe ohne Einschränkungen anpassbar. Optional sind hochwertige Multiplex Schubladen & Push-To-Open Türen möglich. Die ideale Ergänzung für dein Büro oder Arbeitszimmer.Die Lieferung erfolgt innerhalb weniger Wochen.`,
    },
    {
      title: "Zahlungsarten",
      description:
        "Bei MYCS bezahlst du mit allen gängigen Kreditkarten oder per Rechnung. Eine Ratenzahlung bieten wir auch an. Im Warenkorb erhältst du weitere Informationen.",
    },
    {
      title: "Keine Rückgabe individuell angefertiger Produkte",
      description:
        "Dein GRYD Regal wird individuell für dich angefertigt und ist damit von einer Rückgabe ausgeschlossen. Es zählt rechtlich zu den nicht vorgefertigten Waren, die im Bürgerlichen Gesetzbuch (§ 312g BGB) vom Widerrufsrecht ausgeschlossen sind. Bitte achte daher immer darauf, dass die Maße wirklich korrekt sind.",
    },
    {
      title: "Weitere Fragen?",
      description:
        "In diesen wenigen Zeilen wird sich nicht immer gleich alles klären lassen. Deshalb haben wir natürlich FAQ für dich – und unseren MYCS Kundenservice, ganz bequem erreichbar per Chat. Oder schreib uns einfach eine Mail: support@mycs.com",
    },
  ];

  return (
    <>
      <div className="bg-[#d9d9d9]" id="detail">
        <div className="mx-auto mt-5 mb-5 max-w-[1400px]">
          <p className="p-2 ml-4 text-[#456779] font-semibold font-sans text-2xl text-left">
            Produktdetails
          </p>
          <Accordion open={open === "des"} icon={<Icon id="des" open={open} />}>
            <AccordionHeader
              onClick={() => handleOpen("des")}
              className="bg-[#d9d9d9] text-[#456779] py-2 pl-6 pr-4 border-b-0 border-t-[1px] border-t-[#000000]"
            >
              Beschreibung
            </AccordionHeader>
            <AccordionBody className="px-[21px] custom-scrollbar overflow-y-auto">
              <ProductDescription product={product} />
            </AccordionBody>
          </Accordion>
          <Accordion
            open={open === "tech"}
            icon={<Icon id="tech" open={open} />}
          >
            <AccordionHeader
              onClick={() => handleOpen("tech")}
              className="bg-[#d9d9d9] text-[#456779] py-2 pl-6 pr-4 border-b-0 border-t-[1px] border-t-[#000000]"
            >
              Maße & Technische Daten
            </AccordionHeader>
            <AccordionBody className="px-[21px] custom-scrollbar overflow-y-auto">
              <ProductDimAndTech product_properties={product_properties} />
            </AccordionBody>
          </Accordion>
          <Accordion
            open={open === "material"}
            icon={<Icon id="material" open={open} />}
          >
            <AccordionHeader
              onClick={() => handleOpen("material")}
              className="bg-[#d9d9d9] text-[#456779] py-2 pl-6 pr-4 border-b-0 border-t-[1px] border-t-[#000000]"
            >
              Material-Details (ausführlich)
            </AccordionHeader>
            <AccordionBody className="px-[21px] custom-scrollbar overflow-y-auto">
              <ProductMaterial products_material={products_material} />
            </AccordionBody>
          </Accordion>
          <Accordion
            open={open === "service"}
            icon={<Icon id="service" open={open} />}
          >
            <AccordionHeader
              onClick={() => handleOpen("service")}
              className="bg-[#d9d9d9] text-[#456779] py-2 pl-6 pr-4 border-b-0 border-t-[1px] border-t-[#000000]"
            >
              Service & Zahlung
            </AccordionHeader>
            <AccordionBody className="px-[21px] custom-scrollbar overflow-y-auto">
              {service.map((item, index) => (
                <ProductService key={index} service={item} />
              ))}
              <div className="flex justify-center gap-6">
                <Button className="min-w-48 bg-[#36695C] text-[#FFF] flex items-center gap-2 rounded-[2px] px-[29px] py-[11px] h-[43px]">
                  <img src={AvaIcon} />
                  Sofortige Beratung
                </Button>
                <Button className="min-w-48 text-lg bg-[#36695C] text-[#FFF] flex items-center gap-2 rounded-[2px] px-[29px] py-[11px] h-[43px]">
                  <img src={QuizImag} width={23} height={23} alt="" />
                  FAQ
                </Button>
              </div>
            </AccordionBody>
          </Accordion>
        </div>
      </div>
    </>
  );
}
