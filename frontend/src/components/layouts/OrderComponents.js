import {useGetLoginCheckQuery} from "../../store/reducers/authSlice";

function OrderComponents({productId, quantity}) {
    let token = localStorage.getItem('token') ?? '';
    let {data, isLoading} = useGetLoginCheckQuery(token);
    let userId = data?.user?._id ?? '';
    let userRole = data?.user?.role ?? '';
    console.log(quantity)
    return (
        <div className="mt-2">
            {userRole === 'admin' ? (
                <button className="btn btn-success" disabled>Admin can't order</button>
            ) : (
                <div>

                    {userId ? (
                        <button className="btn btn-success">Order Now</button>
                    ) : (
                        <button className="btn btn-success" disabled>Login to Order</button>
                    )}
                </div>
            )}
        </div>
    )
}

export default OrderComponents;