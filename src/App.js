import React, { useState, useEffect} from 'react';
import Weather from './component/weather';
import Header from './component/header';
import './App.css';
import Days from './component/Days';
import Formulaire from './component/Formulaire';

 function App() {


  const [name, setName] = useState ('');
  const [temp, setTemp] = useState ('');
  const [wind, setWind] = useState ('');
  const [tempMin, setTempMin] = useState ('');
  const [tempMax, setTempMax] = useState ('');
  const [humidity, setHumidity] = useState ('');
  const [date, setDate] = useState ('');
  const [icon, setIcon] = useState ('');
  const [days, setDays] = useState('');
  const [result, setResult] = useState({});
  const [userInput, setUserInput] = useState('');

  const setData = (data) => { 

    setName(data.city.name);
    setTemp(data.list[0].main.temp);
    setTempMin(data.list[0].main.temp_max);
    setTempMax(data.list[0].main.temp_min);
    setHumidity(data.list[0].main.humidity);
    setWind(data.list[0].wind.speed);
    setResult(data)
    setDate(data.list[0].dt)
    setDays([
      data.list[0].dt + 86400,
      data.list[0].dt + (86400 * 2),
      data.list[0].dt + (86400 * 3),
      data.list[0].dt + (86400 * 4)
    ])
    setIcon(data.list[0].weather[0].icon)

  };

  function changeDay(timestamp) {
    result.list.forEach(element => {


      if(element.dt == timestamp){
        
        setTemp(element.main.temp)
        setTempMax(element.main.temp_max)
        setTempMin(element.main.temp_min)
        setHumidity(element.main.humidity)
        setWind(element.wind.speed)
        setIcon(element.weather[0].icon)
      }
    });
  }

    const handleSearch = (e) => {
      e.preventDefault()
      setUserInput(e.target.value)
    }

    if(name === ""){

    if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(getPosition);
    }


    function getPosition (position){
      fetch( `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=295ea2f7b1e72f0d8b7e167b77de0ecb&units=metric`)
      .then(res => res.json())
      .then(data => {
        setData(data)
      });
    }
  }

    const handleSubmit = (e) => {
      e.preventDefault()

      if (userInput !== ''){
      fetch( `https://api.openweathermap.org/data/2.5/forecast?q=${userInput}&appid=295ea2f7b1e72f0d8b7e167b77de0ecb&units=metric`)
      .then(res => res.json())
      .then(data => {
        setData(data)
      });
    }
    else{
     alert("Merci de renseigner une ville")
    }
  }  

  return (
    <div>

        <div>
          <Header />
        </div>
        <div>
          <Formulaire search={handleSearch} submit={handleSubmit} />
        </div>
        
        <div>
          <Weather name={name} temp={temp} tempMax={tempMax} tempMin={tempMin} humidity={humidity} wind={wind} icon= {icon} />
          <Days date= {date} changeDay={changeDay} nextDays={days} />
        </div>
        
    </div>
  );
}

export default App;
