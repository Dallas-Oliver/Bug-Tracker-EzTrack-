import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";

function Chart(props) {
  const [openTickets, setOpenTickets] = useState([]);
  const [closedTickets, setClosedTickets] = useState([]);

  const chartData = {
    labels: ["Open", "Closed"],
    datasets: [
      {
        label: "Tickets",
        data: [openTickets, closedTickets],
        backgroundColor: ["#F96767", "#56C556"],
        borderWidth: 0,
        hoverBorderWidth: 2,
      },
    ],
  };

  function setUserData() {
    for (let ticket of props.tickets) {
      if (ticket.status === "Open") {
        setOpenTickets((openTickets) => openTickets.concat(ticket));
      } else if (ticket.status === "Closed") {
        setClosedTickets((closedTickets) => closedTickets.concat(ticket));
      }
    }
  }

  useEffect(() => {
    setUserData();
  }, []);

  return (
    <div className="pie-graph">
      <Doughnut
        data={chartData}
        options={{
          legend: {
            display: false,
            position: "bottom",
            labels: {
              fontFamily: "Montserrat",
            },
          },
          responsive: true,
        }}
      />

      <div className="graph-legend">
        <p>
          Open: <span className="open-count">{openTickets.length}</span>
        </p>
        <p>
          Closed:{" "}
          <span className="closed-count">{closedTickets.length}</span>
        </p>
      </div>
    </div>
  );
}

export default Chart;
