export default class WeatherData {
  constructor(days, location) {
    this.Days = days;
    this.location = location
  }

  fetchData() {
    const API_KEY = "b213808fcb8d42e99a0232731221902";
    let loc = encodeURIComponent(this.location);
    return fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${loc}&days=${this.Days}`
    ).then(response =>{
      return response.json();
    })
  }

  async dataObject() {
    this.weatherData = await this.fetchData(this.location);
  }
}
