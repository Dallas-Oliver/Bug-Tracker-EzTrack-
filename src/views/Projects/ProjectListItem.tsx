import React, { useContext } from "react";
import { ThemeContext } from "../../Contexts/ThemeContext";
import CheckBox from "../../components/CheckBox";

interface IProjectListItemProps {
  _id: string;
  status: string;
  numberOfTickets: number;
  name: string;
  projectStatus?: string;
  isRenderedOnDashboard: boolean;
  redirectToProject: (_id: string) => void;
  addProjectToDeleteArray?: (_id: string) => void;
}

export default function ProjectListItem(props: IProjectListItemProps) {
  const { theme } = useContext(ThemeContext);

  const addProjectToDeleteArray = (_id: string) => {
    if (!_id) {
      return null;
    }

    props.addProjectToDeleteArray!(_id);
  };

  return (
    <tr className="project-list-item">
      {props.isRenderedOnDashboard ? null : (
        <CheckBox addItemToDeleteArray={() => addProjectToDeleteArray(props._id)} />
      )}
      <td>
        <p
          style={
            props.status === "Open"
              ? { color: theme.linkTextColor, margin: "0px" }
              : { color: "grey", margin: "0px" }
          }
          className="project-link"
          onClick={() => props.redirectToProject(props._id)}>
          {props.name}
        </p>
      </td>

      <td className={`status ${props.status === "Open" ? "open" : "closed"}`}>
        {props.status}
      </td>
      <td>{props.numberOfTickets}</td>
    </tr>
  );
}
