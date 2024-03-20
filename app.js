let date = document.getElementById("date_time");
let currentTab = "week";


function toggleTab(tabName, currentCity = null) {
    currentTab = tabName
    const tabId = tabName + 'Tab'
    var tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(function (tab) {
        if (tab.id !== tabId) {
            tab.style.display = 'none';
        } else {
            tab.style.display = 'block';
        }
    });
    // Show the selected tab
    let location = document.getElementById("place").value;
    if (currentCity) {
        location = currentCity
    }
    getWeatherData(location, tabName === "week")
    
}


// function to get date and time
function getDate() {
    let now = new Date(),
        hour = now.getHours(),
        minute = now.getMinutes();
    let days = [
        "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"
    ]
    hour = hour % 12;
    if (hour < 10) {
        hour = "0" + hour
    }
    if (minute < 10) {
        minute = "0" + minute;
    }
    let dayString = days[now.getDay()]
    return `${dayString},${hour}:${minute}`;

}
date.innerText = getDate();
setInterval(() => {
    date.innerText = getDate();
}, 1000);


let location1 = document.querySelector(".location-name")
let condition=document.getElementById("condition")
let rain=document.getElementById("rain")
let searchForm = document.getElementById("search")
let mainIcon=document.getElementById("today_cloud")
let today_temperature=document.getElementById("temp")
let today_active=document.getElementById("todayTab")
let week_active=document.getElementById("weekTab")
let currentCity = ""


//function to get the cuurent city
function getPublicIp() {
    fetch("https://geolocation-db.com/json/", {
        method: "GET",
        headers: {},
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            currentCity = data.city;
            
            toggleTab("week", currentCity)
             getWeatherData(data.city, currentTab === "week");
        })
        .catch((err) => {
            console.error(err);
        });
}
getPublicIp()



