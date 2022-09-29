import React ,{useState,useEffect} from 'react'
import AlbumDetail from '../components/AlbumDetail'
import AlbumTable from '../components/AlbumTable'
import {useAddAlbumMutation,useDeleteAlbumMutation,useEditAlbumMutation,useFetchAlbumQuery} from '../lib/albumApi'
import { wrapper } from "../lib/store";
import {fetchArtist,getRunningOperationPromises} from '../lib/artistApi'



function Album(props:any) {
    const { data, error, isLoading } = useFetchAlbumQuery()
    console.log("ddddddddddddddddddddddddddd",data);
    
    const [addAlbum , {data:userResponse,isSuccess:isUserSuccess,isError:isUserError}] = useAddAlbumMutation()
    const [deleteAlbum , {data:deleteResponse}] = useDeleteAlbumMutation()
    const [editAlbum , {data:editResponse}] = useEditAlbumMutation()

  const [onFormEdit,setFormEdit] = useState(false)
  const [onEditData,setEditData] = useState<any>({})

  useEffect(()=>{
    console.log("whats1",data);
    
  

 },[data])


const onDelete = (id:string)=>{
  console.log(id);
  deleteAlbum(id)

}

const onEdit = (data:Object)=>{
  console.log(data);
  setFormEdit(true)
  setEditData(data)

}

const userDetailFormSumit = (name:string,artist:any,isEditable:boolean,url:string) =>{
  console.log(name,artist,isEditable);
  if(!isEditable){
    addAlbum({artist:artist.value,name,url})
  } 
  else{
    editAlbum({uid:onEditData._id,name})

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

        store.dispatch(fetchArtist.initiate());  
  
      let val = await Promise.all(getRunningOperationPromises());
      console.log("valxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",val[0]);
      
  
      return {
        props: {
            artists:val[0]
        },
      };
    }
  );