// setting up preloader
window.addEventListener('load', function(){
    document.querySelector(".overlay").style.visibility = "visible"
})




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
    time.textContent = `${today.getHours()}:${today.getMinutes()}`
    currDate.textContent = `${days[today.getDay()]}, ${months[today.getMonth()]} ${today.getDate()} ${today.getFullYear()}`
    if(today.getHours() < 12){
        greeting.innerHTML = `<ion-icon name="sunny-outline"></ion-icon> <span>Good morning!</span>`
    }
    else{
        greeting.innerHTML = `<ion-icon name="moon-sharp"></ion-icon> <span>Good evening!</span>`
    }
}
setInterval(setDate, 1000)