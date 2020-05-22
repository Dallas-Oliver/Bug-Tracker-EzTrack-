import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js";

function Chart(props) {
  const [openTickets, setOpenTickets] = useState([]);
  const [closedTickets, setClosedTickets] = useState([]);

  const chartData = {
    type: "pie",
    labels: ["Open", "Closed"],
    datasets: [
      {
        label: "Tickets",
        data: [openTickets.length, closedTickets.length],
        backgroundColor: ["#56C556", "#F96767"],
        borderWidth: 3,
        hoverBorderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    function setUserData() {
      for (let ticket of props.tickets) {
        if (ticket.status === "Open") {
          setOpenTickets((openTickets) => openTickets.concat(ticket));
        } else if (ticket.status === "Closed") {
          setClosedTickets((closedTickets) =>
            closedTickets.concat(ticket)
          );
        }
      }
    }
    setUserData();
  }, [props.tickets]);

  return (
    <div className="pie-graph">
      {openTickets || closedTickets ? (
        <Pie
          data={chartData}
          width={200}
          height={200}
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
      ) : (
        <p>loading...</p>
      )}

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
