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
import UpdateUserComponents from "../components/admin-panel/pages/users/UpdateUserComponents";
import ManageCategory from "../components/admin-panel/pages/category/ManageCategory";
import AddProduct from "../components/admin-panel/pages/product/AddProduct";
import ShowProduct from "../components/admin-panel/pages/product/ShowProduct";
import ProductDetailsPage from "../components/pages/product/ProductDetailsPage";

function WebRouter() {
    return (
        <Routes>
            <Route path="/" element={<HomeComponents/>}/>
            <Route path="/about" element={<AboutComponents/>}/>
            <Route path="/login" element={<LoginComponents/>}/>
            <Route path="/register" element={<RegisterComponents/>}/>
            <Route path="/product-details/:id" element={<ProductDetailsPage/>}/>

            <Route path="/password-reset" element={<PasswordReset/>}/>
            <Route path="/reset-confirm/:token" element={<PasswordResetConfirm/>}/>


            <Route element={<RouteMiddleware/>}>
                <Route path="/admin" element={<DashboardComponents/>}/>
                <Route path="/update-profile/:id" element={<UpdateUserComponents/>}/>
                <Route element={<RoleMiddleware/>}>
                    <Route path="/users" element={<UsersComponents/>}/>
                    <Route path="/manage-category" element={<ManageCategory/>}/>
                    <Route path="/add-product" element={<AddProduct/>}/>
                    <Route path="/show-products" element={<ShowProduct/>}/>


                </Route>

            </Route>

            <Route path="*" element={<PageNotFound/>}/>

        </Routes>
    );
}

export default WebRouter;