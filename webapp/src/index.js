import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import App from "./modules/App";

import "./index.css";
import "./assets/fonts/Amasis.otf";

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
