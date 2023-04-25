import React, {useEffect} from "react";
import BackendHeader from "../../layouts/BackendHeader";
import BackendAside from "../../layouts/BackendAside";
import {useGetByIdQuery, useUpdateUserMutation} from "../../../../store/reducers/userSlice";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useParams} from "react-router-dom";
import Swal from "sweetalert2";


let registerSchema = yup.object().shape({
    name: yup.string().required(),
    username: yup.string().required(),
    email: yup.string().required(),
    gender: yup.string().required(),
    language: yup.array().required(),
    country: yup.string().required(),
});

function UpdateUserComponents() {
    const {setValue, register, setError, handleSubmit, reset, formState: {errors}} = useForm({
        resolver: yupResolver(registerSchema)
    });
    let params = useParams();
    let token = localStorage.getItem('token') ?? '';
    let {data, isLoading} = useGetByIdQuery(params.id);
    let [updateUser] = useUpdateUserMutation();


    let pStyle = {
        color: "#f60000",
    }

    let getAllUsers = () => {
        if (data) {
            setValue("name", data.name);
            setValue("username", data.username);
            setValue("email", data.email);
            setValue('gender', data.gender);
            setValue('language', data.language);
            setValue('country', data.country);
        }

    }


    const updateAction = (data) => {
        let sendData = new FormData();
        sendData.append('name', data.name);
        sendData.append('username', data.username);
        sendData.append('email', data.email);
        sendData.append('gender', data.gender)
        sendData.append('language', data.language)
        sendData.append('country', data.country)
        sendData.append('image', data.image)
        sendData.append('id', params.id)
        updateUser(sendData).then((res) => {
            if (res.data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: res.success,
                });

            }
        }).catch((err) => {
            if (err.error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.error,
                });
            }
        });

    }

    useEffect(() => {
        getAllUsers();
    });


    if (!data) {
        return (
            <React.Fragment>
                <BackendHeader/>
                <BackendAside/>
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <h1>Loading...</h1>
                </main>
            </React.Fragment>
        )
    }


    return (
        <React.Fragment>
            <BackendHeader/>
            <BackendAside/>
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <div
                    className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">Update Profile</h1>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <form action="" onSubmit={handleSubmit(updateAction)}>
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
                                       disabled
                                       {...register("email")}
                                       id="email" className="form-control"/>
                            </div>
                            <div className="row">
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
                                        <label>Language</label>
                                        {errors.language && <a style={pStyle}>{errors.language.message}</a>}<br/>
                                        <label> <input type="checkbox" name="language"
                                                       value="nepali"  {...register("language")} /> Nepali </label>
                                        <label> <input type="checkbox" name="language"
                                                       value="chinese" {...register("language")} /> Chinese </label>
                                        <label> <input type="checkbox" name="language"
                                                       value="hindi" {...register("language")} /> Hindi </label>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-3">
                                        <label htmlFor="country">Country:
                                            {errors.country && <a style={pStyle}>{errors.country.message}</a>}
                                        </label>
                                        <select name="country" {...register("country")} id="country"
                                                className="form-control">
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
                                               onChange={(e) => {
                                                   setValue("image", e.target.files[0])
                                               }}
                                               id="image" className="form-control"/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mb-3">
                                <button className="btn btn-success"> Update Record</button>
                            </div>
                        </form>

                    </div>
                </div>

            </main>
        </React.Fragment>
    )


}

export default UpdateUserComponents;