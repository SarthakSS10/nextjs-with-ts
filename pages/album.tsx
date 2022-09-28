import React ,{useState,useEffect} from 'react'
import AlbumDetail from '../components/AlbumDetail'
import AlbumTable from '../components/AlbumTable'
// import { fetchUser ,deleteUser,editUser, adduser} from '../../actions/albumAction';
// import {fetchUser as artistFetch} from '../../actions/artistAction'
// import {deleteAlbum ,addAlbum, fetchAlbum,editAlbum } from '../../service/albumService'
// import {fetchArtist as artistFetch } from '../../service/artistService'
import {useAddAlbumMutation,useDeleteAlbumMutation,useEditAlbumMutation,useFetchAlbumQuery} from '../lib/albumApi'
import { wrapper } from "../lib/store";
import {fetchArtist,getRunningOperationPromises} from '../lib/artistApi'



function Album(props) {
    const { data, error, isLoading } = useFetchAlbumQuery('')
    console.log("ddddddddddddddddddddddddddd",data);
    
    const [addAlbum , {data:userResponse,isSuccess:isUserSuccess,isError:isUserError}] = useAddAlbumMutation()
    const [deleteAlbum , {data:deleteResponse}] = useDeleteAlbumMutation()
    const [editAlbum , {data:editResponse}] = useEditAlbumMutation()

  // const [tableData,setTableData] = useState([])
  const [onFormEdit,setFormEdit] = useState(false)
  const [onEditData,setEditData] = useState({})
//   const albumList = useSelector((state) => state.albumList)
//   const artistList = useSelector((state) => state.artistList)

//   const dispatch = useDispatch()

//   const { album } = albumList
//   const { artists} = artistList

//   // const artistPresent = artistList.artists


  useEffect(()=>{
    console.log("whats1",data);
    
  

 },[data])

//  console.log("whats",users);
//  setTableData(users)

const onDelete = (id)=>{
  console.log(id);
  deleteAlbum(id)

}

const onEdit = (data)=>{
  console.log(data);
  // dispatch(editUser(id,name))
  setFormEdit(true)
  setEditData(data)

}

const userDetailFormSumit = (name,artist,isEditable,url) =>{
  console.log(name,artist,isEditable);
  if(!isEditable){
    addAlbum({artist:artist.value,name,url})
  } 
  else{
    editAlbum(onEditData._id,name)

  }

}

  return (
    <div>
      <AlbumDetail artist={props.artists?props.artists.data:[]}   isEditable={onFormEdit} editData={onEditData} onFormSubmit={userDetailFormSumit} />
        {/* <UserDetail isEditable={onFormEdit} editData={onEditData} onFormSubmit={userDetailFormSumit}/> */}
        <br/>
        {/* <UserTable users={users} onDeleteClick={onDelete} onEditClick={onEdit} /> */}
        <AlbumTable users={isLoading|| error?[]:data} onDeleteClick={onDelete} onEditClick={onEdit} /> 

    </div>
  )
}

export default Album

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async () => {
        console.log("hiiiiii");

    //   const name = context.params?.name;
    // //   if (typeof name === "string") {
        store.dispatch(fetchArtist.initiate(''));  

       
          //   }
        // let b = await Promise.all([xfff])
        // console.log("ssssssssssssssssssssssssssssssssssssssssssssssss",b);
        
  
      let val = await Promise.all(getRunningOperationPromises());
      console.log("valxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",val[0]);
      
  
      return {
        props: {
            artists:val[0]
        },
      };
    }
  );