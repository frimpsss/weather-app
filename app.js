
// seting date and time
const days = [
    'Sunday',
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
]
const months = [
    "January",
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    "October",
    'November',
    'December'
]
const time = document.querySelector('.time')
const currDate = document.querySelector(".date")
const greeting = document.querySelector('.greeting')
function setDate(){
    let today = new Date()
    time.textContent = `${formatTime(today.getHours())}:${formatTime(today.getMinutes())} G.M.T`
    currDate.textContent = `${days[today.getDay()]}, ${months[today.getMonth()]} ${today.getDate()} ${today.getFullYear()}`
    if(today.getHours() < 12){
        greeting.innerHTML = `<ion-icon name="sunny-outline"></ion-icon> <span>Good morning!</span>`
    }
    else if(today.getHours() > 12 && today.getHours() < 18){
        greeting.innerHTML = `<ion-icon name="sunny-outline"></ion-icon> <span>Good afternoon!</span>`
    }
    else{
        greeting.innerHTML = `<ion-icon name="moon-sharp"></ion-icon> <span>Good evening!</span>`
    }
}
setInterval(setDate, 1000)
function formatTime(tme){
    if(tme < 10){
        return `0${tme}`
    }
    else{
        return tme
    }
}
formatTime(1)
let userInput = document.querySelector('#city')
let btn = document.querySelector('.submit')
btn.addEventListener('click', getData)


// api stuff
function getData(){
    let  weather = {
        city: userInput.value,
        apiKey: '8cf6ce61028bea06fdb26ded40ed970d'
    
    }
    let apiData
    let url = `https://api.openweathermap.org/data/2.5/find?q=${weather.city}&units=metric&appid=${weather.apiKey}`
    fetch(url)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            const locCard = document.querySelector('.loc')
            const wsCard = document.querySelector('.ws')
            const temCard = document.querySelector('.tem')
            const humCard = document.querySelector('.hum')
            const wdCard = document.querySelector('.wd')
            const preCard = document.querySelector('.pre')
            const loc = document.querySelector('.location h4')
            const temperature = document.querySelector('.temperature')
            const desc = document.querySelector('.discription')
    
    
            //temp pressure humidity
            let apiData = data.list[0].main
            console.log(apiData)
            preCard.innerHTML = `<p class="pre">${apiData.pressure} <span class="unit">hPa</span></p>`
            temCard.innerHTML = `<p class="tem">${apiData.temp} <span class="unit">°C</span></p>`
            humCard.innerHTML = `<p class="hum">${apiData.humidity} <span class="unit">%</span></p>`
            temperature.innerHTML = `<h4>${apiData.temp}°<sup>c</sup></h4>`
            //location
            let location = data.list[0].name
            loc.textContent = location
            // co-ordinates
            let codLat = data.list[0].coord.lat
            let codLong = data.list[0].coord.lon
            locCard.innerHTML = `<p class="loc">${codLong.toFixed(2)} <span class="unit"><sup>°</sup></span> ${codLat.toFixed(2)}<span class="unit"><sup>°</sup></span></p>`
    
            //description
            let description = (data.list[0].weather[0].description)
            desc.textContent = description
    
            // param for icon description
            let icon = data.list[0].weather[0].main
            let pic = document.querySelector('.icon img')
            if(icon == 'Clouds'){
                pic.src = './assets/clouds-svgrepo-com.svg'
            }
            else if(icon == 'Rain'){
                pic.src = './assets/rain-svgrepo-com.svg'
            }
            // winddirection
            
            wdCard.innerHTML = `<p class="wd">${data.list[0].wind.deg} <span class="unit">°</span></p>`
    
            //wind speed
            wsCard.innerHTML = `<p class="ws">${data.list[0].wind.speed} <span class="unit">ms<sup>-1</sup></span></p>`
        })
}
