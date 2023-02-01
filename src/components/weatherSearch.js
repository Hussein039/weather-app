import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './weatherSearch.css'


function WeatherSearch() {
  const [weather2, setWeather2] = useState('');
  const [city, setCity] = useState('Toronto');
  const [error, setError] = useState(null);
  const [nextThreeDays, setnextThreeDays] = useState([]);
  const [toggle, setToggle] = useState(false);
  const API_KEY = '6accfd44f544ab9a098f5a425a7348b3';
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  useEffect(() => {
    const API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;
    axios.get(API_URL).then(response => {
      let days = response.data.list;
      let nextSeven = [];
      for (let i = 0; i < days.length; i += 8) {
        if(nextSeven.length<8){
          nextSeven.push(days[i]);
          }
          setnextThreeDays(nextSeven);
      }
      setnextThreeDays(nextSeven);
    }).catch(error => {
      setError(error);
    });
  },[]);
  const handleToggle = () => {
    setToggle(!toggle);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.get(URL).then(res => {
      setWeather2(res.data);
    }).catch(err => {
      console.log(err);
    })
  };

  return (
    <div className='a'>      
      
          <form onSubmit={handleSubmit}>
                <label>
                    City:
                    <input type="text" value={city} onChange={e => setCity(e.target.value)} />
                </label>
                <button type="submit" onClick={handleToggle}>Get Weather</button>
        </form>
        <div className='weath-info'>
            {toggle && (
          <div className='toggle-info'>
            {weather2.name && (
                <div className='weath-info'>
                  <button onClick={handleToggle}>Exit</button>
                    <p>City: {weather2.name}</p>
                    <p>Temperature: {weather2.main.temp}</p>
                    <p>Humidity: {weather2.main.humidity}</p>
                    <p>Feelings: {weather2.main.feels_like}</p>
                <p>Country: {weather2.sys.country}</p>
                <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather2.weather[0].icon}@2x.png`} alt={weather2.weather[0].description} />
                <p>Weather condition: {weather2.weather[0].main}</p>
              </div>
          )}
              </div>
          )}
        </div>

          </div>
  );

}

export default WeatherSearch