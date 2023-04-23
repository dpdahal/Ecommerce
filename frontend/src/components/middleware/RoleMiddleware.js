import {Outlet} from "react-router-dom";
import {useGetLoginCheckQuery} from "../../store/reducers/authSlice";

function RoleMiddleware() {
    let token = localStorage.getItem('token') ?? '';
    let {data, isLoading} = useGetLoginCheckQuery(token);
    if (!isLoading) {
        if (data.user.role !== 'admin') {
            window.location.href = "/admin";
        }
        if (data.success) {
            return (
                <Outlet/>
            );
        }
    }
}

export default RoleMiddleware;