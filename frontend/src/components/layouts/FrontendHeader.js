import React from "react";
import {Link} from "react-router-dom";

function FrontendHeader() {
    return (
        <React.Fragment>
            <div className="top-header">
                <div className="container">
                    <div className="top-header-container">
                        <div className="top-header-left">
                            <ul>
                                <li><Link to="/">info@mern.com.np</Link></li>
                                <li><Link to="/">phone: +9876547654</Link></li>
                            </ul>
                        </div>
                        <div className="top-header-right">
                            <ul>
                                <li><Link to="/login">login</Link></li>
                                <li><Link to="/register">Register</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="header">
                <div className="container">
                    <div className="header-container">
                        <div className="logo">
                            <Link to="/"><img src="https://cdn.logo.com/hotlink-ok/logo-social.png" alt=""/></Link>
                        </div>
                        <div className="company-name">
                            <h1>Company Name</h1>
                        </div>
                        <div className="social-icons">
                            <ul>
                                <li><a href="#"><i className="bi bi-facebook"></i></a></li>
                                <li><a href="#"><i className="bi bi-twitter"></i></a></li>
                                <li><a href="#"><i className="bi bi-instagram"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>

    )
}

export default FrontendHeader