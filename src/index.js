import React from "react";
import ReactDOM from "react-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { withToastProvider } from "./utils/Toast";

const AppWithToastProvider = withToastProvider(App);

ReactDOM.render(<AppWithToastProvider />, document.getElementById("root"));

serviceWorker.unregister();