// function to get weather data
function getWeatherData(city, week = false) {
    fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}%7Bcity%7D?unitGroup=metric&key=FTCHXFVF4YFLNERJWDXWHHQMJ&contentType=json`,
 
        {
            method: "GET",
            headers: {},
        }
    )
        .then((response) => response.json())
        .then((data) => {
            
            
            let today=data.currentConditions
           

            location1.innerText = data.resolvedAddress
            condition.innerText = today.conditions;
            today_temperature.innerText=today.temp
            rain.innerText = "Perc - " + today.precip + "%";
            
            getUVIndex(today)
            getWindStatus(today)
            getSunsetSunrise(today)
            getHumidity(today)
            getVisibility(today)
            
            updateAirQualityStatus(today);
            mainIcon.src = getIcon(today.icon);
            changeBackground(today.icon);

            if (week) {
                
                weekTemperature(data.days);
            } else {
                getHoursTemperature(data.days[0].hours)
            }
            changeTemperature(data.days,data.days[0].hours,today.temp)
            
        })
        .catch((error) => {
            alert("city not found")
          })
 }



searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let search = document.getElementById("place")
    let location = search.value;
    if (location) {
        currentCity = location;
        getWeatherData(location, currentTab === "week");
    }
});
// function to change slide today icon
function getIcon(condition) {
    if (condition === "partly-cloudy-day") {
      return "https://i.ibb.co/PZQXH8V/27.png";
    } else if (condition === "partly-cloudy-night") {
      return "https://i.ibb.co/Kzkk59k/15.png";
    } else if (condition === "rain") {
      return "https://i.ibb.co/kBd2NTS/39.png";
    } else if (condition === "clear-day") {
      return "https://i.ibb.co/rb4rrJL/26.png";
    } else if (condition === "clear-night") {
      return "https://i.ibb.co/1nxNGHL/10.png";
    } else {
      return "https://i.ibb.co/rb4rrJL/26.png";
    }
  }

//   function to change background image
  function changeBackground(condition) {
   
    const body = document.querySelector("body");
    let bg = "";
    if (condition === "partly-cloudy-day") {
      bg = "https://i.ibb.co/qNv7NxZ/pc.webp";
    } else if (condition === "partly-cloudy-night") {
      bg = "https://i.ibb.co/RDfPqXz/pcn.jpg";
    } else if (condition === "rain") {
      bg = "https://i.ibb.co/h2p6Yhd/rain.webp";
    } else if (condition === "clear-day") {
      bg = "https://i.ibb.co/WGry01m/cd.jpg";
    } else if (condition === "clear-night") {
      bg = "https://i.ibb.co/kqtZ1Gx/cn.jpg";
    } else {
      bg = "https://i.ibb.co/qNv7NxZ/pc.webp";
    }
    body.style.backgroundImage = `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),url(${bg})`;
  }

// function to change week temperature 
function weekTemperature(week) {
  
    
    let day = week.map((temp) => {
         return temp.temp
     })
     for (var i = 1; i <= 7; i++) {
        var hourElement = document.querySelector("#days" + i + " p");
        
        if (hourElement) {
            hourElement.innerText = day[i - 1];
        }
    }
    var celsiusElements = document.getElementsByClassName("fahrenCelsius");

// to change Loop through each celsius element
for (var i = 0; i < celsiusElements.length; i++) {
    // Set the inner text of each celsius element to "°C"
    celsiusElements[i].innerText = "°C";
}
// function to change week images
    let icon = week.map((icon => {
        let name = icon.icon
        if (name == "partly-cloudy-day") {
            return "https://i.ibb.co/PZQXH8V/27.png"
        }
        else if (name == "partly-cloudy-night") {
            return "https://i.ibb.co/Kzkk59k/15.png"
        }
        else if (name == "rain") {
            return "https://i.ibb.co/kBd2NTS/39.png"
        }
        else if (name == "clear-day") {
            return "https://i.ibb.co/rb4rrJL/26.png"
        } else if (name == "clear-night") {
            return "https://i.ibb.co/1nxNGHL/10.png"
        }
        else {
            return "https://i.ibb.co/PZQXH8V/27.png"
        }
    }))
    for (var i = 1; i <= 7; i++) {
        var hourElement = document.querySelector("#day" + i );
        
        if (hourElement) {
            hourElement.src = icon[i - 1];
        }
    }
    
}
// function to get uv index
function getUVIndex(today) {
    let uvindex = document.getElementById("uvIndex")
    let specification = document.querySelector(".uvIndex")
    let index = today.uvindex
    uvindex.innerText = index
    if (index < 3) {
        specification.innerText = "low"
    }
    else if (index >= 3 && index <= 6) {
        specification.innerText = "moderate"
    }
    else {
        specification.innerText = "high"
    }
}
// function to get wind status
function getWindStatus(today) {
    let windStatus = document.getElementById("windStatus")
    windStatus.innerText = today.windspeed
}
// function to get sunsetsunrise
function getSunsetSunrise(today) {
    let suunset = document.getElementById("sunset")
    let sunrise = document.getElementById("sunrise")
    sunrise.innerText = today.sunrise
    suunset.innerText = today.sunset
}
// function to get humidity
function getHumidity(today) {
    let humidity = document.getElementById("humidity")
    let specification = document.querySelector(".humidity")
    let humidityLevel = today.humidity
    humidity.innerText = humidityLevel
    if (humidityLevel <= 60) {
        specification.innerText = "low"

    } else {
        specification.innerText = "high"
    }
}
// function to get visibility
function getVisibility(today) {
    let visibility = document.getElementById("visibility")
    let specification = document.querySelector(".visibility")
    let visibilityRange = today.visibility
    visibility.innerText = visibilityRange
    if (visibilityRange < 0.03) {
        specification.innerText = "Dense Fog"
    }
    else if (visibilityRange >= 0.04 && visibilityRange <= 0.16) {
        specification.innerText = "Moderate Fog"
    }
    else if (visibilityRange >= 0.17 && visibilityRange <= 0.35) {
        specification.innerText = "LightFog"
    }
    else if (visibilityRange >= 0.36 && visibilityRange <= 1.13) {
        specification.innerText = "very Light fog"
    } else if (visibilityRange >= 1.14 && visibilityRange <= 2.16) {
        specification.innerText = "Light Mist"
    }
    else if (visibilityRange >= 2.17 && visibilityRange <= 5.4) {
        specification.innerText = "very Light Mist"
    }
    else if (visibilityRange >= 5.41 && visibilityRange <= 10.8) {
        specification.innerText = "clear Air"
    }
    else {
        specification.innerText = "very Clear Air"
    }
}
// function to get airquality
function updateAirQualityStatus(today) {
    let airQuality=document.getElementById("airQality")
    let airQualityStatus=document.getElementById("airQualityStatus")
    let airquality=today.winddir
    airQuality.innerText = airquality;
    if (airquality <=50) {
      airQualityStatus.innerText = "Good👌";
    } else if ( airquality>50 && airquality <= 100) {
      airQualityStatus.innerText = "Moderate😐";
    } else if ( airquality>100 && airquality <= 150) {
      airQualityStatus.innerText = "Unhealthy for Sensitive Groups😷";
    } else if ( airquality>150 && airquality <= 200) {
      airQualityStatus.innerText = "Unhealthy😷";
    } else if ( airquality>200 && airquality <= 250) {
      airQualityStatus.innerText = "Very Unhealthy😨";
    } else {
      airQualityStatus.innerText = "Hazardous😱";
    }
  }
//   function to change week temeprature
function getHoursTemperature(data) {
   
    let temp = data.map((temp) => {
        return temp.temp
    })
   
    
var celsiusElements = document.getElementsByClassName("fahrenCelsius");


for (var i = 0; i < celsiusElements.length; i++) {
    
    celsiusElements[i].innerText = "°C";
}

// Get the temperature unit elements


    // Loop through each hour div and set the temperature value
for (var i = 1; i <= 24; i++) {
    var hourElement = document.querySelector("#hour" + i + " p");
    if (hourElement) {
        hourElement.innerText = temp[i - 1];
    }
}
    
    let icon = data.map((icon => {
        let name = icon.icon
        if (name == "partly-cloudy-day") {
            return "https://i.ibb.co/PZQXH8V/27.png"
        }
        else if (name == "partly-cloudy-night") {
            return "https://i.ibb.co/Kzkk59k/15.png"
        }
        else if (name == "rain") {
            return "https://i.ibb.co/kBd2NTS/39.png"
        }
        else if (name == "clear-day") {
            return "https://i.ibb.co/rb4rrJL/26.png"
        } else if (name == "clear-night") {
            return "https://i.ibb.co/1nxNGHL/10.png"
        }
        else {
            return "https://i.ibb.co/PZQXH8V/27.png"
        }
    }))
    for (var i = 1; i <= 24; i++) {
        var hourElement = document.querySelector("#hour" + i + " img");
        if (hourElement) {
            hourElement.src = icon[i - 1];
        }
    }
        
    
}

//  function to change celsiusToFahrenheit formula  
    function celsiusToFahrenheit(celsius) {
        var fahrenheit = (celsius * 9/5) + 32;
        return fahrenheit;
    }
    
    
  
  function changeTemperature(week,data,today){
    let celsius=document.getElementById("celsius")
    let fahrenheit=document.getElementById("fahrenhiet")

    celsius.addEventListener("click",()=>{
        let temp = data.map((temp) => {
            return temp.temp
        })
        // Loop through each hour div and set the temperature value
    for (var i = 1; i <= 24; i++) {
        var hourElement = document.querySelector("#hour" + i + " p");
        if (hourElement) {
            hourElement.innerText = temp[i - 1];
        }
       
    }
    var celsiusElements = document.getElementsByClassName("fahrenCelsius");
    
    
    for (var i = 0; i < celsiusElements.length; i++) {
        
        celsiusElements[i].innerText = "°C";
    }
    let day = week.map((temp) => {
        return temp.temp
    })
    for (var i = 1; i <= 7; i++) {
       var hourElement = document.querySelector("#days" + i + " p");
       
       if (hourElement) {
           hourElement.innerText = day[i - 1];
       }
   }
   today_temperature.innerText=today
   celsius.classList.add('active')
   fahrenheit.classList.remove('active')
})


    fahrenheit.addEventListener("click",()=>{
         fahrenheit.classList.add('active')
         celsius.classList.remove('active')
        let day = week.map((temp) => {
            return temp.temp
        })
       

        for (var i = 1; i <= 7; i++) {
           var hourElement = document.querySelector("#days" + i + " p");
           
           if (hourElement) {
               hourElement.innerText = celsiusToFahrenheit(day[i-1]).toFixed()
           }
       }
       let temp = data.map((temp) => {
        return temp.temp
    })
    for (var i = 1; i <= 24; i++) {
        var hourElement = document.querySelector("#hour" + i + " p");
        if (hourElement) {
            hourElement.innerText = celsiusToFahrenheit(temp[i-1]).toFixed();
        }
    }
       var celsiusElements = document.getElementsByClassName("fahrenCelsius");
   // Loop through each celsius element
   for (var i = 0; i < celsiusElements.length; i++) {
       // Set the inner text of each celsius element to "°C"
       celsiusElements[i].innerText = "°F";
   }
   today_temperature.innerText= celsiusToFahrenheit(today).toFixed();})
}





