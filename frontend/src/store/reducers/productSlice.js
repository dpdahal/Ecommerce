import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';


export const productSliceApi = createApi({
    reducerPath: 'productSliceApi',
    tagTypes: ['Product'],
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8000/'}),
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: () => ({
                url: '/product',
                method: 'GET',
            }),
            providesTags: ['Product'],
        }),
        getProductById: builder.query({
            query: (id) => ({
                url: `/product/${id}`,
                method: 'GET',
            }),
            providesTags: ['Product'],
        }),
        addProduct: builder.mutation({
            query: (body) => ({
                url: '/product',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Product'],
        }),
        updateProduct: builder.mutation({
            query: (body) => ({
                url: `/product/${body.get('id')}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Product'],
        }),

        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/product/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Product'],
        }),

    })
})

export const {
    useGetAllProductsQuery,
    useGetProductByIdQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productSliceApi;




