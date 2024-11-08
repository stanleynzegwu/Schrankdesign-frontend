import React from "react";
import { Link } from "react-scroll";
import Layout from "../Layouts/Layout";
import FaqAccordion from "../components/Faq/FaqAccordion";
const lieferungData = [
  {
    id: 0,
    question: "Wie Lange ist die Lieferzeit?",
    answer:
      "Deine Möbelkonfiguration wird nach Geldeingang noch kurz 1-2 Tage geprüft und geht dann sofort in die Fertigung. Aktuell beträgt die Lieferzeit ca. 2-4 Wochen",
  },
  {
    id: 1,
    question: "Wie hoch sind die Versandkosten?",
    answer: `Die Versandkosten sind:

    Versand für Muster         
    
    4,99 €
    
    Speditions-Versand bis Bordstein    
    
    89,00 €
    
    Speditions-Versand bis Verwendungsort  149,00 €`,
  },
  {
    id: 2,
    question: "Kann ich meine Bestellung verfolgen?",
    answer:
      "Ja, sobald Ihre Bestellung versandt wurde, erhalten Sie eine Versandbestätigung mit einem Tracking-Link, über den Sie den Status Ihrer Lieferung verfolgen können.",
  },
  {
    id: 3,
    question: "Was passiert, wenn meine Lieferung beschädigt ankommt?",
    answer:
      "Bitte melden Sie sich bei unserem Kundenservice, um uns über den Schaden zu informieren. Wir werden uns umgehend um eine Lösung kümmern.",
  },
];

const konfigurationData = [
  {
    id: 0,
    question: "Wie funktioniert die Konfiguration?",
    answer:
      "Unsere Konfiguration erfolgt online. Sie können aus verschiedenen Materialien, Farben, Größen und Ausstattungen wählen, um Ihr Möbelstück individuell anzupassen.",
  },
  {
    id: 1,
    question: "Wie wähle ich die passende Farbe oder Holzton aus?",
    answer: `Gehen Sie im Konfigurator unter dem Menüpunkt "Farbe" und wählen Sie hier die passende Farbe oder Holzton für Ihren Korpus und die Fronten aus. Sie haben die Möglichkeit, unterschiedliche Farben oder Holztöne auszuwählen oder auch die gleiche Farbe für beide Elemente zu wählen, je nachdem, welches Erscheinungsbild Sie erzielen möchten.`,
  },
  {
    id: 2,
    question:
      "Wie kann ich sicherstellen, dass meine Konfiguration korrekt ist?",
    answer:
      "Wir stellen Ihnen eine detaillierte Zusammenfassung Ihrer Konfiguration zur Verfügung, bevor Sie Ihre Bestellung abschließen. Bitte überprüfen Sie diese sorgfältig und kontaktieren Sie uns bei Bedarf.",
  },
  {
    id: 3,
    question:
      "Kann ich Änderungen an meiner Konfiguration vornehmen, nachdem ich sie abgeschlossen habe?",
    answer:
      "Leider können Änderungen an Ihrer Konfiguration nach Abschluss der Bestellung nicht mehr vorgenommen werden. Bitte überprüfen Sie Ihre Konfiguration sorgfältig, bevor Sie Ihre Bestellung abschließen.",
  },
  {
    id: 4,
    question: "Sind Sonderanfertigungen möglich?",
    answer:
      "Ja, wir bieten auch Sonderanfertigungen an. Bitte kontaktieren Sie unseren Kundenservice für weitere Informationen.",
  },
  {
    id: 5,
    question:
      "Kann ich meine Konfiguration speichern und später weiter bearbeiten?",
    answer:
      "Ja, Sie können Ihre Konfiguration speichern und später jederzeit wieder aufrufen, um weitere Änderungen vorzunehmen.",
  },
];

const kundenserviceData = [
  {
    id: 0,
    question: "Wie kann ich den Kundensupport erreichen?",
    answer:
      "Du erreichst uns telefonisch montags bis freitags von 9:30 - 18:00 Uhr unter +49 341 65673302. Außerdem kannst du uns auch jederzeit per E-Mail an info@schrankdesign.de oder per Formular kontaktieren.",
  },
  {
    id: 1,
    question: "Wann ist der Kundenservice erreichbar?",
    answer:
      "Unser Kundenservice ist von Montag bis Freitag von 9:30 bis 18:00 Uhr erreichbar.",
  },
  {
    id: 2,
    question:
      "Wie lange dauert es, bis ich eine Antwort vom Kundenservice erhalte?",
    answer:
      "Wir bemühen uns, Anfragen innerhalb von 24 Stunden zu beantworten.",
  },
  {
    id: 3,
    question:
      "Was passiert, wenn ich mit meinem Möbelstück nicht zufrieden bin?",
    answer:
      "Bitte kontaktieren Sie uns umgehend, damit wir eine Lösung finden können. Wir möchten ausschließlich zufriedene Kunden und stehen hinter unseren Produkten.",
  },
  {
    id: 4,
    question: "Kann ich eine Beratung zur Konfiguration erhalten?",
    answer:
      "Ja, wir bieten auch eine telefonische Beratung zur Konfiguration an. Bitte kontaktieren Sie uns, um einen Termin zu vereinbaren.",
  },
];

