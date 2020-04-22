import React from "react";

export const CustomToggle = React.forwardRef((ref, props) => (
  <svg
    ref={ref}
    onClick={(e) => props.onClick(e)}
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 48 48"
  />
));
