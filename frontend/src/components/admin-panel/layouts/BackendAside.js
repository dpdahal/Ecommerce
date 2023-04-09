import React from "react";
import {useGetLoginUserQuery} from "../../../store/reducers/authSlice";

function BackendAside() {
    let token = localStorage.getItem('token') ?? '';
    let {data, isLoading} = useGetLoginUserQuery(token);
    if (!isLoading) {
        return (
            <React.Fragment>
                <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-body-tertiary sidebar collapse">
                    <div className="position-sticky pt-3 sidebar-sticky">
                        <div className="test">
                            <div className="d-flex flex-column align-items-center text-center">
                                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin"
                                     className="rounded-circle" width={80}/>
                                <div className="mt-3">
                                    <h4>{data.user.name}</h4>
                                </div>
                            </div>
                        </div>
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">
                                    <span data-feather="home" className="align-text-bottom"/>
                                    Dashboard
                                </a>
                            </li>

                        </ul>

                    </div>
                </nav>
            </React.Fragment>
        )
    }
}

export default BackendAside;