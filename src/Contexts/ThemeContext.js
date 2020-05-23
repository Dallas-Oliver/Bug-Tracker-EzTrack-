import React from "react";

const ThemeContext = React.createContext();

export default class ThemeProvider extends React.Component {
  state = {
    colorScheme: "blue boi",
  };

  render() {
    return (
      <ThemeContext.Provider
        value={{
          state: this.state,
        }}
      >
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}
