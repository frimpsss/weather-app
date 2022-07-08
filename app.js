
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
let userInput = document.querySelector("#city")
const inputform = document.querySelector(".search form")


inputform.addEventListener("submit", (e) =>{
    e.preventDefault()
    const city = userInput.value 
    if(checkEmptyValues(city)){
        displayMessage("Empty Values", "#FF5733 ",2000)
        userInput.value = ""
    }
    else{
        displayMessage("Loading...", "#98FB98", 700)
        getWeatherData(city)
        userInput.value = ""
    }
    

})



// check for all space input
function checkEmptyValues(str){
    let len = str.length
    let newStr = ''
    for(var i = 0; i < len; ++i){
        newStr += " "
    }

    if(str === newStr){
        return true
    }
}


/// small alert boc

function displayMessage(string, backround, time){
    let message = document.querySelector(".message")
    message.style.display = "grid"
    message.style.backgroundColor = backround
    message.textContent = string

    setTimeout(()=>{
        message.style.display = "none"
    }, time)
}
//api things
async function getWeatherData(city){
    const apiData = {
        key: '8cf6ce61028bea06fdb26ded40ed970d',
        city
    }

    const url = `https://api.openweathermap.org/data/2.5/find?q=${apiData.city}&units=metric&appid=${apiData.key}`

    const jsonData = await fetch(url)
    const objectData = await jsonData.json()
    
    // destucturing api data
    const{list,cod } = objectData

    if(cod == 200){
        if(list.length == 0){
            displayMessage(`${city.toUpperCase()} does not exist!`, "#FF5733 ", 3000)
        }
        else{
            // destructuring list 
            const{name, main: {temp, pressure, humidity}, wind: {speed, deg}, weather, sys: {country}, coord: {lon, lat}} = list[0]
            const{id, description, icon} = weather[0]
            // console.log(name, temp, pressure, humidity, speed, deg, id, description, icon)
            if(!icon){
                const iconImage = `
                <svg version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
                <rect x="20" y="50" width="4" height="10" fill="#fff">
                      <animateTransform attributeType="xml"
                      attributeName="transform" type="translate"
                        values="0 0; 0 20; 0 0"
                        begin="0" dur="0.6s" repeatCount="indefinite" />
                        </rect>
                    <rect x="30" y="50" width="4" height="10" fill="#fff">
                      <animateTransform attributeType="xml"
                        attributeName="transform" type="translate"
                        values="0 0; 0 20; 0 0"
                        begin="0.2s" dur="0.6s" repeatCount="indefinite" />
                    </rect>
                    <rect x="40" y="50" width="4" height="10" fill="#fff">
                    <animateTransform attributeType="xml"
                        attributeName="transform" type="translate"
                        values="0 0; 0 20; 0 0"
                        begin="0.4s" dur="0.6s" repeatCount="indefinite" />
                        </rect>
                        </svg>`
            }
            else {const iconImage = `http://openweathermap.org/img/wn/${icon}@2x.png`}
            //  seting image
            const img = document.querySelector('.icon img')
            img.src = iconImage
    
            // setting description
            setValues("discription", description)
            setValues("temperature", `${temp} °C`)
            setValues("location h4", `${name} - ${country}`)
            setValues("tem", `${temp} °C`)
            setValues("ws", `${speed} ms<sup>-1</sup>`)
            setValues("loc", `${lon.toFixed(2)}° ${lat.toFixed(2)}°`)
            setValues("hum", `${humidity} %`)
            setValues("wd", `${deg} °`)
            setValues("pre", `${pressure} hPa`)
        }
    }
    else if(cod > 399 && cod < 600 ){
        displayMessage(`Bad Request.`, "#FF5733 ", 3000)
    }
    

}

// function to set various values

function setValues(classname, val){
    document.querySelector(`.${classname}`).innerHTML = val 
}