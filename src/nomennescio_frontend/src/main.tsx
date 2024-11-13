import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import { ChakraProvider } from "@chakra-ui/react";
import { defaultSystem } from "@chakra-ui/react";

const root = document.getElementById("root");

if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <ChakraProvider value={defaultSystem}>
        <App />
      </ChakraProvider>
    </React.StrictMode>
  );
}
