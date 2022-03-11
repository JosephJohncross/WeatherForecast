import { Modal } from "./Modal.js";
import WeatherData from "./WeatherData.js";

export class Today {
  constructor(day = 1) {
    this.day = day;
    this.container = document.querySelector("main");
  }

  async generatingData() {
    const searchInput = document.querySelector(".search-bar input").value;
    let value;
    if (searchInput === ""){
      value = "Abuja"
    }else{
      value = searchInput;
    }

    this.response = new WeatherData(this.day, value);
    this.arrOfForecast = [];
    await this.response.dataObject();
    this.result = this.response.weatherData;
    console.log(this.result);

    this.location = this.result.location;
    this.current = this.result.current;
    this.forecast = this.result.forecast;

    const weatherText = this.current.condition.text;
    const temperature = this.current.feelslike_c;

    //Supply hours by default
    const hours = new Date(this.location.localtime).getHours();

    const overnight = this.forecast.forecastday[0].hour["22"];

    for (let i = 0; i < this.day; i++) {
      const dayData = {
        name: this.location.name,
        minute: new Date(this.location.localtime).getMinutes(),
        hours: new Date(this.location.localtime).getHours(),
        day: (() => {
          switch (new Date(this.forecast.forecastday[i].date).getDay()) {
            case 1:
              return "Mon";
            case 2:
              return "Tue";
            case 3:
              return "Wed";
            case 4:
              return "Thur";
            case 5:
              return "Fri";
            case 6:
              return "Sat";
            case 0:
              return "Sun";
          }
        })(),
        mTemp: this.forecast.forecastday[i].hour["6"].temp_c,
        mImg: this.forecast.forecastday[i].hour["6"].condition.icon,
        aTemp: this.forecast.forecastday[i].hour["12"].temp_c,
        aImg: this.forecast.forecastday[i].hour["12"].icon,
        eTemp: this.forecast.forecastday[i].hour["4"].temp_c,
        eImg: this.forecast.forecastday[i].hour["4"].condition.icon,
        oTemp: this.forecast.forecastday[i].hour["22"].temp_c,
        oImg: this.forecast.forecastday[i].hour["22"].icon,
        weather: {
          dayTemp: this.forecast.forecastday[i].day.maxtemp_c,
          nightTemp: this.forecast.forecastday[i].day.mintemp_c,
          temperature: this.current.feelslike_c,
          pressure: this.current.pressure_mb,
          uv: this.current.uv,
          humidity: this.current.humidity,
          wind: this.current.wind_kph,
          "wind-direction": this.current.wind_dir,
          cloud: this.forecast.forecastday[i].hour[hours].cloud,
          dewpoint: this.forecast.forecastday[i].hour[hours].dewpoint_c,
        },
        astro: {
          "sunrise-current": this.forecast.forecastday[i].astro.sunrise,
          "sunset-current": this.forecast.forecastday[i].astro.sunset,
          "moon-phase": this.forecast.forecastday[i].astro.moon_phase,
          "moon-rise": this.forecast.forecastday[i].astro.moonrise,
          "moon-set": this.forecast.forecastday[i].astro.moonset,
        },
        date: {
          "is-day": this.current.is_day,
        },
        location: this.location.name,
        country: this.location.country,
        forecast: this.forecast.forecastday[i]
      };

      this.arrOfForecast.push(dayData);
    }
    console.log(this.arrOfForecast);

    this.generateSummary(this.arrOfForecast[1], temperature, weatherText);
    this.generateTodayForcast(this.arrOfForecast[1]);
    this.generateDetailedForcast(this.arrOfForecast[1]);
    // this.generateDailyForecast(this.arrOfForecast);

    document.querySelector(".country p").textContent =
      this.arrOfForecast[0].country;
  }

