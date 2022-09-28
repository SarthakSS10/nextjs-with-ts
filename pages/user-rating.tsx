import React, { useState, useEffect } from "react";
import UserRatings from '../components/UserRatings'
// import {fetchUser as userFetch} from '../../actions/userActions'
// import {fetchUser as albumFetch} from '../../actions/albumAction'
// import {fetchAlbum } from '../../service/albumService'
// import { fetchUser as userFetch, useFetchUserQuery } from '../../service/userService'
import {useDispatch,useSelector} from 'react-redux'
import { wrapper } from "../lib/store";
import {fetchUser,getRunningOperationPromises} from '../lib/userApi'
import {fetchAlbum,getRunningOperationPromises as getRunningOperationPromisesForAlbum  } from '../lib/albumApi'
import { fetchArtist } from "../lib/artistApi";



function UserRating({userList,albumList}) {
//   const userList = useSelector((state) => state.userList)
//   const albumList = useSelector((state) => state.albumList)

  
//   const dispatch = useDispatch()
//   useEffect(()=>{
//     // dispatch(userFetch())

//     dispatch(fetchAlbum())




//   },[dispatch])


  return (
    <div>
        {/* <UserRatings album={albumList.album} users={data && data.length > 0 ?data:[]}/> */}
        <UserRatings album={albumList?albumList.data:[]} users={userList?userList.data:[]}/>

    </div>
  )
}

export default UserRating


export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async () => {
        console.log("hiiiiii");

    //   const name = context.params?.name;
    // //   if (typeof name === "string") {
        store.dispatch(fetchAlbum.initiate(''));
        store.dispatch(fetchUser.initiate());    //   }

        let val2 = await Promise.all(getRunningOperationPromisesForAlbum());
      console.log("xssssssssssssssssssssssssss",val2[0]);
      let val = await Promise.all(getRunningOperationPromises());
      console.log("valxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",val[0]);


      
    //   JSON.parse(JSON.stringify(val[0]))
  
      return {
        props: {
            userList:val[0],
            albumList: JSON.parse(JSON.stringify(val2[0]))

        },
      };
    }
  );