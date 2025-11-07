const apiKey = "9d1c1f083fcc4b5b345c477285200577";
const movieDetails = document.getElementById("movie-details");

// Pega o ID do filme na URL
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");

async function getMovieDetails() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=pt-BR`
    );
    const data = await response.json();

    renderMovieDetails(data);
  } catch (error) {
    console.error("Erro ao carregar detalhes do filme:", error);
  }
}

function renderMovieDetails(movie) {
  movieDetails.innerHTML = `
    <div class="movie-container">
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
      <div class="movie-info">
        <h1>${movie.title}</h1>
        <p><strong>Nota:</strong> ${movie.vote_average}</p>
        <p><strong>Gêneros:</strong> ${movie.genres.map((g) => g.name).join(", ")}</p>
        <p><strong>Sinopse:</strong> ${movie.overview}</p>
        <p><strong>Data de Lançamento:</strong> ${movie.release_date}</p>
      </div>
    </div>
  `;
}

getMovieDetails();
