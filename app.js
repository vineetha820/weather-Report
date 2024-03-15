 let date=document.getElementById("date_time");
 function getDate(){
    let now=new Date(), 
    hour=now.getHours(),
    minute=now.getMinutes();
    let days=[
        "sunday","monday","tuesday","wednesday","thursday","friday","saturday"
    ]
    hour=hour%12;
    if(hour<10){
        hour="0"+hour
    }
    if(minute<10){
        minute="0"+minute;
    }
    let dayString=days[now.getDay()]
    return `${dayString},${hour}:${minute}`;

 }
date.innerText=getDate();
setInterval(()=>{
    date.innerText=getDate();
},1000);
let location1=document.querySelector(".location-name")
let searchForm=document.getElementById("search")
let search=document.getElementById("place")
let currentCity=""

function getPublicIp() {
    fetch("https://geolocation-db.com/json/", {
      method: "GET",
      headers: {},
    })
      .then((response) => response.json())
      .then((data) => {
        currentCity = data.city;
        getWeatherData(data.city)
      })
      .catch((err) => {
        console.error(err);
      });
  }
  
  getPublicIp();
  
  // function to get weather data
  function getWeatherData(city) {
    fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=EJ6UBL2JEQGYB3AA4ENASN62J&contentType=json`,
      {
        method: "GET",
        headers: {},
      }
    )
      .then((response) => response.json())
      .then((data) => {
        location1.innerText=data.resolvedAddress

 getUVIndex(data)
 getWindStatus(data)
 getSunsetSunrise(data)
 getHumidity(data)
 getVisibility(data)
 getVisibility(data)
 document.querySelector("#today").addEventListener("click",()=>{
    getHoursTemperature(data.days[0].hours)
    // console.log("hi")

 })

 weekTemperature(data.days);
 console.log(data)
 })
 .catch((error)=>{
    alert("city not found")
 })
}
        
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let location = search.value;
    if (location) {
      currentCity = location;
      getWeatherData(location);
    }
  });


//  fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=EJ6UBL2JEQGYB3AA4ENASN62J&contentType=json")
//  .then((res)=>{  return res.json()})
//  .then((data)=>{
    
//  location1.innerText=data.resolvedAddress

//  getUVIndex(data)
//  getWindStatus(data)
//  getSunsetSunrise(data)
//  getHumidity(data)
//  getVisibility(data)
//  getVisibility(data)
//  document.querySelector("#today").addEventListener("click",()=>{
//     getHoursTemperature(data.days[0].hours)
//     // console.log("hi")

//  })

//  weekTemperature(data.days);
//  console.log(data)
//  })
//  .catch((error)=>{
//     console.log("hello")
//  })
 
 
 function weekTemperature(week){
    let saturday=document.getElementById("saturday")
let sunday=document.getElementById("sunday")
let monday=document.getElementById("monday")
let tuesday=document.getElementById("tuesday")
let wednesday=document.getElementById("wednesday")
let thurday=document.getElementById("thursday")
let friday=document.getElementById("friday")
 let day=week.map((temp)=>{
     return temp.temp
 })
 
 saturday.innerText=day[0]
 sunday.innerText=day[1]
 monday.innerText=day[2]
 tuesday.innerText=day[3]
 wednesday.innerText=day[4]
 thurday.innerText=day[5]
 friday.innerText=day[6] 

 let icon=week.map((icon=>{
    let name=icon.icon
    if(name=="partly-cloudy-day"){
        return "https://i.ibb.co/PZQXH8V/27.png"
    }
    else if(name=="partly-cloudy-night"){
        return  "https://i.ibb.co/Kzkk59k/15.png"
        }
    else if(name=="rain") {
        return "https://i.ibb.co/kBd2NTS/39.png"
    } 
    else if(name=="clear-day"){
        return "https://i.ibb.co/rb4rrJL/26.png"
    } else if(name=="clear-night"){
        return "https://i.ibb.co/1nxNGHL/10.png"
    }
    else{
        return "https://i.ibb.co/PZQXH8V/27.png"
    }
 }))
 document.getElementById("day1").src=icon[0]
 document.getElementById("day2").src=icon[1]
 document.getElementById("day3").src=icon[2]
 document.getElementById("day4").src=icon[3]
 document.getElementById("day5").src=icon[4]
 document.getElementById("day6").src=icon[5]
 document.getElementById("day7").src=icon[6]
 }
 function getUVIndex(data){
    let uvindex=document.getElementById("uvIndex")
    let specification=document.querySelector(".uvIndex")
     let index=data.days[0]["uvindex"]
 uvindex.innerText=index
 if(index<3){
   specification.innerText="low"
 }
 else if(index>=3 && index<=6){
    specification.innerText="moderate"
 }
 else{
    specification.innerText="high"
 }
 }
 function getWindStatus(data){
    let windStatus=document.getElementById("windStatus")
    windStatus.innerText=data.days[0]["windspeed"]
    
 }
 function getSunsetSunrise(data){
    let suunset=document.getElementById("sunset")
    let sunrise=document.getElementById("sunrise")
    sunrise.innerText=data.days[0]["sunrise"]
    suunset.innerText=data.days[0]["sunset"]
 }
 function getHumidity(data){
    let humidity=document.getElementById("humidity")
    let specification=document.querySelector(".humidity")
     let humidityLevel=data.days[0]["humidity"]
    humidity.innerText=humidityLevel
    if(humidityLevel<=60){
        specification.innerText="low"

    }else{
        specification.innerText="high"
    }

 }
 function getVisibility(data){
    let visibility=document.getElementById("visibility")
    let specification=document.querySelector(".visibility")
    let visibilityRange=data.days[0]["visibility"]
    visibility.innerText=visibilityRange
    if(visibilityRange<0.03){
        specification.innerText="Dense Fog"
    }
    else if(visibilityRange>=0.04 && visibilityRange<=0.16){
        specification.innerText="Moderate Fog"
    }
    else if(visibilityRange>=0.17 && visibilityRange<=0.35){
        specification.innerText="LightFog"
    }
    else if(visibilityRange>=0.36 && visibilityRange<=1.13){
        specification.innerText="very Light fog"
    }else if(visibilityRange>=1.14 && visibilityRange<=2.16){
        specification.innerText="Light Mist"
    }
    else if(visibilityRange>=2.17 && visibilityRange<=5.4){
        specification.innerText="very Light Mist"
    }
    else if(visibilityRange>=5.41 && visibilityRange<=10.8){
        specification.innerText="clear Air"
    }
    else {
        specification.innerText="very Clear Air"
    }
 }
 function getHoursTemperature(data){
    let temp=data.map((temp)=>{
        return temp.temp
    })
    console.log(temp)
    document.querySelector("#hour1 p").innerText=temp[0]
    document.querySelector("#hour2 p").innerText=temp[1]
    document.querySelector("#hour3 p").innerText=temp[2]
    document.querySelector("#hour4 p").innerText=temp[3]
    document.querySelector("#hour5 p").innerText=temp[4]
    document.querySelector("#hour6 p").innerText=temp[5]
    document.querySelector("#hour7 p").innerText=temp[6]
    document.querySelector("#hour8 p").innerText=temp[7]
    document.querySelector("#hour9 p").innerText=temp[8]
    document.querySelector("#hour10 p").innerText=temp[9]
    document.querySelector("#hour11 p").innerText=temp[10]
    document.querySelector("#hour12 p").innerText=temp[11]
    document.querySelector("#hour13 p").innerText=temp[12]
    document.querySelector("#hour14 p").innerText=temp[13]
    document.querySelector("#hour15 p").innerText=temp[14]
    document.querySelector("#hour16 p").innerText=temp[15]
    document.querySelector("#hour17 p").innerText=temp[16]
    document.querySelector("#hour18 p").innerText=temp[17]
    document.querySelector("#hour19 p").innerText=temp[18]
    document.querySelector("#hour20 p").innerText=temp[19]
    document.querySelector("#hour21 p").innerText=temp[20]
    document.querySelector("#hour22 p").innerText=temp[21]
    document.querySelector("#hour23 p").innerText=temp[22]
    document.querySelector("#hour24 p").innerText=temp[23]
    let icon=data.map((icon=>{
        let name=icon.icon
        if(name=="partly-cloudy-day"){
            return "https://i.ibb.co/PZQXH8V/27.png"
        }
        else if(name=="partly-cloudy-night"){
            return  "https://i.ibb.co/Kzkk59k/15.png"
            }
        else if(name=="rain") {
            return "https://i.ibb.co/kBd2NTS/39.png"
        } 
        else if(name=="clear-day"){
            return "https://i.ibb.co/rb4rrJL/26.png"
        } else if(name=="clear-night"){
            return "https://i.ibb.co/1nxNGHL/10.png"
        }
        else{
            return "https://i.ibb.co/PZQXH8V/27.png"
        }
     }))
    document.querySelector("#hour1 img").src=icon[0]
    document.querySelector("#hour2 img").src=icon[1]
    document.querySelector("#hour3 img").src=icon[2]
    document.querySelector("#hour4 img").src=icon[3]
    document.querySelector("#hour5 img").src=icon[4]
    document.querySelector("#hour6 img").src=icon[5]
    document.querySelector("#hour7 img").src=icon[6]
    document.querySelector("#hour8 img").src=icon[7]
    document.querySelector("#hour9 img").src=icon[8]
    document.querySelector("#hour10 img").src=icon[9]
    document.querySelector("#hour11 img").src=icon[10]
    document.querySelector("#hour12 img").src=icon[11]
    document.querySelector("#hour13 img").src=icon[12]
    document.querySelector("#hour14 img").src=icon[13]
    document.querySelector("#hour15 img").src=icon[14]
    document.querySelector("#hour16 img").src=icon[15]
    document.querySelector("#hour17 img").src=icon[16]
    document.querySelector("#hour18 img").src=icon[17]
    document.querySelector("#hour19 img").src=icon[18]
    document.querySelector("#hour20 img").src=icon[19]
    document.querySelector("#hour21 img").src=icon[20]
    document.querySelector("#hour22 img").src=icon[21]
    document.querySelector("#hour23 img").src=icon[22]
    document.querySelector("#hour24 img").src=icon[23]
     

 }
 
 
  