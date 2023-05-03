import React from "react";
import BackendHeader from "../../layouts/BackendHeader";
import BackendAside from "../../layouts/BackendAside";
import {useGetAllOrdersQuery} from "../../../../store/reducers/orderSlice";
import {useGetLoginUserQuery} from "../../../../store/reducers/authSlice";

function OrderList() {
    let token = localStorage.getItem('token') ?? '';
    const {data: orders, isLoading, error} = useGetAllOrdersQuery(token);
    let {data:users} = useGetLoginUserQuery(token);
    if (isLoading) {
        return (
            <React.Fragment>
                <BackendHeader/>
                <BackendAside/>
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <div
                        className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h1 className="h2">Order list</h1>
                        <div className="btn-toolbar mb-2 mb-md-0">
                        </div>
                    </div>
                    <div className="col-md-12">
                        <h1>Loading................</h1>
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
                    <h1 className="h2">Order list</h1>
                    <div className="btn-toolbar mb-2 mb-md-0">
                    </div>
                </div>
                <div className="col-md-12">
                    <table className="table table-striped table-sm">
                        <thead>
                        <tr>
                            <th>Order ID</th>
                            {users.user.role==='admin' ? <th>Customer Name</th> : ''}
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.map((order, index) => {
                            return (
                                <tr key={index}>
                                    <td>{++ index}</td>
                                    {users.user.role==='admin' ? <td>{order.userId.name}</td> : ''}
                                    <td>{order.productId.product_name}</td>
                                    <td>{order.quantity}</td>
                                    <td>
                                        <button className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                        }
                        </tbody>
                    </table>

                </div>
            </main>
        </React.Fragment>
    )
}

export default OrderList;