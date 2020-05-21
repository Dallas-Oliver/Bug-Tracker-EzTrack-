import React, { useRef, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";

function AddForm(props) {
  const [userAdded, setUserAdded] = React.useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  function addUser(userId) {
    if (userId) {
      props.addUser(userId);
      setUserAdded(true);
    }
  }
  return (
    <div className="add-form">
      <h3>{props.header}</h3>
      <hr></hr>
      <form
        className={`form ${props.formType}-form`}
        onSubmit={props.onSubmit}
      >
        <label htmlFor="title">{props.formType} Title</label>
        <input
          ref={inputRef}
          onChange={props.onTitleChange}
          value={props.titleValue}
          name="title"
          type="text"
        ></input>
        <label htmlFor="description">{props.formType} Description</label>
        <textarea
          type="text"
          name="description"
          value={props.descValue}
          onChange={props.onDescChange}
        ></textarea>
        {(props.formType === "Ticket") & !userAdded ? (
          <Dropdown className="dropdown">
            <Dropdown.Toggle
              className="dropdown-button"
              variant="light"
              id="dropdown-basic"
            >
              Assign User
            </Dropdown.Toggle>

            <Dropdown.Menu className="dropdown-menu">
              {props.users.map((user) => {
                return (
                  <Dropdown.Item
                    key={user._id}
                    onClick={() => addUser(user._id)}
                  >
                    {user.name}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
        ) : null}
        {!userAdded ? null : <p>user added</p>}
        <div className="buttons">
          <button
            disabled={!props.validateInputs()}
            className="button add"
            type="submit"
          >
            Add {props.formType}
          </button>
          <button className="button cancel" onClick={props.hideForm}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddForm;
