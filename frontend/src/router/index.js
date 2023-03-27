import * as React from "react";
import {Routes, Route} from "react-router-dom";
import HomeComponents from "../components/pages/home/HomeComponents";
import AboutComponents from "../components/pages/about/AboutComponents";
import PageNotFound from "../components/error/PageNotFound";

function WebRouter() {
    return (
        <Routes>
            <Route path="/" element={<HomeComponents/>}/>
            <Route path="/about" element={<AboutComponents/>}/>
            <Route path="*" element={<PageNotFound/>}/>

        </Routes>
    );
}

export default WebRouter;