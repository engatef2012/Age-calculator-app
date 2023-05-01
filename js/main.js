const btn = document.querySelector("button");
const inputs = document.querySelectorAll("input");
const form = document.querySelector("form");
const results = document.querySelectorAll(".result span");
let birthDay;
let validForm = false;
inputs.forEach((input) => {
  input.addEventListener("blur", (e) => {
    const day = inputs[0].value;
    const month = inputs[1].value;
    const year = inputs[2].value;
    validForm = validDay(day, month, year);
    birthDay = new Date(year, month - 1, day);
    // checking if there is a value or not
    if (!e.target.value) {
      e.target.nextElementSibling.innerText = `${e.target.name} is required`;
    } else if (e.target.value) {
      // if the field is the year field
      if (e.target.name == "year") {
        e.target.nextElementSibling.innerText = validYear(year)
          ? ""
          : "Must be in the past";
      } else if (e.target.name == "month") {
        e.target.nextElementSibling.innerText = validMonth(month)
          ? ""
          : "Must be a valid month";
      } else if (e.target.name == "day") {
        e.target.nextElementSibling.innerText = validDay(day, month, year)
          ? ""
          : "Must be a valid day";
      }
    } else {
      e.target.nextElementSibling.innerText = "";
    }
  });
});
btn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!validForm) {
    document.querySelector(".form-control:first-of-type small").textContent =
      "Must be a valid day";
  } else {
    let age = calculateAge(birthDay);
    let counter = 0;
    let inter = setInterval(() => {
      results[0].textContent =
        counter > age.years ? age.years : counter > 9 ? counter : `0${counter}`;
      results[1].textContent =
        counter > age.months
          ? age.months
          : counter > 9
          ? counter
          : `0${counter}`;
      results[2].textContent =
        counter > age.days ? age.days : counter > 9 ? counter : `0${counter}`;
      counter++;
      if (counter > Math.max(age.years, age.months, age.days)) {
        clearInterval(inter);
      }
    }, 50);
    // results[0].textContent = age.years > 9 ? age.years : `0${age.years}`;
    // results[1].textContent = age.months > 9 ? age.months : `0${age.months}`;
    // results[2].textContent = age.days > 9 ? age.days : `0${age.days}`;
  }
});

function validYear(year) {
  if (year >= 1900 && year <= new Date().getFullYear()) {
    return true;
  }
  return false;
}
function validMonth(month) {
  if (month >= 1 && month <= 12) {
    return true;
  }
  return false;
}
function validDay(day, month, year) {
  let max;
  switch (parseInt(month)) {
    case 2:
      max = year % 4 == 0 ? 29 : 28;
      break;
    case 4:
    case 6:
    case 9:
    case 11:
      max = 30;
      break;
    default:
      max = 31;
      break;
  }
  if (day <= max && day >= 1) {
    return true;
  }
  return false;
}
function calculateAge(birthDay) {
  let age = { years: 0, months: 0, days: 0 };
  let today = new Date();
  let dayDiff = today.getDate() - birthDay.getDate();
  if (dayDiff >= 0) {
    age.days = dayDiff;
  } else {
    age.days = dayDiff + 30;
    today.setMonth(today.getMonth() - 1);
  }
  let monthDiff = today.getMonth() - birthDay.getMonth();
  if (monthDiff >= 0) {
    age.months = monthDiff;
  } else {
    age.months = monthDiff + 12;
    today.setFullYear(today.getFullYear() - 1);
  }
  let yearDiff = today.getFullYear() - birthDay.getFullYear();
  age.years = yearDiff;
  return age;
}
