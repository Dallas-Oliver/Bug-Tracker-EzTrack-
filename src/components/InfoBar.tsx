import React, { useContext } from "react";
import { ThemeContext } from "../Contexts/ThemeContext";
import User from "../models/main models/UserModel";

interface IInfoBarProps {
  createdBy: string;
  dateCreated: string;
  changeStatus: (_id: string) => void;
  _id: string;
  status: string;
  barType: string;
  priority?: string;
  assignedTo?: string;
  description: string;
}

function InfoBar(props: Partial<IInfoBarProps>) {
  const { theme } = useContext(ThemeContext);
  return (
    <section
      style={{
        background: theme.dashboardTheme.background,
        color: theme.textColor,
      }}
      className={`info-bar`}>
      <div>
        <span className="created-by">Created by: {props.createdBy}</span>
        <span className="date-created">{props.dateCreated}</span>
        <br />
        <p>
          <span
            style={{ borderColor: theme.buttonBorder }}
            onClick={() => props.changeStatus!(props._id!)}
            className="status-bar">
            {props.status === "Open" ? (
              <svg
                className="open-status indicator"
                xmlns="http://www.w3.org/2000/svg"
                width="9"
                height="9"
                viewBox="0 0 9 9">
                <circle cx="4.5" cy="4.5" r="4.5" fill="#51CC74" />
              </svg>
            ) : (
              <svg
                className="closed-status indicator"
                xmlns="http://www.w3.org/2000/svg"
                width="9"
                height="9"
                viewBox="0 0 9 9">
                <circle cx="4.5" cy="4.5" r="4.5" fill="#f96767" />
              </svg>
            )}
            <span className="status">{props.status}</span>
          </span>
          {props.barType === "ticket" ? (
            <span>
              <span className="priority">priority: {props.priority}</span>
              <span className="assigned-to">Assigned to: {props.assignedTo}</span>
            </span>
          ) : null}
        </p>
      </div>
      <hr></hr>
      <p className="description">{props.description}</p>
      <hr></hr>
    </section>
  );
}

export default InfoBar;
