import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const userSliceApi = createApi({
    reducerPath: 'userSliceApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8000/'}),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        getUser: builder.query({
            query: (token) => ({
                url: '/user',
                method: 'GET',
                headers: {
                    authorization: token,
                }
            }),
            providesTags: ['User'],

        }),
        getById: builder.query({
            query: (id) => ({
                url: `/user/${id}`,
                method: 'GET',
            }),
            providesTags: ['User'],
        }),
        addUser: builder.mutation({
            query: (body) => ({
                url: '/user',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['User'],
        }),

        updateUser: builder.mutation({
            query: (body) => ({
                url: `/user/${body.get('id')}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['User'],
        })
    }),
});
export const {
    useGetUserQuery,
    useGetByIdQuery,
    useAddUserMutation,
    useUpdateUserMutation,
} = userSliceApi;

