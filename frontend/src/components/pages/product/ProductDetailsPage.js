import FrontendHeader from "../../layouts/FrontendHeader";
import FrontendMenu from "../../layouts/FrontendMenu";
import FrontendFooter from "../../layouts/FrontendFooter";
import React, {useEffect} from "react";
import {useGetProductByIdQuery} from "../../../store/reducers/productSlice";
import {useParams} from "react-router-dom";
import OrderComponents from "../../layouts/OrderComponents";

function ProductDetailsPage() {
    let {id} = useParams();
    const {data, error, isLoading} = useGetProductByIdQuery(id);
    const [quantity, setQuantity] = React.useState(1);
    const [quantityError, setQuantityError] = React.useState(false);

    useEffect(() => {
        if (quantity < 1) {
            setQuantityError("Quantity must be greater than 0");
        } else if (quantity > data?.quantity) {
            setQuantityError("Quantity must be less than or equal to " + data?.quantity);
        } else {
            setQuantityError(false);
        }


    });

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

    // set cookie
    document.cookie = `category=${data.categoryId.name}; path=/; expires=Thu, 18 Dec 2023 12:00:00 UTC;`


    return (
        <React.Fragment>
            <FrontendHeader/>
            <FrontendMenu/>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <h1>Product Details</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <img src={data.images[0]} className="card-img-top" height="180" alt="..."/>
                        <div className="row">
                            {data.images.map((image, index) => (
                                <div className="col-md-4 mt-2" key={index}>
                                    <img src={image} className="card-img-top" height="80" alt="..."/>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-md-8">
                        <h5 className="card-title">{data.product_name}</h5>
                        <hr/>
                        <p className="card-text">Price: {data.price}
                            Category: {data.categoryId.name}
                        </p>
                        <p className="card-text">{data.description}</p>
                        <hr/>
                        <p className="card-text">Quantity</p>
                        {quantityError && (
                            <div className="alert alert-danger" role="alert">
                                {quantityError}
                            </div>
                        )}
                        <input type="number" value={quantity}
                               onChange={(e) => setQuantity(e.target.value)}/>


                        <OrderComponents productId={data._id} userId={data.userId} quantity={quantity}/>
                    </div>

                </div>

            </div>

            <FrontendFooter/>
        </React.Fragment>
    );

}

export default ProductDetailsPage;