"use strict";

// init
const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
// const tableBodyEl = document.querySelector(".table");
const tableBodyEl = document.getElementById("tbody");
const deleteBtn = document.querySelector(".btn-danger");
const healthyBtn = document.getElementById("healthy-btn");
const calculateBmiBtn = document.getElementById("calBmi-btn");

// const data = {
const id = document.getElementById("input-id").value;

//array

function renderTableData(petArr) {
  tableBodyEl.innerHTML = "";
  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${petArr[i].id}</td>
      <td>${petArr[i].name}</td>
      <td>${petArr[i].age}</td>
      <td>${petArr[i].type}</td>
      <td>${petArr[i].weight} kg </td>
      <td>${petArr[i].length} cm</td>
      <td>${petArr[i].breed}</td>
      <td>
        <div style="width: 17px; height: 17px; background-color: ${petArr[i].color}"></div>
      </td>
      <td class=${petArr[i].vaccinateIcon} ></td>
      <td class=${petArr[i].dewormedIcon}></td>
      <td class=${petArr[i].sterlizeIcon}></td>
      <td>${petArr[i].bmi}</td>
      <td>${petArr[i].date}</td>
      <td>
        <button type="button" class="btn btn-danger" data-id="${petArr[i].id}" onclick="deletePet(${petArr[i].id})">Delete</button>
      </td>
    `;
    tableBodyEl.appendChild(row);
    console.log(petArr[i].type, typeof petArr[i].type);
  }
  clearInput();
}
//test
let petArr = [];

// ---------------Submit buttonS----event---

submitBtn.addEventListener("click", function (e) {
  e.preventDefault();

  //date
  function getDate() {
    const date = new Date();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = String(date.getFullYear());

    return `${day}/${month}/${year}`;
  }

  // array
  //data
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: weightInput.value,
    length: lengthInput.value,
    breed: breedInput.value,
    color: colorInput.value,
    // vaccinated: vaccinatedInput.checked,
    vaccinateIcon: vaccinatedInput.checked
      ? " bi-check-circle-fill "
      : " bi-x-circle-fill",
    dewormedIcon: dewormedInput.checked
      ? "bi-check-circle-fill"
      : "bi-x-circle-fill",
    sterlizeIcon: sterilizedInput.checked
      ? "bi-check-circle-fill"
      : "bi-x-circle-fill",
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterlize: sterilizedInput.checked,
    bmi: "?",
    date: getDate(),
    delete: "delete ",
  };

  const validate = validateData(data);
  if (validate) {
    petArr.push(data);
    renderTableData(petArr);
  }
});

// -------------validate data function-----------------
function validateData(data) {
  const isValidated = true;
  if (data.id.trim() === "") {
    alert("Please input for Id !");
    isValidated = false;
  }
  if (data.name.trim() === "") {
    alert("Please input for Name !");
    isValidated = false;
  }

  if (isNaN(data.age) || data.age > 15 || data.age < 0) {
    alert("Age must be between 1 and 15!");
    isValidated = false;
  }
  if (data.type == "Select Type") {
    alert("Please select Type");
    isValidated = false;
  }
  if (data.weight.trim() === "" || data.weight > 15 || data.weight < 0) {
    alert("Weight must be between 1 and 15");
    isValidated = false;
  }

  if (data.length.trim() === "" || data.length > 100 || data.length < 0) {
    alert("Length must be between 1 and 100!");
    isValidated = false;
  }
  if (data.breed == "Select Breed") {
    alert("Please select Breed");
    isValidated = false;
  }
  // check id is same or not
  for (let i = 0; i < petArr.length; i++) {
    if (data.id === petArr[i].id) {
      alert("ID must unique");
      isValidated = false;
      break;
    }
  }

  return isValidated;
}

///////////// clear input ------function///////
function clearInput() {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000000";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
}
////////////-delete pet ------function--------
function deletePet(petId) {
  for (let i = 0; i < petArr.length; i++) {
    if (petId == petArr[i].id) {
      petArr.splice(i, 1);
      // tableBodyEl.removeChild(tableBodyEl.childNodes[i]);
    }
    renderTableData(petArr);
  }
}

///////// check healthy pet ----function/////
let healthyCheck = true;
healthyBtn.addEventListener("click", function () {
  //show healthy pet
  if (healthyCheck === true) {
    const healthyPetArr = [];

    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].vaccinated && petArr[i].dewormed && petArr[i].sterlize) {
        healthyPetArr.push(petArr[i]);
        console.log(
          petArr[i].vaccinated,
          petArr[i].dewormed,
          petArr[i].sterlize
        );
      }
    }

    console.log(healthyPetArr.length);

    renderTableData(healthyPetArr);
    healthyBtn.textContent = " Show All Pet";
    healthyCheck = false;
  } else {
    renderTableData(petArr);
    healthyBtn.textContent = "Show Healthy Pet";
    healthyCheck = true;
  }
});

/////----- calculate bmi--- function--

calculateBmiBtn.addEventListener("click", function () {
  for (let i = 0; i < petArr.length; i++) {
    if (petArr[i].type === "Dog") {
      petArr[i].bmi = (
        (petArr[i].weight * 703) /
        petArr[i].length ** 2
      ).toFixed(2);
    } else {
      petArr[i].bmi = (
        (petArr[i].weight * 886) /
        petArr[i].length ** 2
      ).toFixed(2);
    }
  }
  renderTableData(petArr);
});
