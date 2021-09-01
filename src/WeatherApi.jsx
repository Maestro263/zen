import { useState, useEffect } from "react";
import "./weatherApiStyles.scss";

const WeatherApi = () => {
  const inputHandler = (event) => {
    setGetState(event.target.value);
  };

  const searchWeather = (event) => {
    if (event.charCode === 13) {
      submitHandler();
    }
  };

  const submitHandler = () => {
    setState(getState);
  };

  const kelvinToFarenheit = (k) => {
    return (k - 273.15).toFixed(2);
  };

  const [apiData, setApiData] = useState({});
  const [getState, setGetState] = useState("");
  const [state, setState] = useState("København");

  useEffect(() => {
    let key = process.env.REACT_APP_API_KEY;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state}&APPID=${key}`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setApiData(data));
  }, [state]);

  return (
    <div className="weather">
      <div className="search-area">
        <label for="location-name">Enter Location :</label>
        <input
          type="text"
          id="location-name"
          placeholder="Search for a city"
          onChange={inputHandler}
          onKeyPress={searchWeather}
          value={getState}
        />
        <button onClick={submitHandler}>Search</button>
      </div>

      <div className="weather-info">
        {apiData.main ? (
          <div>
            <img
              src={`https://openweathermap.org/img/w/${apiData.weather[0].icon}.png`}
              alt="weather icon"
              className="weather-icon"
            />
            <p>{kelvinToFarenheit(apiData.main.temp)}&deg; C</p>

            <div>
              <p>
                {" Higest "}
                <strong>
                  {kelvinToFarenheit(apiData.main.temp_max)}&deg; C
                </strong>
              </p>
              <p>
                {" Lowest "}
                <strong>
                  {kelvinToFarenheit(apiData.main.temp_min)}&deg; C
                </strong>
              </p>
            </div>
            <div>
              <p>
                <strong>{apiData.weather[0].main}</strong>
              </p>
              <p>
                <strong>City: {state}</strong>
              </p>
            </div>
          </div>
        ) : (
          <h1>Error</h1>
        )}
      </div>
    </div>
  );
};
export default WeatherApi;
