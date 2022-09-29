import React, { useState, useEffect } from "react";
interface Propsvalue {
  isEditable: boolean;
  editData: any;
  onFormSubmit: any;
}

const ArtistDetail: React.FC<Propsvalue> = (props) => {
  const [name, setName] = useState("");
  const [editable, setEditable] = useState(true);

  const handleChange = (event: any) => {
    setEditable(false);
    setName(event.target.value);
  };
  const onSubmitForm = () => {
    props.onFormSubmit(name, props.isEditable);
    setName("");
    // window.location.reload(true)
    // setUUID(`ui-${uuid().split('-')[0]}`)
    setEditable(true);
  };

  return (
    <div>
      <div className="mb-5">
        <strong> Artist Details</strong>

        <br />
        <input
          className="mb-3"
          type="text"
          value={props.isEditable && editable ? props.editData.name : name}
          onChange={(e) => handleChange(e)}
          name="name"
        ></input>
        <br />
        <button className="mb-3" onClick={onSubmitForm}>
          {props.isEditable ? "edit" : "add"}
        </button>
      </div>
      <br />
    </div>
  );
};

export default ArtistDetail;
