import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from "next-redux-wrapper";


export const getArtistData = createApi({
    reducerPath: 'getArtistData',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
    tagTypes: ['Artists'],
    extractRehydrationInfo(action, { reducerPath }) {
      if (action.type === HYDRATE) {
        return action.payload[reducerPath];
      }
    },
    endpoints: (builder) => ({
     
        fetchArtist: builder.query({
        query: () => ('/artist/get'),
        providesTags:['Artists']

      }), 
      addArtist: builder.mutation({
        query: (val) => ({
          url: "/artist/add",
          method: "POST",
          body: {name:val}
        }),
        invalidatesTags:['Artists']

      }),
      editArtist: builder.mutation({
        query: (val) => ({
          url: `/artist/update/${val.uid}`,
          method: "PATCH",
          body: {name:val.name}
        }),
        invalidatesTags:['Artists']

      }),
      deleteArtist: builder.mutation({
        query: (id) => ({
          url: `/artist/delete/${id}`,
          method: "DELETE"
        }),
        invalidatesTags:['Artists']

      })
    }),
  });
  
  export const {
    useFetchArtistQuery,
    useDeleteArtistMutation,
    useEditArtistMutation,
    useAddArtistMutation,
    util: { getRunningOperationPromises },

  } = getArtistData;


  export const { fetchArtist } = getArtistData.endpoints;
  