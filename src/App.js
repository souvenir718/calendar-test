import React from "react";
import CustomCalendar from "./components/CustomCalendar";
const App = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CustomCalendar />
      </div>
    </>
  );
};

export default App;
