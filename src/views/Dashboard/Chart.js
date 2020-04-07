import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";

function Chart(props) {
  const [openTickets, setOpenTickets] = useState();
  const [closedTickets, setClosedTickets] = useState();

  const chartData = {
    labels: ["Open", "Closed"],
    datasets: [
      {
        label: "Tickets",
        data: [openTickets, closedTickets],
        backgroundColor: ["#F96767", "#56C556"],
        borderWidth: 0,
        hoverBorderWidth: 2
      }
    ]
  };

  useEffect(() => {
    setOpenTickets(props.ticketInfo.openTickets.length);
    setClosedTickets(props.ticketInfo.closedTickets.length);
  });

  return (
    <div className="pie-graph">
      <Doughnut
        data={chartData}
        options={{
          legend: {
            display: false,
            position: "bottom",
            labels: {
              fontFamily: "Montserrat"
            }
          },
          responsive: true
        }}
      />
      <div className="graph-legend">
        <p>
          Open: <span className="open-count">{openTickets}</span>
        </p>
        <p>
          Closed: <span className="closed-count">{closedTickets}</span>
        </p>
      </div>
    </div>
  );
}

export default Chart;
