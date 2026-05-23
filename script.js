    const input = document.querySelector("input");
    const search = document.querySelector(".search");
    const displayMovie = document.querySelector("#displayMovie");

    const API_KEY = 'bfabd8f0e8dea4256f4c422c45990456';

    
    search.addEventListener("click", ()=>{
      getMovie();
    });

    async function getMovie (){
      displayMovie.innerHTML = "";

      const movieName = input.value;
      const response = await fetch( `https://api.themoviedb.org/3/search/movie?query=${movieName}&api_key=${API_KEY}`);
      const data = await response.json();

      if(data.results.length === 0){
        displayError();
        return;
      }

      console.log(data);

      input.value = "";

      renderMovies(data.results);////take all the movies we got and display them on the page.
  }
     

       
         //show movies on the page
       function renderMovies(results){ 

  
        const limitedMovies = results.slice(0,40);

        limitedMovies.forEach(movie =>{
          if(!movie.poster_path) return;
          
        const newDiv = document.createElement("div");
        newDiv.className = "newDiv";

        const img = document.createElement("img");
        img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

        const pTag = document.createElement("p");
        pTag.textContent = movie.title;
        pTag.className = "movieTitle";

        const rateP = document.createElement("p");
        rateP.textContent = `⭐${movie.vote_average.toFixed(1)}`;
        rateP.className = "rating";

        const yearP = document.createElement("p");
        yearP.textContent = movie.release_date? movie.release_date.slice(0,4) : "N/A";
        yearP.className = "year";

        newDiv.appendChild(img);
        newDiv.appendChild(pTag);
        newDiv.appendChild(rateP);
        newDiv.appendChild(yearP);

        newDiv.addEventListener("click",()=>{
          window.open(`https://www.themoviedb.org/movie/${movie.id}`, "_blank");
        
        });
      
        displayMovie.appendChild(newDiv);
        
      });

    }


    function displayError(){
        const errorDiv = document.createElement("div");
        errorDiv.className = "errorContainer";

        const errorP = document.createElement("p");
        errorP.textContent ="Movie not found! 🤦‍♂️ ";
        errorP.className = "errorText";

        errorDiv.appendChild(errorP);
        document.body.append(errorDiv);
    }



       //get trending movies automatically

    async function getTrendingMovies(){
        
      const response = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=bfabd8f0e8dea4256f4c422c45990456`);
      const data = await response.json();

      renderMovies(data.results);
    }

    input.addEventListener("keydown", (event)=>{
      if(event.key==="Enter"){
        search.click();
      }
    });

    getTrendingMovies();
