import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import { store } from "./store"
import { Provider } from "react-redux"
import reportWebVitals from "./reportWebVitals.js"
import { PayPalScriptProvider } from "@paypal/react-paypal-js"

import "@fontsource/karla" // Defaults to weight 400
import "@fontsource/karla/400.css" // Specify weight
import "@fontsource/karla/700.css" // Specify weight
import "@fontsource/karla/800.css" // Specify weight
import { BrowserRouter } from "react-router-dom"

const initialOptions = {
  clientId:
    "ATj2bPbR4OKB77hcGUmKLIeXHpQGj-qBVzWwVLN1_1RCpgMddmi4GK5rtZRjhws_WAFGmxvtXpnZhkRg",
  currency: "EUR",
  intent: "capture",
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PayPalScriptProvider options={initialOptions}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </PayPalScriptProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
