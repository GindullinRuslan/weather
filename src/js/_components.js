console.log('components');


let cityBlock = document.querySelector('.city'),
  tempBlock = document.querySelector('.temp'),
  pressureBlock = document.querySelector('.pressure'),
  velocityBlock = document.querySelector('.velocity'),
  descrBlock = document.querySelector('.description'),
  iconBlock = document.querySelector('.img'),
  inputBlock = document.querySelector('.weather__input'),
  btn = document.querySelector('.weather__btn');

let city = 'London';

document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    let value = inputBlock.value;
    if (value == '') {
      return false;
    }
    city = value;
    init();
    inputBlock.value = "";
  }
});

document.addEventListener('click', (e) => {
  if (e.target === btn) {
    let value = inputBlock.value;
    if (value == '') {
      return false;
    }
    city = value;
    init();
    inputBlock.value = "";
  }
});

function init() {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&appid=570ecef267356d14ba1dcf9c3acc4924`)
    .then(resp => {
      return resp.json();
    })
    .then(data => {
      tempBlock.textContent = `Температура : ${temperature()}°C`;
      cityBlock.textContent = `${data.name}`;
      descrBlock.textContent = `${description()}`;
      pressureBlock.textContent = `Давление : ${pressure()} мм рт.ст.`;
      velocityBlock.textContent = `Скорость ветра : ${velocity()} м/с`;
      iconBlock.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;

      console.log(data);

      function temperature() {
        let getTemp = data.main.temp;
        let tempC = Math.floor(getTemp) - 273;
        return tempC;
      }

      function pressure() {
        let getPressure = data.main.pressure;
        let pressureMm = Math.floor(getPressure * 0.750062);
        return pressureMm;
      }

      function velocity() {
        let getVelocity = data.wind.speed;
        let velocityNum = Math.floor(getVelocity);
        return velocityNum;
      }

      function description() {
        let getDescr = data.weather[0].description;
        getDescr[0].toUpperCase();
        return getDescr;
      }
    })
    .catch(() => {
      alert('This city not found');
    });
}

init();
