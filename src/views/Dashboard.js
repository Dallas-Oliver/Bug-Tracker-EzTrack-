import React, { useEffect } from "react";

function Dashboard(props) {
  const getUserData = async () => {
    let response = await fetch(`/users/get-user/:${props.userEmail}`);
    let json = await response.json();
    console.log(json);
  };
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>{props.userEmail}</p>
    </div>
  );
}

export default Dashboard;
