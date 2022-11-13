let searchbox=document.querySelector("#searchbox");
let searchboxtext=document.querySelector("#searchboxtext");
let city=document.querySelector("#cityname");
let date=document.querySelector("#date");
let temperature=document.querySelector("#temperature");
let weather_today=document.querySelector("#weather");
let range=document.querySelector("#high-low");
let icon_symbol=document.querySelector("#symbol");

const DAYS = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
]

const MONTHS = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const msg="hi";

function searchCity(location){
    const apiKey = '4b56d0c259e2077188f8ca43d5e06dae'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if(data.cod=="404") {
                window.alert(data.message);
                return;
            }
            setValues(data);
        })
    .catch(() => {
        msg.textContent = "Please enter a valid city!";
    });
}

function setValues(data){
    const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    city.innerHTML=`${data.name}, ${data.sys.country}`;
    temperature.innerHTML=`${Math.round(data.main.temp)}°C `;
    weather_today.innerHTML=`${data.weather[0].main}`;
    icon_symbol.innerHTML=`<img id="graphic" src=${icon} alt="image2">`;
    range.innerHTML=`${Math.round(data.main.temp_min)}°C / ${Math.round(data.main.temp_max)}°C `;

    const date_value=new Date();
    date.innerHTML=`${DAYS[date_value.getDay()]} ${date_value.getDate()} ${MONTHS[date_value.getMonth()]} ${date_value.getFullYear()}`;

    const url = `https://restcountries.com/v3.1/alpha/${data.sys.country}`;
    fetch(url)
        .then(response => response.json())
        .then(full_name => {
            city.innerHTML=`${data.name}, ${full_name[0].name.common}`;
        })
    .catch(()=>{
        msg.textContent = "Invalid country code!";

    });
}

searchbox.addEventListener( 'keypress', event => {
    if (event.key==='Enter'){
        const location=searchboxtext.value;
        searchCity(location);
    }
});

//Default
searchCity("Pune");