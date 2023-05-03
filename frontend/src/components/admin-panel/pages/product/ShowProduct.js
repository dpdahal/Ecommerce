import React, {useEffect} from "react";
import BackendHeader from "../../layouts/BackendHeader";
import BackendAside from "../../layouts/BackendAside";
import {usePaginateProductsQuery} from "../../../../store/reducers/productSlice";
import Pagination from "../../layouts/Pagination";

function ShowProduct() {
    const {data, error, isLoading} = usePaginateProductsQuery(1, 10);

    if (isLoading) {
        return (
            <React.Fragment>
                <BackendHeader/>
                <BackendAside/>
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <div className="row">
                        <h1>Loading Product</h1>
                    </div>
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
                    <h1 className="h2">Show List</h1>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <table className="table table-hover">
                            <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Category</th>
                                <th>Image</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data && data.map((product, index) => (
                                <tr key={index}>
                                    <td>{++index}</td>
                                    <td>{product.product_name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.categoryId.name}</td>
                                    <td><img src={product.images[0]} alt="" width="80"/></td>
                                    <td>
                                        <a href="#" className="btn btn-sm btn-primary">Edit</a>
                                        <a href="#" className="btn btn-sm btn-danger">Delete</a>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                    </div>
                    <div className="col-md-12">
                        <Pagination/>
                    </div>
                </div>


            </main>
        </React.Fragment>
    )


}

export default ShowProduct;