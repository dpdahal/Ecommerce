import {Outlet} from "react-router-dom";
import {useGetLoginCheckQuery} from "../../store/reducers/authSlice";
import "../../scss/style.css";

function RouteMiddleware() {
    let token = localStorage.getItem('token') ?? '';
    let {data, isLoading} = useGetLoginCheckQuery(token);
    if (!isLoading) {
        if (data.success) {
            return (
                <Outlet/>
            );
        } else {
            window.location.href = "/";
        }
    }
}

export default RouteMiddleware;