import React from "react";
import loader from "./spinner.gif";

export default function Spinner() {
    return (
        <div className="text-center">
            <img src={loader} width="200px" alt="..." />
        </div>
    );
}
