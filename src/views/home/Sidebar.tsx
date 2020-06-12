import React, { useContext } from "react";
import Navigation from "./Navigation";
import { ThemeContext } from "../../Contexts/ThemeContext";

interface ISideBarProps {
  handleLogout: () => void;
}

function Sidebar(props: ISideBarProps) {
  const { theme, toggleThemes } = useContext(ThemeContext);

  return (
    <section
      style={{
        background: theme.background,
        color: theme.textColor,
      }}
      className="side-bar">
      <div className="personal">
        <img
          // onClick={props.handleFileSelect}
          className="avatar"
          src={require("./default_avatar.png")}
          // src={props.avatarImage ? props.avatarImage : require("./default_avatar.png")}
          alt="personal avatar"></img>
      </div>
      <Navigation className="nav" />

      <section className="side-bar__footer">
        <h3 className="logout-link" onClick={props.handleLogout}>
          Logout
        </h3>
        <span className="theme-icon" onClick={() => toggleThemes()}>
          {theme.background === "#363636" ? (
            <span aria-label="sun" role="img">
              🌞
            </span>
          ) : (
            <span aria-label="moon" role="img">
              🌚
            </span>
          )}
        </span>
      </section>
    </section>
  );
}

export default Sidebar;
