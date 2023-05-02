import {useGetLoginCheckQuery} from "../../store/reducers/authSlice";
import {useAddOrderMutation} from "../../store/reducers/orderSlice";
import {useNavigate} from "react-router-dom";

function OrderComponents({productId, quantity}) {
    let token = localStorage.getItem('token') ?? '';
    let {data, isLoading} = useGetLoginCheckQuery(token);
    let userId = data?.user?._id ?? '';
    let userRole = data?.user?.role ?? '';
    let navigate = useNavigate();


    const [addOrder, {isSuccess, isError}] = useAddOrderMutation();

    const handleOrder = () => {
        addOrder({productId, quantity, userId}).then((res) => {
            if (res.data.success) {
                navigate('/order-confirm/' + res.data.result._id);
            }
            if (isError) {
                console.log(res);
            }
        });
    }

    return (
        <div className="mt-2">
            {userRole === 'admin' ? (
                <button className="btn btn-success" disabled>Admin can't order</button>
            ) : (
                <div>

                    {userId ? (
                        <button onClick={handleOrder} className="btn btn-success">Order Now</button>
                    ) : (
                        <button className="btn btn-success" disabled>Login to Order</button>
                    )}
                </div>
            )}
        </div>
    )
}

export default OrderComponents;