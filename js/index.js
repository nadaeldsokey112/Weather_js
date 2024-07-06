
//today variables
const todayName = document.getElementById("today_date_day_name");
const todayNumber = document.getElementById("today_date_day_number");
const todayMonth = document.getElementById("today_date_day_month");
const todayLocation = document.getElementById("today_location");
const todayTemp = document.getElementById("today_temp");
const todayConditionText = document.getElementById("today_condition_text");
const todayConditionImg = document.getElementById("today_condition_img");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const windDirection = document.getElementById("windDirection");
let weatherDate;
//next date
const nextDay = document.querySelectorAll(".next_day_name");
const nextMaxTemp = document.querySelectorAll(".next_max_temp");
const nextMixTemp = document.querySelectorAll(".next_min_temp");
const nextConditionImg = document.querySelectorAll(".next_condition_img");
const nextConditionText = document.querySelectorAll(".next_condition_text");

let searchInput = document.getElementById("search");
//fetch API data
async function getWeatherData(cityName) {
    let weatherRequest = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${cityName}&days=3`);
   let weatherDate = await weatherRequest.json();
  return  weatherDate;
}
//display today data
function displayTodayData(data){
    console.log("hello");
    let todayDate = new Date();
todayName.innerHTML = todayDate.toLocaleDateString("en-US",{weekday:"long"});
todayNumber.innerHTML = todayDate.getDate();
todayMonth.innerHTML = todayDate.toLocaleDateString("en-Us",{month:"long"});
    todayLocation.innerHTML = data.location.name;
    todayTemp.innerHTML = data.current.temp_c;
    todayConditionImg.setAttribute("src",'https:' + data.current.condition.icon);
    todayConditionText.innerHTML = data.current.condition.text;
    humidity.innerHTML= data.current.humidity+"%";
    wind.innerHTML = data.current.wind_kph+"km/h";
    windDirection.innerHTML = data.current.wind_dir;
}
// //display Next data
function displayNextData(data){
let forecastday = data.forecast.forecastday;
for(let i = 0 ; i<2 ;i++){
    let nextDate = new Date(forecastday[i+1].date);
    nextDay[i].innerHTML = nextDate.toLocaleDateString("en-US", {weekday:"long"});
    nextMaxTemp[i].innerHTML = forecastday[i+1].day.maxtemp_c;
    nextMixTemp[i].innerHTML = forecastday[i+1].day.mintemp_c;
    nextConditionImg[i].setAttribute("src",'https:' +forecastday[i+1].day.condition.icon);
    nextConditionText[i].innerHTML = forecastday[i+1].day.condition.text;
}
}
//start App
async function startApp(city="cairo") {
  let weatherData = await getWeatherData(city) ;
 if(!weatherData.error){
    displayTodayData(weatherData);
    displayNextData(weatherData);
 }

}

searchInput.addEventListener("input", function(){
    startApp(searchInput.value);
})