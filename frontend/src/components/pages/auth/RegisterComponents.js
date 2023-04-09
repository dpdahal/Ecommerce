import React from "react";
import * as yup from 'yup';
import {useState} from "react";
import FrontendHeader from "../../layouts/FrontendHeader";
import FrontendMenu from "../../layouts/FrontendMenu";
import FrontendFooter from "../../layouts/FrontendFooter";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import Swal from "sweetalert2";

let registerSchema = yup.object().shape({
    name: yup.string().required(),
    username: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required(),
    password_confirmation: yup.string().required().oneOf([yup.ref('password'), null], 'Passwords must match'),
    gender: yup.string().required(),
    course: yup.array().required(),
    country: yup.string().required(),
});

function RegisterComponents() {
    const {setValue,register, handleSubmit, formState: {errors}} =
        useForm({
            resolver: yupResolver(registerSchema)
        });
    let pStyle = {
        color: "#f60000",
    }
    let registerNewAccount= (data) => {
        console.log(data);

    }



    return (
        <React.Fragment>
            <FrontendHeader/>
            <FrontendMenu/>
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-12 mb-3">
                        <h1>Register</h1>
                    </div>
                    <div className="col-md-12">
                        <form action="" onSubmit={handleSubmit(registerNewAccount)}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group mb-3">
                                        <label htmlFor="name">Name:
                                            {errors.name && <a style={pStyle}>{errors.name.message}</a>}
                                        </label>
                                        <input type="text" name="name"
                                               {...register("name")}
                                               id="name" className="form-control"/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-3">
                                        <label htmlFor="username">Username:
                                            {errors.username && <a style={pStyle}>{errors.username.message}</a>}
                                        </label>
                                        <input type="text" name="username"
                                               {...register("username")}
                                               id="username" className="form-control"/>
                                    </div>
                                </div>

                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="email">Email:
                                    {errors.email && <a style={pStyle}>{errors.email.message}</a>}
                                </label>
                                <input type="email" name="email"
                                       {...register("email")}
                                       id="email" className="form-control"/>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group mb-3">
                                        <label htmlFor="password">Password:
                                            {errors.password && <a style={pStyle}>{errors.password.message}</a>}
                                        </label>
                                        <input type="password" name="password"
                                               {...register("password")}
                                               id="password" className="form-control"/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-3">
                                        <label htmlFor="password_confirmation">Password Confirmation:
                                            {errors.password_confirmation && <a style={pStyle}>{errors.password_confirmation.message}</a>}
                                        </label>
                                        <input type="password"
                                               {...register("password_confirmation")}
                                               name="password_confirmation" id="password_confirmation"
                                               className="form-control"/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-3">
                                        <label htmlFor="gender">Gender:
                                            {errors.gender && <a style={pStyle}>{errors.gender.message}</a>}
                                        </label> <br/>
                                        <label> <input type="radio"
                                                       {...register("gender")}
                                                       name="gender" value="male"/> Male </label>
                                        <label> <input type="radio"
                                                       {...register("gender")}
                                                       name="gender" value="female"/> Female </label>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-3">
                                        <label>Course</label>
                                        {errors.course && <a style={pStyle}>{errors.course.message}</a>}<br/>
                                        <label> <input type="checkbox" name="course" value="nodejs"  {...register("course")} /> Nodejs </label>
                                        <label> <input type="checkbox" name="course" value="python" {...register("course")} /> Python </label>
                                        <label> <input type="checkbox"  name="course" value="java"{...register("course")} /> Java </label>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-3">
                                        <label htmlFor="country">Country:
                                            {errors.country && <a style={pStyle}>{errors.country.message}</a>}
                                        </label>
                                        <select name="country" {...register("country")} id="country" className="form-control">
                                            <option value="">Select Country</option>
                                            <option value="nepal">Nepal</option>
                                            <option value="china">China</option>
                                            <option value="india">India</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">

                                    <div className="form-group mb-3">
                                        <label htmlFor="image">Image:
                                        </label>
                                        <input type="file" name="image"
                                               onChange={(e) => {setValue("image", e.target.files[0])}}
                                               id="image" className="form-control"/>
                                    </div>
                                </div>
                            </div>


                            <div className="form-group mb-3">
                                <button className="btn btn-success"> Add Record</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>


            <FrontendFooter/>

        </React.Fragment>)

}

export default RegisterComponents