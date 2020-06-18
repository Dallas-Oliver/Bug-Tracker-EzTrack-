import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js";
import TicketModel from "../../models/main models/TicketModel";
import { Project as ProjectModel } from "../../models/main models/ProjectModel";

type TicketOrProject = (TicketModel | ProjectModel)[];

interface IChartProps {
  items: TicketOrProject;
}

function Chart(props: IChartProps) {
  const [openItems, setOpenItems] = useState<TicketOrProject>([]);
  const [closedItems, setClosedItems] = useState<TicketOrProject>([]);

  const chartData = {
    type: "pie",
    labels: ["Open", "Closed"],
    datasets: [
      {
        label: "Tickets",
        data: [openItems.length, closedItems.length],
        backgroundColor: ["#51cc74", "#F96767"],
        borderWidth: 3,
        hoverBorderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    const setUserData = () => {
      for (let ticket of props.items) {
        if (ticket.status === "Open") {
          setOpenItems((openItems) => openItems.concat(ticket));
        } else if (ticket.status === "Closed") {
          setClosedItems((closedItems) => closedItems.concat(ticket));
        }
      }
    };
    setUserData();
  }, [props.items]);

  return (
    <div className="pie-graph">
      {openItems || closedItems ? (
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
          Open: <span className="open-count">{openItems.length}</span>
        </p>
        <p>
          Closed: <span className="closed-count">{closedItems.length}</span>
        </p>
      </div>
    </div>
  );
}

export default Chart;
