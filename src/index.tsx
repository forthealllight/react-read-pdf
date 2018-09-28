import * as React from "react";
import {render} from "react-dom";
import WebPDF from "./components/WebPDF/index"

const rootEl = document.getElementById("root");

render(
    <WebPDF url='/test.pdf'/>,
    rootEl
);
