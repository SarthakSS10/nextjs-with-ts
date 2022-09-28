import React ,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { useFetchArtistQuery , useAddArtistMutation ,useDeleteArtistMutation ,useEditArtistMutation } from '../lib/artistApi'


import ArtistDetail from '../components/ArtistDetail'
import ArtistTable from '../components/ArtistTable'



function Artist() {
  const { data:dataForArist, error, isLoading } = useFetchArtistQuery('')
  const [addArtist , result] = useAddArtistMutation()
  const [deleteTheArtist , resultfordelete] = useDeleteArtistMutation()
  const [editTheArtist , resultforEdit] = useEditArtistMutation()
  // const [tableData,setTableData] = useState([])
  const [onFormEdit,setFormEdit] = useState(false)
  const [onEditData,setEditData] = useState<any>({})
//   const artistList = useSelector((state) => state.artistList)
//   const dispatch = useDispatch()

//   const { artists} = artistList

//   useEffect(()=>{
//     console.log("whats1");
  
//     //  dispatch(fetchArtist())
  


//   //  console.log(tableData);

//  },[dispatch,data])


const onDelete = (id:string)=>{
  console.log(id);
  deleteTheArtist(id)

}

const onEdit = (data: { _id: string; name: string })=>{
  console.log(data);
  // dispatch(editUser(id,name))
  setFormEdit(true)
  setEditData(data)

}

const userDetailFormSumit = (name:string,isEditable:boolean) =>{
  console.log(name,isEditable);
  if(!isEditable){
    addArtist(name)
  } else{
    editTheArtist({uid:onEditData._id,name})
    setFormEdit(false)



  }

}

  return (
    <div>
        <ArtistDetail isEditable={onFormEdit} editData={onEditData} onFormSubmit={userDetailFormSumit}/>
        <br/>
        <ArtistTable users={isLoading|| error?[]:dataForArist} onDeleteClick={onDelete} onEditClick={onEdit} />

    </div>
  )
}

export default Artist