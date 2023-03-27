import React from "react";
import FrontendHeader from "../../layouts/FrontendHeader";
import FrontendMenu from "../../layouts/FrontendMenu";
import FrontendFooter from "../../layouts/FrontendFooter";

function AboutComponents() {
    return (
        <React.Fragment>
            <FrontendHeader/>
            <FrontendMenu/>
            <h1>About Components</h1>
            <FrontendFooter/>
        </React.Fragment>
    )
}

export default AboutComponents