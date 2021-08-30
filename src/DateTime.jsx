import React, { useState, useEffect } from "react";
import "./DateTimeStyles.scss";

const DateTime = () => {
  var [date, setDate] = useState(new Date());

  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  return (
    <>
      <p> Time : {date.toLocaleTimeString()}</p>
      <p> Date : {date.toLocaleDateString()}</p>
    </>
  );
};

export default DateTime;
