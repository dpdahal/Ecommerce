import React from "react";
import FrontendHeader from "../../layouts/FrontendHeader";
import FrontendMenu from "../../layouts/FrontendMenu";
import FrontendFooter from "../../layouts/FrontendFooter";
import {useGetAllProductsQuery} from "../../../store/reducers/productSlice";
import {Link} from "react-router-dom";

function HomeComponents() {
    const {data, error, isLoading} = useGetAllProductsQuery();

    console.log(document.cookie);

    if (isLoading) {
        return (
            <React.Fragment>
                <FrontendHeader/>
                <FrontendMenu/>
                <h1>Loading.....</h1>
                <FrontendFooter/>
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <FrontendHeader/>
            <FrontendMenu/>
            <div className="container">
                <div className="row">
                    <div className="col-md-12 mt-5 mb-3">
                        <h1>Product List</h1>
                    </div>
                </div>
                <div className="row">
                    {data && data.map((product, index) => (
                        <div className="col-md-4 mb-3" key={index}>
                            <div className="card">
                                <img src={product.images[0]} className="card-img-top"
                                       height="180" alt="..."/>
                                <div className="card-body">
                                    <h5 className="card-title">{product.product_name}</h5>
                                    <hr/>
                                    <p className="card-text">Price: {product.price}
                                     Category: {product.categoryId.name}
                                    </p>
                                    <p className="card-text">{product.description}</p>
                                    <Link to={`/product-details/${product._id}`} className="btn btn-primary">Product Details</Link>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
            <FrontendFooter/>
        </React.Fragment>
    )
}

export default HomeComponents