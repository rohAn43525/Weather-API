
const weatherForm = document.querySelector(".weatherForm")
const input = document.querySelector('.cityInput')
const card = document.querySelector(".card")

const Api = "ca0b1fdc72f85a2af3c6b0524bf555f6"


weatherForm.addEventListener("submit", async event =>{

    event.preventDefault()

    const city = input.value

    if(city){

        try{

            const weatherData = await getWeatherData(city)
            displayWeatherInfo(weatherData)

        }
        catch(error){
            console.error(error)
            displayError(error)
        }

    }
    else{

        displayError("Please Enter City")
    }

})

async function getWeatherData(city){

    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Api}`

    const response = await fetch(apiURL)

    console.log(response)

    if(!response.ok){

        throw new Error("Could not get Data")
    }

    return await response.json()

}

function displayWeatherInfo(data){

    console.log(data)

    const {name : city, main : {temp, humidity}, weather : [{description, id}]} = data

    card.textContent = ""
    card.style.display = "flex"

    const cityDisplay = document.createElement("h1")
    const tempDisplay = document.createElement("p")
    const humidityDisplay = document.createElement("p")
    const descDisplay = document.createElement("p")
    const emojiDisplay = document.createElement("p")

    cityDisplay.textContent = city
    tempDisplay.textContent = `${Math.floor(temp - 273.15)}°C`
    humidityDisplay.textContent = `Humidity : ${humidity}%`
    descDisplay.textContent = description
    emojiDisplay.textContent = getWeatherEmoji(id)


    cityDisplay.classList.add("cityDisplay")
    tempDisplay.classList.add("tempDisplay")
    humidityDisplay.classList.add("humidityDisplay")
    descDisplay.classList.add("descDisplay")
    emojiDisplay.classList.add("emojiDisplay")






    card.appendChild(cityDisplay)
    card.appendChild(tempDisplay)
    card.appendChild(humidityDisplay)
    card.appendChild(descDisplay)
    card.appendChild(emojiDisplay)








}

function getWeatherEmoji(weatherId){

    switch(true){

        case (weatherId >= 200 && weatherId < 300):
            return "⛈"
        case (weatherId >= 300 && weatherId < 400):
            return "🌧"
        case (weatherId >= 500 && weatherId < 600):
            return "🌧"
        case (weatherId >= 600 && weatherId < 700):
            return "❄"
        case (weatherId >= 700 && weatherId < 800):
            return "🌫"
        case (weatherId === 800):
            return "☀"
        case (weatherId >= 801 && weatherId < 810):
            return "☁"
    }

}

function displayError(message) {
    const errorDisplay = document.createElement("p")
    errorDisplay.textContent = message

    errorDisplay.classList.add("errorDisplay")

    card.textContent = ""
    card.style.display = "block"
    card.appendChild(errorDisplay)
}