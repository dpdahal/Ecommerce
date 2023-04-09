import * as React from "react";
import {Routes, Route} from "react-router-dom";
import HomeComponents from "../components/pages/home/HomeComponents";
import AboutComponents from "../components/pages/about/AboutComponents";
import PageNotFound from "../components/error/PageNotFound";
import LoginComponents from "../components/pages/auth/LoginComponents";
import DashboardComponents from "../components/admin-panel/pages/dashboard/DashboardComponents";
import RouteMiddleware from "../components/middleware/RouteMiddleware";

function WebRouter() {
    return (
        <Routes>
            <Route path="/" element={<HomeComponents/>}/>
            <Route path="/about" element={<AboutComponents/>}/>
            <Route path="/login" element={<LoginComponents/>}/>

            <Route element={<RouteMiddleware/>}>
                <Route path="/admin" element={<DashboardComponents/>}/>
            </Route>

            <Route path="*" element={<PageNotFound/>}/>

        </Routes>
    );
}

export default WebRouter;