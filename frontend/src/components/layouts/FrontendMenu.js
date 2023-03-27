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
                        <li><Link to="/">Services</Link></li>
                        <li><Link to="/">Portfolio</Link></li>
                        <li><Link to="/">Contact</Link></li>
                    </ul>
                </div>

            </div>
        </React.Fragment>
    )
}

export default FrontendMenu;