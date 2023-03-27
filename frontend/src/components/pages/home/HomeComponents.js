import React from "react";
import FrontendHeader from "../../layouts/FrontendHeader";
import FrontendMenu from "../../layouts/FrontendMenu";
import FrontendFooter from "../../layouts/FrontendFooter";

function HomeComponents() {

    return (
        <React.Fragment>
            <FrontendHeader/>
            <FrontendMenu/>
            <h1>Home Components</h1>
            <FrontendFooter/>
        </React.Fragment>
    )
}

export default HomeComponents