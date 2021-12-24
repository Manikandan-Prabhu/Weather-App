let long;
let lat;
let temp = document.querySelector(".temp");
let loc = document.querySelector(".location");
let summary = document.querySelector(".summary");
let icon = document.querySelector(".icon");
const kelvin = 273;
window.addEventListener('load', () => {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;
            console.log(lat + " inside " +long);
        });
    }
});
document.querySelector(".btn").addEventListener('click', () =>{
    var city = document.getElementById("city").value;
    console.log("before if" + city);
    if(city==null || city==undefined || city==""){
        var xhr = new XMLHttpRequest();
        xhr.open('GET', "https://us1.locationiq.com/v1/reverse.php?key=pk.f0086f50b971be9121b8e9a907c6b14b&lat=" +
            lat + "&lon=" + long + "&format=json", true);
        xhr.send();
        xhr.onreadystatechange = processRequest;
        xhr.addEventListener("readystatechange", processRequest, false);
        function processRequest(){
            if(xhr.readyState==4 && xhr.status ==200){
                var response = JSON.parse(xhr.responseText);
                city = response.address.city;
                console.log(city);
                return;
            }
        }
    }
    //city = "london";
        console.log("outside if " + city);
        const api = "c66bf5c7f2c43bcd941ae103dc138c45";
        //const base = `http://api.openweathermap.org/data/2.5/weather?lat=lat&lon=long&appid=c66bf5c7f2c43bcd941ae103dc138c45`;
        const base = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c66bf5c7f2c43bcd941ae103dc138c45`;
        fetch(base)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          temp.textContent = 
              Math.floor(data.main.temp - kelvin) + "°C";
          summary.textContent = data.weather[0].description;
          loc.textContent = data.name + "," + data.sys.country ;
        });
});