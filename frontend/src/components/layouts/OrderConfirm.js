import React from "react";
import FrontendHeader from "./FrontendHeader";
import FrontendMenu from "./FrontendMenu";
import FrontendFooter from "./FrontendFooter";
import {useParams} from "react-router-dom";
import {useGetOrderByIdQuery, useConfirmOrderMutation} from "../../store/reducers/orderSlice";
import Swal from "sweetalert2";
import axios from "axios";

function OrderConfirm() {
    let params = useParams();
    let {data, isLoading, isError, error} = useGetOrderByIdQuery(params.id);
    let [confirmNow, {isSuccess}] = useConfirmOrderMutation();

    let productOrderConfirm = async (id, type) => {

        const data = {
            return_url: "http://localhost:3000/",
            website_url: "http://localhost:3000",
            amount: 1000,
            purchase_order_id: "test123",
            purchase_order_name: "test",
        };

        axios.post('https://a.khalti.com/api/v2/epayment/initiate/', data, {
            headers: {
                'Authorization': 'Key test_secret_key_9b0b9b5b0b9b4b9b9b0b9b4b9b9b0b9b',
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                const paymentURL = response.data.payment_url;
                let data = {id, type};
                confirmNow(data).then((res) => {
                    if (res.data.message === "cancelled") {
                        Swal.fire("Success", "Order Cancelled", "success");
                        window.location.href = "/";
                    }
                    if (res.data.message === "confirmed") {
                        window.location.replace(paymentURL);
                    }
                });

            })
            .catch(error => {
                console.log(error);
            });

    }

    if (isLoading) {
        return (<React.Fragment>
            <FrontendHeader/>
            <FrontendMenu/>
            <h1>Loading Product</h1>
        </React.Fragment>)
    }
    return (
        <React.Fragment>
            <FrontendHeader/>
            <FrontendMenu/>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card mt-4">
                            <div className="card-header">
                                <h4>Order Confirm</h4>
                            </div>
                            <div className="card-body">
                                <h1>Product Name:{data.order.productId.product_name}</h1>
                                <h1>Quantity: {data.order.quantity}</h1>

                                <button
                                    onClick={() => productOrderConfirm(data.order._id, "confirm")}

                                    className="btn btn-success">Confirm
                                </button>
                                <button
                                    onClick={() => productOrderConfirm(data.order._id, "cancel")}
                                    className="btn btn-danger">Cancel
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FrontendFooter/>
        </React.Fragment>
    )
}

export default OrderConfirm