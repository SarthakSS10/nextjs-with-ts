import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { userApi } from "./userApi";
import { getArtistData} from './artistApi'
import { getAlbumData} from './albumApi'
import thunk from 'redux-thunk'
import userSlice from './userSlice'



export const makeStore = () =>
  configureStore({
    reducer: {
        userList: userSlice,
      [userApi.reducerPath]: userApi.reducer,
      [getArtistData.reducerPath]:getArtistData.reducer,
      [getAlbumData.reducerPath]:getAlbumData.reducer,



    },
    middleware: (gDM) => gDM().concat([userApi.middleware,getArtistData.middleware,getAlbumData.middleware]),
    // middleware: [thunk],

  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });