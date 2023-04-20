import React from "react";
import FrontendHeader from "../layouts/FrontendHeader";
import FrontendMenu from "../layouts/FrontendMenu";
import FrontendFooter from "../layouts/FrontendFooter";

function PageNotFound() {
    return (
        <React.Fragment>
            <FrontendHeader/>
            <FrontendMenu/>
            <h1>404 Page Not Found</h1>

            <FrontendFooter/>
        </React.Fragment>
    )
}

export default PageNotFound;