import React from "react";
import { Fade, Slide } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import BottomProducts from "../common/BottomProducts";
import CommanBanner from "../common/CommanBanner";

const BestEllung = ({ title }) => {
  return (
    <>
      <div className="md:w-[90%] mx-auto p-5">
        {/* Start Row */}
        <div className="flex">
          <Link to="/">
            <div className="text-gray-600">Start</div>
          </Link>
          <div className="mx-2">/</div>
          <div>{title && title}</div>
        </div>
        {/* Heading */}
        <div className="flex bg-white p-10">
          <h1 className="text-xl md:text-3xl lg:text-4xl font-bold mx-auto border-b-2 md:border-b-4 pb-4 border-[#5a8560]">
            {title}
          </h1>
        </div>
        {/* Left Right Section */}
        <Slide triggerOnce={true} right>
          <div className=" mx-auto grid grid-cols-1 lg:grid-cols-2 lg:gap-8 md:p-5 lg:p-10 rounded-2xl shadow-2xl mt-5">
            <div className="p-5">
              <img
                src="/images/servicee/single/bestellung.webp"
                alt=""
                className="rounded-2xl image-zoom"
              />
            </div>
            <div className="p-5 my-auto">
              <h4 className="text-3xl md:text-4xl font-semibold">
                1. Produktauswahl
              </h4>
              <p className="mt-2 md:mt-5 leading-relaxed md:leading-loose font-medium">
                Wähle ein Produkt aus unseren Kategorien Sideboard, Lowboard,
                Hängeboard oder Kommode aus und lass dich dabei von unseren
                inspirierenden Bildern verführen.
              </p>
            </div>
          </div>
        </Slide>
        {/* Left Right Section */}
        <Slide triggerOnce={true} right>
          <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 lg:gap-8 md:p-5 lg:p-10 rounded-2xl shadow-2xl mt-5 md:mt-10">
            <div className="p-5 my-auto">
              <h4 className="text-3xl md:text-4xl font-semibold">
                2. Konfigurator
              </h4>
              <p className="mt-2 md:mt-5 leading-relaxed md:leading-loose font-medium">
                Hier kannst du dein Möbel ganz nach deinen Wünschen gestalten.
                Du hast die Wahl aus verschiedenen Größen und Farben. Du kannst
                auswählen, ob du deine Schubladen aus Massivholz oder aus einem
                Systemschubkasten haben möchtest und ob du eine
                Oberflächenveredelung wie Lackierung oder Ölen hinzufügen
                möchtest. Du hast auch die Möglichkeit, den Möbeltyp zu wählen,
                ob du es stehend oder lieber an der Wand befestigt haben
                möchtest. Falls du die stehende Variante wählst, hast du die
                Wahl aus verschiedenen Füßen. Du kannst auch den Montageservice
                nutzen und entscheiden, ob du deine Möbel in Einzelteilen oder
                fertig montiert geliefert haben möchtest. Zusätzlich hast du
                auch die Möglichkeit, die Montage vor Ort zu wählen, bei der das
                Möbel von einem unserer Partner direkt bei dir vor Ort aufgebaut
                wird.
              </p>
            </div>

            <div className="p-5">
              <img
                src="/images/servicee/single/Konfigurator.webp"
                alt=""
                className="rounded-2xl image-zoom"
              />
            </div>
          </div>
        </Slide>
        {/* Left Right Section */}
        <Fade triggerOnce={true}>
          <div className=" mx-auto grid grid-cols-1 lg:grid-cols-2 lg:gap-8 md:p-5 lg:p-10 rounded-2xl shadow-2xl mt-5">
            <div className="p-5">
              <img
                src="/images/servicee/single/warenkob.webp"
                alt=""
                className="rounded-2xl image-zoom"
              />
            </div>
            <div className="p-5 my-auto">
              <h4 className="text-3xl md:text-4xl font-semibold">
                3. Warenkorb
              </h4>
              <p className="mt-2 md:mt-5 leading-relaxed md:leading-loose font-medium">
                Wenn du deine Bestellung fertig konfiguriert hast, kannst du sie
                in den Warenkorb legen und direkt zum Checkout gelangen. Hier
                hast du die Wahl aus verschiedenen Zahlungsoptionen wie Paypal,
                Kreditkarte, Klarna oder Überweisung. Du hast auch die
                Möglichkeit, auf Rechnung zu bezahlen oder das Möbel in 12 Raten
                via Paypal zu bezahlen.
              </p>
              <button className="site-button mt-5 md:mt-10">
                Jetzt konfigurieren
              </button>
            </div>
          </div>
        </Fade>
        {/* Common Banner */}
      </div>
      <CommanBanner />
      {/* ----------------------------Bottom Products------------------------ */}
      <BottomProducts />
    </>
  );
};

export default BestEllung;
