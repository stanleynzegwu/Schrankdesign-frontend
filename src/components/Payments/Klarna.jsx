// import GooglePayButton from "@google-pay/button-react";
// import React, { useEffect } from "react";

// const Klarna = () => {
//   window.klarnaExpressButtonAsyncCallback = function () {
//     Klarna.ExpressButton.on("user-authenticated", function (callbackData) {
//       // ... implement pre-fill logic here
//       // callbackData (see schema below) can be used to map user properties
//       // to already existing fields/forms in your checkout flow
//     });
//   };
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://x.klarnacdn.net/express-button/v1/lib.js";
//     script.async = true;
//     script.setAttribute("data-id", "PK164329_328dabc8e5bf");
//     script.setAttribute("data-environment", "playground"); // Change to 'playground' for testing

//     document.head.appendChild(script);

//     return () => {
//       // Clean up script on component unmount
//       document.head.removeChild(script);
//     };

//   }, []);
//   return (
//     <>
//       <p>hi</p>
//       <klarna-express-button
//         data-locale="en-DE"
//         data-theme="default"
//         data-shape="default"
//         data-label="klarna"
//       />
//     </>
//   );
// };

// export default Klarna;

// import React, { useEffect, useState } from "react";

// const KlarnaExpressButtonIntegration = () => {
//   const [billingInfo, setBillingInfo] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     dateOfBirth: "",
//     phone: "",
//     address: {
//       streetAddress: "",
//       streetAddress2: "",
//       postalCode: "",
//       city: "",
//       region: "",
//       country: "",
//     },
//   });

//   useEffect(() => {
//     // Step 1: Add the Express button script to the head tag
//     const script = document.createElement("script");
//     script.src = "https://x.klarnacdn.net/express-button/v1/lib.js";
//     script.async = true;
//     script.setAttribute("data-id", "PK164329_328dabc8e5bf");
//     script.setAttribute("data-environment", "playground");
//     script.onload = () => {
//       // Step 3: Add the asynchronous callback function to get user details
//       window.klarnaExpressButtonAsyncCallback = function () {
//         // Ensure Klarna is defined before using it
//         if (window.Klarna && window.Klarna.ExpressButton) {
//           window.Klarna.ExpressButton.on(
//             "user-authenticated",
//             function (callbackData) {
//               // Step 3: Implement pre-fill logic here
//               // Use callbackData to prefill billing information in your checkout flow

//               // Example: Update state with user details for pre-filling form fields
//               setBillingInfo({
//                 firstName: callbackData.first_name || "",
//                 lastName: callbackData.last_name || "",
//                 email: callbackData.email || "",
//                 dateOfBirth: callbackData.date_of_birth || "",
//                 phone: callbackData.phone || "",
//                 address: {
//                   streetAddress: callbackData.address.street_address || "",
//                   streetAddress2: callbackData.address.street_address2 || "",
//                   postalCode: callbackData.address.postal_code || "",
//                   city: callbackData.address.city || "",
//                   region: callbackData.address.region || "",
//                   country: callbackData.address.country || "",
//                 },
//               });
//             }
//           );
//         } else {
//           console.error("Klarna library not available");
//         }
//       };
//     };

//     document.head.appendChild(script);

//     // Clean up on component unmount
//     return () => {
//       document.head.removeChild(script);
//       window.klarnaExpressButtonAsyncCallback = null;
//     };
//   }, []);

//   return (
//     <div>
//       {/* Step 2: Add the Express button element */}
//       <klarna-express-button data-locale="en-US" data-theme="default" />

//       {/* Display pre-filled billing information */}
//       <div>
//         <h2>Pre-filled Billing Information:</h2>
//         <p>First Name: {billingInfo.firstName}</p>
//         <p>Last Name: {billingInfo.lastName}</p>
//         <p>Email: {billingInfo.email}</p>
//         <p>Date of Birth: {billingInfo.dateOfBirth}</p>
//         <p>Phone: {billingInfo.phone}</p>
//         <p>Street Address: {billingInfo.address.streetAddress}</p>
//         <p>Street Address 2: {billingInfo.address.streetAddress2}</p>
//         <p>Postal Code: {billingInfo.address.postalCode}</p>
//         <p>City: {billingInfo.address.city}</p>
//         <p>Region: {billingInfo.address.region}</p>
//         <p>Country: {billingInfo.address.country}</p>
//       </div>
//     </div>
//   );
// };

// export default KlarnaExpressButtonIntegration;

// Klarna.js
// import { useState } from "react"
import axios from "axios"

