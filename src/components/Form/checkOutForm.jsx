import { useState } from "react";
import TextField from "@mui/material/TextField";
// import MenuItem from "@mui/material/MenuItem";
import Paypal from "../Payments/Paypal";

const CheckOutForm = ({ data }) => {
  const [selectedPayment, setSelectedPayment] = useState("");
  const [isSaveDetail, setIsSaveDetail] = useState(false);
  const [newBillingAdd, setNewBillingAdd] = useState(null);
  // const [sameBillingAdd, setSameBillingAdd] = useState(null);
  const [email, setEmail] = useState("");
  const [newBillingAddforCredit, setNewBillingAddforCredit] = useState(true);
  const [creditCardDetail, setCreditCardDetail] = useState({
    cardNumber: "",
    validity: "",
    securityCode: "",
    nameCardHolder: "",
  });

  const [deliveryAddress, setDeliveryAddress] = useState({
    firstname: "",
    lastname: "",
    company: "",
    region: "",
    address: "",
    appartmentRoom: "",
    city: "",
    postalCode: "",
    telephone: "",
  });
  const [billingAddress, setBillingAddress] = useState({
    firstname: "",
    lastname: "",
    region: "",
    company: "",
    address: "",
    appartmentRoom: "",
    city: "",
    postalCode: "",
    telephone: "",
  });

  const handleSaveDetail = () => {
    setIsSaveDetail(!isSaveDetail);
  };

  const handlePaymentChange = (payment) => {
    setSelectedPayment(payment);
  };
  const handleDeliveryAddress = (e) => {
    const { name, value } = e.target;
    setDeliveryAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };
  const handleBillingAddress = (e) => {
    const { name, value } = e.target;
    setBillingAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };
  const handleCreditCardChange = (e) => {
    const { name, value } = e.target;
    setCreditCardDetail((prevDetail) => ({
      ...prevDetail,
      [name]: value,
    }));
  };

  const handleSameBillAddForCredit = () => {
    setNewBillingAddforCredit(!newBillingAddforCredit);
    if (newBillingAddforCredit) {
      setBillingAddress({ ...deliveryAddress });
    } else {
      setBillingAddress({
        firstname: "",
        lastname: "",
        region: "",
        company: "",
        address: "",
        appartmentRoom: "",
        city: "",
        postalCode: "",
        telephone: "",
      });
    }
  };

  //   same Billing Address for Stripe and Klarna
  const handleSameBillAdd = () => {
    setBillingAddress({ ...deliveryAddress });
    setNewBillingAdd(null);
  };

  //   New Billing Address for Stripe and Klarna
  const handleNewBillAdd = (value) => {
    setBillingAddress({
      firstname: "",
      lastname: "",
      region: "",
      company: "",
      address: "",
      appartmentRoom: "",
      city: "",
      postalCode: "",
      telephone: "",
    });
    setNewBillingAdd(value);
  };

  const creditCardPayment = () => {
    // debugger;
  };

  const StripeAndKlarnaCardPayment = () => {
    // debugger;
  };

  return (
    <>
      <form className="pl-16 pr-10">
        <div className="mb-4">
          <label className="block  text-xl font-bold mb-2" htmlFor="username">
            Kontakt
          </label>
          <input
            className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="email"
            type="email"
            placeholder="E-Mail oder Mobiltelefonnummer"
            required
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <div className="md:w-1/3" />
          <label className="md:w-2/3 block  ">
            <input
              className="form-check accent-[#0000] mr-2 leading-tight "
              type="checkbox"
            />
            <span className="text-sm">
              Neuigkeiten und Angebote via E-Mail erhalten
            </span>
          </label>
        </div>
        <label
          className="block  text-xl font-bold mb-2 mt-10"
          htmlFor="Lieferung"
        >
          Lieferung
        </label>

        <TextField
          select
          label="Land / Region"
          defaultValue="Deutschland"
          name="region"
          value={deliveryAddress.region}
          onChange={handleDeliveryAddress}
          variant="filled"
          fullWidth={true}
          InputProps={{
            style: { backgroundColor: "white", border: "1px solid #ccc" }, // Apply background color and border
          }}
        >
          <option value="Deutschland">Deutschland</option>
        </TextField>

        <div className="flex flex-wrap -mx-3 mb-6 mt-5">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <input
              className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-first-name"
              type="text"
              placeholder="Vorname (optional)"
              name="firstname"
              value={deliveryAddress.firstname}
              onChange={handleDeliveryAddress}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <input
              className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              type="text"
              placeholder="Nachname"
              name="lastname"
              value={deliveryAddress.lastname}
              onChange={handleDeliveryAddress}
            />
          </div>
        </div>
        <div className="mb-6 mt-5">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="company"
            type="text"
            placeholder="Firma (optional)"
            name="company"
            value={deliveryAddress.company}
            onChange={handleDeliveryAddress}
          />
        </div>
        <div className="mb-6 mt-5">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="Address"
            type="text"
            placeholder="Adresse"
            required
            name="address"
            value={deliveryAddress.address}
            onChange={handleDeliveryAddress}
          />
        </div>
        <div className="mb-6 mt-5">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="appartmentRoom"
            type="text"
            placeholder="Wohnung, Zimmer, usw. (optional)"
            name="appartmentRoom"
            value={deliveryAddress.appartmentRoom}
            onChange={handleDeliveryAddress}
          />
        </div>

        <div className="flex flex-wrap -mx-3 mb-6 mt-5">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <input
              className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="postalCode"
              type="text"
              placeholder="Postleitzahl"
              required
              name="postalCode"
              value={deliveryAddress.postalCode}
              onChange={handleDeliveryAddress}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <input
              className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-city"
              type="text"
              placeholder="Stadt"
              required
              name="city"
              value={deliveryAddress.city}
              onChange={handleDeliveryAddress}
            />
          </div>
        </div>
        <div className="mb-6 mt-5">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="phone"
            type="text"
            placeholder="Telefon"
            name="telephone"
            value={deliveryAddress.telephone}
            onChange={handleDeliveryAddress}
          />
        </div>

        <div className="mb-4">
          <h3 className="mb-3">Versand</h3>
          <div className="p-3  rounded" style={{ backgroundColor: "#F6F6F6" }}>
            <div>
              <p className="text-gray-500  p-1">
                Gib deine Lieferadresse ein, um verfügbare Versandarten
                anzuzeigen.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-7">
          <p className="text-xl font-bold">Zahlung</p>
          <p className="text-gray-500 p-1 pb-1">
            Alle Transaktionen sind sicher und verschlüsselt.
          </p>
        </div>
        <div className="payment-div">
          <div>
            <ul className="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <li
                className={`w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600 h-14 p-4 focus:border-gray-500 ${
                  selectedPayment === "credit" ? "bg-[#F6F6F6]" : ""
                }`}
              >
                <div className="flex items-center ps-3">
                  <input
                    id="list-radio-license"
                    type="radio"
                    defaultValue
                    name="list-radio"
                    className="form-radio accent-[#0000] w-4 h-4 text-black bg-gray-100 border-gray-300 focus:border-gray-500 "
                    onChange={() => handlePaymentChange("credit")}
                  />
                  <div className="credit-payment">
                    <div>
                      <label
                        htmlFor="list-radio-license"
                        className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Kreditkarte
                      </label>
                    </div>
                    <div className="flex">
                      <svg
                        viewBox="0 0 38 24"
                        xmlns="http://www.w3.org/2000/svg"
                        role="img"
                        width="38"
                        height="24"
                        aria-labelledby="pi-visa"
                      >
                        <title id="pi-visa">Visa</title>
                        <path
                          opacity=".07"
                          d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                        />
                        <path
                          fill="#fff"
                          d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                        />
                        <path
                          d="M28.3 10.1H28c-.4 1-.7 1.5-1 3h1.9c-.3-1.5-.3-2.2-.6-3zm2.9 5.9h-1.7c-.1 0-.1 0-.2-.1l-.2-.9-.1-.2h-2.4c-.1 0-.2 0-.2.2l-.3.9c0 .1-.1.1-.1.1h-2.1l.2-.5L27 8.7c0-.5.3-.7.8-.7h1.5c.1 0 .2 0 .2.2l1.4 6.5c.1.4.2.7.2 1.1.1.1.1.1.1.2zm-13.4-.3l.4-1.8c.1 0 .2.1.2.1.7.3 1.4.5 2.1.4.2 0 .5-.1.7-.2.5-.2.5-.7.1-1.1-.2-.2-.5-.3-.8-.5-.4-.2-.8-.4-1.1-.7-1.2-1-.8-2.4-.1-3.1.6-.4.9-.8 1.7-.8 1.2 0 2.5 0 3.1.2h.1c-.1.6-.2 1.1-.4 1.7-.5-.2-1-.4-1.5-.4-.3 0-.6 0-.9.1-.2 0-.3.1-.4.2-.2.2-.2.5 0 .7l.5.4c.4.2.8.4 1.1.6.5.3 1 .8 1.1 1.4.2.9-.1 1.7-.9 2.3-.5.4-.7.6-1.4.6-1.4 0-2.5.1-3.4-.2-.1.2-.1.2-.2.1zm-3.5.3c.1-.7.1-.7.2-1 .5-2.2 1-4.5 1.4-6.7.1-.2.1-.3.3-.3H18c-.2 1.2-.4 2.1-.7 3.2-.3 1.5-.6 3-1 4.5 0 .2-.1.2-.3.2M5 8.2c0-.1.2-.2.3-.2h3.4c.5 0 .9.3 1 .8l.9 4.4c0 .1 0 .1.1.2 0-.1.1-.1.1-.1l2.1-5.1c-.1-.1 0-.2.1-.2h2.1c0 .1 0 .1-.1.2l-3.1 7.3c-.1.2-.1.3-.2.4-.1.1-.3 0-.5 0H9.7c-.1 0-.2 0-.2-.2L7.9 9.5c-.2-.2-.5-.5-.9-.6-.6-.3-1.7-.5-1.9-.5L5 8.2z"
                          fill="#142688"
                        />
                      </svg>
                      <svg
                        viewBox="0 0 38 24"
                        xmlns="http://www.w3.org/2000/svg"
                        width="38"
                        height="24"
                        role="img"
                        aria-labelledby="pi-maestro"
                      >
                        <title id="pi-maestro">Maestro</title>
                        <path
                          opacity=".07"
                          d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                        />
                        <path
                          fill="#fff"
                          d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                        />
                        <circle fill="#EB001B" cx="15" cy="12" r="7" />
                        <circle fill="#00A2E5" cx="23" cy="12" r="7" />
                        <path
                          fill="#7375CF"
                          d="M22 12c0-2.4-1.2-4.5-3-5.7-1.8 1.3-3 3.4-3 5.7s1.2 4.5 3 5.7c1.8-1.2 3-3.3 3-5.7z"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 38 24"
                        role="img"
                        width="38"
                        height="24"
                        aria-labelledby="pi-master"
                      >
                        <title id="pi-master">Mastercard</title>
                        <path
                          opacity=".07"
                          d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                        />
                        <path
                          fill="#fff"
                          d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                        />
                        <circle fill="#EB001B" cx="15" cy="12" r="7" />
                        <circle fill="#F79E1B" cx="23" cy="12" r="7" />
                        <path
                          fill="#FF5F00"
                          d="M22 12c0-2.4-1.2-4.5-3-5.7-1.8 1.3-3 3.4-3 5.7s1.2 4.5 3 5.7c1.8-1.2 3-3.3 3-5.7z"
                        />
                      </svg>
                      <svg
                        viewBox="-36 25 38 24"
                        xmlns="http://www.w3.org/2000/svg"
                        width="38"
                        height="24"
                        role="img"
                        aria-labelledby="pi-unionpay"
                      >
                        <title id="pi-unionpay">Union Pay</title>
                        <path
                          fill="#005B9A"
                          d="M-36 46.8v.7-.7zM-18.3 25v24h-7.2c-1.3 0-2.1-1-1.8-2.3l4.4-19.4c.3-1.3 1.9-2.3 3.2-2.3h1.4zm12.6 0c-1.3 0-2.9 1-3.2 2.3l-4.5 19.4c-.3 1.3.5 2.3 1.8 2.3h-4.9V25h10.8z"
                        />
                        <path
                          fill="#E9292D"
                          d="M-19.7 25c-1.3 0-2.9 1.1-3.2 2.3l-4.4 19.4c-.3 1.3.5 2.3 1.8 2.3h-8.9c-.8 0-1.5-.6-1.5-1.4v-21c0-.8.7-1.6 1.5-1.6h14.7z"
                        />
                        <path
                          fill="#0E73B9"
                          d="M-5.7 25c-1.3 0-2.9 1.1-3.2 2.3l-4.4 19.4c-.3 1.3.5 2.3 1.8 2.3H-26h.5c-1.3 0-2.1-1-1.8-2.3l4.4-19.4c.3-1.3 1.9-2.3 3.2-2.3h14z"
                        />
                        <path
                          fill="#059DA4"
                          d="M2 26.6v21c0 .8-.6 1.4-1.5 1.4h-12.1c-1.3 0-2.1-1.1-1.8-2.3l4.5-19.4C-8.6 26-7 25-5.7 25H.5c.9 0 1.5.7 1.5 1.6z"
                        />
                        <path
                          fill="#fff"
                          d="M-21.122 38.645h.14c.14 0 .28-.07.28-.14l.42-.63h1.19l-.21.35h1.4l-.21.63h-1.68c-.21.28-.42.42-.7.42h-.84l.21-.63m-.21.91h3.01l-.21.7h-1.19l-.21.7h1.19l-.21.7h-1.19l-.28 1.05c-.07.14 0 .28.28.21h.98l-.21.7h-1.89c-.35 0-.49-.21-.35-.63l.35-1.33h-.77l.21-.7h.77l.21-.7h-.7l.21-.7zm4.83-1.75v.42s.56-.42 1.12-.42h1.96l-.77 2.66c-.07.28-.35.49-.77.49h-2.24l-.49 1.89c0 .07 0 .14.14.14h.42l-.14.56h-1.12c-.42 0-.56-.14-.49-.35l1.47-5.39h.91zm1.68.77h-1.75l-.21.7s.28-.21.77-.21h1.05l.14-.49zm-.63 1.68c.14 0 .21 0 .21-.14l.14-.35h-1.75l-.14.56 1.54-.07zm-1.19.84h.98v.42h.28c.14 0 .21-.07.21-.14l.07-.28h.84l-.14.49c-.07.35-.35.49-.77.56h-.56v.77c0 .14.07.21.35.21h.49l-.14.56h-1.19c-.35 0-.49-.14-.49-.49l.07-2.1zm4.2-2.45l.21-.84h1.19l-.07.28s.56-.28 1.05-.28h1.47l-.21.84h-.21l-1.12 3.85h.21l-.21.77h-.21l-.07.35h-1.19l.07-.35h-2.17l.21-.77h.21l1.12-3.85h-.28m1.26 0l-.28 1.05s.49-.21.91-.28c.07-.35.21-.77.21-.77h-.84zm-.49 1.54l-.28 1.12s.56-.28.98-.28c.14-.42.21-.77.21-.77l-.91-.07zm.21 2.31l.21-.77h-.84l-.21.77h.84zm2.87-4.69h1.12l.07.42c0 .07.07.14.21.14h.21l-.21.7h-.77c-.28 0-.49-.07-.49-.35l-.14-.91zm-.35 1.47h3.57l-.21.77h-1.19l-.21.7h1.12l-.21.77h-1.26l-.28.42h.63l.14.84c0 .07.07.14.21.14h.21l-.21.7h-.7c-.35 0-.56-.07-.56-.35l-.14-.77-.56.84c-.14.21-.35.35-.63.35h-1.05l.21-.7h.35c.14 0 .21-.07.35-.21l.84-1.26h-1.05l.21-.77h1.19l.21-.7h-1.19l.21-.77zm-19.74-5.04c-.14.7-.42 1.19-.91 1.54-.49.35-1.12.56-1.89.56-.7 0-1.26-.21-1.54-.56-.21-.28-.35-.56-.35-.98 0-.14 0-.35.07-.56l.84-3.92h1.19l-.77 3.92v.28c0 .21.07.35.14.49.14.21.35.28.7.28s.7-.07.91-.28c.21-.21.42-.42.49-.77l.77-3.92h1.19l-.84 3.92m1.12-1.54h.84l-.07.49.14-.14c.28-.28.63-.42 1.05-.42.35 0 .63.14.77.35.14.21.21.49.14.91l-.49 2.38h-.91l.42-2.17c.07-.28.07-.49 0-.56-.07-.14-.21-.14-.35-.14-.21 0-.42.07-.56.21-.14.14-.28.35-.28.63l-.42 2.03h-.91l.63-3.57m9.8 0h.84l-.07.49.14-.14c.28-.28.63-.42 1.05-.42.35 0 .63.14.77.35s.21.49.14.91l-.49 2.38h-.91l.42-2.24c.07-.21 0-.42-.07-.49-.07-.14-.21-.14-.35-.14-.21 0-.42.07-.56.21-.14.14-.28.35-.28.63l-.42 2.03h-.91l.7-3.57m-5.81 0h.98l-.77 3.5h-.98l.77-3.5m.35-1.33h.98l-.21.84h-.98l.21-.84zm1.4 4.55c-.21-.21-.35-.56-.35-.98v-.21c0-.07 0-.21.07-.28.14-.56.35-1.05.7-1.33.35-.35.84-.49 1.33-.49.42 0 .77.14 1.05.35.21.21.35.56.35.98v.21c0 .07 0 .21-.07.28-.14.56-.35.98-.7 1.33-.35.35-.84.49-1.33.49-.35 0-.7-.14-1.05-.35m1.89-.7c.14-.21.28-.49.35-.84v-.35c0-.21-.07-.35-.14-.49a.635.635 0 0 0-.49-.21c-.28 0-.49.07-.63.28-.14.21-.28.49-.35.84v.28c0 .21.07.35.14.49.14.14.28.21.49.21.28.07.42 0 .63-.21m6.51-4.69h2.52c.49 0 .84.14 1.12.35.28.21.35.56.35.91v.28c0 .07 0 .21-.07.28-.07.49-.35.98-.7 1.26-.42.35-.84.49-1.4.49h-1.4l-.42 2.03h-1.19l1.19-5.6m.56 2.59h1.12c.28 0 .49-.07.7-.21.14-.14.28-.35.35-.63v-.28c0-.21-.07-.35-.21-.42-.14-.07-.35-.14-.7-.14h-.91l-.35 1.68zm8.68 3.71c-.35.77-.7 1.26-.91 1.47-.21.21-.63.7-1.61.7l.07-.63c.84-.28 1.26-1.4 1.54-1.96l-.28-3.78h1.19l.07 2.38.91-2.31h1.05l-2.03 4.13m-2.94-3.85l-.42.28c-.42-.35-.84-.56-1.54-.21-.98.49-1.89 4.13.91 2.94l.14.21h1.12l.7-3.29-.91.07m-.56 1.82c-.21.56-.56.84-.91.77-.28-.14-.35-.63-.21-1.19.21-.56.56-.84.91-.77.28.14.35.63.21 1.19"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </li>

              <div>
                {selectedPayment === "credit" && (
                  <div className="p-3" style={{ backgroundColor: "#F4F4F4" }}>
                    <div className="mb-6 mt-5">
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="cardnumber"
                        type="number"
                        placeholder="Kartennummer"
                        name="cardNumber"
                        value={creditCardDetail.cardNumber}
                        onChange={handleCreditCardChange}
                      />
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6 mt-5">
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <input
                          className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="Valid until"
                          type="text"
                          placeholder="Gültig bis (MM/JJ)"
                          name="validity"
                          value={creditCardDetail.validity}
                          onChange={handleCreditCardChange}
                        />
                      </div>
                      <div className="w-full md:w-1/2 px-3">
                        <input
                          className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="Security_code"
                          type="text"
                          placeholder="Sicherheitscode"
                          name="securityCode"
                          value={creditCardDetail.securityCode}
                          onChange={handleCreditCardChange}
                        />
                      </div>
                    </div>
                    <div className="mb-6 mt-5">
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="nameCHolder"
                        type="text"
                        placeholder="Name des Karteninhabers"
                        name="nameCardHolder"
                        value={creditCardDetail.nameCardHolder}
                        onChange={handleCreditCardChange}
                      />
                    </div>

                    <div>
                      <div className="md:w-1/3" />
                      <label className="md:w-2/3 block  ">
                        <input
                          className="form-check accent-[#0000] mr-2 leading-tight"
                          type="checkbox"
                          onChange={handleSameBillAddForCredit}
                        />
                        <span className="text-sm">
                          Lieferadresse als Rechnungsadresse verwenden
                        </span>
                      </label>
                    </div>
                    {newBillingAddforCredit && (
                      <div>
                        <label
                          className="block  text-xl font-bold mb-2 mt-10"
                          htmlFor="Rechnungsadresse"
                        >
                          Rechnungsadresse
                        </label>

                        <div className="inline-block relative w-full">
                          <TextField
                            select
                            label="Land / Region"
                            defaultValue="Deutschland"
                            name="region"
                            value={billingAddress.region}
                            onChange={handleBillingAddress}
                            variant="filled"
                            fullWidth={true}
                            InputProps={{
                              style: {
                                backgroundColor: "white",
                                border: "1px solid #ccc",
                              },
                            }}
                          >
                            <option value="Deutschland">Deutschland</option>
                          </TextField>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-6 mt-5">
                          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <input
                              className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              id="grid-first-name"
                              type="text"
                              placeholder="Vorname (optional)"
                              name="firstname"
                              value={billingAddress.firstname}
                              onChange={handleBillingAddress}
                            />
                          </div>
                          <div className="w-full md:w-1/2 px-3">
                            <input
                              className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              id="grid-last-name"
                              type="text"
                              placeholder="Nachname"
                              name="lastname"
                              value={billingAddress.lastname}
                              onChange={handleBillingAddress}
                            />
                          </div>
                        </div>
                        <div className="mb-6 mt-5">
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="company"
                            type="text"
                            placeholder="Firma (optional)"
                            name="company"
                            value={billingAddress.company}
                            onChange={handleBillingAddress}
                          />
                        </div>
                        <div className="mb-6 mt-5">
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="Address"
                            type="text"
                            placeholder="Adresse"
                            name="address"
                            value={billingAddress.address}
                            onChange={handleBillingAddress}
                          />
                        </div>
                        <div className="mb-6 mt-5">
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="appartmentRoom"
                            type="text"
                            placeholder="Wohnung, Zimmer, usw. (optional)"
                            name="appartmentRoom"
                            value={billingAddress.appartmentRoom}
                            onChange={handleBillingAddress}
                          />
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-6 mt-5">
                          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <input
                              className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              id="postalCode"
                              type="text"
                              placeholder="Postleitzahl"
                              name="postalCode"
                              value={billingAddress.postalCode}
                              onChange={handleBillingAddress}
                            />
                          </div>
                          <div className="w-full md:w-1/2 px-3">
                            <input
                              className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              id="grid-city"
                              type="text"
                              placeholder="Stadt"
                              name="city"
                              value={billingAddress.city}
                              onChange={handleBillingAddress}
                            />
                          </div>
                        </div>
                        <div className="mb-6 mt-5">
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="telephone"
                            type="text"
                            placeholder="Telefon"
                            name="telephone"
                            value={billingAddress.telephone}
                            onChange={handleBillingAddress}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <hr />
              <li
                className={`w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600 h-14 p-4 focus:border-gray-500 ${
                  selectedPayment === "paypal" ? "bg-[#F6F6F6]" : ""
                }`}
              >
                <div className="flex items-center ps-3">
                  <input
                    id="list-radio-id"
                    type="radio"
                    defaultValue
                    name="list-radio"
                    className="form-radio accent-[#0000] w-4 h-4 text-black bg-gray-100 border-gray-300 focus:border-gray-500"
                    onChange={() => handlePaymentChange("paypal")}
                  />
                  <div className="credit-payment">
                    <div>
                      <label
                        htmlFor="list-radio-id"
                        className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Paypal
                      </label>
                    </div>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="25"
                        width="120"
                        viewBox="-18.537885 -7.5445 160.66167 45.267"
                      >
                        <path
                          d="M46.211 6.749h-6.839a.95.95 0 00-.939.802l-2.766 17.537a.57.57 0 00.564.658h3.265a.95.95 0 00.939-.803l.746-4.73a.95.95 0 01.938-.803h2.165c4.505 0 7.105-2.18 7.784-6.5.306-1.89.013-3.375-.872-4.415-.972-1.142-2.696-1.746-4.985-1.746zM47 13.154c-.374 2.454-2.249 2.454-4.062 2.454h-1.032l.724-4.583a.57.57 0 01.563-.481h.473c1.235 0 2.4 0 3.002.704.359.42.469 1.044.332 1.906zm19.654-.079h-3.275a.57.57 0 00-.563.481l-.145.916-.229-.332c-.709-1.029-2.29-1.373-3.868-1.373-3.619 0-6.71 2.741-7.312 6.586-.313 1.918.132 3.752 1.22 5.031.998 1.176 2.426 1.666 4.125 1.666 2.916 0 4.533-1.875 4.533-1.875l-.146.91a.57.57 0 00.562.66h2.95a.95.95 0 00.939-.803l1.77-11.209a.568.568 0 00-.561-.658zm-4.565 6.374c-.316 1.871-1.801 3.127-3.695 3.127-.951 0-1.711-.305-2.199-.883-.484-.574-.668-1.391-.514-2.301.295-1.855 1.805-3.152 3.67-3.152.93 0 1.686.309 2.184.892.499.589.697 1.411.554 2.317zm22.007-6.374h-3.291a.954.954 0 00-.787.417l-4.539 6.686-1.924-6.425a.953.953 0 00-.912-.678h-3.234a.57.57 0 00-.541.754l3.625 10.638-3.408 4.811a.57.57 0 00.465.9h3.287a.949.949 0 00.781-.408l10.946-15.8a.57.57 0 00-.468-.895z"
                          fill="#253B80"
                        />
                        <path
                          d="M94.992 6.749h-6.84a.95.95 0 00-.938.802l-2.766 17.537a.569.569 0 00.562.658h3.51a.665.665 0 00.656-.562l.785-4.971a.95.95 0 01.938-.803h2.164c4.506 0 7.105-2.18 7.785-6.5.307-1.89.012-3.375-.873-4.415-.971-1.142-2.694-1.746-4.983-1.746zm.789 6.405c-.373 2.454-2.248 2.454-4.062 2.454h-1.031l.725-4.583a.568.568 0 01.562-.481h.473c1.234 0 2.4 0 3.002.704.359.42.468 1.044.331 1.906zm19.653-.079h-3.273a.567.567 0 00-.562.481l-.145.916-.23-.332c-.709-1.029-2.289-1.373-3.867-1.373-3.619 0-6.709 2.741-7.311 6.586-.312 1.918.131 3.752 1.219 5.031 1 1.176 2.426 1.666 4.125 1.666 2.916 0 4.533-1.875 4.533-1.875l-.146.91a.57.57 0 00.564.66h2.949a.95.95 0 00.938-.803l1.771-11.209a.571.571 0 00-.565-.658zm-4.565 6.374c-.314 1.871-1.801 3.127-3.695 3.127-.949 0-1.711-.305-2.199-.883-.484-.574-.666-1.391-.514-2.301.297-1.855 1.805-3.152 3.67-3.152.93 0 1.686.309 2.184.892.501.589.699 1.411.554 2.317zm8.426-12.219l-2.807 17.858a.569.569 0 00.562.658h2.822c.469 0 .867-.34.939-.803l2.768-17.536a.57.57 0 00-.562-.659h-3.16a.571.571 0 00-.562.482z"
                          fill="#179BD7"
                        />
                        <path
                          d="M7.266 29.154l.523-3.322-1.165-.027H1.061L4.927 1.292a.316.316 0 01.314-.268h9.38c3.114 0 5.263.648 6.385 1.927.526.6.861 1.227 1.023 1.917.17.724.173 1.589.007 2.644l-.012.077v.676l.526.298a3.69 3.69 0 011.065.812c.45.513.741 1.165.864 1.938.127.795.085 1.741-.123 2.812-.24 1.232-.628 2.305-1.152 3.183a6.547 6.547 0 01-1.825 2c-.696.494-1.523.869-2.458 1.109-.906.236-1.939.355-3.072.355h-.73c-.522 0-1.029.188-1.427.525a2.21 2.21 0 00-.744 1.328l-.055.299-.924 5.855-.042.215c-.011.068-.03.102-.058.125a.155.155 0 01-.096.035z"
                          fill="#253B80"
                        />
                        <path
                          d="M23.048 7.667c-.028.179-.06.362-.096.55-1.237 6.351-5.469 8.545-10.874 8.545H9.326c-.661 0-1.218.48-1.321 1.132L6.596 26.83l-.399 2.533a.704.704 0 00.695.814h4.881c.578 0 1.069-.42 1.16-.99l.048-.248.919-5.832.059-.32c.09-.572.582-.992 1.16-.992h.73c4.729 0 8.431-1.92 9.513-7.476.452-2.321.218-4.259-.978-5.622a4.667 4.667 0 00-1.336-1.03z"
                          fill="#179BD7"
                        />
                        <path
                          d="M21.754 7.151a9.757 9.757 0 00-1.203-.267 15.284 15.284 0 00-2.426-.177h-7.352a1.172 1.172 0 00-1.159.992L8.05 17.605l-.045.289a1.336 1.336 0 011.321-1.132h2.752c5.405 0 9.637-2.195 10.874-8.545.037-.188.068-.371.096-.55a6.594 6.594 0 00-1.017-.429 9.045 9.045 0 00-.277-.087z"
                          fill="#222D65"
                        />
                        <path
                          d="M9.614 7.699a1.169 1.169 0 011.159-.991h7.352c.871 0 1.684.057 2.426.177a9.757 9.757 0 011.481.353c.365.121.704.264 1.017.429.368-2.347-.003-3.945-1.272-5.392C20.378.682 17.853 0 14.622 0h-9.38c-.66 0-1.223.48-1.325 1.133L.01 25.898a.806.806 0 00.795.932h5.791l1.454-9.225z"
                          fill="#253B80"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </li>

              <li
                className={`w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600 h-14 p-4 focus:border-gray-500 ${
                  selectedPayment === "stripe" ? "bg-[#F6F6F6]" : ""
                }`}
              >
                <div className="flex items-center ps-3">
                  <input
                    id="list-radio-military"
                    type="radio"
                    defaultValue
                    name="list-radio"
                    className="form-radio accent-[#0000] w-4 h-4 text-black bg-gray-100 border-gray-300 focus:border-gray-500"
                    onChange={() => handlePaymentChange("stripe")}
                  />
                  <div className="credit-payment">
                    <div>
                      <label
                        htmlFor="list-radio-military"
                        className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Stirpe
                      </label>
                    </div>
                    <div>
                      <p>
                        <svg
                          fill="#000000"
                          version="1.1"
                          id="Capa_1"
                          xmlns="http://www.w3.org/2000/svg"
                          width="55px"
                          height="28px"
                          viewBox="0 0 56.48 56.48"
                        >
                          <g>
                            <path
                              d="M36.782,27.01c0.153,1.155,0.188,2.317-0.049,3.464c-0.149,0.719-0.574,0.918-1.295,0.654c0-0.195,0-0.4,0-0.605
		c0-1.172,0.006-2.344-0.005-3.513c-0.002-0.205,0.068-0.31,0.25-0.366c0.104-0.033,0.203-0.077,0.306-0.107
		C36.432,26.406,36.721,26.553,36.782,27.01z M44.549,26.226c-0.092,0.107-0.17,0.254-0.188,0.392
		c-0.062,0.483-0.096,0.971-0.141,1.478c0.492,0,0.92,0,1.449,0c-0.062-0.578-0.08-1.139-0.193-1.68
		C45.385,25.975,44.844,25.883,44.549,26.226z M56.48,11.393v33.695c0,0.803-0.65,1.454-1.454,1.454H1.454
		C0.65,46.542,0,45.89,0,45.087V11.393c0-0.803,0.65-1.454,1.454-1.454h53.572C55.83,9.939,56.48,10.591,56.48,11.393z
		 M13.031,28.304c-0.314-0.229-0.681-0.39-1.028-0.572c-0.269-0.144-0.567-0.245-0.805-0.428c-0.129-0.099-0.232-0.341-0.208-0.497
		c0.021-0.132,0.227-0.291,0.379-0.331c0.21-0.057,0.452-0.041,0.672-0.009c0.543,0.082,1.082,0.19,1.642,0.292
		c0-0.66-0.008-1.329,0.005-1.998c0.004-0.193-0.065-0.274-0.241-0.331c-1.1-0.354-2.219-0.453-3.351-0.223
		c-1.063,0.217-1.874,0.762-2.184,1.869c-0.066,0.233-0.098,0.477-0.146,0.715c0,0.178,0,0.354,0,0.532
		c0.019,0.065,0.045,0.13,0.054,0.196c0.093,0.714,0.432,1.288,1.014,1.698c0.295,0.209,0.63,0.36,0.95,0.533
		c0.276,0.149,0.565,0.278,0.83,0.444c0.201,0.126,0.301,0.358,0.193,0.565c-0.078,0.147-0.27,0.306-0.43,0.328
		c-0.306,0.047-0.63,0.03-0.938-0.018c-0.499-0.076-0.99-0.199-1.51-0.309c0,0.748-0.006,1.465,0.01,2.184
		c0.001,0.072,0.129,0.182,0.217,0.206c1.021,0.288,2.055,0.429,3.122,0.331c1.644-0.15,2.559-1.004,2.73-2.637
		C14.115,29.845,13.894,28.935,13.031,28.304z M18.83,30.235c0-1.202-0.001-2.404,0-3.606c0-0.094,0.01-0.188,0.017-0.305
		c0.44,0,0.851,0,1.272,0c0.143-0.694,0.282-1.366,0.428-2.076c-0.586,0-1.143,0-1.727,0c0-0.924,0-1.814,0-2.729
		c-0.883,0.212-1.73,0.426-2.583,0.617c-0.212,0.047-0.279,0.154-0.314,0.352c-0.105,0.588-0.231,1.172-0.354,1.779
		c-0.407,0-0.787,0-1.166,0c0,0.702,0,1.376,0,2.07c0.396,0,0.768,0,1.17,0c0,0.129,0,0.233,0,0.339c0,1.468-0.01,2.937,0.005,4.405
		c0.013,1.25,0.568,2.076,1.575,2.32c1.14,0.276,2.26,0.038,3.378-0.168c0-0.784,0-1.531,0-2.308
		c-0.385,0.043-0.735,0.097-1.088,0.117c-0.406,0.024-0.555-0.113-0.603-0.515C18.829,30.433,18.83,30.333,18.83,30.235z
		 M26.772,24.515c0.003-0.212-0.08-0.287-0.271-0.337c-1.016-0.271-1.618-0.029-2.216,0.919c-0.119-0.213-0.244-0.413-0.344-0.626
		c-0.078-0.166-0.183-0.223-0.366-0.22c-0.7,0.011-1.399,0.004-2.099,0.006c-0.074,0-0.148,0.015-0.214,0.022
		c0,3.035,0,6.044,0,9.054c1.084,0,2.144,0,3.233,0c0-0.123,0-0.229,0-0.335c0-1.764,0-3.527,0-5.291
		c0-0.665,0.091-0.771,0.766-0.859c0.165-0.021,0.335-0.032,0.5-0.019c0.322,0.029,0.643,0.078,1.004,0.123
		C26.767,26.129,26.76,25.322,26.772,24.515z M30.782,24.27c-1.081,0-2.141,0-3.221,0c0,3.022,0,6.031,0,9.07
		c1.084,0,2.144,0,3.221,0C30.782,30.31,30.782,27.293,30.782,24.27z M30.827,21.512c0-0.842-0.634-1.534-1.45-1.627
		c-0.008-0.005-0.016-0.008-0.023-0.012c-0.118,0-0.237,0-0.355,0c-0.02,0.006-0.039,0.012-0.059,0.02
		c-0.787,0.119-1.39,0.799-1.39,1.619c0,0.461,0.191,0.878,0.498,1.176c0.198,0.195,0.451,0.341,0.741,0.414
		c0.131,0.033,0.265,0.05,0.396,0.048c0,0,0.002,0,0.004,0C30.094,23.149,30.827,22.416,30.827,21.512z M40.082,27.407
		c-0.06-0.689-0.189-1.365-0.496-1.994c-0.281-0.574-0.693-1.013-1.322-1.187c-0.969-0.267-1.893-0.172-2.734,0.418
		c-0.078,0.055-0.157,0.107-0.275,0.189c-0.24-0.632-0.752-0.62-1.277-0.578c-0.079,0.007-0.157,0.001-0.236,0.001
		c-0.51,0-1.02,0-1.561,0c0,0.139,0,0.245,0,0.351c0,3.902,0,7.805,0,11.707c0,0.099,0.006,0.197,0.012,0.295
		c1.084,0,2.168,0,3.253,0c0-1.081,0-2.161,0-3.223c0.483,0.047,0.942,0.133,1.399,0.127c1.571-0.015,2.514-0.736,2.98-2.239
		c0.02-0.065,0.04-0.132,0.057-0.198C40.197,29.866,40.189,28.638,40.082,27.407z M44.286,29.88c1.438,0,2.884,0,4.427,0
		c-0.072-0.984-0.096-1.922-0.221-2.845c-0.109-0.81-0.426-1.558-1.047-2.134c-0.756-0.703-1.693-0.847-2.667-0.804
		c-1.903,0.085-3.043,0.934-3.509,2.635c-0.379,1.384-0.377,2.79-0.008,4.177c0.354,1.332,1.201,2.184,2.58,2.46
		c1.229,0.246,2.447,0.19,3.657-0.112c0.696-0.176,0.696-0.175,0.696-0.892c0-0.547,0-1.097,0-1.668
		c-0.301,0.053-0.561,0.103-0.82,0.146c-0.767,0.127-1.535,0.289-2.314,0.168C44.467,30.919,44.2,30.519,44.286,29.88z"
                            />
                          </g>
                        </svg>
                      </p>
                    </div>
                  </div>
                </div>
              </li>
              <div>
                {selectedPayment === "stripe" && (
                  <div style={{ backgroundColor: "#F4F4F4" }}>
                    <p className="flex justify-center items-center ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="-252.3 356.1 163 80.9"
                        className="eHdoK"
                        width="150"
                        height="150"
                      >
                        <path
                          fill="none"
                          stroke="black"
                          strokeMiterlimit="10"
                          strokeWidth="1"
                          d="M-108.9 404.1v30c0 1.1-.9 2-2 2H-231c-1.1 0-2-.9-2-2v-75c0-1.1.9-2 2-2h120.1c1.1 0 2 .9 2 2v37m-124.1-29h124.1"
                        ></path>
                        <circle
                          cx="-227.8"
                          cy="361.9"
                          r="1.8"
                          fill="gray-500"
                        ></circle>
                        <circle
                          cx="-222.2"
                          cy="361.9"
                          r="1.8"
                          fill="gray-500"
                        ></circle>
                        <circle
                          cx="-216.6"
                          cy="361.9"
                          r="1.8"
                          fill="gray-500"
                        ></circle>
                        <path
                          fill="none"
                          stroke="black"
                          strokeMiterlimit="10"
                          strokeWidth="1"
                          d="M-128.7 400.1H-92m-3.6-4.1 4 4.1-4 4.1"
                        ></path>
                      </svg>
                    </p>
                    <div className=" text-center ">
                      <p className="pl-20 pr-20 pb-10">
                        Nachdem du “Bestellung überprüfen” geklickt hast, wirst
                        du zu Klarna -Sofort oder später bezahlen
                        weitergeleitet,um deinen Einkauf sicher abzuschließen.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <hr />
              <li
                className={`w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600 h-14 p-4 focus:border-gray-500 ${
                  selectedPayment === "klarna" ? "bg-[#F6F6F6] " : ""
                }`}
              >
                <div className="flex items-center ps-3">
                  <input
                    id="list-radio-passport"
                    type="radio"
                    defaultValue
                    name="list-radio"
                    className={`form-radio accent-[#0000] w-4 h-4 text-black bg-gray-100 border-black focus:border-gray-500  ${
                      selectedPayment === "klarna" ? "border-black-100 " : ""
                    }`}
                    onChange={() => handlePaymentChange("klarna")}
                  />
                  <div className="credit-payment">
                    <div>
                      <label
                        htmlFor="list-radio-passport"
                        className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Klarna - Sofort oder später bezahlen
                      </label>
                    </div>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        role="img"
                        width="38"
                        height="24"
                        viewBox="0 0 38 24"
                        aria-labelledby="pi-klarna"
                      >
                        <title id="pi-klarna">Klarna</title>
                        <g
                          stroke="none"
                          strokeWidth="1"
                          fill="none"
                          fillRule="evenodd"
                        >
                          <path
                            d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                            fill="#FFB3C7"
                          />
                          <path
                            d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                            fill="#FFB3C7"
                          />
                          <path
                            d="M34.117 13.184c-.487 0-.882.4-.882.892 0 .493.395.893.882.893.488 0 .883-.4.883-.893a.888.888 0 00-.883-.892zm-2.903-.69c0-.676-.57-1.223-1.274-1.223-.704 0-1.274.547-1.274 1.222 0 .675.57 1.223 1.274 1.223.704 0 1.274-.548 1.274-1.223zm.005-2.376h1.406v4.75h-1.406v-.303a2.446 2.446 0 01-1.394.435c-1.369 0-2.478-1.122-2.478-2.507 0-1.384 1.11-2.506 2.478-2.506.517 0 .996.16 1.394.435v-.304zm-11.253.619v-.619h-1.44v4.75h1.443v-2.217c0-.749.802-1.15 1.359-1.15h.016v-1.382c-.57 0-1.096.247-1.378.618zm-3.586 1.756c0-.675-.57-1.222-1.274-1.222-.703 0-1.274.547-1.274 1.222 0 .675.57 1.223 1.274 1.223.704 0 1.274-.548 1.274-1.223zm.005-2.375h1.406v4.75h-1.406v-.303A2.446 2.446 0 0114.99 15c-1.368 0-2.478-1.122-2.478-2.507 0-1.384 1.11-2.506 2.478-2.506.517 0 .997.16 1.394.435v-.304zm8.463-.128c-.561 0-1.093.177-1.448.663v-.535H22v4.75h1.417v-2.496c0-.722.479-1.076 1.055-1.076.618 0 .973.374.973 1.066v2.507h1.405v-3.021c0-1.106-.87-1.858-2.002-1.858zM10.465 14.87h1.472V8h-1.472v6.868zM4 14.87h1.558V8H4v6.87zM9.45 8a5.497 5.497 0 01-1.593 3.9l2.154 2.97H8.086l-2.341-3.228.604-.458A3.96 3.96 0 007.926 8H9.45z"
                            fill="#0A0B09"
                            fillRule="nonzero"
                          />
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
              </li>
              <div>
                {selectedPayment === "klarna" && (
                  <div className="" style={{ backgroundColor: "#F4F4F4" }}>
                    <p className="flex justify-center items-center ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="-252.3 356.1 163 80.9"
                        className="eHdoK"
                        width="150"
                        height="150"
                      >
                        <path
                          fill="none"
                          stroke="black"
                          strokeMiterlimit="10"
                          strokeWidth="1"
                          d="M-108.9 404.1v30c0 1.1-.9 2-2 2H-231c-1.1 0-2-.9-2-2v-75c0-1.1.9-2 2-2h120.1c1.1 0 2 .9 2 2v37m-124.1-29h124.1"
                        ></path>
                        <circle
                          cx="-227.8"
                          cy="361.9"
                          r="1.8"
                          fill="gray-500"
                        ></circle>
                        <circle
                          cx="-222.2"
                          cy="361.9"
                          r="1.8"
                          fill="gray-500"
                        ></circle>
                        <circle
                          cx="-216.6"
                          cy="361.9"
                          r="1.8"
                          fill="gray-500"
                        ></circle>
                        <path
                          fill="none"
                          stroke="black"
                          strokeMiterlimit="10"
                          strokeWidth="1"
                          d="M-128.7 400.1H-92m-3.6-4.1 4 4.1-4 4.1"
                        ></path>
                      </svg>
                    </p>
                    <div className=" text-center ">
                      <p className="pl-20 pr-20 pb-10">
                        Nachdem du “Bestellung überprüfen” geklickt hast, wirst
                        du zu Klarna -Sofort oder später bezahlen
                        weitergeleitet,um deinen Einkauf sicher abzuschließen.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </ul>
          </div>
        </div>
        <div>
          {selectedPayment === "credit" && (
            <div className="mt-7">
              <span className="text-xl">Für später speichern</span>
              <div className="mt-5    border border-gray-300">
                <div className="md:w-1/3" />
                <label className="md:w-2/3 block  p-3 ">
                  <input
                    className="form-check accent-[#0000] mr-2 leading-tight"
                    type="checkbox"
                    checked={isSaveDetail}
                    onChange={handleSaveDetail}
                  />
                  <span className="text-sm">
                    Meine Daten zum schnelleren Bezahlen speichern
                  </span>
                </label>
                <hr />
                {isSaveDetail && (
                  <div className=" p-4" style={{ backgroundColor: "#F4F4F4" }}>
                    <div className="flex">
                      <div className="relative w-full">
                        <div className=" absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="18"
                            height="18"
                            fill="none"
                            stroke="gray"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect
                              x="5"
                              y="2"
                              width="14"
                              height="20"
                              rx="2"
                              ry="2"
                            ></rect>
                            <line x1="12" y1="18" x2="12" y2="22"></line>
                            <line x1="5" y1="6" x2="19" y2="6"></line>
                          </svg>
                        </div>
                        <input
                          type="text"
                          id="phone-input"
                          aria-describedby="helper-text-explanation"
                          className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                          placeholder="+49 Mobile Rufnummer "
                          required
                        />
                      </div>
                    </div>
                    <p className="text-sm mt-5">
                      Wenn du das nächste Mal hier oder in anderen Shops von
                      Shopify auscheckst, erhältst du per Textnachricht einen
                      Code und kannst sicher mit Shop Pay einkaufen.
                    </p>
                  </div>
                )}
              </div>
              <button
                className="w-full mt-10  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-14"
                style={{ backgroundColor: "#016AB0" }}
                onClick={creditCardPayment}
              >
                Bestellung überprüfen
              </button>
            </div>
          )}
        </div>
        <div>
          {selectedPayment === "paypal" && (
            <div className="mt-20">
              <Paypal height="55" color="blue" price="300" data={data} />
            </div>
          )}
        </div>
        <div>
          {selectedPayment === "klarna" && (
            <div className="mt-16">
              <p className="text-xl">Rechnungsadresse</p>
              <div className="mt-2">
                <ul className="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                    <div className="flex items-center ps-3">
                      <input
                        id="list-radio-license"
                        type="radio"
                        defaultValue
                        name="list-radio"
                        className="form-radio accent-[#0000] w-4 h-4 text-black bg-gray-100 border-gray-300 focus:border-gray-500 checked:bg-black"
                        onChange={() => handleSameBillAdd("sameBillAddress")}
                      />
                      <label
                        htmlFor="list-radio-license"
                        className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Mit der Lieferadresse identisch
                      </label>
                    </div>
                  </li>
                  <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                    <div className="flex items-center ps-3">
                      <input
                        id="list-radio-license"
                        type="radio"
                        defaultValue
                        name="list-radio"
                        className="form-radio accent-[#0000] w-4 h-4 text-black bg-gray-100 border-gray-300 focus:border-gray-500 "
                        onChange={() => handleNewBillAdd("newBillAddress")}
                      />
                      <label
                        htmlFor="list-radio-license"
                        className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Eine andere Rechnungsadresse verwenden
                      </label>
                    </div>
                  </li>
                </ul>
                {newBillingAdd === "newBillAddress" && (
                  <div style={{ backgroundColor: "#F4F4F4" }}>
                    <div className="p-4">
                      <div className="inline-block relative w-full">
                        <TextField
                          select
                          label="Land / Region"
                          defaultValue="Deutschland"
                          name="region"
                          value={billingAddress.region}
                          onChange={handleBillingAddress}
                          variant="filled"
                          fullWidth={true}
                          InputProps={{
                            style: {
                              backgroundColor: "white",
                              border: "1px solid #ccc",
                            },
                          }}
                        >
                          <option value="Deutschland">Deutschland</option>
                        </TextField>
                      </div>

                      <div className="flex flex-wrap -mx-3 mb-6 mt-5">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                          <input
                            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-first-name"
                            type="text"
                            placeholder="Vorname (optional)"
                            name="firstname"
                            value={billingAddress.firstname}
                            onChange={handleBillingAddress}
                          />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                          <input
                            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-last-name"
                            type="text"
                            placeholder="Nachname"
                            name="lastname"
                            value={billingAddress.lastname}
                            onChange={handleBillingAddress}
                          />
                        </div>
                      </div>
                      <div className="mb-6 mt-5">
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="company"
                          type="text"
                          placeholder="Firma (optional)"
                          name="company"
                          value={billingAddress.company}
                          onChange={handleBillingAddress}
                        />
                      </div>
                      <div className="mb-6 mt-5">
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="Address"
                          type="text"
                          placeholder="Adresse"
                          name="address"
                          value={billingAddress.address}
                          onChange={handleBillingAddress}
                        />
                      </div>
                      <div className="mb-6 mt-5">
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="appartmentRoom"
                          type="text"
                          placeholder="Wohnung, Zimmer, usw. (optional)"
                          name="appartmentRoom"
                          value={billingAddress.appartmentRoom}
                          onChange={handleBillingAddress}
                        />
                      </div>

                      <div className="flex flex-wrap -mx-3 mb-6 mt-5">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                          <input
                            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="postalCode"
                            type="text"
                            placeholder="Postleitzahl"
                            name="postalCode"
                            value={billingAddress.postalCode}
                            onChange={handleBillingAddress}
                          />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                          <input
                            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-city"
                            type="text"
                            placeholder="Stadt"
                            name="city"
                            value={billingAddress.city}
                            onChange={handleBillingAddress}
                          />
                        </div>
                      </div>
                      <div className="mb-6 mt-5">
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="telephone"
                          type="text"
                          placeholder="Telefon"
                          name="telephone"
                          value={billingAddress.telephone}
                          onChange={handleBillingAddress}
                        />
                      </div>
                    </div>
                  </div>
                )}
                <button
                  className="w-full mt-12  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-14"
                  style={{ backgroundColor: "#0C67DE" }}
                  onClick={StripeAndKlarnaCardPayment}
                >
                  <span className="text-lg">Bestellung überprüfen</span>
                </button>
              </div>
            </div>
          )}
        </div>
        <div>
          {selectedPayment === "stripe" && (
            <div className="mt-16">
              <p className="text-xl">Rechnungsadresse</p>
              <div className="mt-2">
                <ul className="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                    <div className="flex items-center ps-3">
                      <input
                        id="list-radio-license"
                        type="radio"
                        defaultValue
                        name="list-radio"
                        className="form-radio accent-[#0000] w-4 h-4 text-black bg-gray-100 border-gray-300 focus:border-gray-500 checked:bg-black"
                        onChange={() => handleSameBillAdd("sameBillAddress")}
                      />
                      <label
                        htmlFor="list-radio-license"
                        className=" w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Mit der Lieferadresse identisch
                      </label>
                    </div>
                  </li>
                  <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                    <div className="flex items-center ps-3">
                      <input
                        id="list-radio-license"
                        type="radio"
                        defaultValue
                        name="list-radio"
                        className="form-radio accent-[#0000] w-4 h-4 text-black bg-gray-100 border-gray-300 focus:border-gray-500 checked:bg-black"
                        onChange={() => handleNewBillAdd("newBillAddress")}
                      />
                      <label
                        htmlFor="list-radio-license"
                        className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Eine andere Rechnungsadresse verwenden
                      </label>
                    </div>
                  </li>
                </ul>
                {newBillingAdd === "newBillAddress" && (
                  <div style={{ backgroundColor: "#F4F4F4" }}>
                    <div className="p-4">
                      <div className="inline-block relative w-full">
                        <TextField
                          select
                          label="Land / Region"
                          defaultValue="Deutschland"
                          name="region"
                          value={billingAddress.region}
                          onChange={handleBillingAddress}
                          variant="filled"
                          fullWidth={true}
                          InputProps={{
                            style: {
                              backgroundColor: "white",
                              border: "1px solid #ccc",
                            },
                          }}
                        >
                          <option value="Deutschland">Deutschland</option>
                        </TextField>
                      </div>

                      <div className="flex flex-wrap -mx-3 mb-6 mt-5">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                          <input
                            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-first-name"
                            type="text"
                            placeholder="Vorname (optional)"
                            name="firstname"
                            value={billingAddress.firstname}
                            onChange={handleBillingAddress}
                          />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                          <input
                            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-last-name"
                            type="text"
                            placeholder="Nachname"
                            name="lastname"
                            value={billingAddress.lastname}
                            onChange={handleBillingAddress}
                          />
                        </div>
                      </div>
                      <div className="mb-6 mt-5">
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="company"
                          type="text"
                          placeholder="Firma (optional)"
                          name="company"
                          value={billingAddress.company}
                          onChange={handleBillingAddress}
                        />
                      </div>
                      <div className="mb-6 mt-5">
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="Address"
                          type="text"
                          placeholder="Adresse"
                          name="address"
                          value={billingAddress.address}
                          onChange={handleBillingAddress}
                        />
                      </div>
                      <div className="mb-6 mt-5">
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="appartmentRoom"
                          type="text"
                          placeholder="Wohnung, Zimmer, usw. (optional)"
                          name="appartmentRoom"
                          value={billingAddress.appartmentRoom}
                          onChange={handleBillingAddress}
                        />
                      </div>

                      <div className="flex flex-wrap -mx-3 mb-6 mt-5">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                          <input
                            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="postalCode"
                            type="text"
                            placeholder="Postleitzahl"
                            name="postalCode"
                            value={billingAddress.postalCode}
                            onChange={handleBillingAddress}
                          />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                          <input
                            className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-city"
                            type="text"
                            placeholder="Stadt"
                            name="city"
                            value={billingAddress.city}
                            onChange={handleBillingAddress}
                          />
                        </div>
                      </div>
                      <div className="mb-6 mt-5">
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="telephone"
                          type="text"
                          placeholder="Telefon"
                          name="telephone"
                          value={billingAddress.telephone}
                          onChange={handleBillingAddress}
                        />
                      </div>
                    </div>
                  </div>
                )}
                <button
                  className="w-full mt-12  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-14"
                  style={{ backgroundColor: "#0C67DE" }}
                  onClick={StripeAndKlarnaCardPayment}
                >
                  <span className="text-lg">Bestellung überprüfen</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </form>
    </>
  );
};

export default CheckOutForm;
