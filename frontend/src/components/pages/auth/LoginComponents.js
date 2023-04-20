import React from "react";
import * as yup from 'yup';
import {useState} from "react";
import FrontendHeader from "../../layouts/FrontendHeader";
import FrontendMenu from "../../layouts/FrontendMenu";
import FrontendFooter from "../../layouts/FrontendFooter";
import {useLoginUserMutation} from "../../../store/reducers/authSlice";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import Swal from "sweetalert2";
import {Link} from "react-router-dom";

let loginSchema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
});

function LoginComponents() {

    const [loginUser] = useLoginUserMutation();
    const {register, handleSubmit, formState: {errors}} =
        useForm({
            resolver: yupResolver(loginSchema)
        });

    let pStyle = {
        color: "#f60000",
    }

    let loginForm = (data) => {
        loginUser(data).unwrap().then((response) => {
            if (response.success) {
                localStorage.setItem("token", response.token);
                window.location.href = "/admin";
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: response.error,
                })

            }
        }).catch((error) => {
            console.log(error);
        });

    }

    return (
        <React.Fragment>
            <FrontendHeader/>
            <FrontendMenu/>
            <div className="container">
                <div className="row">
                    <div className="col-md-12 mt-5">
                        <h1>Login Page</h1>
                        <hr/>
                        <form action="" onSubmit={handleSubmit(loginForm)}>
                            <div className="form-group mb-4">
                                <label htmlFor="username">Username:
                                    {errors.username && <a style={pStyle}>{errors.username.message}</a>}
                                </label>
                                <input type="text"
                                       {...register("username")}
                                       name="username" id="username" className="form-control"/>
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="password">Password:
                                    {errors.password && <a style={pStyle}>{errors.password.message}</a>}

                                </label>
                                <input type="password"
                                       {...register("password")}
                                       name="password" id="password" className="form-control"/>
                            </div>
                            <div className="form-group mb-4">
                                <input type="submit" value="Login" className="btn btn-primary"/>
                                <Link to={"/password-reset"} className="btn btn-danger float-end">Forgot Password</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <FrontendFooter/>
        </React.Fragment>
    )
}

export default LoginComponents