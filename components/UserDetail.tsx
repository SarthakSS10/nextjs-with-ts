import React from 'react'
import Table from 'react-bootstrap/Table';
import {Button} from 'react-bootstrap'

function UserDetail() {
  return (
<div>
        <div className='mb-5'>
            <strong> User Details</strong>
            <br/>

            <input 
            className='mb-3'
            name="uid"
            type ="text"
            // value={uuidData}
            readOnly
            >
            </input>
            <br/>
            <input 
            className='mb-3'
            type ="text"
            // value={props.isEditable && editable ?props.editData.name:name}
            // onChange={(e)=>handleChange(e)}
            name="name"
            >
            </input>
            <br/>
            <button  className='mb-3' >
                {/* {props.isEditable?'edit':'add'} */}
            </button>

        </div>
        <br/>
    </div>  )
}

export default UserDetail