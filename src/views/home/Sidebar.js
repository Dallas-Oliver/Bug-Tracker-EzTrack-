import React, { useContext, useState } from "react";
import Navigation from "./Navigation";
import { Tooltip } from "react-tippy";
import { GithubPicker } from "react-color";
import { Utils } from "../../utils";
import { ThemeContext } from "../../Contexts/ThemeContext";

function Sidebar(props) {
  const colorSets = {
    light: {
      backgrounds: [
        "#EB9694",
        "#FAD0C3",
        "#FEF3BD",
        "#C1E1C5",
        "#BEDADC",
        "#C4DEF6",
        "#BED3F3",
        "#D4C4FB",
      ],
      textColor: "black",
    },
    dark: {
      backgrounds: [
        "#B80000",
        "#DB3E00",
        "#FCCB00",
        "#008B02",
        "#006B76",
        "#1273DE",
        "#004DCF",
        "#5300EB",
      ],
      textColor: "white",
    },
  };

  const { theme, toggleThemes } = useContext(ThemeContext);
  // const [colorSet, setColorSet] = useState(colorSets.light.backgrounds);
  // const [isLightColorSet, toggleisLightColorSet] = useState(true);

  // const toggleColorSets = () => {
  //   setColorSet(
  //     isLightColorSet
  //       ? colorSets.dark.backgrounds
  //       : colorSets.light.backgrounds
  //   );
  //   toggleisLightColorSet(!isLightColorSet);
  // };

  // const changeColorScheme = async (color) => {
  //   const hexValue = color.hex;

  //   const updatedPreferences = await Utils.updateColorPreference(hexValue);

  //   if (!updatedPreferences) {
  //     console.log("color not saved!");
  //     return;
  //   }

  //   setTheme(updatedPreferences.colorScheme);
  // };

  // const getUserPreferences = async () => {
  //   const userPreferences = await Utils.getUserPreferences();

  //   if (!userPreferences) {
  //     console.log("no preferences found");
  //     return;
  //   }

  //   if (userPreferences.colorScheme === "") {
  //     setTheme("#4D7D94");
  //     return;
  //   }

  //   setTheme(userPreferences.colorScheme);
  //   return;
  // };

  // React.useEffect(() => {
  //   getUserPreferences();
  // }, []);

  return (
    <section
      style={{
        background: theme.background,
        color: theme.textColor,
      }}
      className="side-bar"
    >
      <div className="personal">
        <img
          onClick={props.handleFileSelect}
          className="avatar"
          src={
            props.avatarImage
              ? props.avatarImage
              : require("./default_avatar.png")
          }
          alt="personal avatar"
        ></img>
      </div>
      <Navigation className="nav" />

      <section className="side-bar__footer">
        <h3 className="logout-link" onClick={props.handleLogout}>
          Logout
        </h3>

        {/* <Tooltip
          html={
            <GithubPicker
              triangle="hide"
              width="218px"
              onChangeComplete={(color) => changeColorScheme(color)}
              color={theme}
              colors={colorSet}
            />
          }
          interactive
        >
          <div className="color-picker-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 48 48"
              fill="white"
            >
              <path d="M24 6C14.06 6 6 14.06 6 24s8.06 18 18 18c1.66 0 3-1.34 3-3 0-.78-.29-1.48-.78-2.01-.47-.53-.75-1.22-.75-1.99 0-1.66 1.34-3 3-3H32c5.52 0 10-4.48 10-10 0-8.84-8.06-16-18-16zM13 24c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm6-8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm10 0c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm6 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
            </svg>
          </div>
        </Tooltip>*/}
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
