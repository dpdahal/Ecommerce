import * as React from "react";
import {Routes, Route} from "react-router-dom";
import HomeComponents from "../components/pages/home/HomeComponents";
import AboutComponents from "../components/pages/about/AboutComponents";
import PageNotFound from "../components/error/PageNotFound";
import LoginComponents from "../components/pages/auth/LoginComponents";
import DashboardComponents from "../components/admin-panel/pages/dashboard/DashboardComponents";
import RouteMiddleware from "../components/middleware/RouteMiddleware";
import RegisterComponents from "../components/pages/auth/RegisterComponents";
import PasswordReset from "../components/pages/auth/PasswordReset";
import PasswordResetConfirm from "../components/pages/auth/PasswordResetConfirm";
import UsersComponents from "../components/admin-panel/pages/users/UsersComponents";
import RoleMiddleware from "../components/middleware/RoleMiddleware";

function WebRouter() {
    return (
        <Routes>
            <Route path="/" element={<HomeComponents/>}/>
            <Route path="/about" element={<AboutComponents/>}/>
            <Route path="/login" element={<LoginComponents/>}/>
            <Route path="/register" element={<RegisterComponents/>}/>
            <Route path="/password-reset" element={<PasswordReset/>}/>
            <Route path="/reset-confirm/:token" element={<PasswordResetConfirm/>}/>


            <Route element={<RouteMiddleware/>}>
                <Route path="/admin" element={<DashboardComponents/>}/>
                <Route element={<RoleMiddleware/>}>
                    <Route path="/users" element={<UsersComponents/>}/>
                </Route>

            </Route>

            <Route path="*" element={<PageNotFound/>}/>

        </Routes>
    );
}

export default WebRouter;