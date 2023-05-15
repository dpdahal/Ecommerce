import React, {useEffect} from "react";
import BackendHeader from "../../layouts/BackendHeader";
import BackendAside from "../../layouts/BackendAside";
import {usePaginateProductsQuery} from "../../../../store/reducers/productSlice";
import Pagination from "../../layouts/Pagination";

function ShowProduct() {
    const [page, setPage] = React.useState(1);
    const sendData = {
        page, perPage: 5
    }
    const jsonSendData = JSON.stringify(sendData);
    const {data, error, isLoading} = usePaginateProductsQuery(jsonSendData);


    if (isLoading) {
        return (<React.Fragment>
            <BackendHeader/>
            <BackendAside/>
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <div className="row">
                    <h1>Loading Product</h1>
                </div>
            </main>
        </React.Fragment>)

    }

    let totalData = [];
    let total = data.totalProducts ?? 0;
    for (let i = 0; i < parseInt(total) / 5; i++) {
        totalData.push(i);
    }

    const handlePagination = (page) => {
        sendData.page = page;
        setPage(page);
    }

    const nextPage = () => {
        if (page < totalData.length) {
            setPage(page + 1);
        }
    }

    const prevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    let key1 = 1;
    if (page > 1) {
        key1 = page * 5 - 4;
    }


    return (<React.Fragment>
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
                        {data && data.products.map((product, index) => (<tr key={index}>
                            <td>{key1++}</td>
                            <td>{product.product_name}</td>
                            <td>{product.price}</td>
                            <td>{product.quantity}</td>
                            <td>{product.categoryId.name}</td>
                            <td><img src={product.images[0]} alt="" width="80"/></td>
                            <td>
                                <a href="#" className="btn btn-sm btn-primary">Edit</a>
                                <a href="#" className="btn btn-sm btn-danger">Delete</a>
                            </td>
                        </tr>))}
                        </tbody>
                    </table>

                </div>
                <div className="col-md-12">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            {page > 1 ?
                                <li className="page-item">
                                    <a className="page-link"
                                       onClick={() => prevPage()}
                                       href="#">Previous</a>
                                </li>
                                : ''
                            }
                            {totalData.map((item, index) => (
                                <li key={index} className="page-item">
                                    {index === page - 1 ?
                                        <a className="page-link active"
                                           href="#">{index + 1}
                                        </a>
                                        :
                                        <a className="page-link"
                                           onClick={() => handlePagination(index + 1)}
                                           href="#">{index + 1}
                                        </a>
                                    }

                                </li>
                            ))}

                            {page < totalData.length ?
                                <li className="page-item">
                                    <a className="page-link"
                                       onClick={() => nextPage()}
                                       href="#">Next</a>
                                </li>
                                : ''
                            }


                        </ul>
                    </nav>
                </div>
            </div>


        </main>
    </React.Fragment>)


}

export default ShowProduct;