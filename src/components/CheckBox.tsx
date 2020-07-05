import React from "react";

interface ICheckBoxProps {
  addItemToDeleteArray: () => void;
}

export default function CheckBox(props: ICheckBoxProps) {
  return (
    <td>
      <input
        onChange={() => props.addItemToDeleteArray()}
        style={{ margin: "0px 5px" }}
        type="checkbox"></input>
    </td>
  );
}
