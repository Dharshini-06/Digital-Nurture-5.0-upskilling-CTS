

//EXERCISE 1
//JavaScript Basics & Setup


console.log("Welcome to the Community Portal");

window.onload = () => {
    alert("Community Portal Loaded Successfully");
};




//EXERCISE 2
//Syntax, Data Types and Operators


const portalName = "Local Community Portal";

const launchDate = "2026-06-01";

let seats = 50;

console.log(
`${portalName} launched on ${launchDate}`
);

seats++;
console.log("Seats Updated:", seats);




//EXERCISE 5
//Objects and Prototypes


class Event {

    constructor(
        id,
        name,
        category,
        date,
        seats,
        location
    ) {

        this.id = id;
        this.name = name;
        this.category = category;
        this.date = date;
        this.seats = seats;
        this.location = location;
    }

}

Event.prototype.checkAvailability = function () {
    return this.seats > 0;
};




//EXERCISE 6
//Arrays and Methods


const events = [

    new Event(
        1,
        "Music Festival",
        "Music",
        "2026-12-10",
        50,
        "Chennai"
    ),

    new Event(
        2,
        "Baking Workshop",
        "Workshop",
        "2026-08-12",
        25,
        "Coimbatore"
    ),

    new Event(
        3,
        "Football Match",
        "Sports",
        "2026-11-15",
        0,
        "Madurai"
    )

];

events.push(
    new Event(
        4,
        "Guitar Night",
        "Music",
        "2026-09-20",
        40,
        "Chennai"
    )
);

const musicEvents =
events.filter(
    e => e.category === "Music"
);

console.log(musicEvents);

const eventCards =
events.map(
    e => `Event: ${e.name}`
);

console.log(eventCards);




//EXERCISE 3
//Conditionals, Loops and Error Handling


const today = new Date();

events.forEach(event => {

    const eventDate =
    new Date(event.date);

    if (
        eventDate > today &&
        event.seats > 0
    ) {

        console.log(
            `${event.name} Available`
        );

    } else {

        console.log(
            `${event.name} Hidden`
        );

    }

});




//EXERCISE 4
//Functions, Scope, Closures,
//Higher Order Functions


function addEvent(eventObj) {

    events.push(eventObj);

}

function registerUser(eventId) {

    try {

        const event =
        events.find(
            e => e.id === eventId
        );

        if (!event)
            throw new Error(
                "Event not found"
            );

        if (event.seats <= 0)
            throw new Error(
                "No seats available"
            );

        event.seats--;

        return "Registration Successful";

    } catch (err) {

        console.error(err.message);

    }

}

function filterEventsByCategory(
    category,
    callback
) {

    const result =
    events.filter(
        e => e.category === category
    );

    callback(result);

}

const registrationTracker = () => {

    let count = 0;

    return () => ++count;

};

const musicRegistrationCounter =
registrationTracker();

console.log(
musicRegistrationCounter()
);

filterEventsByCategory(
    "Music",
    result =>
    console.log(result)
);




//EXERCISE 7
//DOM Manipulation


const eventContainer =
document.querySelector(
"#eventContainer"
);

function renderEvents(
    eventList = events
) {

    eventContainer.innerHTML = "";

    const fragment =
    document.createDocumentFragment();

    eventList.forEach(event => {

        const card =
        document.createElement("div");

        card.className = "card";

        card.innerHTML = `
            <h3>${event.name}</h3>
            <p>${event.category}</p>
            <p>Seats: ${event.seats}</p>
            <button
             onclick="handleRegister(${event.id})">
             Register
            </button>
        `;

        fragment.appendChild(card);

    });

    eventContainer.appendChild(fragment);

}

renderEvents();




//EXERCISE 8
//Event Handling


function handleRegister(id) {

    registerUser(id);

    renderEvents();

}

document
.querySelector("#categoryFilter")
.onchange = function () {

    const value = this.value;

    if (value === "All") {

        renderEvents();

    } else {

        renderEvents(
            events.filter(
                e =>
                e.category === value
            )
        );

    }

};

document
.querySelector("#searchBox")
.addEventListener(
"keydown",
() => {

    const keyword =
    document
    .querySelector("#searchBox")
    .value
    .toLowerCase();

    renderEvents(
        events.filter(
            e =>
            e.name
            .toLowerCase()
            .includes(keyword)
        )
    );

}
);




//EXERCISE 9
//Async JS, Promises,
//Async Await


function fetchEventsPromise() {

    document
    .querySelector("#loader")
    .style.display = "block";

    fetch(
        "https://jsonplaceholder.typicode.com/posts"
    )

    .then(response =>
        response.json()
    )

    .then(data => {

        console.log(
            "Fetched",
            data.length
        );

    })

    .catch(error =>
        console.error(error)
    )

    .finally(() => {

        document
        .querySelector("#loader")
        .style.display = "none";

    });

}

fetchEventsPromise();

async function fetchEventsAsync() {

    try {

        const response =
        await fetch(
        "https://jsonplaceholder.typicode.com/posts"
        );

        const data =
        await response.json();

        console.log(data);

    } catch (error) {

        console.error(error);

    }

}




//EXERCISE 10
//Modern JavaScript Features


function greetUser(
    name = "Guest"
) {

    return `Welcome ${name}`;

}

const {
    name,
    category
} = events[0];

console.log(
    name,
    category
);

const clonedEvents =
[...events];

console.log(clonedEvents);




//EXERCISE 11
//Working with Forms


const form =
document.getElementById(
"registrationForm"
);

form.addEventListener(
"submit",
function(event){

event.preventDefault();

const username =
form.elements.username.value;

const email =
form.elements.email.value;

const eventName =
form.elements.eventName.value;

const msg =
document.getElementById(
"message"
);

if(
!username ||
!email ||
!eventName
){

msg.innerHTML =
"Please fill all fields";

msg.className =
"error";

return;

}

msg.innerHTML =
"Registration Submitted";

msg.className =
"success";

submitRegistration({
username,
email,
eventName
});

}
);




//EXERCISE 12
//AJAX & Fetch API

function submitRegistration(
userData
){

setTimeout(async ()=>{

try{

const response =
await fetch(
"https://jsonplaceholder.typicode.com/posts",
{
method:"POST",
headers:{
"Content-Type":
"application/json"
},
body:
JSON.stringify(userData)
}
);

if(response.ok){

document
.getElementById("message")
.innerHTML =
"Registration Successful";

}
else{

throw new Error(
"Failed"
);

}

}
catch(error){

document
.getElementById("message")
.innerHTML =
"Registration Failed";

}

},2000);

}




//EXERCISE 13
//Debugging & Testing


function debugRegistration(
data
){

console.log(
"Step 1: Form Received"
);

console.log(
"Payload:",
data
);

debugger;

console.log(
"Step 2: Sending Request"
);

}




//EXERCISE 14
//jQuery


$("#registerBtn").click(
function(){

console.log(
"Register button clicked"
);

}
);

$(".card").fadeIn();

setTimeout(()=>{

$(".card").fadeOut();

},5000);

/*

Benefit of React/Vue:

1. Component Reusability
2. Virtual DOM
3. Better Performance
4. State Management
5. Easier Large Scale Development

*/




//Object.entries Example
//(Exercise 5)

Object.entries(events[0])
.forEach(
([key,value]) => {

console.log(
`${key}: ${value}`
);

}
);