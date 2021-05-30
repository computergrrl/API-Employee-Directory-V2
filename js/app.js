let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&nat=US`;
const modalContainer = document.querySelector(".modal-container");
const gallery = document.querySelector("#gallery");
//const modalContainer = document.querySelector(".modal-content");
const modal = document.querySelector(".modal");
const modalClose = document.querySelector(".modal-close");

//Call to the API using fetch method
fetch(urlAPI)
   .then(res => res.json())
   .then(res => res.results)
   .then(displayEmployees)
   .catch(err => console.log(err))

   function displayEmployees(employeeData) {
    employees = employeeData;
    // store the employee HTML as we create it
    let employeeHTML = '';
    // loop through each employee and create HTML markup
    employees.forEach((employee, index) => {

      employeeHTML += `
      <div class="card" data-index="${index}">
        <div class="card-img-container">
          <img class="card-img" src="${employee.picture.large}" alt="profile picture">
        </div>
        <div class="card-info-container">
          <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
          <p class="card-text">${employee.email}</p>
          <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
        </div>
    </div>`
    });
    gallery.innerHTML = employeeHTML;
  }