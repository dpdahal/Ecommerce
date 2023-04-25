import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const categorySliceApi = createApi({
    reducerPath: 'categorySliceApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8000/'}),
    tagTypes: ['Category'],
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => ({
                url: '/category',
                method: 'GET',
            }),
            providesTags: ['Category'],
        }),
        getById: builder.query({
            query: (id) => ({
                url: `/category/${id}`,
                method: 'GET',
            }),
            providesTags: ['Category'],

        }),
        addCategory: builder.mutation({
            query: (body) => ({
                url: '/category',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Category'],
        }),

        updateCategory: builder.mutation({
            query: (body) => ({
                url: `/category/${body.get('id')}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Category'],
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `/category/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Category'],

        })
    })
});

export const {
    useGetCategoriesQuery,
    useGetByIdQuery,
    useAddCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
} = categorySliceApi;


