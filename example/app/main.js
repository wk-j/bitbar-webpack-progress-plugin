import "./css/Style.css";
import React from "react";
import ReactDOM from "react-dom";
import { SSL_OP_PKCS1_CHECK_1 } from "constants";

class App extends React.Component {
    render() {
        return (
            <h1>Hello, world!</h1>
        );
    }
}

var el = document.getElementById("root");
ReactDOM.render(<App />, el);