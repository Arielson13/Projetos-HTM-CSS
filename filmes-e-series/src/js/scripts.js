document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "9d1c1f083fcc4b5b345c477285200577"; // sua chave TMDB
  const sectionMovies = document.querySelector(".sectionMovies");
  const prevBtn = document.getElementById("prevPage");
  const nextBtn = document.getElementById("nextPage");
  const currentPageSpan = document.getElementById("currentPage");
  const search = document.getElementById("searchMovies");

  let currentPage = 1;
  let totalPages = 1;
  // let currentQuery = "2025" || "2000" || "2022"; // pode ser alterado pelo input futuramente

  prevBtn.style.display = "none";
  nextBtn.style.display = "none";
  currentPageSpan.style.display = "none";

  async function getMovies(page = 1) {
    sectionMovies.innerHTML = `<span class="loader"></span>`;

    try {
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=pt-BR&sort_by=popularity.desc
      )}&page=${page}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        setTimeout(() => {
          showMovies(data.results);
          searchMovies(data.results);
          totalPages = data.total_pages;
          updatePagination();
        }, 2000);
      } else {
        sectionMovies.innerHTML = `<p style="text-align:center;color:#888;">Nenhum resultado encontrado.</p>`;
      }
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
      sectionMovies.innerHTML = `<p style="text-align:center;color:#f55;">Erro na conexão com o TMDB.</p>`;
    }
  }

  function searchMovies(moviesFiltered) {
    search.addEventListener("keyup", (e) => {
      const filter = moviesFiltered.filter((i) =>
        i.title.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
      );
      showMovies(filter);
    });
  }

  function showMovies(movies) {
    prevBtn.style.display = "block";
    nextBtn.style.display = "block";
    currentPageSpan.style.display = "block";

    sectionMovies.innerHTML = movies
      .map(
        (m) => `
        <div class="movie" data-id="${m.id}">
          <img src="${
            m.poster_path
              ? `https://image.tmdb.org/t/p/original${m.poster_path}`
              : "assets/placeholder.jpg"
          }" loading="lazy" />
          <div class="info">
            <h3>${m.title}</h3>
            <div class="rating">
              ⭐ ${m.vote_average.toFixed(1)}
            </div>
          </div>
        </div>
      `
      )
      .join("");

    addClickEventToMovies();
  }

  function addClickEventToMovies() {
    const movies = document.querySelectorAll(".movie");

    movies.forEach((movie) => {
      movie.addEventListener("click", () => {
        const movieId = movie.getAttribute("data-id");

        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
        currentPageSpan.style.display = "none";

        sectionMovies.innerHTML = `<span class="loader"></span>`;
        setTimeout(() => {
          window.location.href = `movie.html?id=${movieId}`;
        }, 2000);
      });
    });
  }

  function updatePagination() {
    currentPageSpan.textContent = currentPage;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
  }

  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      getMovies(currentPage);
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      getMovies(currentPage);
    }
  });

  getMovies();
});
