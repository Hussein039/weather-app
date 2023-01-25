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
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faWind, faPooStorm, faHouse, faLocationDot } from '@fortawesome/free-solid-svg-icons';

function Weather() {
  const [weather, setWeather] = useState('');
  const [weather2, setWeather2] = useState('');
  const [city, setCity] = useState('Toronto');
  const [error, setError] = useState(null);
  const API_KEY = '6accfd44f544ab9a098f5a425a7348b3';
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  const [nextSevenDays, setNextSevenDays] = useState([]);


  useEffect(() => {
    const API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;
    axios.get(API_URL).then(response => {
      let days = response.data.list;
      let nextSeven = [];
      for (let i = 0; i < days.length; i += 8) {
        nextSeven.push(days[i]);
      }
      setNextSevenDays(nextSeven);
    }).catch(error => {
      setError(error);
    });
  },[]);


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
        },
        error => {
            setError(error);
        }
    );
  }, [city]);
  
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.get(URL).then(res => {
      setWeather2(res.data);
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
      return <img src={clear} alt='Clear'/>;
    } else if (weather.weather[0].main === "Rain") {
      return <img src={rain} alt='Rain'/>;
    } else if (weather.weather[0].main === "Thunderstorm") {
      return <img src={storm} alt='Thunderstorm'/>;
    } else if (weather.weather[0].main === "Snow") {
      return <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='Snow'/>;
    } 
    else {
      return <img src={weather} alt='default'/>;
      }
  }
  



  return (
    <div className='main-container'>
      <div className='container'>
        <Header />
        <div className='weather-container'> 
        {error && <div className='error'>Error: {error.message}</div>}
          {weather.name && (
            <div className='weather'>
              <div className='icons'>{displayWeatherImg(weather)}</div>
              <span className='location'><FontAwesomeIcon icon={faLocationDot} /> {weather.name}, {weather.sys.country}</span>
              <span className='temp'> {Math.round(weather.main.temp)}°c</span>
              <p>Feels Like: {Math.round(weather.main.feels_like)}</p>
              <p>Weather condition: {weather.weather[0].main}</p>
              <h3>{dateBuilder(new Date())}</h3>
              
          </div>
          ) }
        </div>

        <div className='container2'>
          <div className='img'>
            <div className='days'>
              <ul>
                  {nextSevenDays.map((day, index)=>(
                    <li key={index}>
                      <p>{dateBuilder(new Date())}</p>
                      <span>{Math.round(day.main.temp)}°c</span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      

      {/* <form onSubmit={handleSubmit}>
                <label>
                    City:
                    <input type="text" value={city} onChange={e => setCity(e.target.value)} />
                </label>
                <button type="submit">Get Weather</button>
            </form>
            {weather2.name && (
                <div>
                    <p>City: {weather2.name}</p>
                    <p>Temperature: {weather2.main.temp}</p>
                    <p>Humidity: {weather2.main.humidity}</p>
                    <p>Feelings: {weather2.main.feels_like}</p>
          <p>Country: {weather2.sys.country}</p>
          <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather2.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
          <p>Weather condition: {weather2.weather[0].main}</p>
          <div>
            
          
          </div>

                </div>
            )} */}
            
          {/* <h3>Your Current Location</h3>
      {weather.name &&(
        <div>
          <p>City: {weather.name}</p>
          <p>temperature: {weather.main.temp}</p>
          <p>Feeling: {weather.main.feels_like}</p>
        </div>
      )} */}


    </div>
  );
}

export default Weather;
