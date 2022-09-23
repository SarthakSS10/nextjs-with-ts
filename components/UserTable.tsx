import React from 'react'
import Table from 'react-bootstrap/Table';
import {Button} from 'react-bootstrap'

const UserTable = () => {
    let tableData = [{_id: '630cad055b4cbc141b014e92', name: 'testupdate123', uid: 'u1', __v: 0, ratings: Array(4)}]
  return (
    <div>
         <Table striped bordered hover>
      <thead>
        <tr>
          <th>Edit</th>
          <th>Delete</th>
          <th>Uid</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {
          tableData.map((data)=>(
            <tr key={data._id}>
              <td><Button >Edit</Button></td>
              <td><Button >Delete</Button></td>
              <td>{data.uid}</td>
              <td>{data.name}</td>
            </tr>

          ))
        }
      
      </tbody>
    </Table>
    </div>
  )
}

export default UserTable