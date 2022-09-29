import React, { useState, useEffect } from "react";
import Select from "react-select";

function AlbumDetail(props: any) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [editable, setEditable] = useState(true);
  const [option, setOption] = useState([]);

  const selectedOptionChange = (val: any) => {
    console.log("hiiiii vlal", val);
    setSelectedOption(val);
  };

  const handleChange = (event: any) => {
    setEditable(false);
    setName(event.target.value);
  };
  const handleUrl = (event: any) => {
    setEditable(false);
    setUrl(event.target.value);
  };
  const onSubmitForm = () => {
    props.onFormSubmit(name, selectedOption, props.isEditable, url);
    setName("");
    setUrl("");
    setSelectedOption(null);
  };

  useEffect(() => {
    console.log(props.artist);

    const arrayObj = props.artist.map((item: any) => {
      return {
        value: item._id,
        label: item.name,
      };
    });
    setOption(arrayObj);
  }, [props]);
  return (
    <div>
      <div className="mb-5">
        <strong> Album Details</strong>
        <br />
        <div style={{ width: "400px", margin: "auto" }}>
          <Select
            defaultValue={selectedOption}
            onChange={selectedOptionChange}
            options={option}
          />
        </div>

        <br />
        <p>name:</p>
        <input
          className="mb-3"
          type="text"
          value={props.isEditable && editable ? props.editData.name : name}
          onChange={(e) => handleChange(e)}
          name="name"
        ></input>
        <br />
        <p>url:</p>

        <input
          className="mb-3"
          type="text"
          value={props.isEditable && editable ? props.editData.url : url}
          onChange={(e) => handleUrl(e)}
          name="url"
        ></input>
        <br />
        <button className="mb-3" onClick={onSubmitForm}>
          {props.isEditable ? "edit" : "add"}
        </button>
      </div>
      <br />
    </div>
  );
}

export default AlbumDetail;