const bestellungData = [
  {
    id: 0,
    question: "Wie bestelle ich bei Schrankdesign.de ?",
    answer: (
      <>
        Die Bestellung bei Schrankdesign.de ist unkompliziert: Wähle aus unserem
        breiten Angebot an Möbelstücken wie Sideboards, Garderoben,
        Waschtischen, Kommoden und mehr das, was dir gefällt, und konfiguriere
        es nach deinen Wünschen hinsichtlich Maßen und Farbe. Lege es
        anschließend in deinen Warenkorb.
        <br />
        <br />
        Im Warenkorb hast du dann die Möglichkeit, deine Bestellung mittels
        einer großen Auswahl an Zahlungsoptionen zu bezahlen, inklusive der
        Möglichkeit des Kaufs auf Rechnung. Deine Konfiguration wird daraufhin
        von unseren Tischlerexperten überprüft und anschließend in unserer
        hauseigenen Produktion in Leipzig hergestellt.`,
      </>
    ),
  },
  {
    id: 1,
    question: "Wie kann ich meine Bestellung abschließen?",
    answer:
      "Nachdem Sie Ihre Konfiguration abgeschlossen haben, können Sie Ihre Bestellung auf unserer Website abschließen. Wir akzeptieren verschiedene Zahlungsmethoden, einschließlich Kreditkarte, PayPal und Banküberweisung.",
  },
  {
    id: 2,
    question: "Kann ich meine Bestellung stornieren?",
    answer:
      "Sie können Ihre Bestellung innerhalb von 24 Stunden nach Abschluss stornieren. Bitte kontaktieren Sie uns umgehend, wenn Sie Ihre Bestellung stornieren möchten.",
  },
  {
    id: 3,
    question: "Erhalte ich eine Bestellbestätigung?",
    answer:
      "Ja, Sie erhalten eine Bestellbestätigung per E-Mail, sobald Sie Ihre Bestellung abgeschlossen haben.",
  },
  {
    id: 4,
    question: "Kann ich den Liefertermin meiner Bestellung ändern?",
    answer:
      "Bitte kontaktieren Sie uns, wenn Sie den Liefertermin Ihrer Bestellung ändern möchten. Wir werden unser Bestes tun, um Ihre Anfrage zu erfüllen.",
  },
];

const materialData = [
  {
    id: 0,
    question: "Wie Stark ist das Material",
    answer:
      "Die Rückwände der Schränke, Regale und Boards bestehen aus 8 mm starkem Plattenmaterial. Sämtliche Fronten, Seiten und Böden sind 19 mm stark, während der Schubkastenkorpus aus 16 mm starkem Plattenmaterial besteht.",
  },
  {
    id: 1,
    question: "Sind Ihre Möbelstücke umweltfreundlich?",
    answer:
      "Wir bemühen uns, umweltfreundliche Materialien zu verwenden und achten auf eine nachhaltige Produktion.",
  },
  {
    id: 2,
    question: "Wie pflege ich meine Möbelstücke?",
    answer:
      "Die Pflegeanleitung für jedes Möbelstück finden Sie auf unserer Website oder wird Ihnen mit der Lieferung mitgeliefert.",
  },
  {
    id: 3,
    question: "Kann ich Muster Ihrer Materialien anfordern?",
    answer:
      "Ja, wir bieten Muster unserer Materialien an. Bitte kontaktieren Sie uns, um ein Muster anzufordern oder bestellen Sie es direkt bei uns auf der Seite unter Mustern.",
  },
];

const bezahlungData = [
  {
    id: 0,
    question: "Welche Zahlungsmethoden akzeptieren Sie?",
    answer: "Wir akzeptieren Kreditkarte, PayPal und Banküberweisung.",
  },
  {
    id: 1,
    question: "Wann wird meine Zahlung abgebucht?",
    answer:
      "Ihre Zahlung wird unmittelbar nach Abschluss der Bestellung abgebucht.",
  },
  {
    id: 2,
    question: "Ist meine Zahlung sicher?",
    answer:
      "Ja, wir verwenden sichere Zahlungsmethoden und verschlüsseln alle Transaktionen.",
  },
  {
    id: 3,
    question: "Erhalte ich eine Rechnung?",
    answer:
      "Ja, Sie erhalten eine Rechnung per E-Mail, sobald Ihre Zahlung bestätigt wurde.",
  },
  {
    id: 4,
    question: "Kann ich in Raten zahlen?",
    answer:
      "Ja Sie können in Verbindung mit Paypal gerne auch mit Ratenzahlung bis zu 24 Monaten bezahlen.",
  },
];

const aufbauData = [
  {
    id: 0,
    question: "Werden die Möbelstücke montiert geliefert?",
    answer:
      "Je nach Produkt können die Möbelstücke entweder montiert oder zerlegt geliefert werden. Die Montageanleitung ist in jedem Fall im Lieferumfang enthalten.",
  },
  {
    id: 1,
    question: "Kann ich die Montage selbst durchführen?",
    answer:
      "Ja, unsere Möbelstücke sind in der Regel einfach zu montieren und können von Ihnen selbst montiert werden.",
  },
  {
    id: 2,
    question: "Bieten Sie einen Montageservice an?",
    answer:
      "Leider bieten wir derzeitig keinen Montageservice an, Dies ist aber nicht nötig, da der Aufbau unserer Möbel kinderleicht ist und man nur einen Schraubendreher braucht.",
  },
  {
    id: 3,
    question: "Welche Werkzeuge brauche ich für die Montage ?",
    answer: "Sie brauchen lediglich einen Kreuzschraubendreher.",
  },
  {
    id: 4,
    question: "Was passiert, wenn ich Probleme bei der Montage habe?",
    answer:
      "Bitte kontaktieren Sie unseren Kundenservice, wenn Sie Probleme bei der Montage haben. Wir helfen Ihnen gerne weiter.",
  },
];

const produktionData = [
  {
    id: 0,
    question: "Wo werden Ihre Möbelstücke produziert?",
    answer:
      "Unsere Möbelstücke werden von qualifizierten Handwerkern in unseren Produktionsstätten in Leipzig hergestellt.",
  },
  {
    id: 1,
    question: "Wie lange dauert die Produktion?",
    answer:
      "Die Produktionszeit variiert je nach Möbelstück und Material. Wir informieren Sie jedoch während des Bestellvorgangs über die voraussichtliche Produktionszeit. Zurzeit dauert es 2-3 Wochen.",
  },
  {
    id: 2,
    question: "Können Sonderanfertigungen produziert werden?",
    answer:
      "Ja, wir bieten auch Sonderanfertigungen an. Die Produktionszeit kann jedoch länger dauern. Bitte kontaktieren Sie uns für weitere Informationen.",
  },
  {
    id: 3,
    question: "Wird die Qualität der Möbelstücke überprüft?",
    answer:
      "Ja, wir überprüfen jedes Möbelstück vor dem Versand auf Qualität und Fehlerfreiheit.",
  },
  {
    id: 4,
    question: "Können Ihre Möbelstücke individualisiert werden?",
    answer:
      "Ja, unsere Möbelstücke können individuell gestaltet und konfiguriert werden, um Ihren Bedürfnissen und Wünschen gerecht zu werden.",
  },
];

const Faq = () => {
  return (
    <Layout>
      <div className="w-[90%] mx-auto">
        <div className="flex">
          <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl tracking-wider mt-2 lg:mt-5 mb-5 lg:mb-10 mx-auto">
            FAQ-Schrankdesign
          </h1>
        </div>
        <div className="grid grid-cols-12 gap-4 relative">
          <div className="hidden lg:block col-span-12 lg:col-span-3 p-5">
            <ul className="sticky top-[100px]">
              <li className="nav-link uppercase text-sm cursor-pointer">
                <Link
                  to="Lieferung"
                  className="flex py-2 pl-6 border-l-[3px]"
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={1000}
                >
                  Lieferung
                </Link>
              </li>
              <li className="nav-link uppercase text-sm cursor-pointer">
                <Link
                  to="Konfiguration"
                  className="flex py-2 pl-6 border-l-[3px]"
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={1000}
                >
                  Konfiguration
                </Link>
              </li>
              <li className="nav-link uppercase text-sm cursor-pointer">
                <Link
                  to="Kundenservice"
                  className="flex py-2 pl-6 border-l-[3px]"
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={1000}
                >
                  Kundenservice
                </Link>
              </li>
              <li className="nav-link uppercase text-sm cursor-pointer">
                <Link
                  to="Bestellung"
                  className="flex py-2 pl-6 border-l-[3px]"
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={1000}
                >
                  Bestellung
                </Link>
              </li>
              <li className="nav-link uppercase text-sm cursor-pointer">
                <Link
                  to="Material"
                  className="flex py-2 pl-6 border-l-[3px]"
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={1000}
                >
                  Material
                </Link>
              </li>
              <li className="nav-link uppercase text-sm cursor-pointer">
                <Link
                  to="Bezahlung"
                  className="flex py-2 pl-6 border-l-[3px]"
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={1000}
                >
                  Bezahlung
                </Link>
              </li>
              <li className="nav-link uppercase text-sm cursor-pointer">
                <Link
                  to="Aufbau_der_Möbel"
                  className="flex py-2 pl-6 border-l-[3px]"
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={1000}
                >
                  Aufbau der Möbel
                </Link>
              </li>
              <li className="nav-link uppercase text-sm cursor-pointer">
                <Link
                  to="Produktion"
                  className="flex py-2 pl-6 border-l-[3px]"
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={1000}
                >
                  Produktion
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-span-12 lg:col-span-6">
            {/* ---------------------Section 1----------------------- */}
            <div id="Lieferung">
              <div className="bg-[#F5F5F5] px-5 py-4">
                <h2 className="text-lg lg:text-xl font-bold">Lieferung</h2>
              </div>
              <div>
                {lieferungData &&
                  lieferungData.map((item, index) => (
                    <FaqAccordion
                      key={index}
                      question={item.question}
                      answer={item.answer}
                      index={index}
                      totalItems={lieferungData.length}
                    />
                  ))}
              </div>
            </div>
            {/* ---------------------Section 2----------------------- */}

            <div id="Konfiguration">
              <div className="bg-[#F5F5F5] px-5 py-4 mt-2 md::mt-5">
                <h2 className="text-lg lg:text-xl font-bold">Konfiguration</h2>
              </div>
              {konfigurationData &&
                konfigurationData.map((item, index) => (
                  <FaqAccordion
                    key={index}
                    question={item.question}
                    answer={item.answer}
                    index={index}
                    totalItems={konfigurationData.length}
                  />
                ))}
            </div>
            {/* ---------------------Section 3----------------------- */}
            <div id="Kundenservice">
              <div className="bg-[#F5F5F5] px-5 py-4 mt-2 md::mt-5">
                <h2 className="text-lg lg:text-xl font-bold">Kundenservice</h2>
              </div>
              {kundenserviceData &&
                kundenserviceData.map((item, index) => (
                  <FaqAccordion
                    key={index}
                    question={item.question}
                    answer={item.answer}
                    index={index}
                    totalItems={kundenserviceData.length}
                  />
                ))}
            </div>
            {/* ---------------------Section 4----------------------- */}

            <div id="Bestellung">
              <div className="bg-[#F5F5F5] px-5 py-4 mt-2 md::mt-5">
                <h2 className="text-lg lg:text-xl font-bold">Bestellung</h2>
              </div>
              {bestellungData &&
                bestellungData.map((item, index) => (
                  <FaqAccordion
                    key={index}
                    question={item.question}
                    answer={item.answer}
                    index={index}
                    totalItems={bestellungData.length}
                  />
                ))}
            </div>
            {/* ---------------------Section 5----------------------- */}
            <div id="Material">
              <div className="bg-[#F5F5F5] px-5 py-4 mt-2 md::mt-5">
                <h2 className="text-lg lg:text-xl font-bold">Material</h2>
              </div>
              {materialData &&
                materialData.map((item, index) => (
                  <FaqAccordion
                    key={index}
                    question={item.question}
                    answer={item.answer}
                    index={index}
                    totalItems={materialData.length}
                  />
                ))}
            </div>
            {/* ---------------------Section 6----------------------- */}
            <div id="Bezahlung">
              <div className="bg-[#F5F5F5] px-5 py-4 mt-2 md::mt-5">
                <h2 className="text-lg lg:text-xl font-bold">Bezahlung</h2>
              </div>
              {bezahlungData &&
                bezahlungData.map((item, index) => (
                  <FaqAccordion
                    key={index}
                    question={item.question}
                    answer={item.answer}
                    index={index}
                    totalItems={bezahlungData.length}
                  />
                ))}
            </div>
            {/* ---------------------Section 7----------------------- */}

            <div id="Aufbau_der_Möbel">
              <div className="bg-[#F5F5F5] px-5 py-4 mt-2 md::mt-5">
                <h2 className="text-lg lg:text-xl font-bold">
                  Aufbau der Möbel
                </h2>
              </div>
              {aufbauData &&
                aufbauData.map((item, index) => (
                  <FaqAccordion
                    key={index}
                    question={item.question}
                    answer={item.answer}
                    index={index}
                    totalItems={aufbauData.length}
                  />
                ))}
            </div>
            {/* ---------------------Section 8----------------------- */}
            <div id="Produktion">
              <div className="bg-[#F5F5F5] px-5 py-4 mt-2 md::mt-5">
                <h2 className="text-lg lg:text-xl font-bold">Produktion</h2>
              </div>
              {produktionData &&
                produktionData.map((item, index) => (
                  <FaqAccordion
                    key={index}
                    question={item.question}
                    answer={item.answer}
                    index={index}
                    totalItems={produktionData.length}
                  />
                ))}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-3"></div>
        </div>
      </div>
    </Layout>
  );
};

export default Faq;
