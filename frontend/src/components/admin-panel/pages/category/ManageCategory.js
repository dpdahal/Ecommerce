import React, {useEffect} from "react";
import BackendHeader from "../../layouts/BackendHeader";
import BackendAside from "../../layouts/BackendAside";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {
    useAddCategoryMutation,
    useGetCategoriesQuery,
    useGetByIdQuery,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation

} from "../../../../store/reducers/categorySlice";
import Swal from "sweetalert2";

let categorySchema = yup.object().shape({
    name: yup.string().required(),
    slug: yup.string().required(),
});

function ManageCategory() {
    const {setValue, register, setError, handleSubmit, reset, formState: {errors}} = useForm({
        resolver: yupResolver(categorySchema)
    });
    let pStyle = {
        color: "#f60000",
    }
    const {data, isLoading} = useGetCategoriesQuery();
    // const {data: category} = useGetByIdQuery();
    const [addCategory, {data: addCategoryData}] = useAddCategoryMutation();
    // const [updateCategory, {data: updateCategoryData}] = useUpdateCategoryMutation();
    // const [deleteCategory, {data: deleteCategoryData}] = useDeleteCategoryMutation();

    useEffect(() => {
        console.log(data);

    });

    const insertCategory = (data) => {
        addCategory(data).then((res) => {
            if (res.data.success) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Category has been added',
                });
                reset();
            }
        });
    }


    return (
        <React.Fragment>
            <BackendHeader/>
            <BackendAside/>
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <div
                    className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">Manage Category</h1>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <form action="" onSubmit={handleSubmit(insertCategory)}>
                            <div className="form-group mb-3">
                                <label htmlFor="name">Name:
                                    {errors.name && <a style={pStyle}>{errors.name.message}</a>}
                                </label>
                                <input type="text" name="name"
                                       {...register("name")}
                                       id="name" className="form-control"/>
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="slug">Slug:
                                    {errors.slug && <a style={pStyle}>{errors.slug.message}</a>}
                                </label>
                                <input type="text" name="slug"  {...register("slug")} id="slug"
                                       className="form-control"/>
                            </div>
                            <div className="form-group mb-3">
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>

                        </form>

                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-12">
                        <table className="table table-bordered">
                            <thead>
                            <tr>
                                <th>S.n</th>
                                <th>Name</th>
                                <th>Slug</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {isLoading ? <tr>
                                    <td>Loading...</td>
                                </tr> :
                                data && data.map((category, index) => (
                                    <tr key={index}>
                                        <td>{++index}</td>
                                        <td>{category.name}</td>
                                        <td>{category.slug}</td>
                                        <td>
                                            <button className="btn btn-sm btn-primary">Edit</button>
                                            <button className="btn btn-sm btn-danger">Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>

                </div>

            </main>
        </React.Fragment>
    )


}

export default ManageCategory;