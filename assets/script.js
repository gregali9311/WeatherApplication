    var currentcityname = document.querySelector(".currentcityname")
    var date = document.querySelector(".date")
    var temp = document.querySelector(".temp")
    var wind = document.querySelector(".wind")
    var humidity = document.querySelector(".humidity")
    var uvindex = document.querySelector(".uvindex")
    var cardsection = document.querySelector("#containscards")
    var todaydate = moment().format("MM-DD-YY");
    var searchbtn=document.querySelector(".searchbtn")
    var cityinput=document.querySelector(".cityinput")
    var rcntsearch=document.querySelector("#cityname")
    var leftsect= document.querySelector("#leftsection");

    var cityname = ""; 
    var newcitlat ="";
    var newcitlong = "";  
    var newrequestURL ="";
    

for( var i=0; i<5; i++){

}

    searchbtn.addEventListener("click", function(){
        cityname = cityinput.value;
        currentcityname.textContent = "Current City: " + cityname; 
        var newsearch = document.createElement("p");
        newsearch.setAttribute("id", "cityname");
        leftsect.appendChild(newsearch);
        newsearch.textContent= cityname;
        var options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'a7b9e37ff6mshc3b54a3aa9b0b56p1f1a11jsn81d4303c55c9',
                'X-RapidAPI-Host': 'spott.p.rapidapi.com'
            }
        };
        fetch("https://spott.p.rapidapi.com/places/autocomplete?limit=1&skip=0&country=US%2CCA&q=" + cityname + "&type=CITY", options)
        .then(function (response){
            return response.json();
            console.log(response);
        
        })
        .then(function (data) {
            console.log(data);
            displaybtndata(data);
            });
            

            var displaybtndata = function(data){
                newcitlat= data[0].coordinates.latitude;
                newcitlong= data[0].coordinates.longitude;
                console.log(newcitlat);
                console.log(newcitlong);
                newrequestURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + newcitlat+ "&lon=" + newcitlong + "&units=imperial&appid=d5b94023e51e40b99d8629839fd2a07e";
                
                fetch(newrequestURL)
                .then(function (response){
                    return response.json();
                    console.log(response);
                })
                .then(function (data) {
                    console.log(data);
                    displaycurrent(data.current);
                    displayforecastafterbutton(data.daily);
                    
                });
            }
    });



    // var requestUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + newcitlat+ "&lon=" + newcitlong + "&units=imperial&appid=d5b94023e51e40b99d8629839fd2a07e"

    // fetch(requestUrl)
    // .then(function (response){
    //     return response.json();
    //     console.log(response);
    // })
    // .then(function (data) {
    //     console.log(data);
    //     displaycurrent(data.current);
    //     displayforecast(data.daily)
        
    // });


    var requestUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=33.448376&lon=-112.074036&units=imperial&appid=d5b94023e51e40b99d8629839fd2a07e";

    fetch(requestUrl)
    .then(function (response){
        return response.json();
        console.log(response);
    })
    .then(function (data) {
        console.log(data);
        displaycurrent(data.current);
        displayforecast(data.daily);
        
    });
    var displaycurrent = function (current){
  
        temp.textContent = "Current Temperature: " + current.temp + " degrees";
        wind.textContent = "Current Wind Speeds: " + current.wind_speed +" mph";
        humidity.textContent = "Current humidity: " + current.humidity + " percent";
        uvindex.textContent = "Current UVI: " + current.uvi;
        date.textContent= "Current Time: " + moment().format("h:mm a");
        
    };

    var displayforecast = function(daily){
        for ( var i=1; i< 6; i++){

 

            var forecastEl = document.createElement("section");
            var datefore = document.createElement("p");
            var iconfore =document.createElement("p");
            var tempfore = document.createElement("p");
            var humidfore = document.createElement("p");
            var windfore = document.createElement("p");
        
            forecastEl.setAttribute("id", "cardsection")
            
            // iconfore.setAttribute("id", "iconimage");
            // var iconimage = document.querySelector("#iconimage");
            // iconimage.innerHTML ="Test123";
        
            cardsection.appendChild(forecastEl);
            forecastEl.appendChild(datefore);   
            forecastEl.appendChild(iconfore);
            forecastEl.appendChild(tempfore);
            forecastEl.appendChild(humidfore);
            forecastEl.appendChild(windfore);


                datefore.innerHTML = "Phoenix " + "Date: " +  moment().add(i,'d').format("MM-DD-YY");
                tempfore.innerHTML = "Temp: " + daily[i].temp.day;
                humidfore.innerHTML = "Humidity: " + daily[i].humidity;
                windfore.innerHTML =" Wind Speed: " +  daily[i].wind_speed;

        };
    };


    var displayforecastafterbutton = function(daily){
        for ( var i=1; i< 6; i++){

            document.getElementById("cardsection").style.display = "";
          

            forecastEl = document.createElement("section");
            datefore = document.createElement("p");
            iconfore =document.createElement("p");
            tempfore = document.createElement("p");
            humidfore = document.createElement("p");
            windfore = document.createElement("p");
        
            forecastEl.setAttribute("id", "cardsection")
            
            // iconfore.setAttribute("id", "iconimage");
            // var iconimage = document.querySelector("#iconimage");
            // iconimage.innerHTML ="Test123";
        
            cardsection.appendChild(forecastEl);
            forecastEl.appendChild(datefore);   
            forecastEl.appendChild(iconfore);
            forecastEl.appendChild(tempfore);
            forecastEl.appendChild(humidfore);
            forecastEl.appendChild(windfore);


                datefore.innerHTML = cityname+ " Date: " + moment().add(i,'d').format("MM-DD-YY");
                tempfore.innerHTML = "Temp: " + daily[i].temp.day;
                humidfore.innerHTML = "Humidity: " + daily[i].humidity;
                windfore.innerHTML =" Wind Speed: " +  daily[i].wind_speed;

        };
    };




    
