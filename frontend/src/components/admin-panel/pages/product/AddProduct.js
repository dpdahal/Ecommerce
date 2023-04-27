import React, {useEffect, useState} from "react";
import BackendHeader from "../../layouts/BackendHeader";
import BackendAside from "../../layouts/BackendAside";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useGetCategoriesQuery} from "../../../../store/reducers/categorySlice";
import {useAddProductMutation} from "../../../../store/reducers/productSlice";

import Swal from "sweetalert2";

let categorySchema = yup.object().shape({
    category: yup.string().required(),
    product_name: yup.string().required(),
    slug: yup.string().required(),
    price: yup.number().required(),
    quantity: yup.number().required(),
    description: yup.string().required(),
});

function AddProduct() {
    const {setValue, register, setError, handleSubmit, reset, formState: {errors}} = useForm({
        resolver: yupResolver(categorySchema)
    });
    let pStyle = {
        color: "#f60000",
    }

    const {data, isLoading, error} = useGetCategoriesQuery();
    const [addProduct, {isSuccess}] = useAddProductMutation();

    const addData = (data) => {
        let sendData = new FormData();
        sendData.append("categoryId", data.category);
        sendData.append("product_name", data.product_name);
        sendData.append("slug", data.slug);
        sendData.append("price", data.price);
        sendData.append("discount", data.discount);
        sendData.append("quantity", data.quantity);
        sendData.append("description", data.description);
        if (data.images) {
            Object.values(data.images).forEach(file => {
                sendData.append("images", file);
            });
        }

        addProduct(sendData).then((res) => {
            if (res.data.success) {
                Swal.fire({
                    title: "Success!",
                    text: "Product Added Successfully",
                    icon: "success",
                    confirmButtonText: "Ok",
                }).then(() => {
                    reset();
                });
            }
        });
    }


    if (isLoading) return <div>Loading...</div>

    return (
        <React.Fragment>
            <BackendHeader/>
            <BackendAside/>
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <div
                    className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">Add Product</h1>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <form action="" onSubmit={handleSubmit(addData)}>
                            <div className="form-group mb-3">
                                <label htmlFor="category_id">Category:
                                    {errors.category_id && <a style={pStyle}>{errors.category_id.message}</a>}
                                </label>
                                <select className="form-control" name="category" id="category_id"
                                        {...register("category")}>
                                    <option value="">Select Category</option>
                                    {data && data.map((category, index) => (
                                        <option key={index} value={category._id}>{category.name}</option>
                                    ))}


                                </select>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group mb-3">
                                        <label htmlFor="name">Product Name:
                                            {errors.product_name && <a style={pStyle}>{errors.product_name.message}</a>}
                                        </label>
                                        <input type="text" name="product_name" className="form-control" id="name"
                                               {...register("product_name")}/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-3">
                                        <label htmlFor="slug">Slug:
                                            {errors.slug && <a style={pStyle}>{errors.slug.message}</a>}
                                        </label>
                                        <input type="text" name="slug" className="form-control" id="slug"
                                               {...register("slug")}/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-3">
                                        <label htmlFor="price">Price:
                                            {errors.price && <a style={pStyle}>{errors.price.message}</a>}
                                        </label>
                                        <input type="number" name="price" className="form-control" id="price"
                                               {...register("price")}/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-3">
                                        <label htmlFor="discount">Discount Price:
                                            {errors.discount && <a style={pStyle}>{errors.discount.message}</a>}
                                        </label>
                                        <input type="number" name="discount" className="form-control" id="discount"
                                               {...register("discount")}/>
                                    </div>

                                </div>
                            </div>


                            <div className="form-group mb-3">
                                <label htmlFor="quantity">Quantity:
                                    {errors.quantity && <a style={pStyle}>{errors.quantity.message}</a>}
                                </label>
                                <input type="number" name="quantity" className="form-control" id="quantity"
                                       {...register("quantity")}/>
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="description">Description:
                                    {errors.description && <a style={pStyle}>{errors.description.message}</a>}
                                </label>
                                <textarea className="form-control" name="description" id="description"
                                          {...register("description")}
                                          placeholder="Enter Description"/>
                            </div>

                            <div className="form-group mb-3">
                                <label htmlFor="image">Image:
                                    {errors.image && <a style={pStyle}>{errors.image.message}</a>}
                                </label>
                                <input type="file" name="images" className="form-control" id="image"
                                       multiple
                                       onChange={(e) => {
                                           setValue("images", e.target.files)
                                       }}
                                       placeholder="Enter Image"/>
                            </div>
                            <button type="submit" className="btn btn-primary">Add Product</button>

                        </form>

                    </div>
                </div>


            </main>
        </React.Fragment>
    )


}

export default AddProduct;