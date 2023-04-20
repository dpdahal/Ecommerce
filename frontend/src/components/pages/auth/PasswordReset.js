import React from "react";
import * as yup from 'yup';
import FrontendHeader from "../../layouts/FrontendHeader";
import FrontendMenu from "../../layouts/FrontendMenu";
import FrontendFooter from "../../layouts/FrontendFooter";
import {useResetPasswordMutation} from "../../../store/reducers/authSlice";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import Swal from "sweetalert2";

let resetSchema = yup.object().shape({
    email: yup.string().required(),
});

function PasswordReset() {

    const [resetUserPassword] = useResetPasswordMutation();
    const {reset, register,setError, handleSubmit, formState: {errors}} =
        useForm({
            resolver: yupResolver(resetSchema)
        });

    let pStyle = {
        color: "#f60000",
    }

    let resetForm = (data) => {
        resetUserPassword(data).unwrap().then((response) => {
            if (response.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: response.success,
                })
                reset();
            } else {
                if (response.error) {
                    if (response.error.email) {
                        setError("email", {
                            type: "manual",
                            message: response.error.email
                        })
                    }

                }

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
                        <h1>Password Reset</h1>
                        <hr/>
                        <form action="" onSubmit={handleSubmit(resetForm)}>
                            <div className="form-group mb-4">
                                <label htmlFor="email">Email:
                                    {errors.email && <a style={pStyle}>{errors.email.message}</a>}
                                </label>
                                <input type="email"
                                       {...register("email")}
                                       name="email" id="email" className="form-control"/>
                            </div>

                            <div className="form-group mb-4">
                                <button className="btn btn-success">Send</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <FrontendFooter/>
        </React.Fragment>
    )
}

export default PasswordReset