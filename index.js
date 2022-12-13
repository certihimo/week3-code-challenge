const ul = document.getElementById("film")
let liElement;
let posterElement = document.getElementById("poster")
let titleElement = document.getElementById("title")
let descElement = document.getElementById("desc")
let runtimeElement = document.getElementById("runtime")
let capacityElement = document.getElementById("capacity")
let ticketElement = document.getElementById("tickets")
let btnElement = document.getElementById("btn")

function getFirstMovie(){
    console.log("first")
    fetch("http://localhost:3000/films/1")
    .then(function(response){
        return response.json()
    }).then(function(data){
       posterElement.src= data.poster
       titleElement.innerHTML = data.title
       descElement.innerHTML = data.description
       runtimeElement.innerHTML = data.runtime
       capacityElement.innerHTML = data.capacity
       ticketElement.innerHTML = data.capacity-data.tickets_sold>0?data.capacity-data.tickets_sold:"Sold out"
       if(data.capacity-data.tickets_sold <= 0){
        btnElement.style.display = "none";
       }
       btnElement.setAttribute("onclick", `buyTicket(${data.tickets_sold},${data.id})`)
    })
}

function getMovieTitles(){
    fetch("http://localhost:3000/films")
    .then(function(response){
        return response.json()
    }).then(function(data){
        data.forEach(movie => {
           liElement = document.createElement("li")
           ul.appendChild(liElement) 
           liElement.innerHTML = movie.title
           liElement.setAttribute("onclick", `getMovieDetails(${movie.id})`)
        });
    })
}
function getMovieDetails(id){
    console.log("all")
    location.replace("http://127.0.0.1:5500/index.html?id="+id);
   
}
function buyTicket(ticket_sold, id){
    fetch(`http://localhost:3000/films/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({
              tickets_sold: ticket_sold+1,
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
            .then((response) => response.json())
            .then((json) => console.log(json));
          
     }

getMovieTitles()
function getMovies(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const urlId = urlParams.get('id')
    fetch("http://localhost:3000/films/"+urlId)
    .then(function(response){
        return response.json()
    }).then(function(data){
        posterElement.src= data.poster
        titleElement.innerHTML = data.title
        descElement.innerHTML = data.description
        runtimeElement.innerHTML = data.runtime
        capacityElement.innerHTML = data.capacity
        ticketElement.innerHTML = data.capacity-data.tickets_sold>0?data.capacity-data.tickets_sold:"Sold out"
        if(data.capacity-data.tickets_sold <= 0){
            btnElement.style.display = "none";
           }
        btnElement.setAttribute("onclick", `buyTicket(${data.tickets_sold},${data.id})`)
    })
}
getMovies()
if(window.location.href == "http://127.0.0.1:5500/index.html" ||window.location.href == "http://127.0.0.1:5500/"){
    getFirstMovie()
}
console.log(window.location.href)