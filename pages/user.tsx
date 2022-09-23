import React ,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import UserDetail from "../components/UserDetail"
import UserTable from "../components/UserTable"
import { wrapper } from "../lib/store";
import {
    fetchUser,
    getRunningOperationPromises,
    useFetchUserQuery,
    useAddUserMutation,useDeleteUserMutation,useEditUserMutation
  } from "../lib/userApi";
  import { GetServerSideProps } from "next";

  


function User ({data}){
    console.log("holaaaaaaaaaaaaaaaaaaa",data.data);
    const [onFormEdit,setFormEdit] = useState(false)
    const [onEditData,setEditData] = useState({})
    const dispatch = useDispatch()
    const { dataAdd, error, isLoading } = useFetchUserQuery()
    const [addPost , result] = useAddUserMutation()
    const [deleteTheUser , resultfordelete] = useDeleteUserMutation()
    const [editTheUser , resultforEdit] = useEditUserMutation()




   

    const onDelete = async(id)=>{
        console.log(id);
        deleteTheUser(id)
        // await Promise.all(getRunningOperationPromises());
      
      }
      
      const onEdit = (data)=>{
        console.log(data);
        setFormEdit(true)
        setEditData(data)
      
      }

      const userDetailFormSumit = (name,uid,isEditable) =>{
        console.log(name,uid,isEditable);
        if(!isEditable){
          // dispatch(addUser({uid,name}))
        //   dispatch(addPost({uid,name}))
        addPost({uid,name})
      
        } else{
          editTheUser({uid,name})
      
        }
      
      }
    

    // const { data, error, isLoading } = useFetchUserQuery()
    // console.log("dtaataa",data);
    

    return(
        <>
        <UserDetail isEditable={onFormEdit} editData={onEditData} onFormSubmit={userDetailFormSumit}/>
        <UserTable users={data.data} onDeleteClick={onDelete} onEditClick={onEdit}/>
        </>
    )

}
export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async () => {
        console.log("hiiiiii");

    //   const name = context.params?.name;
    // //   if (typeof name === "string") {
        store.dispatch(fetchUser.initiate(''));    //   }
  
      let val = await Promise.all(getRunningOperationPromises());
      console.log("valxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",val[0]);
      
  
      return {
        props: {
            data:val[0]
        },
      };
    }
  );

// export async function getServerSideProps() {
//     console.log("wappppppp");
    
//     // Fetch data from external API
   
  
//     // Pass data to the page via props
//     return { props: { abc:"hiii" } }
//   }

export default User