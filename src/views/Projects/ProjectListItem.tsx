import React, { useContext } from "react";
import { ThemeContext } from "../../Contexts/ThemeContext";

interface IProjectListItemProps {
  _id: string;
  status: string;
  redirectToProject: (_id: string) => void;
  numberOfTickets: number;
  name: string;
  projectStatus?: string;
}

export default function ProjectListItem(props: IProjectListItemProps) {
  const { theme } = useContext(ThemeContext);
  return (
    <tr className="project-list-item">
      <td>
        <p
          style={
            props.projectStatus === "Open"
              ? { color: theme.linkTextColor }
              : { color: "grey" }
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
