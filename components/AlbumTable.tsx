import React ,{useState,useEffect} from 'react'
import Table from 'react-bootstrap/Table';
import {useDispatch,useSelector} from 'react-redux'
// import { fetchUser ,deleteUser } from '../../actions/userActions';
import {Button} from 'react-bootstrap'


function AlbumTable(props) {
  const [tableData,setTableData] = useState([])
  // const userList = useSelector((state) => state.userList)
  // const dispatch = useDispatch()

  // const { users} = userList
  useEffect(()=>{
    console.log("hiiii",props);
    setTableData(props.users)

  },[props])


  // useEffect(()=>{
  //   console.log(props.users);
  
  //    dispatch(fetchUser())
  //   setTableData(users)


  //   console.log(tableData);

  // },[])

  const deleteButton = async(e,id) =>{
    e.preventDefault()
    props.onDeleteClick(id)
    // console.log(id);
    //  await dispatch(deleteUser(id))
    // // console.log(users);
    // setTableData(users)

  }
  const editButton = async(e,data) =>{
    e.preventDefault()
    console.log(data);
    props.onEditClick(data)
    //  await dispatch(deleteUser(id))
    // // console.log(users);
    // setTableData(users)

  }
  console.log("render");
  return (
    <div>
         <Table striped bordered hover>
      <thead>
        <tr>
          <th>Edit</th>
          <th>Delete</th>
          <th>AlbumId</th>
          <th>Name</th>
          <th>ArtistId</th>

        </tr>
      </thead>
      <tbody>
        {
          tableData.map((data)=>(
            <tr key={data._id}>
              <td><Button onClick={(e)=>editButton(e,data)}>Edit</Button></td>
              <td><Button onClick={(e)=>deleteButton(e,data._id)}>Delete</Button></td>
              <td>{data._id}</td>
              <td>{data.name}</td>
              <td>{data.artistId}</td>

            </tr>

          ))
        }
      
      </tbody>
    </Table>
    </div>
  )
}

export default AlbumTable