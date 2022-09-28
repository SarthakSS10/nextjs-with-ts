import React , {useState,useEffect} from 'react'
import Select from 'react-select';
import uuid from 'react-uuid';

function AlbumDetail(props) {
    const [selectedOption, setSelectedOption] = useState(null);
    

  const [name,setName] = useState('')
  const [url,setUrl] = useState('')

  const [editable,setEditable] = useState(true)
  const [option,setOption] = useState([])

  const selectedOptionChange = (val)=>{
    console.log("hiiiii vlal",val);
    setSelectedOption(val)

  }

  const handleChange = (event) => {
    // event.preventDefault()
    setEditable(false)
    setName(event.target.value)
   
  }
  const handleUrl = (event) => {
    // event.preventDefault()
    setEditable(false)
    setUrl(event.target.value)
   
  }
  const onSubmitForm = () =>{
    props.onFormSubmit(name,selectedOption,props.isEditable,url)
    setName('')
    setUrl('')
    setSelectedOption(null)
    // window.location.reload(true)

  }
 
  useEffect(()=>{
    console.log(props.artist);
  //   const obj = [
  //     {
  //         "_id": "6316de3427679bc7a09dbda2",
  //         "name": "ed sheeran",
  //         "__v": 0
  //     },
  //     {
  //         "_id": "6316eca327679bc7a09dbdb5",
  //         "name": "tim ferris",
  //         "__v": 0
  //     },
  //     {
  //         "_id": "6316eced27679bc7a09dbdb8",
  //         "name": "cal newport",
  //         "__v": 0
  //     }
  // ]

  // const arrayObj = obj.map(item => {
  //   return {
  //     value: item._id,
  //     label: item.name
  //   };
  // });

    const arrayObj = props.artist.map(item => {
      return {
        value: item._id,
        label: item.name
      };
    });
    setOption(arrayObj)

  },[props])
  return (
    <div>
        <div className='mb-5'>
            <strong> Album  Details</strong>
            <br/>
            <div style={{width:"400px",margin:"auto"}}>
            <Select
            defaultValue={selectedOption}
            onChange={selectedOptionChange}
            options={option}
            />
            </div>

            <br/>
            <p>name:</p>
            <input 
            className='mb-3'
            type ="text"
            value={props.isEditable && editable ?props.editData.name:name}
            onChange={(e)=>handleChange(e)}
            name="name"
            >
            </input>
            <br/>
            <p>url:</p>


               <input 
            className='mb-3'
            type ="text"
            value={props.isEditable && editable ?props.editData.url:url}
            onChange={(e)=>handleUrl(e)}
            name="url"
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

export default AlbumDetail