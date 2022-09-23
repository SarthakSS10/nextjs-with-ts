import React , {useState,useEffect} from 'react'
import uuid from 'react-uuid';


function UserDetail(props) {
  let val = props.isEditable?props.editData.uid:`ui-${uuid().split('-')[0]}`
  const [name,setName] = useState('')
  const [editable,setEditable] = useState(true)

  const [uuidData,setUUID] = useState(val)
  const handleChange = (event) => {
    // event.preventDefault()
    setEditable(false)
    setName(event.target.value)
   
  }
  const onSubmitForm = () =>{
    props.onFormSubmit(name,uuidData,props.isEditable)
    setName('')
    // window.location.reload(true)
    setUUID(`ui-${uuid().split('-')[0]}`)

  }
  useEffect(()=>{
    setUUID(props.isEditable?props.editData.uid:`ui-${uuid().split('-')[0]}`)

  },[props])
  return (
    <div>
        <div className='mb-5'>
            <strong> User Details</strong>
            <br/>

            <input 
            className='mb-3'
            name="uid"
            type ="text"
            value={uuidData}
            readOnly
            >
            </input>
            <br/>
            <input 
            className='mb-3'
            type ="text"
            value={props.isEditable && editable ?props.editData.name:name}
            onChange={(e)=>handleChange(e)}
            name="name"
            >
            </input>
            <br/>
            <button  className='mb-3' onClick={onSubmitForm}>
                {props.isEditable?'edit':'add'}
            </button>

        </div>
        <br/>
    </div>
  )
}

export default UserDetail