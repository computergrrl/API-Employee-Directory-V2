let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&nat=US`;
const modalContainer = document.querySelector(".modal-container");
const gallery = document.querySelector("#gallery");
//const modalContainer = document.querySelector(".modal-content");
const modal = document.querySelector(".modal");
const modalClose = document.querySelector("#modal-close-btn");
const modalInfoContainer = document.querySelector(".modal-info-container");

//Call to the API using fetch method
fetch(urlAPI)
   .then(res => res.json())
   .then(res => res.results)
   .then(displayEmployees)
   .catch(err => console.log(err))

//FUNCTION TO DYNAMICALLY GENERATE GALLERY
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

function displayModal(index) {

  // document.body.style.overflow = 'hidden';
  
  let { name, dob, phone, email, location, picture } = employees[index];

  let date = new Date(dob.date);
 

    const modalHTML = `
    <img class="modal-img" src="${picture.large}" alt="profile picture">
    <h3 id="name" class="modal-name cap">${name.first} ${name.last}</h3>
    <p class="modal-text">${email}</p>
    <p class="modal-text cap">${location.city}</p>
    <hr>
    <p class="modal-text">${phone}</p>
    <p class="modal-text">${location.street.number} ${location.street.name} ${location.city}, ${location.state} ${location.postcode}</p>
    <p class="modal-text">Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
    `
    modalContainer.classList.remove("hidden");
    modalInfoContainer.innerHTML = modalHTML;

    /************* Code for Previous and Next Modal  **************/

    const prev = document.querySelector(".modal-prev");
    const next = document.querySelector(".modal-next");


      next.addEventListener("click" , () => {
          let prevModal = index +=1;
          if (index < 12) {
            displayModal(index ) 
          } else {
            index = 0;
            displayModal(index);
            
          }
      });

     prev.addEventListener("click" , () => {
      let nextModal = index -= 1;  
      if (index > -1) {
          displayModal(index) 
        } else {
          index = 11;
          displayModal(index);
          
        }
      });
    
  }

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

const search = document.querySelector('#search');

const handleSearch = (e) => {
  
  const cards = document.querySelectorAll('.card .name');
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