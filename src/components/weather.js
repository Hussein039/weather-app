import React, { useState, useEffect } from 'react';
import clear from "../images/Clear.png";
import cloud from "../images/Cloud.png";
import rain from "../images/Rain.png";
import storm from "../images/Storm.png";
import snow from "../images/Snow.png";
import sun from "../images/sun.png";
import weather3 from "../images/weather3.png";
import './weather.css';
import Header from './header';
import WeatherSearch from './weatherSearch';
import './header.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faWind, faPooStorm, faHouse, faLocationDot, faX, faBars } from '@fortawesome/free-solid-svg-icons';

function Weather() {
  const [weather, setWeather] = useState('');
  const [weather2, setWeather2] = useState('');
  const [city, setCity] = useState('');
  const [error, setError] = useState(null);
  const API_KEY = '6accfd44f544ab9a098f5a425a7348b3';
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  const [nextThreeDays, setnextThreeDays] = useState([]);
  const [toggle, setToggle] = useState(false);

  const handleClick = () => {
    setToggle(!toggle);
  };


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
  },[city]);


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
        position => {
            const { latitude, longitude } = position.coords;
            
            const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
            axios.get(API_URL)
                .then(response => {
                    setWeather(response.data);
                })
                .catch(error => {
                    setError(error);
                });
        }
        
    );
  }, [city]);
  
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.get(URL).then(res => {
      setWeather(res.data);
    }).catch(err => {
      console.log(err);
    })
  };

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return [day, date, month, year].join(" , ");
  };

  const displayWeatherImg =(weather)=> {
    if (weather.weather[0].main === "Clouds") {
      return <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='Clouds'/>;
    } else if (weather.weather[0].main === "Clear") {
      return <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='Clear'/>;
    } else if (weather.weather[0].main === "Rain") {
      return <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='Rain'/>;
    } else if (weather.weather[0].main === "Thunderstorm") {
      return <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='Thunderstorm'/>;
    } else if (weather.weather[0].main === "Snow") {
      return <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='Snow'/>;
    } 
    else {
      return <img src={weather} alt='default'/>;
      }
  }
  



  return (
    <div className='main-container'> 
            {weather2.name && (
                <div>
                    <p>City: {weather2.name}</p>
                    <p>Temperature: {weather2.main.temp}</p>
                    <p>Humidity: {weather2.main.humidity}</p>
                    <p>Feelings: {weather2.main.feels_like}</p>
          <p>Country: {weather2.sys.country}</p>
          <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather2.weather[0].icon}@2x.png`} alt={weather2.weather[0].description} />
          <p>Weather condition: {weather2.weather[0].main}</p>
                </div>
            )}  
      <div className='container'>
      <header>
        <button className='toggle' onClick={handleClick}>
          {toggle ? <FontAwesomeIcon icon={faX} /> : <FontAwesomeIcon icon={faBars} />}
        </button>
          <ul className={toggle ? 'mobile-view' : 'nav'}>
          <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Enter a City...' value={city} onChange={e => setCity(e.target.value)} />
            <button type="submit">Get Weather</button>
          </form>
          <li><FontAwesomeIcon icon={faHouse} /></li>
          <li className='item1'><FontAwesomeIcon icon={faCloud} /></li>
          <li className='item1'><FontAwesomeIcon icon={faWind} /></li>
          <li className='item1'><FontAwesomeIcon icon={faPooStorm} /></li>
        </ul>
      </header>
        
        <div className='weather-container'> 
        
          {weather.name &&(
            <div className='weather'>
              <div className='icons'>{displayWeatherImg(weather)}</div>
              <span className='location'><FontAwesomeIcon icon={faLocationDot} /> {weather.name}, {weather.sys.country}</span>
              <span className='temp'> {Math.round(weather.main.temp)}°c </span>
              <p>Feels Like: {Math.round(weather.main.feels_like)}</p>
              <p>Weather condition: {weather.weather[0].main}</p>
              <h3>{dateBuilder(new Date())}</h3>
          </div>
          ) }
        </div>

        <div className='info-container'>
          <div className='img'>
            <p className='weather-info'>
              {weather.name && (
                <div>
                  <ul>
                    <li>
                      <p>Humidity</p>
                      <span>{weather.main.humidity}%</span>
                    </li>
                    <li>
                      <p>Minimum</p>
                      <span>{weather.main.temp_min}</span>
                    </li>
                    <li>
                      <p>Maximum</p>
                      <span>{weather.main.temp_max}</span>
                    </li>
                    <li>
                      <p>Pressure</p>
                      <span>{weather.main.pressure}</span>
                    </li>
                    <li>
                      <p>wind Speed</p>
                      <span>{weather.wind.speed}</span>
                    </li>
                  </ul>
                </div>
              )}
          </p>
          </div>
        </div>
        <div className='days'>
              <ul>
                  {nextThreeDays.map((day, index)=>(
                    <li key={index}>
                      <p>{dateBuilder(new Date(day.dt_txt))}</p>
                      <span>{Math.round(day.main.temp)}°c</span>
                    </li>
                  ))}
              </ul>
          </div>
      </div>
      

      

    </div>
  );
}

export default Weather;
