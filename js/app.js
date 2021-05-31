let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&nat=US`;
const modalContainer = document.querySelector(".modal-container");
const gallery = document.querySelector("#gallery");
const modal = document.querySelector(".modal");
const modalClose = document.querySelector("#modal-close-btn");
const modalInfoContainer = document.querySelector(".modal-info-container");
const search = document.querySelector('#search-input');

//Call to the API using fetch method
fetch(urlAPI)
   .then(res => res.json())
   .then(res => res.results)
   .then(displayEmployees)
   .catch(err => console.log(err))


/********** FUNCTION TO DYNAMICALLY GENERATE GALLERY **************/
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

/**************** FUNCTION TO DISPLAY MODAL ********************/
function displayModal(index) {
  
  let { name, dob, phone, email, location, picture } = employees[index];

  let date = new Date(dob.date);
  let month = date.getMonth()+1;
  month < 10 ? month = '0' + month: month = month;
 

    const modalHTML = `
        <img class="modal-img" src="${picture.large}" alt="profile picture">
        <h3 id="name" class="modal-name cap">${name.first} ${name.last}</h3>
        <p class="modal-text">${email}</p>
        <p class="modal-text cap">${location.city}</p>
        <hr>
        <p class="modal-text">${phone}</p>
        <p class="modal-text">${location.street.number} ${location.street.name} ${location.city}, ${location.state} ${location.postcode}</p>
        <p class="modal-text">Birthday: ${month}/${date.getDate()}/${date.getFullYear()}</p>
        <div class="modal-btn-container">
        <button type="button" id="modal-prev" class="modal-prev btn" onclick="prevModal(${index})">Prev</button>
        <button type="button" id="modal-next" class="modal-next btn" onclick="nextModal(${index})">Next</button>
        </div>
    `
    modalContainer.classList.remove("hidden");
    modalInfoContainer.innerHTML = modalHTML; 
  }


/******** EVENT LISTENER CALLS MODAL FUNCTION **************/

  gallery.addEventListener('click', e => {
    // make sure the click is not on the gridContainer itself
    if (e.target !== gallery) {
    /* select the card element based on how close it is to actual element
    clicked*/
    const card = e.target.closest(".card");
    const index = card.getAttribute('data-index');
    displayModal(index);
    }
    });
  
    modalClose.addEventListener("click", () => {
       modalContainer.classList.add("hidden");
    });

/**************** SEARCH FUNCTION ********************/

const handleSearch = (e) => {
  
  const cards = document.querySelectorAll('.card-name');
  const searchTerm = e.target.value.toLowerCase();

  
    cards.forEach(card => {
    const text = card.textContent.toLowerCase();
    const box = card.parentElement.parentElement;
    
   
    if(text.includes(searchTerm)) {
      box.style.display = "flex";
    } else {
      box.style.display = "none";  
    }
   });

 }

//EVENT LISTENTER CALLS SEARCH FUNCTION
search.addEventListener("keyup", handleSearch);


/************* FUNCTIONS FOR PREV AND NEXT MODAL  **************/

function prevModal(index) {
  index -=1;
  if (index > -1) {
    displayModal(index ) 
  } else {
    displayModal(11);
    }
}

function nextModal(index) {
     index +=1;
  if (index < 12) {
    displayModal(index ) 
  } else {
    displayModal(0);
    }

}
