import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import App from "./App";
import { MemoryRouter as Router } from "react-router-dom";
import { weakStart } from "mocks/weakStart";

if (process.env.NODE_ENV === "development") {
  console.log(process.env.REACT_APP_API_ENDPOINT);
  const { worker } = require("./mocks/browser");
  weakStart(worker);
}

const queryClient = new QueryClient();
queryClient.setQueryDefaults(["tasks"], { staleTime: Infinity });

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <App />
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
