import {Link} from "react-router-dom";
import React from "react";

function FrontendMenu() {
    return (
        <React.Fragment>
            <div className="menu">
                <div className="container">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                    </ul>
                </div>

            </div>
        </React.Fragment>
    )
}

export default FrontendMenu;