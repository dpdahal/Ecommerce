import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const orderSliceApi = createApi({
    reducerPath: 'orderSliceApi',
    tagTypes: ['Order'],
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8000/'}),
    endpoints: (builder) => ({
        getAllOrders: builder.query({
            query: () => ({
                url: '/order',
                method: 'GET',
            }),
            providesTags: ['Order'],
        }),
        getOrderById: builder.query({
            query: (id) => ({
                url: `/order/${id}`,
                method: 'GET',
            }),
            providesTags: ['Order'],
        }),

        addOrder: builder.mutation({
            query: (body) => ({
                url: '/order',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Order'],
        }),

        updateOrder: builder.mutation({
            query: (body) => ({
                url: `/order/${body.get('id')}`,
                method: 'PUT',
                body,
            })
        }),

        deleteOrder: builder.mutation({
            query: (id) => ({
                url: `/order/${id}`,
                method: 'DELETE',
            }),
        }),
        confirmOrder: builder.mutation({
            query: (body) => ({
                url: `/order/confirm`,
                method: 'POST',
                body,
            })
        })


    })


});

export const {
    useGetAllOrdersQuery,
    useGetOrderByIdQuery,
    useAddOrderMutation,
    useUpdateOrderMutation,
    useDeleteOrderMutation,
    useConfirmOrderMutation
} = orderSliceApi;
