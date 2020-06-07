import React, { useContext } from "react";
import { ThemeContext } from "../Contexts/ThemeContext";
import Dropdown from "react-bootstrap/Dropdown";
import User from "../models/main models/UserModel";

interface IAddFormProps {
  addUser?: (userId: string) => void;
  header: string;
  formType: string;
  titleValue: string;
  descValue: string;
  users?: User[];
  onSubmit: () => void;
  onTitleChange: (title: string) => void;
  onDescChange: (description: string) => void;
  hideForm: () => void;
}

const AddForm: React.FC<IAddFormProps> = (props) => {
  const [userAdded, setUserAdded] = React.useState(false);
  const { theme } = useContext(ThemeContext);

  function addUser(userId: string) {
    if (userId) {
      props.addUser!(userId);
      setUserAdded(true);
    }
  }

  return (
    <div className="add-form">
      <h3>{props.header}</h3>
      <hr></hr>
      <form
        className={`form ${props.formType}-form`}
        onSubmit={(e) => {
          e.preventDefault();
          props.onSubmit();
        }}
      >
        <label htmlFor="title">{props.formType} Title</label>
        <input
          autoFocus={true}
          onChange={(e) => props.onTitleChange(e.target.value)}
          value={props.titleValue}
          name="title"
          type="text"
        ></input>
        <label htmlFor="description">{props.formType} Description</label>
        <textarea
          name="description"
          value={props.descValue}
          onChange={(e) => props.onDescChange(e.target.value)}
        ></textarea>
        {props.formType === "Ticket" && !userAdded ? (
          <Dropdown className="dropdown">
            <Dropdown.Toggle
              className="dropdown-button"
              variant="light"
              id="dropdown-basic"
            >
              Assign User
            </Dropdown.Toggle>

            <Dropdown.Menu className="dropdown-menu">
              {props.users!.map((user: User) => {
                return (
                  <div key={user._id}>
                    <Dropdown.Item onClick={() => addUser(user._id)}>
                      {user.name}
                    </Dropdown.Item>
                  </div>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
        ) : null}
        {!userAdded ? null : <p>user added</p>}
        <div className="buttons">
          <button
            style={{
              background: theme.background,
              color: theme.textColor,
            }}
            disabled={
              props.titleValue.length === 0 || props.descValue.length === 0
            }
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
};

export default AddForm;
