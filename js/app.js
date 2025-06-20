let employees = []
const urlAPI = `https://randomuser.me/api/?results=12&inc=name,picture,email,location,phone,dob&noinfo&nat=US`;
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");

fetch(urlAPI)
.then(res => res.json())
.then(res => res.results)
.then(displayEmployees)
.catch(err => console.log(err))

function displayEmployees (employeeData) {
    employees = employeeData;
    let employeeHTML = "";

    employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;

        employeeHTML += `
             <div class="card" data-index="${index}">
            <img class="avatar" src="${picture.large}">
            <div class="card-text">
                <h2 class="name">${name.first} ${name.last}</h2>
                <p class="email">${email}</p>
                <p class="location">${city}</p>
            </div>
        </div>
        `
    });
    gridContainer.innerHTML = employeeHTML;
}

function displayModal (index) {

    let { name, dob, phone, email, location: { city, street, state, postcode
    }, picture } = employees[index];
    let date = new Date(dob.date);

    const modalHTML = `
         <img class="avatar" src="${picture.large}" />
                <div class="text-container">
                    <h2 class="name">${name.first} ${name.last}</h2>
                    <p class="email">${email}</p>
                    <p class="location">${city}</p>
                    <hr>
                    <p>${phone}</p>
                    <p class="location">${street.name} ${street.number}, ${state} ${postcode}</p>
                    <p>Birthday:${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}</p>
    `;

    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;
}

// EVENT LISTENERS

gridContainer.addEventListener("click", e => {
    if (e.target !== gridContainer) {
        const card = e.target.closest(".card");
        const index = card.getAttribute("data-index");

        displayModal(index);
    }
});

modalClose.addEventListener("click", () => {
    overlay.classList.add("hidden");
})




