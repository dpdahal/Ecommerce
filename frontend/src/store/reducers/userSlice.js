import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const userSliceApi = createApi({
    reducerPath: 'userSliceApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8000/'}),
    endpoints: (builder) => ({
        getUser: builder.query({
            query: (token) => ({
                url: '/user',
                method: 'GET',
                headers: {
                    authorization: token,
                }
            }),

        }),
        getById: builder.query({
            query: (id) => ({
                url: `/user/${id}`,
                method: 'GET',
            }),
        }),
        addUser: builder.mutation({
            query: (body) => ({
                url: '/user',
                method: 'POST',
                body,
            })
        }),

        updateUser: builder.mutation({
            query: (body) => ({
                url: `/user/${body.get('id')}`,
                method: 'PUT',
                body,

            })
        })
    }),
});
export const {
    useGetUserQuery,
    useGetByIdQuery,
    useAddUserMutation,
    useUpdateUserMutation,
} = userSliceApi;

