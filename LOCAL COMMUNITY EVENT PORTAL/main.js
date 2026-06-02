// JavaScript Basics & Setup
console.log("Welcome to the Community Portal");
window.addEventListener('load', ()=>{
  alert('Page fully loaded');
});

// Event class, prototype method
class EventItem{
  constructor(id,name,date,category,seats){
    this.id = id;
    this.name = name;
    this.date = new Date(date);
    this.category = category;
    this.seats = seats; // mutable
  }
}

EventItem.prototype.checkAvailability = function(){
  return this.seats > 0 && this.date > new Date();
}

// Data store
let events = [];

// Higher-order functions & closures
function createCategoryTracker(){
  const counts = {};
  return function(category){
    counts[category] = (counts[category] || 0) + 1;
    return counts[category];
  }
}
const trackCategory = createCategoryTracker();

// CRUD helpers
function addEvent(e){
  events.push(e);
}

function filterEventsByCategory(cat, predicate){
  return events.filter(ev => !cat || ev.category === cat).filter(predicate);
}

function registerUser(eventId, user){
  try{
    const ev = events.find(x=>x.id===Number(eventId));
    if(!ev) throw new Error('Event not found');
    if(!ev.checkAvailability()) throw new Error('No seats or event passed');
    ev.seats--;
    updateUI();
    return {success:true};
  }catch(err){
    console.error(err);
    return {success:false,message:err.message};
  }
}

// DOM helpers
const eventsRoot = document.querySelector('#events');
const categoryFilter = document.querySelector('#categoryFilter');
const searchInput = document.querySelector('#search');
const spinner = document.querySelector('#spinner');
const regForm = document.querySelector('#regForm');
const eventSelect = document.querySelector('#eventSelect');
const formMessage = document.querySelector('#formMessage');

function renderEventCard(ev){
  const card = document.createElement('div');
  card.className='card';
  const title = document.createElement('h3');
  title.textContent = `${ev.name}`; // template literal
  const meta = document.createElement('div');
  meta.textContent = `Date: ${ev.date.toDateString()} | Seats: ${ev.seats}`;
  card.appendChild(title);
  card.appendChild(meta);
  if(ev.checkAvailability()){
    const btn = document.createElement('button');
    btn.textContent='Register';
    btn.onclick = ()=>{
      const res = registerUser(ev.id,{});
      if(!res.success) alert('Registration failed: '+res.message);
      else alert('Registered!');
    };
    card.appendChild(btn);
  } else {
    const span = document.createElement('div');
    span.textContent = 'Not available';
    card.appendChild(span);
  }
  return card;
}

function updateUI(){
  // update event list and event select
  const cat = categoryFilter.value;
  const q = searchInput.value.toLowerCase();
  eventsRoot.innerHTML='';
  const visible = events.filter(ev=> ev.checkAvailability()).filter(ev=> !cat || ev.category===cat)
    .filter(ev=> ev.name.toLowerCase().includes(q));
  visible.forEach(ev=> eventsRoot.appendChild(renderEventCard(ev)));

  // update form select
  eventSelect.innerHTML='';
  events.forEach(ev=>{
    const opt = document.createElement('option');
    opt.value = ev.id;
    opt.textContent = `${ev.name} (${ev.seats} seats)`;
    eventSelect.appendChild(opt);
  });
}

// Fetch mock API using then/catch
function loadEventsThen(){
  spinner.style.display='block';
  fetch('mock-api.json')
    .then(r=>r.json())
    .then(data=>{
      data.events.forEach(o=> addEvent(new EventItem(o.id,o.name,o.date,o.category,o.seats)));
      spinner.style.display='none';
      updateUI();
    })
    .catch(err=>{console.error('Fetch error',err); spinner.style.display='none'});
}

// Async/await version
async function loadEvents(){
  spinner.style.display='block';
  try{
    const r = await fetch('mock-api.json');
    const data = await r.json();
    data.events.forEach(o=> addEvent(new EventItem(o.id,o.name,o.date,o.category,o.seats)));
    spinner.style.display='none';
    updateUI();
  }catch(err){console.error(err); spinner.style.display='none';}
}

// Form handling
regForm.addEventListener('submit', (ev)=>{
  ev.preventDefault();
  formMessage.textContent='';
  const fm = ev.target.elements;
  const name = fm.name.value.trim();
  const email = fm.email.value.trim();
  const eventId = fm.eventId.value;
  if(!name || !email) { formMessage.textContent='Please fill name and email'; formMessage.className='error'; return; }

  // Simulate POST with fetch using setTimeout
  formMessage.textContent='Sending...';
  setTimeout(()=>{
    const res = registerUser(eventId,{name,email});
    if(res.success){ formMessage.textContent='Registration successful'; formMessage.className='message'; }
    else { formMessage.textContent='Registration failed: '+res.message; formMessage.className='error'; }
  },800);
});

// Filters and search
categoryFilter.onchange = updateUI;
searchInput.addEventListener('keydown', (e)=>{
  if(e.key === 'Enter') updateUI();
});

// Demonstrate Object.entries
function logEventEntries(){
  if(events[0]) console.log(Object.entries(events[0]));
}

// Use spread to clone when filtering
function getMusicEvents(){
  return [...events].filter(e=> e.category==='Music');
}

// Initialize
loadEvents();
