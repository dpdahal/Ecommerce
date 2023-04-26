import React, {useEffect} from "react";
import BackendHeader from "../../layouts/BackendHeader";
import BackendAside from "../../layouts/BackendAside";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

import Swal from "sweetalert2";

let categorySchema = yup.object().shape({
    name: yup.string().required(),
    slug: yup.string().required(),
});

function ShowProduct() {
    const {setValue, register, setError, handleSubmit, reset, formState: {errors}} = useForm({
        resolver: yupResolver(categorySchema)
    });
    let pStyle = {
        color: "#f60000",
    }



    return (
        <React.Fragment>
            <BackendHeader/>
            <BackendAside/>
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <div
                    className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">Show Product</h1>
                </div>
                <div className="row">
                    <div className="col-md-12">

                    </div>
                </div>


            </main>
        </React.Fragment>
    )


}

export default ShowProduct;