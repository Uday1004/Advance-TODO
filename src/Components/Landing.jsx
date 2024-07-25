import React from "react";
import DailyTasks from "./Tasks/Dailytask";
// import TodayTasks from "../Components/Tasks/Todaytask";

function Landing() {
  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="text-center mt-0">
        <DailyTasks  />
        {/* <TodayTasks /> */}
      </div>
    </div>
  );
}

export default Landing;
