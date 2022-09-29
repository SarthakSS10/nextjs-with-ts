import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";

function AlbumTable(props: any) {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    console.log("hiiii", props);
    setTableData(props.users);
  }, [props]);

  const deleteButton = async (e: any, id: string) => {
    e.preventDefault();
    props.onDeleteClick(id);
  };
  const editButton = async (e: any, data: any) => {
    e.preventDefault();
    console.log(data);
    props.onEditClick(data);
  };
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
          {tableData.map((data: any) => (
            <tr key={data._id}>
              <td>
                <Button onClick={(e) => editButton(e, data)}>Edit</Button>
              </td>
              <td>
                <Button onClick={(e) => deleteButton(e, data._id)}>
                  Delete
                </Button>
              </td>
              <td>{data._id}</td>
              <td>{data.name}</td>
              <td>{data.artistId}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default AlbumTable;
