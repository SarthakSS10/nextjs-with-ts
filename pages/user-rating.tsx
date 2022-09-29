import React, { useState, useEffect } from "react";
import UserRatings from "../components/UserRatings";
import { useDispatch, useSelector } from "react-redux";
import { wrapper } from "../lib/store";
import { fetchUser, getRunningOperationPromises } from "../lib/userApi";
import {
  fetchAlbum,
  getRunningOperationPromises as getRunningOperationPromisesForAlbum,
} from "../lib/albumApi";

function UserRating({
  userList,
  albumList,
}: {
  userList: any;
  albumList: any;
}) {
  return (
    <div>
      <UserRatings
        album={albumList ? albumList.data : []}
        users={userList ? userList.data : []}
      />
    </div>
  );
}

export default UserRating;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    store.dispatch(fetchAlbum.initiate());
    store.dispatch(fetchUser.initiate());

    let val1:any = await Promise.allSettled<any>([
      getRunningOperationPromises(),
      getRunningOperationPromisesForAlbum(),
    ]);

    let temp = await val1[0].value[0];
    let temp1 = await val1[1].value[0];

    return {
      props: {
        userList: temp,
        albumList: temp1,
      },
    };
  }
);
