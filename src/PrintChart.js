import React, { useEffect, useState } from "react";
import { useStore } from "./store";
import Swal from "sweetalert2";
import axios from "axios";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";

function PrintChart() {
  const setApiData = useStore((state) => state.setData);
  const apiData = useStore((state) => state.data);
  const setImage = useStore((state) => state.setImage);
  const [xData, setXData] = useState(null);
  const [yData, setYData] = useState(null);
  const history = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let resp = await axios.get(
          "https://api.usa.gov/crime/fbi/cde/arrest/state/AK/all?from=2015&to=2020&API_KEY=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv"
        );
        setApiData(resp.data);
      } catch (e) {
        setApiData("Error");
        Swal.fire("Oops", "Something went wrong while fetching the data");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let xD = [];
    let yD = [];
    if (typeof apiData === "object") {
      for (let i = 0; i < apiData.data.length; i++) {
        xD.push(apiData.data[i].data_year);
        yD.push(apiData.data[i]["Burglary"]);
      }
      setXData(xD);
      setYData(yD);
    }
  }, [apiData]);

  const options = {
    scales: {
      y: {
        min: 400,
        max: 800,
        ticks: {
          stepSize: 50,
        },
      },
    },
  };

  const clickHandler = () => {
    const image = document.getElementById("burglaryChart").toDataURL("image/png")
    .replace("image/png", "image/octet-stream");
    setImage(image);
    history("/pdf-viewer");
  };

  return (
    <div>
      <div className="row">
        {apiData === "Loading" && (
          <div className="col-12 mb-1 text-center">
            <div className="mb-1">
              <small>Fetching...</small>&nbsp;
            </div>
            <div
              className="spinner-border"
              role="status"
              style={{ height: "30px", width: "30px" }}
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {apiData === "Error" && (
          <div className="col-12 mb-1 text-center">
            Please refresh or try again later
          </div>
        )}
        {typeof apiData === "object" && xData !== null && yData !== null && (
          <>
            <div
              className="col-12 mx-auto mt-3"
              style={{ width: "800px", height: "500px" }}
            >
              <Line
                data={{
                  labels: xData,
                  datasets: [
                    {
                      label: "Burglary Arrests",
                      data: yData,
                      backgroundColor: "#E8EEFB",
                      borderColor: "#1463FF",
                    },
                  ],
                }}
                options={options}
                id = "burglaryChart"
              />
            </div>
            <div className="col-12 text-center">
              <button
                className="btn btn-outline-dark"
                onClick={() => clickHandler()}
              >
                View PDF
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default PrintChart;