  generateSummary(dayData, temperature, weatherText) {
    const mod = new Modal(this.container);
    const modal = mod.generateModal("t-modal");

    let location;
    dayData.minute <= 9
      ? (location = `${dayData.name} As at ${dayData.hours}:0${dayData.minute}`)
      : (location = `${dayData.name} As at ${dayData.hours}:${dayData.minute}`);

    modal.innerHTML = `
        <div class="today-info">
            <div class="location">${location}</div>
            <span class="temperature">${temperature}<span>0</span></span>
            <span class="text">${weatherText}</span>

            <div class="day-night">
                <span id="day"> Day ${dayData.weather.dayTemp}</span>
                <span id="night"> .Night ${dayData.weather.nightTemp}</span>
            </div>

            <div class="weather-icon>
              <img src="" alt="weather icon">
            </div>
        </div>
        `;
  }
  generateTodayForcast(dayData) {
    const mod = new Modal(this.container);
    const modal = mod.generateModal("forecast-summary");

    modal.innerHTML = `
      <div class="title">Weather forecast in ${dayData.location}</div>
      
      <div class="day-period">
        <div class="morning">
          <p class="day-time">Morning</p>
          <span class="day-degree">${dayData.mTemp}<sup>0</sup></span>
          <i class="uil uil-cloud-moon"></i>
        </div>

        <div class="afternoon">
            <p class="day-time">Afternoon</p>
            <span class="day-degree">${dayData.aTemp}<sup>0</sup></span>
            <i class="uil uil-sun"></i>
        </div>
        <div class="evening">
            <p class="day-time">Evening</p>
            <span class="day-degree">${dayData.eTemp}<sup>0</sup></span>
            <i class="uil uil-sunset"></i>
        </div>
        <div class="overnight">
            <p class="day-time">Overnight</p>
            <span class="day-degree">${dayData.oTemp}<sup>0</sup></span>
            <i class="uil uil-moonset"></i>
        </div>

        <span class="div1"></span>
        <span class="div2"></span>
        <span class="div3"></span>  
      </div>
    `;
  }

  generateDetailedForcast(dayData) {
    const mod = new Modal(this.container);
    const modal = mod.generateModal("detailed-forecast");

    modal.innerHTML = `
    <div class="modal-title">Weather today in ${dayData.location}</div>
    <div class="temp-sunset">
        <span class="temperature">${dayData.weather.temperature}<span>0</span></span>
        <span class="text">Feels like</span>
    </div>

    <div class="temp-details-1">
      
      <div class="day-night condition">
        <div class="info">
          <i class="uil uil-temperature-plus"></i>
          <span>High/Low</span>
        </div>
        <div class="value">   
          <p>${dayData.weather.dayTemp}/${dayData.weather.nightTemp}</p>
        </div>
      </div>

      <div class="humidity condition">
        <div class="info">
          <i class="uil uil-tear"></i>
          <span>humidity</span>
        </div>
        <div class="value">   
          <p>${dayData.weather.humidity}%</p>
        </div>
      </div>

      <div class="pressure condition">
        <div class="info">
          <i class="uil uil-compress-v"></i>
          <span>pressure</span>
        </div>
        <div class="value">   
          <p>${dayData.weather.pressure}mb</p>
        </div>
      </div>

      <div class="wind condition">
        <div class="info">
          <i class="uil uil-wind"></i>
          <span>wind</span>
        </div>
        <div class="value">   
          <p>${dayData.weather.wind} km/h</p>
        </div>
      </div>
    </div>
    <div class="temp-details-2">  
      
      <div class="wind-direction condition">
          <div class="info">
            <i class="uil uil-sign-alt"></i>
            <span>wind direction</span>
          </div>
          <div class="value">   
            <p>${dayData.weather["wind-direction"]}</p>
          </div>
        </div>

      <div class="dewpoint condition">
          <div class="info">
            <i class="uil uil-tear"></i>
            <span>dewpoint</span>
          </div>
          <div class="value">   
            <p>${dayData.weather["dewpoint"]}<span>0</span></p>
          </div>
      </div>

      <div class="cloud condition">
          <div class="info">
           <i class="uil uil-clouds"></i>
            <span>cloud</span>
          </div>
          <div class="value">   
            <p>${dayData.weather.cloud}</p>
          </div>
      </div>

      <div class="uv condition">
          <div class="info">
            <i class="uil uil-brightness"></i>
            <span>uv</span>
          </div>
          <div class="value">   
            <p>${dayData.weather.uv} of 10</p>
          </div>
      </div>
    
    </div>
    `;
  }
}
