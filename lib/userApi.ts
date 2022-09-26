import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

type UserResponse = User[]


export const userApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000',
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    
    fetchUser: builder.query<UserResponse, void>({
        query: () => ('/user/get'),
        providesTags:['Users']
      }),
      addUser: builder.mutation({
        query: (val) => ({
          url: "/user/add",
          method: "POST",
          body: {name:val.name,uid:val.uid},

        }),
        invalidatesTags:['Users']

      }),
      editUser: builder.mutation({
        query: (val) => ({
          url: `/user/update/${val.uid}`,
          method: "PATCH",
          body: {name:val.name},
        }),
        invalidatesTags:['Users']

      }),
      deleteUser: builder.mutation({
        query: (id) => ({
          url: `/user/delete/${id}`,
          method: "DELETE",

        }),
        invalidatesTags:['Users']

      })
  }),
  
});

// Export hooks for usage in functional components
export const {
  useFetchUserQuery,
  useAddUserMutation,
  useDeleteUserMutation,
  useEditUserMutation,
  util: { getRunningOperationPromises },
} = userApi;

// export endpoints for use in SSR
export const { fetchUser } = userApi.endpoints;