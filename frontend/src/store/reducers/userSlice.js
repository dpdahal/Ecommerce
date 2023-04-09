import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const userSliceApi = createApi({
    reducerPath: 'userSliceApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8000/'}),
    endpoints: (builder) => ({
        getUser: builder.query({
            query: () => 'user',
        }),
        addUser: builder.mutation({
            query: (body) => ({
                url: 'user',
                method: 'POST',
                body,
            })
        })
    }),
});
export const {useGetUserQuery, useAddUserMutation} = userSliceApi;

