import { PayPalButtons } from "@paypal/react-paypal-js";

const Paypal = ({ height, color, data }) => {
  const url = "http://localhost:8081";
  const createOrder = (data) => {
    //debugger;
    // Order is created on the server and the order id is returned
    return fetch(`${url}/api/v1/payment/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // use the "body" param to optionally pass additional order information
      // like product skus and quantities
      body: JSON.stringify({
        cart: [
          {
            product: data.productname,
            price: data.prouductprice,
          },
        ],
      }),
    })
      .then((response) => response.json())
      .then((order) => order.id);
  };
  const onApprove = (data) => {
    // Order is captured on the server and the response is returned to the browser
    return fetch(`${url}/api/v1/payment/api/orders/${data.orderID}/capture`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderID: data.orderID,
      }),
    }).then((response) => response.json());
  };

  return (
    <>
      <PayPalButtons
        fundingSource="paypal"
        style={{
          layout: "vertical",
          color: color,
          height: parseInt(height),
        }}
        createOrder={() => createOrder(data)}
        onApprove={(data) => onApprove(data)}
      />
    </>
  );
};

export default Paypal;
