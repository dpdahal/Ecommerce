import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';


export const authSliceApi = createApi({
    reducerPath: 'authSliceApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8000/'}),
    endpoints: (build) => ({
        getLoginCheck: build.query({
            query: (token) => ({
                url: 'auth/',
                method: 'GET',
                headers: {
                    authorization: token,
                }
            }),

        }),
        getLoginUser: build.query({
            query: (token) => ({
                url: 'auth/login-user',
                method: 'GET',
                headers: {
                    authorization: token,
                }
            }),
        }),
        loginUser: build.mutation({
            query: (body) => ({
                url: 'auth/',
                method: 'POST',
                body,
            })
        })
    })
});

export const {
    useGetLoginCheckQuery,
    useGetLoginUserQuery,
    useLoginUserMutation
} = authSliceApi;