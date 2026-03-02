import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const getApiCall = createApi({
    reducerPath: 'getApiCall',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://7013-103-26-80-162.ngrok-free.app/api/' }),
    endpoints: (builder) => ({
        getData: builder.query({
            query: (id) => ({
                url: `conversations/${id}`,
                method: 'Get'
            })
        }),
        getMessage: builder.query({
            query: (payload) => ({
                url: `chats/getMessages?senderId=${payload.senderId}&receiverId=${payload.receiverId}`,
                method: 'Get'
            })
        }),
        sendData: builder.mutation({
            query: (data) => ({
                url: 'chats/sendMessage/',
                method: 'POST',
                body: data
            })
        })
    })
})

// http://192.168.1.11:3007/api/chats/getMessages?senderId=667976aa29428f5d4f02f79d&receiverId=667976aa29428f5d4f02f79c

export const { useGetDataQuery, useGetMessageQuery, useSendDataMutation } = getApiCall;