const Klarna = () => {
  // const [klarnaOrder, setKlarnaOrder] = useState(null)

  // const handleKlarnaIntegration = async () => {
  //   try {
  //     // Replace with your actual order details
  //     const orderData = {
  //       purchase_country: "DE",
  //       purchase_currency: "EUR",
  //       locale: "en-DE",
  //       order_amount: 50000,
  //       order_tax_amount: 4545,
  //       order_lines: [
  //         {
  //           type: "physical",
  //           reference: "19-402-EUR",
  //           name: "Red T-Shirt",
  //           quantity: 5,
  //           quantity_unit: "pcs",
  //           unit_price: 10000,
  //           tax_rate: 1000,
  //           total_amount: 50000,
  //           total_discount_amount: 0,
  //           total_tax_amount: 4545,
  //         },
  //       ],
  //       merchant_urls: {
  //         terms: "https://www.example.com/terms.html",
  //         checkout:
  //           "https://www.example.com/checkout.html?order_id={checkout.order.id}",
  //         confirmation:
  //           "https://www.example.com/confirmation.html?order_id={checkout.order.id}",
  //         push: "https://www.example.com/api/push?order_id={checkout.order.id}",
  //       },
  //     };

  //     const createOrderResponse = await axios.post(
  //       "http://localhost:8081/api/v1/payment/create-order",
  //       orderData
  //     );
  //     const orderId = createOrderResponse.data.order_id;

  //     // Get Klarna Checkout Snippet (Client Side) via Ajax call
  //     const getSnippetResponse = await axios.get(
  //       `http://localhost:8081/api/v1/payment/get-checkout-snippet/${orderId}`
  //     );
  //     const htmlSnippet = getSnippetResponse.data;

  //     // Dynamically inject the HTML snippet into the page
  //     var checkoutContainer = document.getElementById(
  //       "klarna-checkout-container"
  //     );
  //     checkoutContainer.innerHTML = htmlSnippet;

  //     // Parse and evaluate script tags
  //     var scriptsTags = checkoutContainer.getElementsByTagName("script");
  //     for (var i = 0; i < scriptsTags.length; i++) {
  //       var parentNode = scriptsTags[i].parentNode;
  //       var newScriptTag = document.createElement("script");
  //       newScriptTag.type = "text/javascript";
  //       newScriptTag.text = scriptsTags[i].text;
  //       parentNode.removeChild(scriptsTags[i]);
  //       parentNode.appendChild(newScriptTag);
  //     }

  //     // Read Klarna Order
  //     const readOrderResponse = await axios.get(
  //       `http://localhost:8081/api/v1/payment/read-order/${orderId}`
  //     );
  //     setKlarnaOrder(readOrderResponse.data);

  //     // Render Klarna Confirmation Snippet (Client Side)
  //     const confirmationSnippetResponse = await axios.get(
  //       `http://localhost:8081/api/v1/payment/confirmation-page/${orderId}`
  //     );
  //     document.getElementById("klarna-confirmation-container").innerHTML =
  //       confirmationSnippetResponse.data;
  //   } catch (error) {
  //     console.error("Error:", error.message);
  //   }
  // };
  // useEffect(() => {
  //   // This will trigger the Klarna SDK initialization once the component is mounted
  //   window.klarnaAsyncCallback();
  // }, []);
  // Klarna.Payments.load(
  //   {
  //     container: "#klarna-payments-container",
  //   },
  //   {},
  //   function (res) {
  //     console.debug(res);
  //   }
  // );

  // const [sessionId, setSessionId] = useState("")

  const initiatePayment = async () => {
    try {
      // Replace with your actual data
      const paymentData = {
        acquiring_channel: "ECOMMERCE",
        intent: "buy",
        purchase_country: "SE",
        purchase_currency: "SEK",
        locale: "en-SE",
        order_amount: 9500,
        order_tax_amount: 1900,
        order_lines: [
          {
            type: "physical",
            reference: "19-402",
            name: "Battery Power Pack",
            quantity: 1,
            unit_price: 10000,
            tax_rate: 2500,
            total_amount: 9500,
            total_discount_amount: 500,
            total_tax_amount: 1900,
            image_url: "https://www.exampleobjects.com/logo.png",
            product_url: "https://www.estore.com/products/f2a8d7e34",
          },
        ],
        merchant_urls: {
          authorization: "https://example.com/authorization_callbacks",
        },
      }

      const response = await axios.post(
        "http://localhost:8081/api/v1/payment/initiate-payment",
        paymentData
      )
      // setSessionId(response.data.session_id)

      if (response) {
        if (window.Klarna) {
          window.Klarna.Payments.init({
            client_token: response.data.client_token,
          })

          window.Klarna.Payments.load(
            {
              container: "#klarna-payments-container",
            },
            {},
            function (res) {
              if (res.show_form) {
                // Klarna payments are available, you can display the payment option
              } else {
                // Klarna payments are not available, handle this case accordingly
                console.debug("debug", res)
              }
            }
          )
        }
      }
    } catch (error) {
      console.error("Error initiating payment:", error.message)
    }
  }

  return (
    // <div>
    //   {/* Other content in your component */}
    //   <div id="klarna-payments-container">JI</div>
    // </div>
    // <div>

    //   {/* Display Klarna order details */}
    //   {klarnaOrder && (
    //     <div>
    //       <p>Order ID: {klarnaOrder.order_id}</p>
    //       {/* Add other relevant details from the response */}
    //     </div>
    //   )}

    //   {/* Button to initiate Klarna integration */}
    //   <button onClick={handleKlarnaIntegration}>
    //     Initiate Klarna Integration
    //   </button>

    //   {/* Container for Klarna Checkout snippet */}
    //   <div id="klarna-checkout-container"></div>

    //   {/* Container for Klarna Confirmation snippet */}
    //   <div id="klarna-confirmation-container"></div>
    // </div>
    <>
      <div>
        <h1>Klarna Payment Integration</h1>
        <button
          className=" border-2  border-gray 600 bg-[#FCB3C7] p-3"
          onClick={initiatePayment}
        >
          Klarna Payment
        </button>
      </div>
      <div id="klarna-payments-container"></div>
    </>
  )
}

export default Klarna
