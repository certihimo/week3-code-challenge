function fetchFilms() {
    fetch('https://api.npoint.io/1e77e2b3a524e94aea30/films/')
      .then(res => res.json())
      .then(data => renderFilms(data));
}



function renderFilms(data) {
    const div = document.getElementById('card');
    const ul = document.getElementById('films');
    


    data.forEach(movie => {
      const li = document.createElement('li');
      li.classList.add('pointer', 'bold-italic-text');
      li.innerHTML = movie.title;


      const filmCard = document.createElement("div");
      filmCard.classList.add('film-card');
      filmCard.innerHTML = `
        <img src="${movie.poster}" height=500px width=300px/>
        <h2 class="bold-text">${movie.title}</h2>
        <p class="bold-text">${movie.description}</p>
        <p><span class="highlight bold-text">Runtime: ${movie.runtime}</span></p>
        <p><span class="highlight bold-text">Showtime: ${movie.showtime}</span></p>
      `;
      // Create a new <p> element to display the number of available tickets
      const tickets = document.createElement("p");
      tickets.classList.add("bold-italic-text")
      tickets.innerHTML = `Available tickets: ${(movie.capacity) - (movie.tickets_sold)}`;
      // Append the new <p> element to the filmCard
      filmCard.appendChild(tickets);





      const btn = document.createElement("button");
      btn.textContent = "Buy ticket";
      // Add an event listener to the button to decrement the number of tickets when clicked
      btn.addEventListener('click', () => {
        // Check if the number of available tickets is 0
        if (parseInt(tickets.innerText.split(': ')[1]) === 0) {
          // If it is, show an alert
          alert("Ticket Sold Out");
        } else {
          // Otherwise, decrement the number of available tickets by 1
          tickets.innerText = `Available tickets: ${parseInt(tickets.innerText.split(': ')[1]) - 1}`;
        }
      });
      // Append the button to the filmCard
      filmCard.appendChild(btn);



      li.addEventListener('click', () => {
        div.innerText=""
        div.appendChild(filmCard);
         // Check if the filmCard has the "active" class
         if (!filmCard.classList.contains('active')) {
          // If it does not, add the "active" class and append the filmCard to the li element
          filmCard.classList.add('active');  
          div.appendChild(filmCard);

        }
        /*else if (filmCard.classList.contains('active')){
          filmCard.classList.remove('active');
          div.appendChild(filmCard);
        }*/
      
      });
      ul.appendChild(li);
    });
  }
  fetchFilms();