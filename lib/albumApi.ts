import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from "next-redux-wrapper";


export const getAlbumData = createApi({
    reducerPath: 'getAlbumData',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
          return action.payload[reducerPath];
        }
      },
    tagTypes: ['Albums'],
    endpoints: (builder) => ({
     
        fetchAlbum: builder.query({
        query: () => ('/album/get'),
        providesTags:['Albums']

      }), 
      addAlbum: builder.mutation({
        query: (val) => ({
          url: "/album/add",
          method: "POST",
          body: {name:val.name,artist:val.artist,url:val.url}
        }),
        invalidatesTags:['Albums']

      }),
      editAlbum: builder.mutation({
        query: (val) => ({
          url: `/album/update/${val.uid}`,
          method: "PATCH",
          body: {name:val.name}
        }),
        invalidatesTags:['Albums']

      }),
      deleteAlbum: builder.mutation({
        query: (id) => ({
          url: `/album/delete/${id}`,
          method: "DELETE"
        }),
        invalidatesTags:['Albums']

      })
    }),
  });
  
  export const {
    useFetchAlbumQuery,
    useAddAlbumMutation,
    useDeleteAlbumMutation,
    useEditAlbumMutation,
    util: { getRunningOperationPromises },

  } = getAlbumData;

  export const { fetchAlbum } = getAlbumData.endpoints;
  