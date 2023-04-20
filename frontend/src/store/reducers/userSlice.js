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
        addUser: builder.mutation({
            query: (body) => ({
                url: '/user',
                method: 'POST',
                body,
            })
        })
    }),
});
export const {useGetUserQuery, useAddUserMutation} = userSliceApi;

